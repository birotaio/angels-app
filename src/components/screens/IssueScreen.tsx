import React, {useState} from 'react';
import MyScreen from '@components/generic/MyScreen';
import layoutStyle from '@style/layoutStyle';
import MyText from '@components/generic/MyText';
import PageHeader from '@components/generic/navigation/PageHeader';
import i18n from '@assets/locales';
import {ScreenProps} from '.';
import textstyle from '@style/textStyle';
import {FlatList, StyleSheet} from 'react-native';
import {TranslateKeyProps} from '@assets/locales/locale';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '@style/colors';
import MyIcon from '@components/generic/MyIcon';

const IssueScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  return (
    <MyScreen style={layoutStyle.flex}>
      {bikeId && (
        <MyText _title negColor>
          {'Vélo #'}
          <MyText _title _color_primary>
            {bikeId}
          </MyText>
        </MyText>
      )}
      <MyText
        style={[layoutStyle.mv5, textstyle.textLight]}
        keyText="issue-select"
        negColor
      />
      <IssueSelector />
    </MyScreen>
  );
};

const IssueSelector = () => {
  const datas: {keytext: TranslateKeyProps; icon: string}[] = [
    {icon: 'Bequille', keytext: 'issue-kickstand'},
    {icon: 'Chaines', keytext: 'issue-chain'},
    {icon: 'Freins', keytext: 'issue-brake'},
    {icon: 'Pedalier', keytext: 'issue-pedal'},
    {icon: 'Phares', keytext: 'issue-headlight'},
    {icon: 'Roue', keytext: 'issue-wheel'},
    {icon: 'Selle', keytext: 'issue-saddle'},
    {icon: 'Autres', keytext: 'issue-others'},
  ];
  const [selectedItems, setSelectedItems] = useState<TranslateKeyProps[]>([]);
  return (
    <FlatList
      style={layoutStyle.asc}
      numColumns={3}
      data={datas}
      renderItem={({item}) => {
        return (
          <IssueItem
            icon={item.icon}
            selected={selectedItems.includes(item.keytext)}
            keyText={item.keytext}
            onSelect={_keyText => {
              const _s = [...selectedItems];
              const index = _s.indexOf(_keyText);
              if (index !== -1) {
                _s.splice(index, 1);
                setSelectedItems(_s);
              } else {
                _s.push(_keyText);
                setSelectedItems(_s);
              }
            }}
          />
        );
      }}
    />
  );
};

const IssueItem = ({
  keyText,
  onSelect,
  selected,
  icon,
}: {
  icon: string;
  keyText: TranslateKeyProps;
  onSelect: (keyText: TranslateKeyProps) => void;
  selected: boolean;
}) => (
  <TouchableOpacity
    style={[styles.item, selected && styles.itemSelected]}
    onPress={() => onSelect(keyText)}>
    <MyIcon icon={icon} size={42} />
    <MyText keyText={keyText} negColor />
  </TouchableOpacity>
);

IssueScreen.navigationName = 'Issue';
IssueScreen.navigationOptions = {
  header: PageHeader,
  headerShown: true,
  title: i18n.t('issue-title'),
};
const styles = StyleSheet.create({
  item: {
    width: layoutStyle.dim.width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.NEUTRAL_LIGHT_02,
    aspectRatio: 1,
    margin: 6,
    borderWidth: 2,
    borderColor: colors.NEUTRAL_LIGHT_02,
    borderRadius: 4,
  },
  itemSelected: {
    borderColor: colors.PRIMARY,
  },
});

export {IssueScreen};
