import navigator from '@navigation/navigator';
import useTracking from '@navigation/useTracking';
import componentStyle from '@style/componentStyle';
import themeStyle from '@style/themeStyle';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Button, Checkbox, FAB} from 'react-native-paper';
import {ScreenProps} from '.';
import {CameraComponent} from '@components/camera/CameraComponent';
import MyText from '@components/generic/MyText';

import images from '@assets/images';
import i18n from '@assets/locales';
import textstyle from '@style/textStyle';
import layoutStyle from '@style/layoutStyle';
import {showMessage} from 'react-native-flash-message';
import MyStatusBar from '@components/generic/MyStatusBar';
import {UrlBookmark} from 'vision-camera-code-scanner';
import bike from '@utils/fifteen/bike';
import {BikeScreen, BikesScreen} from '.';
import _ from 'lodash';

const ScanScreen: ScreenProps = () => {
  const [bikeId, setBikeId] = useState<number | null>(null);
  const [scans, setScans] = useState<number[]>([]);
  const [scanMany, setScanMany] = useState(false);
  useTracking(ScanScreen.navigationName);

  useEffect(() => {
    if (bikeId) {
      if (!scanMany) {
        showQrCode(bikeId);
        setBikeId(null);
      } else {
        if (!scans.includes(bikeId)) {
          const _scans = [...scans];
          _scans.push(bikeId);
          setBikeId(null);
          setScans(_scans);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeId, scanMany]);

  const showQrCode = (_bikeId: number) =>
    showMessage({
      floating: true,
      message: `${i18n.t('bike_id')} :  ${bikeId}`,
      autoHide: true,
      duration: 5000,
      position: 'center',
      backgroundColor: themeStyle.accentPrimary,
      color: themeStyle.textColor,
      onPress: () =>
        navigator.navigate(BikeScreen.navigationName, {bikeId: _bikeId}),
    });

  const removeScan = (item: number) => {
    const _scans = [...scans];
    _.remove(_scans, el => item === el);
    setScans(_scans);
  };

  const BikeIdScan = ({item}: {item: number}) => (
    <Button
      style={layoutStyle.mr4p}
      onPress={() => removeScan(item)}
      contentStyle={styles.reverse}
      icon="close"
      color={themeStyle.textColor}
      mode="outlined">
      {`${item}`}
    </Button>
  );
  return (
    <View style={layoutStyle.flex}>
      <MyStatusBar />
      <View style={[layoutStyle.flex]}>
        <CameraComponent
          onBarcode={barcode => {
            const data = barcode.content.data as UrlBookmark;
            const _bikeId = bike.parseQrCodeUrl(data.url);
            setBikeId(_bikeId);
          }}
        />
        <Image
          style={[layoutStyle.flex, layoutStyle.w100]}
          source={images.scan_layer}
        />
        <FAB
          onPress={() => navigator.pop()}
          color={themeStyle.accentPrimary.toString()}
          icon="close"
          style={[componentStyle.mapFab, styles.close]}
        />
        <FAB
          onPress={() => navigator.pop()}
          color={themeStyle.accentPrimary.toString()}
          icon="help"
          style={[componentStyle.mapFab, styles.idea]}
        />
        <MyText
          style={styles.text}
          _title
          _style_bold
          keyText={'scan-qr-code'}
        />
        <View style={styles.tagContainer}>
          <FlatList
            style={[layoutStyle.mb12, layoutStyle.mh12p]}
            horizontal
            data={scans}
            renderItem={BikeIdScan}
          />
          <View style={styles.checkbox}>
            <Checkbox.Item
              mode="android"
              position="leading"
              uncheckedColor={themeStyle.textColor}
              color={themeStyle.accentPrimary}
              labelStyle={{...textstyle._body, color: themeStyle.textColor}}
              label={i18n.t('scan-many-bikes')}
              status={scanMany ? 'checked' : 'unchecked'}
              onPress={() => {
                setBikeId(null);
                setScans([]);
                setScanMany(!scanMany);
              }}
            />
          </View>
          {scans?.length > 0 && (
            <Button
              style={layoutStyle.mt12}
              onPress={() => {
                navigator.navigate(BikesScreen.navigationName, {
                  bikeIds: scans,
                });
              }}
              color={themeStyle.textColor}
              mode="outlined">
              {i18n.t('validate')}
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

ScanScreen.navigationName = 'Scan';
ScanScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  close: {position: 'absolute', top: 12, right: 12},
  idea: {position: 'absolute', top: 12, left: 12},
  text: {position: 'absolute', top: '20%', alignSelf: 'center'},
  checkbox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
  },
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    bottom: '8%',
  },
  scan: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderColor: themeStyle.textColor,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 12,
  },
  reverse: {flexDirection: 'row-reverse'},
});

export {ScanScreen};
