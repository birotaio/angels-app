import componentStyle from '@style/componentStyle';
import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';

export const MapActions = ({
  onScanQrCodePress,
  onGeolocationPress,
  onMapSearchPress,
}: {
  onScanQrCodePress: () => void;
  onGeolocationPress: () => void;
  onMapSearchPress: () => void;
}) => (
  <View style={layoutStyle.absFill} pointerEvents="box-none">
    <FAB
      pointerEvents="box-only"
      color={themeStyle.accentPrimary.toString()}
      icon="crosshairs-gps"
      style={[componentStyle.mapFab, styles.geoloc]}
      onPress={onGeolocationPress}
    />
    <FAB
      color={themeStyle.accentPrimary.toString()}
      icon="map-search-outline"
      style={[componentStyle.mapFab, styles.search]}
      onPress={onMapSearchPress}
    />
    <FAB
      color={themeStyle.accentPrimary.toString()}
      icon="qrcode-scan"
      style={[componentStyle.mapFab, styles.qrCode]}
      onPress={onScanQrCodePress}
    />
  </View>
);

const styles = StyleSheet.create({
  geoloc: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  search: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 72,
  },
  qrCode: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
