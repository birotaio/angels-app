import images from '@assets/images';
import {StationFeatureCollection} from '@logic/store/map/types';
import MapboxGL, {
  OnPressEvent,
  SymbolLayerProps,
} from '@react-native-mapbox-gl/maps';
import _ from 'lodash';
import React from 'react';

const generateNumbers = () => {
  const numberToString = (n: number) => {
    if (n < 10) {
      return `  ${n}`;
    } else if (n < 100) {
      return ` ${n}`;
    } else {
      return `${n}`;
    }
  };
  return `${numberToString(_.random(0, 999))}       ${numberToString(
    _.random(0, 999),
  )}`;
};

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
          iconImage: images.marker,
          iconAnchor: 'bottom-left',
          textField: generateNumbers(),
          textSize: 14,
          textOffset: [6.8, -2.6],
        }}
      />
    </MapboxGL.ShapeSource>
  );
};

const styles = {
  symbolLayer: {
    iconImage: images.location,
    iconAllowOverlap: false,
    iconIgnorePlacement: false,
    textAllowOverlap: true,
    textIgnorePlacement: true,
  },
};

export default MapStationLayer;
