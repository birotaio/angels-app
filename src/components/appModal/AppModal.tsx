import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MyText from '@components/generic/MyText';

import layoutStyle from '@style/layoutStyle';

import themeStyle from '@style/themeStyle';
import MyButton from '@components/generic/MyButton';
import AnimFadeView from '@components/generic/animation/AnimFadeView';
import NoTouchView from '@components/generic/NoTouchView';
import colors from '@style/colors';
import MyView from '@components/generic/MyView';
import AppModalManager from './AppModalManager';
import {AppModalType} from './AppModalType';
import textstyle from '@style/textStyle';

export const AppModal = () => {
  const [show, setShow] = useState(false);
  const [appModal, setAppModal] = useState<AppModalType | null>();
  useEffect(() => {
    AppModalManager.registerMethods(showMethod, hideMethod);
    return () => {
      AppModalManager.unregisterMethods();
    };
  }, []);

  const showMethod = (_appModal: AppModalType) => {
    setAppModal(_appModal);
    setShow(true);
  };
  const hideMethod = () => {
    setAppModal(null);
    setShow(false);
  };

  return (
    <AnimFadeView
      style={[styles.container, {backgroundColor: colors.GREY_TR}]}
      show={show}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => {
          hideMethod();
        }}>
        {appModal && (
          <NoTouchView style={styles.card}>
            <View style={layoutStyle.rowCenter}>
              <MyText
                uppercase
                _style_bold
                color={'red'}
                keyText={appModal?.title}
                icon={{size: 24, icon: appModal?.image}}
              />
            </View>

            <MyText
              style={[layoutStyle.mv32, textstyle.f16]}
              _color_secondary
              keyText={appModal?.description}
            />
            <MyView rowCenter>
              {appModal?.button1?.text && (
                <MyButton
                  noShadow
                  color={themeStyle.textNegColor}
                  outlined
                  style={[layoutStyle.flex, layoutStyle.mr4p]}
                  keyText={appModal?.button1.text}
                  onPress={appModal?.button1.action}
                />
              )}
              {appModal?.button2?.text && (
                <MyButton
                  noShadow
                  style={[layoutStyle.flex, layoutStyle.ml12]}
                  keyText={appModal?.button2.text}
                  onPress={appModal?.button2.action}
                />
              )}
            </MyView>
          </NoTouchView>
        )}
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
    justifyContent: 'center',
    backgroundColor: themeStyle.background,
    borderRadius: 24,
    padding: 24,
    width: '85%',
    // ...layoutStyle.shadow,
  },

  loader: {width: 128, height: 128},
});
