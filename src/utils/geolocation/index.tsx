import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
// TODO localize
const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission is denied', '', [
      {text: 'Go to Settings', onPress: openSetting},
      {text: "Don't Use Location", onPress: () => {}},
    ]);
  }

  if (status === 'disabled') {
    Alert.alert(
      'Turn on Location Services to allow Mobi to determine your location.',
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasPermissionAndroid = async () => {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }
};

const getCurrentPosition = async (
  successCallback: (position: GeoPosition) => void,
) => {
  const hasLocationPermission = await (Platform.OS === 'ios'
    ? hasPermissionIOS()
    : hasPermissionAndroid());
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      successCallback,
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
};
const trackCurrentPosition = Geolocation.watchPosition;

const showGmapsPosition = (lat: string | number, lng: string | number) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
  Linking.canOpenURL(url)
    .then(() => {
      Linking.openURL(url);
    })
    .catch(e => console.log(e));
};
const showGmapsPath = (lat: string | number, lng: string | number) => {
  getCurrentPosition(userLocation => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.coords.latitude}%2C${userLocation.coords.longitude}&destination=${lat}%2C${lng}`;
    Linking.canOpenURL(url)
      .then(() => {
        Linking.openURL(url);
      })
      .catch(e => console.log(e));
  });
};

export default {
  getCurrentPosition,
  trackCurrentPosition,
  showGmapsPosition,
  showGmapsPath,
};
