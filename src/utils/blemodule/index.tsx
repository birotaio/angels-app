import {NativeModules} from 'react-native';

const {BleModule} = NativeModules;

const setUp = (url: string, token: string, refreshToken: string) => {
  BleModule.setUp(url, token, refreshToken);
};

export default {setUp};
