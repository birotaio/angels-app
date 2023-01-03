import Map from '@components/map/Map';
import {MapActions} from '@components/map/MapActions';
import {MAP_ACTIONS_SAGA_GET_STATIONS} from '@logic/store/map/saga';
import navigator from '@navigation/navigator';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {ScreenProps} from '.';

import {ScanScreen} from '@components/screens';
import geolocation from '@utils/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';

const MapScreen: ScreenProps = () => {
  const dispatch = useDispatch();
  useTracking(MapScreen.navigationName);
  dispatch({type: MAP_ACTIONS_SAGA_GET_STATIONS});

  const map = useRef<MapboxGL.Camera>();
  return (
    <Map ref={map} showUserLocation style={layoutStyle.flex}>
      <MapActions
        onGeolocationPress={async () =>
          await geolocation.getCurrentPosition(position => {
            if (position?.coords?.longitude) {
              map.current?.flyTo([
                position.coords.longitude,
                position.coords.latitude,
              ]);
            }
          })
        }
        onMapSearchPress={() => console.log('mapSearch')}
        onScanQrCodePress={() => navigator.navigate(ScanScreen.navigationName)}
      />
    </Map>
  );
};

MapScreen.navigationName = 'Map';
MapScreen.navigationOptions = {headerShown: true};

export {MapScreen};
