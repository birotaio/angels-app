import images from '@assets/images';
import {StationFeatureCollection} from '@logic/store/map/types';
import MapboxGL, {
  OnPressEvent,
  SymbolLayerProps,
} from '@react-native-mapbox-gl/maps';
import React from 'react';

const MapStationLayer = ({
  stations,
  ...props
}: SymbolLayerProps & {
  style?: object;
  stations: StationFeatureCollection;
  onMarkerPress: (event: OnPressEvent) => void;
}) => {
  return (
    <MapboxGL.ShapeSource
      id="stationInformation"
      cluster={false}
      shape={stations}
      hitbox={{width: 20, height: 20}}
      onPress={props?.onMarkerPress}>
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
