import layoutStyle from '@style/layoutStyle';
import React, {useEffect, useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {View} from 'react-native';
import themeStyle from '@style/themeStyle';
import textStyle from '@style/textStyle';

type MyPhoneInputOnChange = {
  onChange: (displayValue: string, isValid: boolean) => void;
};
const initialCountry = 'ca';
const MyPhoneInput: React.FC<MyPhoneInputOnChange> = ({onChange}) => {
  const [iso2, setIso2] = useState<string>();
  const phoneInput = useRef(null);

  useEffect(() => {
    if (phoneInput?.current && iso2?.length === 2) {
      phoneInput.current?.selectCountry(iso2);
    }
  }, [iso2]);

  return (
    <View style={layoutStyle.inputPhoneContainer}>
      <PhoneInput
        renderFlag={() => (
          <CountryPicker
            containerButtonStyle={styles.border}
            onSelect={_c => {
              setIso2(_c?.cca2.toLowerCase());
              phoneInput?.current?.focus?.();
            }}
            translation="common"
            countryCode={(iso2 || initialCountry).toUpperCase()}
            withFlag
          />
        )}
        ref={phoneInput}
        onChangePhoneNumber={(displayValue, _iso2) => {
          if (iso2 !== _iso2) {
            setIso2(_iso2);
          }
          const isValid = phoneInput?.current?.isValidNumber();
          onChange?.(displayValue, isValid);
          if (isValid) {
            phoneInput?.current?.blur();
          }
        }}
        textStyle={textStyle._body}
        initialCountry={initialCountry}
        allowZeroAfterCountryCode={false}
        autoFormat
      />
    </View>
  );
};

const styles = {
  border: {
    borderColor: themeStyle.bg2,
    borderRightWidth: 1,
  },
};

export default MyPhoneInput;
