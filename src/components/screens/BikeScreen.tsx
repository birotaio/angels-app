import useTracking from '@navigation/useTracking';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenProps} from '.';

import layoutStyle from '@style/layoutStyle';
import MyScreen from '@components/generic/MyScreen';
import MyText from '@components/generic/MyText';
const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  useTracking(BikeScreen.navigationName);

  return (
    <MyScreen style={layoutStyle.flex}>
      <MyText style={styles.text} text={`${bikeId}`} />
    </MyScreen>
  );
};

BikeScreen.navigationName = 'Bike';
BikeScreen.navigationOptions = {
  headerShown: true,
};

const styles = StyleSheet.create({
  text: {},
});

export {BikeScreen};
