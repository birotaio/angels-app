import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MyKeyboardAvoidingView = ({
  children,
}: {
  children: React.ReactElement[];
}) => (
  <KeyboardAwareScrollView
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
    extraScrollHeight={60}
    enableAutomaticScroll={true}
    enableResetScrollToCoords={true}>
    {children}
  </KeyboardAwareScrollView>
);

export default MyKeyboardAvoidingView;
