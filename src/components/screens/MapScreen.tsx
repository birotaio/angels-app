import Map from '@components/map/Map';
import {MapActions} from '@components/map/MapActions';
import {MAP_ACTIONS_SAGA_GET_STATIONS} from '@logic/store/map/saga';
import navigator from '@navigation/navigator';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ScreenProps} from '.';

import {ScanScreen} from '@components/screens';

const MapScreen: ScreenProps = () => {
  const dispatch = useDispatch();
  useTracking(MapScreen.navigationName);

  dispatch({type: MAP_ACTIONS_SAGA_GET_STATIONS});
  return (
    <Map style={layoutStyle.flex}>
      <MapActions
        onGeolocationPress={() => console.log('geolocation')}
        onMapSearchPress={() => console.log('mapSearch')}
        onScanQrCodePress={() => navigator.navigate(ScanScreen.navigationName)}
      />
    </Map>
  );
};

MapScreen.navigationName = 'Map';
MapScreen.navigationOptions = {headerShown: true};

export {MapScreen};
