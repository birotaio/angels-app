import useTracking from '@navigation/useTracking';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenProps} from '.';

import layoutStyle from '@style/layoutStyle';
import MyScreen from '@components/generic/MyScreen';
import MyText from '@components/generic/MyText';
const BikesScreen: ScreenProps = ({
  route: {
    params: {bikeIds},
  },
}: {
  route: {params: {bikeIds: number[]}};
}) => {
  useTracking(BikesScreen.navigationName);

  return (
    <MyScreen style={layoutStyle.flex}>
      <MyText style={styles.text} text={`Vélos ${bikeIds}`} />
    </MyScreen>
  );
};

BikesScreen.navigationName = 'Bikes';
BikesScreen.navigationOptions = {
  headerShown: true,
};

const styles = StyleSheet.create({
  text: {},
});

export {BikesScreen};
