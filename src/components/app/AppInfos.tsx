import React from 'react';
import MyText from '@components/generic/MyText';
import MyView from '@components/generic/MyView';
import {getAppVersion} from '@utils/version';

export const AppInfos = () => (
  <MyView
    rowCenter
    backgroundAccentPrimary
    style={{paddingBottom: '10%', padding: '5%', marginTop: '5%'}}>
    <MyText>Fifteen 2023</MyText>
    <MyView flex />
    <MyText>{getAppVersion()}</MyText>
  </MyView>
);
