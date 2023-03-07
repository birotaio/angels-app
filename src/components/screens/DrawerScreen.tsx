import {TranslateKeyProps} from '@assets/locales/locale';
import MyIcon, {IconSetName} from '@components/generic/MyIcon';
import MyStatusBar from '@components/generic/MyStatusBar';
import MyText from '@components/generic/MyText';
import MyView from '@components/generic/MyView';
import colors from '@style/colors';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import {useDispatch} from 'react-redux';
import {AUTH_ACTIONS_SAGA_LOGOUT} from '@logic/store/auth/saga';
import {AppInfos} from '@components/app/AppInfos';
import AppModalManager from '@components/appModal/AppModalManager';
import {AppModalLogout} from '@components/appModal/AppModalModels';

const DrawerScreen: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <MyView flex style={{}}>
      <MyStatusBar />
      <MyView
        style={{height: 60, justifyContent: 'center', paddingLeft: 16}}
        backgroundAccentPrimary>
        <MyText _title keyText="menu" />
      </MyView>
      <MyView flex />
      <View>
        <DrawerEntry
          icon="Gearing"
          keyText="user-settings"
          onPress={() => {
            navigation.toggleDrawer();
            alert('settings');
          }}
        />
        <DrawerEntry
          icon="Logout"
          keyText="logout"
          onPress={() => {
            AppModalManager.show({
              ...AppModalLogout,
              button1: {
                text: 'global_cancel',
                action: () => AppModalManager.hide(),
              },
              button2: {
                text: 'global_confirm',
                action: () => {
                  AppModalManager.hide();
                  navigation.toggleDrawer();
                  dispatch({type: AUTH_ACTIONS_SAGA_LOGOUT});
                },
              },
            });
          }}
        />
        <AppInfos />
      </View>
    </MyView>
  );
};

const DrawerEntry = ({
  icon,
  keyText,
  onPress,
}: {
  icon: string;
  keyText: TranslateKeyProps;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[layoutStyle.rowCenter, layoutStyle.p5]}
    onPress={onPress}>
    <MyIcon
      icon={icon}
      size={24}
      color={colors.BLACK}
      setName={IconSetName.MaterialIcon}
    />
    <MyText _body style={layoutStyle.ml12} keyText={keyText} negColor />
  </TouchableOpacity>
);

export default DrawerScreen;
