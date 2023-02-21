import Map from '@components/map/Map';
import {MapActions} from '@components/map/MapActions';
import {MAP_ACTIONS_SAGA_GET_STATIONS} from '@logic/store/map/saga';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import geolocation from '@utils/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  APP_ACTIONS_SAGA_CHECK_PERMISSIONS_AND_SCAN,
  APP_ACTIONS_SAGA_SETUP_BLE,
} from '@logic/store/app/saga';
import {BikeScreen, ScreenProps} from '.';
import navigator from '@navigation/navigator';

const MapScreen: ScreenProps = () => {
  const dispatch = useDispatch();
  useTracking(MapScreen.navigationName);

  useEffect(() => {
    dispatch({type: MAP_ACTIONS_SAGA_GET_STATIONS});

    dispatch({type: APP_ACTIONS_SAGA_SETUP_BLE});
  }, [dispatch]);

  const map = useRef<MapboxGL.Camera>();
  return (
    <Map ref={map} showUserLocation style={layoutStyle.flex}>
      <MapActions
        onGeolocationPress={async () =>
          await geolocation.getCurrentPosition(position => {
            if (position?.coords?.longitude) {
              map.current?.flyTo([
                position.coords.longitude,
                position.coords.latitude,
              ]);
            }
          })
        }
        onMapSearchPress={() => {
          navigator.navigate(BikeScreen.navigationName, {bikeId: 113919});
        }}
        onScanQrCodePress={() => {
          dispatch({type: APP_ACTIONS_SAGA_CHECK_PERMISSIONS_AND_SCAN});
        }}
      />
    </Map>
  );
};

MapScreen.navigationName = 'Map';
MapScreen.navigationOptions = {headerShown: true};

export {MapScreen};
