import {checkAndAskCameraPermission} from '@permissions/camera';
import themeStyle from '@style/themeStyle';
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {
  useScanBarcodes,
  BarcodeFormat,
  Barcode,
} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import layoutStyle from '@style/layoutStyle';
import _ from 'lodash';

type CameraComponentType = {
  onBarcode: (barcode: Barcode) => void;
  torch: boolean;
  isActive: boolean;
};
const DEBOUNCE_TIME = 1000;
const CameraComponent: React.FC<CameraComponentType> = ({
  onBarcode,
  torch,
  isActive,
}) => {
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    checkAndAskCameraPermission();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  const throttled = useRef(
    _.throttle(
      (_newBarCode: Barcode) => {
        onBarcode(_newBarCode);
      },
      DEBOUNCE_TIME,
      {leading: true, trailing: false},
    ),
  );

  useEffect(() => {
    if (barcodes?.length > 0) {
      throttled.current(barcodes?.[0]);
    }
  }, [barcodes]);

  return device ? (
    <View style={layoutStyle.absFill}>
      <Camera
        torch={torch ? 'on' : 'off'}
        style={layoutStyle.flex}
        frameProcessor={frameProcessor}
        frameProcessorFps={10}
        device={device}
        isActive={isActive}
      />
    </View>
  ) : (
    <ActivityIndicator
      style={layoutStyle.absFill}
      color={themeStyle.accentPrimary}
    />
  );
};

export {CameraComponent};
