import navigator from '@navigation/navigator';
import useTracking from '@navigation/useTracking';
import {checkAndAskCameraPermission} from '@permissions/camera';
import componentStyle from '@style/componentStyle';
import themeStyle from '@style/themeStyle';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {ScreenProps} from '.';
import layoutStyle from '@style/layoutStyle';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScanScreen: ScreenProps = () => {
  useTracking(ScanScreen.navigationName);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    checkAndAskCameraPermission();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const showQrCode = (message: string) =>
    showMessage({
      message,
      autoHide: true,
      duration: 5000,
      position: 'bottom',
      type: 'success',
    });

  useEffect(() => {
    if (barcodes?.length > 0) {
      showQrCode(JSON.stringify(barcodes?.[0].content.data));
    }
  }, [barcodes]);

  return (
    <SafeAreaView style={layoutStyle.flexCenter}>
      {device ? (
        <Camera
          style={layoutStyle.absFill}
          frameProcessor={frameProcessor}
          frameProcessorFps={0.5}
          device={device}
          isActive={true}
        />
      ) : (
        <ActivityIndicator
          style={layoutStyle.asc}
          color={themeStyle.accentPrimary}
        />
      )}
      <FAB
        onPress={() => navigator.pop()}
        color={themeStyle.accentPrimary.toString()}
        icon="close"
        style={[componentStyle.mapFab, styles.close]}
      />
    </SafeAreaView>
  );
};

ScanScreen.navigationName = 'Screen';
ScanScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  close: {position: 'absolute', top: 48, right: 12},
});

export {ScanScreen};
