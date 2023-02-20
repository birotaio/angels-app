import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {DrawerNavigationOptions} from '@react-navigation/drawer';

export type ScreenProps = {
  navigationName: string;
  navigationOptions?: DrawerNavigationOptions &
    NativeStackNavigationOptions & {backFn?: () => void};
};

export * from './SplashScreen';
export * from './LoginScreen';
export * from './MapScreen';
export * from './ScanScreen';
export * from './BikeScreen';
export * from './BikesScreen';
export * from './TestBleScreen';
