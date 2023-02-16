import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyText from '@components/generic/MyText';

import layoutStyle from '@style/layoutStyle';
import MyTextInput from '@components/generic/MyTextInput';
import i18n from '@assets/locales';
import {FAB} from 'react-native-paper';
import themeStyle from '@style/themeStyle';
import {NativeModules} from 'react-native';
import MyView from '@components/generic/MyView';

// ...

const {StatusBarManager} = NativeModules;

const ScanManualInput = ({
  manualOnly,
  onBikeId,
  onClose,
}: {
  manualOnly: boolean;
  onBikeId: (bikeId: number) => void;
  onClose: () => void;
}) => {
  return (
    <View
      style={[
        layoutStyle.absFill,
        layoutStyle.layerWithOpacity,
        layoutStyle.p5,
      ]}>
      <MyView style={layoutStyle.flex} />
      <MyText
        _title
        _style_bold
        style={layoutStyle.mt40}
        keyText={'scan-manuel-text'}
      />
      <MyText
        _subtitle
        style={layoutStyle.mv32}
        keyText={'scan-manuel-sub-text'}
      />
      <MyTextInput
        onChangeText={text => {
          if (text?.length === 6) {
            try {
              const bikeId = parseInt(text, 10);
              onBikeId(bikeId);
            } catch (e) {}
          }
        }}
        placeholder={i18n.t('scan-manuel-placeholder')}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      {!manualOnly && (
        <FAB
          onPress={onClose}
          color={themeStyle.textColorInput.toString()}
          icon="close"
          style={styles.close}
        />
      )}
      <MyView style={layoutStyle.flex2} />
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    ...layoutStyle.absTopLeft,
    top: StatusBarManager.HEIGHT + 24,
    left: 24,
    alignSelf: 'flex-end',
    color: themeStyle.textColorInput,
    borderRadius: 16,
    backgroundColor: themeStyle.accentPrimaryLight,
  },
});

export {ScanManualInput};
