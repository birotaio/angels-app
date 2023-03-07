import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {Text, View} from 'react-native';

import {SwipeablePanel} from 'rn-swipeable-panel';
import StationList from './StationList';

const StationPanel = ({
  station,
  onClose,
}: {
  station: any;
  onClose: () => void;
}) => {
  //   const [_station, _setStation] = useState<StationStatus>();

  const isActive = station !== null;

  return (
    <SwipeablePanel
      fullWidth={true}
      openLarge={false}
      allowTouchOutside
      noBackgroundOpacity
      smallPanelHeight={layoutStyle.dim.height * 0.6}
      showCloseButton={false}
      barChildren={() => (
        <View
          style={[
            layoutStyle.p5,
            layoutStyle.w100,
            {backgroundColor: 'green'},
          ]}>
          <Text>Station Header</Text>
        </View>
      )}
      closeOnTouchOutside
      onClose={onClose}
      isActive={isActive}>
      <View style={[layoutStyle.p5, {backgroundColor: 'red'}]}>
        <StationList />
      </View>
    </SwipeablePanel>
  );
};

export default StationPanel;
