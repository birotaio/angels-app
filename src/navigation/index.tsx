// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../components/generic/navigation/Header';
import * as screens from '../components/screens';
import {SplashScreen} from '../components/screens';

const Stack = createNativeStackNavigator();
const screenKeys = Object.keys(screens) as (
  | 'SplashScreen'
  | 'LoginScreen'
  | 'MapScreen'
  | 'ScanScreen'
  | 'BikeScreen'
  | 'BikesScreen'
  | 'TestBleScreen'
)[];

function MainRouter() {
  return (
    <Stack.Navigator
      initialRouteName={SplashScreen.navigationName}
      screenOptions={{
        header: Header,
        animation: 'fade_from_bottom',
      }}>
      {screenKeys.map(screenKey => {
        const screen = screens[screenKey];
        return (
          <Stack.Screen
            key={screenKey}
            name={screen.navigationName}
            component={screen}
            options={screen.navigationOptions}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default MainRouter;
