import {NativeEventEmitter, NativeModules} from 'react-native';

const {BleModule} = NativeModules;

export const BLE_MODULE_EVENT_SUCCESS = 12012; // Trigger when a success happen
export const BLE_MODULE_UNLOCK_TIMEOUT = 1000;
interface BleInterface {
  setUp(url: string, token: string, refreshToken: string): void;
  connect(bikeId: number): Promise<number>;
  disconnect(): void;
  lockBike(): Promise<number>;
  unlockBike(lockTimeout: number): Promise<number>;
  unlockBattery(): Promise<number>;
  getBikeData(): any;
  addEventListener(): void;
  removeEventListener(): Promise<number>;
}

export const bikeDataListener = new NativeEventEmitter(BleModule);

export default BleModule as BleInterface;
