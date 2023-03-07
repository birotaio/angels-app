import React, {useCallback, useImperativeHandle, useRef} from 'react';
import {View} from 'react-native';
import MapboxGL, {OnPressEvent} from '@react-native-mapbox-gl/maps';
import {forwardRef} from 'react';
import layoutStyle from '@style/layoutStyle';
import {ViewStyle} from 'react-native-phone-input';
import constants from '@utils/constants';
import MapStationLayer from './MapStationLayer';
import {useSelector} from 'react-redux';
import {MapSelector} from '@logic/store/map/selector';
import {Position} from 'geojson';
import _ from 'lodash';

MapboxGL.setAccessToken(constants.MAPBOX_PK);
const MAP_CENTER = {
  marseille: [5.4, 43.3],
  paris: [2.33333, 48.866669],
};
// const VIEW_PORT = {
//    marseille: [4.82935, 45.79865, 4.90282, 45.762],
// };
// const VIEWPORT = VIEW_PORT.marseille;
const MAPCENTER = MAP_CENTER.paris;
// export const BOUNDS: {ne: [number, number]; sw: [number, number]} = {
//   ne: [VIEWPORT[2], VIEWPORT[1]], // Northeast coordinates
//   sw: [VIEWPORT[0], VIEWPORT[3]], // Southwest coordinates
// };

/*
 * Display map screen using mapbox
 */

const Map = forwardRef(
  (
    {
      ...props
    }: {
      filter?: string;
      stationActiveId?: number;
      onPress?: () => void;
      onMarkerPress?: (s: any) => void;
      onMapStartMove?: () => void;
      onMapEndMove?: () => void;
      showUserLocation?: boolean;
      scrollEnabled?: boolean;
      children?: React.ReactNode;
      style?: ViewStyle;
    },
    ref,
  ) => {
    const cameraRef = useRef<MapboxGL.Camera>();
    const stations = useSelector(MapSelector.getStations);
    const onRegionWillChange =
      props.onMapStartMove &&
      _.debounce(props.onMapStartMove, 350, {
        leading: true,
        trailing: false,
      });
    const onRegionDidChange =
      props.onMapEndMove &&
      _.debounce(props.onMapEndMove, 350, {
        leading: true,
        trailing: false,
      });

    useImperativeHandle(ref, () => ({
      flyTo(coordinates: Position, duration?: number) {
        cameraRef.current?.flyTo(coordinates, duration);
      },
    }));

    const _onMarkerPress = useCallback(
      ({features, coordinates}: OnPressEvent) => {
        // Move to selected location
        cameraRef?.current?.setCamera({
          centerCoordinate: [coordinates.longitude, coordinates.latitude],
          padding: {paddingBottom: layoutStyle.dim.height * 0.5},
          animationDuration: 250,
          animationMode: 'easeTo',
        });

        // Search infos about our marker selected
        const pressId = features?.[0]?.properties?.id;
        if (pressId) {
          let stationSelected = stations.features.filter(
            _s => _s.properties.id === pressId,
          )?.[0];
          props.onMarkerPress?.(stationSelected);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [stations.features],
    );

    return (
      <View style={props.style}>
        <MapboxGL.MapView
          logoEnabled={false}
          rotateEnabled={true}
          pitchEnabled={false}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={constants.MAPBOX_STYLE_URL}
          style={layoutStyle.flex}
          compassEnabled={true}
          compassViewPosition={0}
          regionDidChangeDebounceTime={200}
          onRegionWillChange={onRegionWillChange}
          onRegionDidChange={onRegionDidChange}
          scrollEnabled={props.scrollEnabled}>
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={10}
            animationMode={'flyTo'}
            animationDuration={200}
            centerCoordinate={MAPCENTER}
            maxZoomLevel={22}
            minZoomLevel={10}
            // maxBounds={BOUNDS}
          />
          {stations.features?.length ? (
            <MapStationLayer
              id="MainStationLayer"
              stations={stations}
              // maxZoomLevel={13}
              onMarkerPress={_onMarkerPress}
            />
          ) : null}
          {props.showUserLocation && <MapboxGL.UserLocation />}
        </MapboxGL.MapView>
        {props.children}
      </View>
    );
  },
);

export default Map;
