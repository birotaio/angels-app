import Map from '@components/map/Map';
import {MapActions} from '@components/map/MapActions';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {ScreenProps} from '.';

const MapScreen: ScreenProps = () => {
  useTracking(MapScreen.navigationName);

  return (
    <Map style={layoutStyle.flex}>
      <MapActions
        onGeolocationPress={() => console.log('geolocation')}
        onMapSearchPress={() => console.log('mapSearch')}
        onScanQrCodePress={() => console.log('toScanPage')}
      />
    </Map>
  );
};

MapScreen.navigationName = 'Map';
MapScreen.navigationOptions = {headerShown: true};

export {MapScreen};
