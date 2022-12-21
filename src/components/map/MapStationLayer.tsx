import images from '@assets/images';
import {StationFeatureCollection} from '@logic/store/map/types';
import MapboxGL, {SymbolLayerProps} from '@react-native-mapbox-gl/maps';
import React from 'react';

const MapStationLayer = ({
  stations,
  ...props
}: SymbolLayerProps & {
  style?: object;
  stations: StationFeatureCollection;
}) => {
  // const _onMarkerPress = ({features}: OnPressEvent) => {
  //   const pressId = features?.[0]?.properties?.station_id;
  //   if (pressId) {
  //     let station_selected = stations.filter(
  //       _s => _s.properties.station_id === pressId,
  //     )?.[0];
  //     onMarkerPress?.(station_selected?.properties);
  //   }
  // };

  return (
    <MapboxGL.ShapeSource
      id="stationInformation"
      cluster={false}
      shape={stations}
      hitbox={{width: 20, height: 20}}
      // onPress={_onMarkerPress}
    >
      <MapboxGL.SymbolLayer
        {...props}
        style={{
          ...styles.symbolLayer,
          ...props.style,
        }}
      />
    </MapboxGL.ShapeSource>
  );
};

const styles = {
  symbolLayer: {
    iconImage: images.location,
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    textAllowOverlap: true,
    textIgnorePlacement: true,
  },
};

export default MapStationLayer;
