import useTracking from '@navigation/useTracking';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenProps} from '.';

import layoutStyle from '@style/layoutStyle';
import MyScreen from '@components/generic/MyScreen';
import MyText from '@components/generic/MyText';
import MyStatusBar from '@components/generic/MyStatusBar';
const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  useTracking(BikeScreen.navigationName);

  return (
    <MyScreen noPadding style={layoutStyle.flex}>
      <MyStatusBar />
      <View style={layoutStyle.p5}>
        <MyText
          _color_secondary
          _title
          style={styles.text}
          keyText={'bike-sheet'}>
          {' : ' + bikeId}
        </MyText>
      </View>
    </MyScreen>
  );
};

BikeScreen.navigationName = 'Bike';
BikeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  text: {},
});

export {BikeScreen};
