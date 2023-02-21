// In App.js in a new project

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Header from '../components/generic/navigation/Header';
import * as screens from '../components/screens';
import {SplashScreen} from '../components/screens';
import DrawerScreen from '@components/screens/DrawerScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenKeys = Object.keys(screens) as (
  | 'SplashScreen'
  | 'LoginScreen'
  | 'MapScreen'
  | 'ScanScreen'
  | 'BikeScreen'
  | 'BikesScreen'
  | 'IssueScreen'
  | 'TestBleScreen'
)[];

const MainStack = () => (
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

function MainRouter() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen
        name="MainStack"
        options={{headerShown: false, drawerType: 'front', swipeEnabled: false}}
        component={MainStack}
      />
    </Drawer.Navigator>
  );
}

export default MainRouter;
