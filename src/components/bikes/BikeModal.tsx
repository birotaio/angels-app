import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MyText from '@components/generic/MyText';
import Lottie from 'lottie-react-native';

import layoutStyle from '@style/layoutStyle';

import lottie from '@assets/lottie';
import themeStyle from '@style/themeStyle';
import MyButton from '@components/generic/MyButton';
import AnimFadeView from '@components/generic/animation/AnimFadeView';
import NoTouchView from '@components/generic/NoTouchView';
import colors from '@style/colors';
import MyView from '@components/generic/MyView';
import {TranslateKeyProps} from '@assets/locales/locale';
import {useSelector} from 'react-redux';

export type BikeModalType = {
  title: TranslateKeyProps;
  description: TranslateKeyProps;
  image: string;
  button1?: {
    text: TranslateKeyProps;
    action: () => void;
  };
  button2?: {
    text: TranslateKeyProps;
    action: () => void;
  };
  isLoadingSelector: (data: any) => boolean;
  successCondition: (data: any) => boolean;
  failureCondition: (data: any) => boolean;

  action: () => void;
  timeoutAction: () => void;
};

const TIMEOUT_TIME = 6000;

export const BikeModal = ({
  data,
  show,
  onClose,
  bikeModalData,
}: {
  data: any;
  bikeModalData: BikeModalType;
  show: boolean;
  onClose: () => void;
}) => {
  const isLoadingSelector = useSelector(bikeModalData.isLoadingSelector);
  const [isLoading, setLoading] = useState(true);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const success = bikeModalData.successCondition(data);
  // const failure = bikeModalData.failureCondition(data);

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSelector]);

  useEffect(() => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    if (show) {
      // reset timeout
      setLoading(true);
      startRetry(1);
    } else {
      bikeModalData?.timeoutAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const startRetry = (_retry: number) => {
    const _closeTimeout = setTimeout(() => {
      if (_retry < 3) {
        bikeModalData?.action();
        startRetry(_retry + 1);
      } else {
        bikeModalData?.timeoutAction();
        setLoading(false);
      }
    }, TIMEOUT_TIME);
    setCloseTimeout(_closeTimeout);
  };

  return (
    <AnimFadeView
      style={[styles.container, {backgroundColor: colors.GREY_TR}]}
      show={show}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => {
          onClose?.();
        }}>
        <NoTouchView style={styles.card}>
          <View style={layoutStyle.rowCenter}>
            <MyText
              _title
              _style_bold
              color={'red'}
              keyText={bikeModalData.title}
              icon={{size: 48, icon: bikeModalData.image}}
            />
          </View>
          <Lottie
            style={styles.loader}
            source={
              isLoading
                ? lottie.buttonLoader
                : success
                ? lottie.greenCheck
                : lottie.fail
            }
            autoSize
            autoPlay
            loop={isLoading}
          />
          <MyText
            style={styles.text}
            _color_secondary
            keyText={bikeModalData.description}
          />
          <MyView rowCenter>
            {bikeModalData.button1?.text && (
              <MyButton
                color={themeStyle.textNegColor}
                outlined
                style={[layoutStyle.flex, layoutStyle.mr4p, layoutStyle.pv10]}
                keyText={bikeModalData.button1.text}
                onPress={bikeModalData.button1.action}
              />
            )}
            {bikeModalData.button2?.text && (
              <MyButton
                color={themeStyle.textNegColor}
                outlined
                style={[layoutStyle.flex, layoutStyle.mr4p, layoutStyle.pv10]}
                keyText={bikeModalData.button2.text}
                onPress={bikeModalData.button2.action}
              />
            )}
          </MyView>
        </NoTouchView>
      </TouchableOpacity>
    </AnimFadeView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layoutStyle.absFill,
    ...layoutStyle.center,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyle.background,
    borderRadius: 24,
    padding: 16,
    width: '85%',
    // ...layoutStyle.shadow,
  },
  text: {
    marginBottom: 12,
  },
  loader: {width: 128, height: 128},
});
