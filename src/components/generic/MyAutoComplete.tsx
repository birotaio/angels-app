import layoutStyle from '@style/layoutStyle';
import textstyle from '@style/textStyle';
import themeStyle from '@style/themeStyle';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import MyText from './MyText';

const languages = [
  {id: 'en_EN', title: 'English'},
  {id: 'fr_FR', title: 'Français'},
  {id: 'es_ES', title: 'Spanish'},
];

const MyAutoComplete = ({onChange}: {onChange: (s: string | null) => void}) => {
  const dropdownController = useRef<AutocompleteDropdownRef>(null);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (selectedItem) {
      onChange?.(selectedItem?.id);
    }
  }, [onChange, selectedItem]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (dropdownController?.current) {
          dropdownController.current.clear();
          dropdownController.current.open();
        }
      }}>
      <AutocompleteDropdown
        position="absolute"
        controller={controller => {
          dropdownController.current = controller;
        }}
        containerStyle={layoutStyle.border12}
        inputContainerStyle={layoutStyle.inputContainer}
        textInputProps={{
          value: selectedItem?.title,
          editable: false,
          style: {...textstyle.text, color: themeStyle.textColorPrimary},
          onPressIn: () => {
            if (dropdownController?.current) {
              dropdownController.current.clear();
              dropdownController.current.open();
            }
          },
        }}
        ChevronIconComponent={
          <Feather name="chevron-down" size={32} color="#000000" />
        }
        showChevron={true}
        showClear={false}
        clearOnFocus={true}
        closeOnBlur={true}
        // initialValue={{}}
        onSelectItem={setSelectedItem}
        dataSet={languages}
      />
      <MyText
        _caption
        keyText="language"
        style={{
          ...layoutStyle.abs,
          left: 16,
          top: -6,
          fontSize: 12,
          zIndex: 1,
          color: themeStyle.bg5,
        }}
      />
    </TouchableOpacity>
  );
};

export default MyAutoComplete;
