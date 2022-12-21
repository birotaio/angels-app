import React, {LegacyRef} from 'react';
import {View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {forwardRef} from 'react';
import layoutStyle from '@style/layoutStyle';
import {StationStatusInformation} from '@utils/api/gbfsTypes';
import _ from 'lodash';
import {ViewStyle} from 'react-native-phone-input';
import constants from '@utils/constants';

MapboxGL.setAccessToken(constants.MAPBOX_PK);
const MAP_CENTER = {
  marseille: [5.4, 43.3],
};
const VIEW_PORT = {
  marseille: [4.82935, 45.79865, 4.90282, 45.762], // TODO ?
};
const VIEWPORT = VIEW_PORT.marseille;
const MAPCENTER = MAP_CENTER.marseille;
export const BOUNDS: {ne: [number, number]; sw: [number, number]} = {
  ne: [VIEWPORT[2], VIEWPORT[1]], // Northeast coordinates
  sw: [VIEWPORT[0], VIEWPORT[3]], // Southwest coordinates
};

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
      onMarkerPress?: (s: StationStatusInformation) => void;
      onMapStartMove?: () => void;
      onMapEndMove?: () => void;
      showUserLocation?: boolean;
      scrollEnabled?: boolean;
      children?: React.ReactNode;
      style?: ViewStyle;
    },
    ref: LegacyRef<MapboxGL.Camera>,
  ) => {
    // const onRegionWillChange =
    //   props.onMapStartMove &&
    //   _.debounce(props.onMapStartMove, 350, {
    //     leading: true,
    //     trailing: false,
    //   });
    // const onRegionDidChange =
    //   props.onMapEndMove &&
    //   _.debounce(props.onMapEndMove, 350, {
    //     leading: true,
    //     trailing: false,
    //   });

    return (
      <View style={props.style}>
        <MapboxGL.MapView
          logoEnabled={false}
          // onPress={props.onPress}
          rotateEnabled={true}
          pitchEnabled={false}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={constants.MAPBOX_STYLE_URL}
          style={layoutStyle.flex}
          compassEnabled={true}
          compassViewPosition={0}
          regionDidChangeDebounceTime={200}
          // onRegionWillChange={onRegionWillChange}
          // onRegionDidChange={onRegionDidChange}
          // scrollEnabled={props.scrollEnabled}
        >
          <MapboxGL.Camera
            ref={ref}
            zoomLevel={12.5}
            animationMode={'easeTo'}
            animationDuration={150}
            centerCoordinate={MAPCENTER}
            maxZoomLevel={22}
            minZoomLevel={10}
            // maxBounds={BOUNDS}
          />
          {/* {props.showUserLocation && <MapboxGL.UserLocation />} */}
        </MapboxGL.MapView>
        {props.children}
      </View>
    );
  },
);

// const styles: {[key: string]: SymbolLayerStyle} = {
//   symbolLayer: {
//     textColor: themeStyle.bg0.toString(),
//     textSize: 18,
//     textFont: ['DIN Pro Medium'],
//   },
//   selected: {
//     iconAnchor: 'bottom',
//     textOffset: [0, -2],
//   },
// };

export default Map;
