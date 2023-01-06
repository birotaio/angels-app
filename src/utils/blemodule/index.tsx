import {NativeModules} from 'react-native';

const {BleModule} = NativeModules;
interface BleInterface {
  setUp(url: string, token: string, refreshToken: string): void;
}

export default BleModule as BleInterface;
