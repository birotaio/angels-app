import navigator from '@navigation/navigator';
import useTracking from '@navigation/useTracking';
import themeStyle from '@style/themeStyle';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import {ScreenProps} from '.';
import {CameraComponent} from '@components/camera/CameraComponent';
import MyText from '@components/generic/MyText';

import images from '@assets/images';
import textstyle from '@style/textStyle';
import layoutStyle from '@style/layoutStyle';
import MyStatusBar from '@components/generic/MyStatusBar';
import {UrlBookmark} from 'vision-camera-code-scanner';
import bike from '@utils/fifteen/bike';
import {BikeScreen, BikesScreen} from '.';
import _ from 'lodash';
import MyButton from '@components/generic/MyButton';
import MyIcon from '@components/generic/MyIcon';
import Carousel from 'react-native-snap-carousel';
import {ScanManualInput} from '@components/camera/ScanManualInput';
import {useBackButton} from '@utils/hooks/useBack';
import colors from '@style/colors';

const CarouselItem = ({item}: {item: string}) => (
  <MyText key={item} _subtitle style={textstyle.center} keyTextString={item} />
);

const ScanScreen: ScreenProps = ({
  route: {params},
}: {
  route: {params: {manualOnly: boolean}};
}) => {
  const [bikeId, setBikeId] = useState<number | null>(null);
  const [scans, setScans] = useState<number[]>([]);
  const [scanMany] = useState(false);
  const [scanFlash, setScanFlash] = useState(false);
  const [activeMode, setActiveMode] = useState(0);
  const carrousel = useRef<Carousel<string>>(null);

  useTracking(ScanScreen.navigationName);

  useBackButton(() => {
    if (activeMode === 1) {
      carrousel.current?.snapToItem(0);
    } else {
      navigator.pop();
    }
    return true;
  });

  useEffect(() => {
    if (bikeId) {
      if (!scanMany) {
        setScanFlash(false);
        setTimeout(() => {
          setBikeId(null);
          navigator.pop();
          navigator.navigate(BikeScreen.navigationName, {bikeId});
        }, 100);
      } else {
        if (!scans.includes(bikeId)) {
          setBikeId(null);
          const _scans = [...scans];
          _scans.push(bikeId);
          setScans(_scans);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeId, scanMany]);

  const removeScan = (item: number) => {
    const _scans = [...scans];
    _.remove(_scans, el => item === el);
    setScans(_scans);
  };

  const BikeIdScan = ({item}: {item: number}) => (
    <Button
      style={styles.scan}
      onPress={() => removeScan(item)}
      contentStyle={styles.reverse}
      icon="close"
      color={themeStyle.textColor}
      mode="outlined">
      {`${item}`}
    </Button>
  );

  const showManyValidate = scans?.length > 0;
  const showManualOnly = params?.manualOnly || activeMode === 1;
  return (
    <View style={[layoutStyle.flex, layoutStyle.w100]}>
      <MyStatusBar />
      <View style={[layoutStyle.flex, layoutStyle.w100]}>
        <CameraComponent
          isActive={!showManualOnly}
          torch={scanFlash}
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

        <View style={[layoutStyle.absFill, layoutStyle.aic, layoutStyle.p24]}>
          <FAB
            onPress={() => navigator.pop()}
            color={themeStyle.textColorInput.toString()}
            icon="close"
            style={styles.close}
          />
          <MyText
            _title
            _style_bold
            style={[textstyle.f30, layoutStyle.mv32]}
            keyText={'scan-qr-code'}
          />

          <FlatList
            style={[layoutStyle.mh12p, layoutStyle.flexWrap]}
            horizontal
            data={scans}
            renderItem={BikeIdScan}
          />

          <View style={layoutStyle.flex} />
          <View style={[layoutStyle.rowCenter, layoutStyle.mb12]}>
            {[
              // {
              //   icon: 'Multi',
              //   keyText: 'scan-multi',
              //   onPress: () => {
              //     setBikeId(null);
              //     setScans([]);
              //     setScanMany(!scanMany);
              //   },
              //   selected: scanMany,
              // },
              {
                icon: 'Flash',
                keyText: 'scan-flash',
                onPress: () => {
                  setScanFlash(!scanFlash);
                },
                selected: scanFlash,
              },
            ].map(button => (
              <TouchableOpacity
                key={button.icon}
                style={[
                  styles.selector,
                  button.selected && styles.selectorSelected,
                ]}
                onPress={button.onPress}>
                <View style={layoutStyle.aic}>
                  <MyIcon size={24} icon={button.icon} color={colors.BLACK} />
                  <MyText
                    color={themeStyle.textColorInput}
                    keyTextString={button.keyText}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {showManyValidate && (
            <View
              style={[
                layoutStyle.w100,
                layoutStyle.ph5,
                layoutStyle.mt24,
                layoutStyle.mb16,
                !showManyValidate && layoutStyle.opacity0,
              ]}>
              <MyButton
                disabled={!showManyValidate}
                onPress={() => {
                  setScanFlash(false);
                  setTimeout(() => {
                    navigator.pop();
                    navigator.navigate(BikesScreen.navigationName, {
                      bikeIds: scans,
                    });
                  }, 100);
                }}
                expand
                keyText="validate"
                color={themeStyle.textColor}
              />
            </View>
          )}
          <Carousel
            ref={carrousel}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            containerCustomStyle={styles.carousel}
            data={['scan-auto', 'scan-manuel']}
            onSnapToItem={slideIndex => {
              setActiveMode(slideIndex);
            }}
            renderItem={CarouselItem}
            sliderWidth={200}
            itemWidth={100}
          />
        </View>
      </View>
      {(params?.manualOnly || activeMode === 1) && (
        <ScanManualInput
          manualOnly={showManualOnly}
          onClose={() => {
            carrousel?.current?.snapToItem(0);
          }}
          onBikeId={_bikeId => {
            carrousel?.current?.snapToItem(0);
            setBikeId(_bikeId);
          }}
        />
      )}
    </View>
  );
};

ScanScreen.navigationName = 'Scan';
ScanScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  carousel: {
    maxHeight: 36,
  },
  close: {
    // margin: 12,
    alignSelf: 'flex-end',
    color: themeStyle.textColorInput,
    borderRadius: 16,
    backgroundColor: themeStyle.accentPrimaryLight,
  },
  idea: {position: 'absolute', top: 12, left: 12},
  // text: {position: 'absolute', top: '20%', alignSelf: 'center'},
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    bottom: '8%',
  },
  scan: {
    ...layoutStyle.mr4p,
    borderColor: themeStyle.textColor,
    borderWidth: 2,
  },
  reverse: {flexDirection: 'row-reverse'},
  selector: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: themeStyle.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  selectorSelected: {
    borderColor: themeStyle.accentPrimary,
    borderWidth: 2,
  },
});

export {ScanScreen};
