import {ColorValue} from 'react-native';

type ColorType = {
  BLACK: ColorValue;
  PRIMARY: ColorValue;
  SECONDARY: ColorValue;
  NEUTRAL_DARK_03: ColorValue;
  NEUTRAL_LIGHT_03: ColorValue;
  WHITE: ColorValue;
  DANGER_500: ColorValue;
};

const colors: ColorType = {
  BLACK: '#000000',
  PRIMARY: '#FF0062',
  SECONDARY: '#012433',
  NEUTRAL_DARK_03: '#546171',
  NEUTRAL_LIGHT_03: '#E5EBED',
  DANGER_500: '#E63E2A',
  WHITE: '#FFFFFF',
};

export default colors;
