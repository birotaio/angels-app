// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from './Header';
import * as screens from '../components/screens';
import {useDispatch} from 'react-redux';
import {AUTH_ACTIONS_SAGA_CHECK_LOGIN} from '@logic/store/auth/saga';
import {SplashScreen} from '../components/screens';

const Stack = createNativeStackNavigator();
const screenKeys = Object.keys(screens) as (
  | 'SplashScreen'
  | 'LoginScreen'
  | 'MapScreen'
  | 'ScanScreen'
  | 'BikeScreen'
  | 'BikesScreen'
)[];
function MainRouter() {
  const dispatch = useDispatch();
  dispatch({type: AUTH_ACTIONS_SAGA_CHECK_LOGIN});
  return (
    <Stack.Navigator
      initialRouteName={SplashScreen.navigationName}
      screenOptions={{
        header: Header,
        animation: 'fade_from_bottom',
      }}>
      {screenKeys.map(screenKey => (
        <Stack.Screen
          key={screenKey}
          name={screens[screenKey].navigationName}
          component={screens[screenKey]}
          options={screens[screenKey].navigationOptions}
        />
      ))}
    </Stack.Navigator>
  );
}

export default MainRouter;
