import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {StatusBar, StatusBarProps, StyleSheet, View} from 'react-native';
import {NativeModules} from 'react-native';

// ...

const {StatusBarManager} = NativeModules;
const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;

const MyStatusBar: React.FC<StatusBarProps & {transparent?: boolean}> = ({
  transparent,
  ...props
}) => {
  return (
    <View>
      <View
        style={[styles.statusBar, transparent && layoutStyle.bgTransparent]}
      />
      {!transparent && (
        <StatusBar
          translucent={props.translucent || true}
          barStyle={props.barStyle || 'light-content'}
          backgroundColor={themeStyle.accentPrimary}
          {...props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: STATUS_BAR_HEIGHT,
    backgroundColor: themeStyle.accentPrimary,
  },
});
export default MyStatusBar;
