import useTracking from '@navigation/useTracking';
import React, {useEffect, useState} from 'react';
import {
  EmitterSubscription,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {IssueScreen, ScreenProps} from '.';

import navigator from '@navigation/navigator';
import layoutStyle from '@style/layoutStyle';
import {BikeCard} from '@components/bikes/BikeCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  APP_ACTIONS_SAGA_CONNECT_BIKE,
  APP_ACTIONS_SAGA_DISCONNECT,
  APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
  APP_ACTIONS_SAGA_LOCK_BIKE,
  APP_ACTIONS_SAGA_REGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_UNLOCK_BATTERY,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
  APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_USE_BLE_DATA,
} from '@logic/store/app/saga';
import {AppSelector} from '@logic/store/app/selector';
import MyView from '@components/generic/MyView';
import {BikeButton} from '@components/bikes/BikeButton';
import {bikeDataListener} from '@utils/blemodule';
import {AuthSelector} from '@logic/store/auth/selector';
import {PRIVILEGES_TYPE} from '@logic/store/auth/utils';
import {BikeModal, BikeModalType} from '@components/bikes/BikeModal';
import PageHeader from '@components/generic/navigation/PageHeader';
import i18n from '@assets/locales';

const BIKE_LOCKED = 1;
const BIKE_UNLOCKED = 2;
const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  const dispatch = useDispatch();
  const appData = useSelector(AppSelector.getApp);
  const isAppLoading = useSelector(AppSelector.getAppIsLoading);
  useTracking(BikeScreen.navigationName);
  // Display
  const privileges = useSelector(AuthSelector.getAngelBikePrivilege); // todo try selector with params
  const isLockedFromBack = appData?.bike?.lock_info?.status === BIKE_LOCKED;
  const checkLocked = appData?.bike?.status !== 3; //Le vélo n’est pas in_use
  const checkUnlocked = appData?.bike?.status !== 4; // Le vélo n’est pas in_pause
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [bikeModalData, setBikeModalData] = useState<BikeModalType | null>(
    null,
  );
  // BLE
  const [listener, setListener] = useState<EmitterSubscription | null>(null);
  const [lockState, setLockState] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (lockState) {
      // lock state changed
      console.log('dispatch APP_ACTIONS_SAGA_USE_BLE_DATA');
      dispatch({
        type: APP_ACTIONS_SAGA_USE_BLE_DATA,
        data: {bikeId, bleLockState: lockState ?? 0},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockState]);

  useEffect(() => {
    if (!connected) {
      tryConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  const tryConnection = () => {
    console.log('tryConnection');
    dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE, data: {bikeId}});
  };

  // Get bike datas from backend + connect to our bike
  useEffect(() => {
    if (dispatch && bikeId) {
      console.log('dispatch && bikeId');
      dispatch({type: APP_ACTIONS_SAGA_REGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID, data: {bikeId}});
      // Listen bluetooth
      const _listener = bikeDataListener.addListener(
        'BikeDataEvent',
        (bikeBleData: string) => {
          try {
            const data =
              Platform.OS === 'ios' ? JSON.parse(bikeBleData) : bikeBleData;
            setLockState(data?.lockState);
            setConnected(data?.connected);
          } catch (error) {
            console.log('parse bikeBleData', error);
          }
        },
      );
      setListener(_listener);
    }
    return () => {
      console.log('unmount dispatch && bikeId');
      listener?.remove();
      dispatch({type: APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_DISCONNECT, data: {bikeId}});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bikeId]);

  return (
    <MyView backgroundWhite style={layoutStyle.flex}>
      <PageHeader options={{title: i18n.t('bike-sheet')}} />
      {appData?.bike && (
        <MyView flex p5>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isAppLoading}
                onRefresh={() =>
                  dispatch({
                    type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
                    data: {bikeId},
                  })
                }
              />
            }>
            <BikeCard bike={appData?.bike} />
          </ScrollView>
          {privileges.includes(
            PRIVILEGES_TYPE.ANGELS.privileges.BIKE.permissions.UNLOCK,
          ) &&
            ((isLockedFromBack && checkLocked) ||
              (!isLockedFromBack && checkUnlocked)) && (
              <BikeButton
                keyText={
                  isLockedFromBack ? 'bike-action-unlock' : 'bike-action-lock'
                }
                icon={isLockedFromBack ? 'Unlock' : 'Lock'}
                onPress={() => {
                  const action = () =>
                    dispatch({
                      type: isLockedFromBack
                        ? APP_ACTIONS_SAGA_UNLOCK_BIKE
                        : APP_ACTIONS_SAGA_LOCK_BIKE,
                    });
                  setBikeModalData({
                    description: isLockedFromBack
                      ? 'bike-unlock-description'
                      : 'bike-lock-description',
                    title: isLockedFromBack
                      ? 'bike-action-unlock'
                      : 'bike-action-lock',
                    image: isLockedFromBack ? 'Unlock' : 'Lock',
                    button1: {
                      text: 'validate',
                      action: () => {
                        setShowModal(false);
                      },
                    },
                    isLoadingSelector: AppSelector.getDataProcessed,
                    successCondition: (data: any) =>
                      data?.bike?.lock_info?.status ===
                      (isLockedFromBack ? BIKE_UNLOCKED : BIKE_LOCKED),
                    failureCondition: (data: any) =>
                      data?.bike?.lock_info?.status ===
                      (isLockedFromBack ? BIKE_LOCKED : BIKE_UNLOCKED),
                    action,
                    timeoutAction: () => {
                      dispatch({
                        type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
                        data: {bikeId},
                      });
                    },
                  });
                  action();
                  setShowModal(true);
                }}
              />
            )}
          {isLockedFromBack &&
            privileges.includes(
              PRIVILEGES_TYPE.ANGELS.privileges.BIKE.permissions.UNLOCK,
            ) && (
              <BikeButton
                keyText={'bike-action-change-battery'}
                icon="BatterySmall"
                onPress={() =>
                  dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BATTERY})
                }
              />
            )}
          {/*
        <BikeButton keyText={'bike-action-signal-problem'} icon="Checklist" />
        <BikeButton keyText={'bike-action-pickup'} icon="Pickup" /> */}
          <BikeButton
            keyText={'bike-action-signal-problem'}
            icon="Checklist"
            onPress={() => {
              navigator.navigate(IssueScreen.navigationName, {bikeId});
            }}
          />
        </MyView>
      )}
      {bikeModalData && (
        <BikeModal
          show={showModal}
          data={appData}
          bikeModalData={bikeModalData}
          onClose={() => setShowModal(false)}
        />
      )}
      <SafeAreaView />
    </MyView>
  );
};

BikeScreen.navigationName = 'Bike';
BikeScreen.navigationOptions = {
  headerShown: false,
  title: i18n.t('bike-sheet'),
};

export {BikeScreen};
