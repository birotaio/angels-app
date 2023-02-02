import React, {BaseSyntheticEvent} from 'react';
import {ColorValue, ScrollView} from 'react-native';
import {
  useForm,
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
} from 'react-hook-form';
import MyTextInput, {MyInputTypeProps} from './MyTextInput';
import MyButton from './MyButton';
import layoutStyle from '@style/layoutStyle';
import MyPhoneInput from './MyPhoneInput';
import MyCodeField from './MyCodeField';
import {useState} from 'react';
import MyAutoComplete from './MyAutoComplete';
import themeStyle from '@style/themeStyle';

export type MyFormProps = {
  fields: FieldType[];
  handleFormValidation: (
    data: FieldValues,
    event?: BaseSyntheticEvent<object, any, any>,
  ) => any;
  ctaLabel: string;
  bottomFormComponent?: React.FC;
  isLoading?: boolean;
  buttonSpaceTop?: number;
  button?: {
    textColor: ColorValue;
    backgroundColor: ColorValue;
  };
};

type FieldType = {
  label: string | 'phone' | 'codeDigits'; // TODO Type names
  type?: string | 'dropdown';
  name: string; // TODO Type names
  rules: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  inputProps?: MyInputTypeProps;
};

const MyForm: React.FC<MyFormProps> = ({
  fields,
  handleFormValidation,
  ctaLabel,
  bottomFormComponent,
  isLoading,
  buttonSpaceTop,
  button,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});
  const [_isValid, set_IsValid] = useState(undefined);

  return (
    <ScrollView
      scrollEnabled={false}
      style={[layoutStyle.w100]}
      showsVerticalScrollIndicator={false}>
      {fields?.map?.((field: FieldType) => (
        <Controller
          key={field.label}
          control={control}
          name={field.label}
          defaultValue={field.inputProps?.defaultValue}
          render={({field: {onChange, value, onBlur}}) => {
            const isPhone = field.label === 'phone';
            const isCodeDigits = field.label === 'codeDigits';
            const isDropdown = field.type === 'dropdown';
            return isDropdown ? (
              <MyAutoComplete onChange={onChange} />
            ) : isCodeDigits ? (
              <MyCodeField
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                }}
              />
            ) : isPhone ? (
              <MyPhoneInput
                onChange={(displayValue, isPhoneValid) => {
                  onChange(displayValue);
                  set_IsValid(isPhoneValid);
                  if (isPhoneValid) {
                    onBlur();
                  }
                }}
              />
            ) : (
              <MyTextInput
                error={errors[field.label]?.message}
                placeholder={field.name}
                value={value}
                onBlur={onBlur}
                onChangeText={(v: string) => onChange(v)}
                numberOfLines={1}
                returnKeyType="done"
                autoCapitalize="none"
                {...field.inputProps}
              />
            );
          }}
          rules={field.rules}
        />
      ))}
      {bottomFormComponent?.({})}
      <MyButton
        color={button?.textColor || themeStyle.accentSecondary}
        style={[
          {marginTop: buttonSpaceTop || 32},
          button && {backgroundColor: button.backgroundColor},
        ]}
        isLoading={isLoading}
        disabled={!(_isValid !== undefined ? _isValid : isValid)}
        text={ctaLabel}
        onPress={handleSubmit(handleFormValidation)}
      />
    </ScrollView>
  );
};

export default MyForm;
