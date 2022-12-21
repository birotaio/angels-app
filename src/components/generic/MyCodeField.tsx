import layoutStyle from '@style/layoutStyle';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Noop} from 'react-hook-form';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MyText from './MyText';

type MyCodeFieldProps = {
  onChangeText: (text: string) => void;
  onBlur: Noop;
};
const CELL_COUNT = 4;
const MyCodeField: React.FC<MyCodeFieldProps> = ({onChangeText, onBlur}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    onChangeText?.(value);
  }, [value, onChangeText]);
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={layoutStyle.codeFieldContainer}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      onBlur={onBlur}
      renderCell={({index, symbol, isFocused}) => (
        <MyText
          _color_primary
          _numbers_normal
          key={index}
          style={[
            layoutStyle.codeFieldCell,
            isFocused && layoutStyle.codeFieldCellFocused,
          ]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </MyText>
      )}
    />
  );
};

export default MyCodeField;
