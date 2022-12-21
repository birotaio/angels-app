import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface AnyMap {
  [key: string]: any;
}
export interface StringMap {
  [key: string]: string;
}
export interface StringMapMap {
  [key: string]: StringMap;
}
export interface BooleanMap {
  [key: string]: boolean;
}
export interface StyleMap {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}
export interface PayloadData {
  data: StringMap;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
