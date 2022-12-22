import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type ScreenProps = {
  navigationName: string;
  navigationOptions?: NativeStackNavigationOptions & {backFn?: () => void};
};

export * from './SplashScreen';
export * from './LoginScreen';
export * from './MapScreen';
export * from './ScanScreen';
