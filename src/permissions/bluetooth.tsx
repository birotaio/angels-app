import {Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
var LocationEnabler =
  Platform.OS === 'android' ? require('react-native-location-enabler') : null;
import BleManager from 'react-native-ble-manager';

const checkAndAskBluetoothPermission = async (
  enableBluetooth: boolean,
): Promise<boolean> => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  try {
    const status = await check(permission);
    if (status === RESULTS.GRANTED) {
      if (enableBluetooth) {
        await enableBluetoothScanWithLocation();
      }
      return true;
    } else {
      const result = await request(permission);
      const resultOk = result === RESULTS.GRANTED;
      if (enableBluetooth && resultOk) {
        await enableBluetoothScanWithLocation();
      }
      return resultOk;
    }
  } catch (error) {
    console.log('checkAndAskBluetoothPermission', error);
    return false;
  }
};

const enableBluetoothScanWithLocation = async () => {
  console.log('enableBluetoothScan');
  try {
    await BleManager.start();
    await BleManager.enableBluetooth();
  } catch (error) {
    console.log('enableBluetoothScan', error);
    await Linking.openSettings();
  }
  if (Platform.OS === 'android') {
    LocationEnabler.requestResolutionSettings({
      priority: LocationEnabler.PRIORITIES.HIGH_ACCURACY,
      alwaysShow: true,
      needBle: true,
    });
  }
};

export {checkAndAskBluetoothPermission};
