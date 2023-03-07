import MyText from '@components/generic/MyText';
import MyView from '@components/generic/MyView';
import layoutStyle from '@style/layoutStyle';
import React from 'react';

const StationInfos = ({}) => {
  return (
    <MyView
      style={[
        layoutStyle.screenCard,
        layoutStyle.row,
        layoutStyle.pv5,
        layoutStyle.noBorder,
      ]}>
      <MyText _caption_small keyText={'todo station infos'} />
    </MyView>
  );
};

export default StationInfos;
