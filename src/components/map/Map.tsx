// import MyView from '@components/generic/MyView';
import React, {LegacyRef} from 'react';
import {Platform, View} from 'react-native';
import MapboxGL, {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {forwardRef} from 'react';
import layoutStyle from '@style/layoutStyle';
import MapStationLayer from './MapStationLayer';
import themeStyle from '@style/themeStyle';
import {StationStatusInformation} from '@utils/api/gbfsTypes';
import {useSelector} from 'react-redux';
import {GbfsSelector} from '@logic/store/gbfs/selector';
import _ from 'lodash';
import {ViewStyle} from 'react-native-phone-input';
import {
  filters,
  filterStationActiveExpression,
  FilterType,
  stationSelectedIconImageExpression,
  stationSmallIconImageExpression,
} from './MapExpressions';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVuYmlyb3RhIiwiYSI6ImNsYndianF0NjFybTEzbnFkaDQ1NnJ4aDMifQ.0IAZFc4DU8_wWH_YaMqE2g',
);
const MAP_CENTER = {
  montelimar: [4.733812, 44.422285],
  villeurbanne: [4.88981, 45.77202],
  vancouver: [-123.1241, 49.25734],
};
const VIEW_PORT = {
  villeurbanne: [4.82935, 45.79865, 4.90282, 45.762],
  vancouver: [-123.27106, 49.31729, -122.97718, 49.19719],
};
const VIEWPORT = VIEW_PORT.vancouver;
const MAPCENTER = MAP_CENTER.vancouver;
export const BOUNDS: {ne: [number, number]; sw: [number, number]} = {
  ne: [VIEWPORT[2], VIEWPORT[1]], // Northeast coordinates
  sw: [VIEWPORT[0], VIEWPORT[3]], // Southwest coordinates
};

const Map = forwardRef(
  (
    {
      filter,
      stationActiveInformation,
      ...props
    }: {
      filter: string;
      onPress: () => void;
      onMarkerPress: (s: StationStatusInformation) => void;
      onMapStartMove: () => void;
      onMapEndMove: () => void;
      showUserLocation: boolean;
      scrollEnabled: boolean;
      children: React.ReactNode;
      stationActiveInformation: StationStatusInformation | null;
      style?: ViewStyle;
    },
    ref: LegacyRef<MapboxGL.Camera>,
  ) => {
    const stations = useSelector(GbfsSelector.getStations);

    const indexStationActive = stationActiveInformation
      ? stations.findIndex(
          _s =>
            _s.properties.station_id === stationActiveInformation.station_id,
        )
      : -1;
    const stationActive =
      indexStationActive !== -1 && stations[indexStationActive];
    const onRegionWillChange = _.debounce(props.onMapStartMove, 350, {
      leading: true,
      trailing: false,
    });
    const onRegionDidChange = _.debounce(props.onMapEndMove, 350, {
      leading: true,
      trailing: false,
    });
    const currentFilter: FilterType = filters[filter];
    return (
      <View style={props.style}>
        <MapboxGL.MapView
          logoEnabled={false}
          onPress={props.onPress}
          rotateEnabled={true}
          pitchEnabled={false}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL="mapbox://styles/benbirota/cl38t82pm003r14ocyfli7kbz"
          style={layoutStyle.flex}
          compassEnabled={true}
          compassViewPosition={0}
          regionDidChangeDebounceTime={200}
          onRegionWillChange={onRegionWillChange}
          onRegionDidChange={onRegionDidChange}
          scrollEnabled={props.scrollEnabled}>
          <MapboxGL.Camera
            ref={ref}
            zoomLevel={12.5}
            animationMode={'easeTo'}
            animationDuration={150}
            centerCoordinate={MAPCENTER}
            maxZoomLevel={22}
            minZoomLevel={10}
            maxBounds={BOUNDS}
          />
          {props.showUserLocation && <MapboxGL.UserLocation />}
          <MapStationLayer
            id="Zoom+13"
            stations={stations}
            maxZoomLevel={13}
            onMarkerPress={props?.onMarkerPress}
            style={{
              textColor: themeStyle.bg0.toString(),
              iconImage: stationSmallIconImageExpression,
            }}
          />
          <MapStationLayer
            id="Zoom-13"
            stations={stations}
            filter={
              stationActive
                ? filterStationActiveExpression(stationActive)
                : undefined
            }
            minZoomLevel={13}
            onMarkerPress={props?.onMarkerPress}
            style={{
              textField: currentFilter.textField,
              iconImage: currentFilter.iconImage,
              ...styles.symbolLayer,
            }}
          />
          {!!stationActive && (
            <MapboxGL.ShapeSource
              id="stationActiveShapeSource"
              cluster={false}
              shape={{
                type: 'FeatureCollection',
                features: [stationActive],
              }}
              hitbox={{width: 20, height: 20}}>
              <MapboxGL.SymbolLayer
                id="stationActiveSymbolLayer"
                minZoomLevel={13}
                style={{
                  ...styles.symbolLayer,
                  ...styles.selected,
                  textField: currentFilter.textField,
                  iconImage: stationSelectedIconImageExpression(filter),
                }}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
        {props.children}
      </View>
    );
  },
);

const styles: {[key: string]: SymbolLayerStyle} = {
  symbolLayer: {
    textColor: themeStyle.bg0.toString(),
    textSize: 18,
    textFont: ['DIN Pro Medium'],
  },
  selected: {
    iconAnchor: 'bottom',
    textOffset: [0, -2],
  },
};

export default Map;
