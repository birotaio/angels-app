import themeStyle from '@style/themeStyle';
import React from 'react';
import {StatusBar, StatusBarProps, StyleSheet, View} from 'react-native';
import {NativeModules} from 'react-native';

// ...

const {StatusBarManager} = NativeModules;

const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;

const MyStatusBar: React.FC<StatusBarProps> = () => {
  return (
    <View>
      <View style={styles.statusBar} />
      <View />
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={themeStyle.accentPrimaryDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: '100%',
    height: STATUS_BAR_HEIGHT,
    backgroundColor: themeStyle.accentPrimaryDark,
  },
});
export default MyStatusBar;
