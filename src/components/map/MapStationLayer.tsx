import MapboxGL, {
  OnPressEvent,
  SymbolLayerProps,
} from '@react-native-mapbox-gl/maps';
import {Station, StationStatusInformation} from '@utils/api/gbfsTypes';
import React from 'react';

const MapStationLayer = ({
  onMarkerPress,
  stations,
  ...props
}: SymbolLayerProps & {
  onMarkerPress: (s: StationStatusInformation) => void;
  style: object;
  stations: Station[];
}) => {
  const _onMarkerPress = ({features}: OnPressEvent) => {
    const pressId = features?.[0]?.properties?.station_id;
    if (pressId) {
      let station_selected = stations.filter(
        _s => _s.properties.station_id === pressId,
      )?.[0];
      onMarkerPress?.(station_selected?.properties);
    }
  };

  return (
    <MapboxGL.ShapeSource
      id="stationInformation"
      cluster={false}
      shape={{
        type: 'FeatureCollection',
        // features: hasStationActive ? [stations[indexStationActive]] : stations,
        features: stations,
      }}
      hitbox={{width: 20, height: 20}}
      onPress={_onMarkerPress}>
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
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    textAllowOverlap: true,
    textIgnorePlacement: true,
  },
};

export default MapStationLayer;
