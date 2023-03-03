import {PixelRatio, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import {Dimensions} from 'react-native';
import textstyle from './textStyle';
import themeStyle from './themeStyle';

const {width, height} = Dimensions.get('window');

// ...

const {StatusBarManager} = NativeModules;
const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
export const getSize = (pixels: number) => {
  return ((4 - PixelRatio.get()) * pixels) / 2;
};
export default StyleSheet.create({
  dim: {
    width,
    height,
    statusBarHeight: STATUS_BAR_HEIGHT,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenterJustifyStart: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  opacity40: {
    opacity: 0.4,
  },
  layerWithOpacity: {
    backgroundColor: '#000000D0',
  },
  // bullet: {fontSize: 40, letterSpacing: -8, marginBottom: 6, marginLeft: -6},
  h5: {
    height: '5%',
  },
  h10: {
    height: '10%',
  },
  h15: {
    height: '15%',
  },
  h20: {
    height: '20%',
  },
  h100: {
    height: '100%',
  },
  p2: {
    padding: '2%',
  },
  p5: {
    padding: '5%',
  },
  p8: {
    padding: '8%',
  },
  h32p: {
    height: 32,
  },
  p12: {
    padding: 12,
  },
  p24: {
    padding: 24,
  },
  pr24: {
    paddingRight: 24,
  },
  ph5: {
    paddingHorizontal: '5%',
  },
  ph40: {
    paddingHorizontal: 40,
  },
  ph10: {
    paddingHorizontal: '10%',
  },
  ph10p: {
    paddingHorizontal: 10,
  },
  pv5: {
    paddingVertical: '5%',
  },
  pv2: {
    paddingVertical: '2%',
  },
  pv4p: {
    paddingVertical: 4,
  },
  p10p: {
    padding: 10,
  },
  pb5: {
    paddingBottom: '5%',
  },
  pt5: {
    paddingTop: '5%',
  },
  mv5: {
    marginVertical: '5%',
  },
  mv10: {
    marginVertical: '10%',
  },
  mb5: {
    marginBottom: '5%',
  },
  mb4p: {
    marginBottom: 4,
  },
  mb10: {
    marginBottom: '10%',
  },
  mt5: {
    marginTop: '5%',
  },
  mt10: {
    marginTop: '10%',
  },
  mr5: {
    marginRight: '5%',
  },
  ml5: {
    marginLeft: '5%',
  },
  ml24: {
    marginLeft: 24,
  },
  ml2p: {
    marginLeft: 2,
  },
  ml6p: {
    marginLeft: 6,
  },
  mr4p: {
    marginRight: 4,
  },
  mh4p: {marginHorizontal: 4},
  mh12p: {
    marginHorizontal: 12,
  },
  mh5: {
    marginHorizontal: '5%',
  },
  mt6p: {
    marginTop: 6,
  },
  mt8p: {
    marginTop: 8,
  },
  mt14p: {
    marginTop: 14,
  },
  mt16p: {
    marginTop: 16,
  },
  w100: {
    width: '100%',
  },
  asc: {
    alignSelf: 'center',
  },
  ass: {
    alignSelf: 'flex-start',
  },
  ase: {
    alignSelf: 'flex-end',
  },
  ais: {
    alignItems: 'flex-start',
  },
  aie: {
    alignItems: 'flex-end',
  },
  aic: {
    alignItems: 'center',
  },
  jsb: {
    justifyContent: 'space-between',
  },
  jsa: {
    justifyContent: 'space-around',
  },
  jcc: {
    justifyContent: 'center',
  },
  jce: {
    justifyContent: 'flex-end',
  },
  bw1: {
    borderWidth: 1,
  },
  border12: {
    borderWidth: 1,
    borderColor: themeStyle.background,
    borderRadius: 12,
  },
  opacity0: {
    opacity: 0,
  },
  bgTransparent: {
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  noBorder: {
    borderWidth: 0,
  },
  borderShadow: {
    borderBottomWidth: 1,
    borderBottomColor: themeStyle.background,
  },
  absPos: {position: 'absolute'},
  absFill: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
  absTop: {position: 'absolute', top: 0, left: 0, right: 0},
  absBot: {position: 'absolute', bottom: 0, left: 0, right: 0},
  abs: {position: 'absolute', top: 0, left: 0},
  absTopRight: {position: 'absolute', top: 0, right: 0},
  absTopLeft: {position: 'absolute', top: 0, left: 0},
  absTopCenter: {position: 'absolute', top: 0, alignSelf: 'center'},
  absBotLeft: {position: 'absolute', bottom: 0, left: 0},
  // Components
  headerContainer: {
    backgroundColor: themeStyle.background,
  },
  headerButtonContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
  },
  iconContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  inputContainer: {
    marginTop: 6,
    backgroundColor: themeStyle.background,
    paddingHorizontal: '0.5%',
    marginHorizontal: 0,
  },
  inputPhoneContainer: {
    marginVertical: 6,
    padding: 12,
    borderColor: themeStyle.background,
    borderWidth: 1,
  },
  codeFieldContainer: {
    marginVertical: '5%',
    marginHorizontal: 48,
  },
  codeFieldCell: {
    height: 48,
    width: 48,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: themeStyle.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  codeFieldCellFocused: {
    borderColor: themeStyle.accentPrimary,
  },
  floatingCard: {
    backgroundColor: themeStyle.background,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 68,
    marginTop: 8,
    // borderColor: themeStyle.bg3,
    // borderWidth: 2,
  },
  screenCard: {
    backgroundColor: 'red',
    borderRadius: 12,
    borderColor: 'red',
    borderWidth: 1,
  },
  screenCardVerticalSeparator: {
    backgroundColor: themeStyle.background,
    width: 2,
    height: '100%',
  },
  outlinedButton: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  squareButton: {
    height: 40,
    aspectRatio: 1,
    backgroundColor: themeStyle.accentPrimary,
  },
  stepHeader: {
    ...textstyle.header,
    ...textstyle.alignStart,
    marginBottom: 32,
  },
  stepBottomText: {
    ...textstyle.subInput,
    marginBottom: '10%',
    alignSelf: 'center',
    ...textstyle.center,
  },
  // Design System
  mt12: {
    marginTop: 12,
  },
  mt24: {
    marginTop: 24,
  },
  mt40: {
    marginTop: 40,
  },
  ml12: {
    marginLeft: 12,
  },
  mr16: {
    marginRight: 16,
  },
  mr24: {
    marginRight: 24,
  },
  mb16: {
    marginBottom: 16,
  },
  mb8: {
    marginBottom: 8,
  },
  mb24: {
    marginBottom: 24,
  },
  p40: {
    padding: 40,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv16: {
    paddingVertical: 16,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pv32: {
    paddingVertical: 32,
  },
  pv24: {
    paddingVertical: 24,
  },
  pt24: {
    paddingTop: 24,
  },
  pb12: {
    paddingBottom: 12,
  },
  mv8: {
    marginVertical: 8,
  },
  mv16: {
    marginVertical: 16,
  },
  mv24: {
    marginVertical: 24,
  },
  mh24: {
    marginHorizontal: 24,
  },
  mv32: {
    marginVertical: 32,
  },
  mb32: {
    marginBottom: 32,
  },
  mt32: {
    marginTop: 32,
  },
  mb12: {
    marginBottom: 12,
  },
});
