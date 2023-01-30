import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';

var LocationEnabler =
  Platform.OS === 'android'
    ? require('react-native-location-enabler').default
    : null;
var LocationConfig =
  Platform.OS === 'android'
    ? {
        priority: LocationEnabler.PRIORITIES.HIGH_ACCURACY,
        alwaysShow: true,
        needBle: true,
      }
    : null;

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
        return await enableBluetoothScanWithLocation();
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

const enableBluetoothScanWithLocation: () => Promise<boolean> = async () => {
  console.log('enableBluetoothScan');
  try {
    await BleManager.start();
    if (Platform.OS === 'android') {
      await BleManager.enableBluetooth();
    }
  } catch (error) {
    console.log('enableBluetoothScan', error);
    return false;
  }
  if (Platform.OS === 'android') {
    LocationEnabler.requestResolutionSettings(LocationConfig);
    const locationOk = await checkLocation();
    return locationOk;
  }
  return true;
};

const checkLocation: () => Promise<boolean> = () =>
  new Promise(resolve => {
    console.log('checkLocation');
    const listener = LocationEnabler.addListener(
      ({locationEnabled}: {locationEnabled: boolean}) => {
        console.log('location is enabled: ', locationEnabled);
        resolve(locationEnabled);
        listener.remove();
      },
    );
    LocationEnabler.checkSettings(LocationConfig);
  });

export {checkAndAskBluetoothPermission};
