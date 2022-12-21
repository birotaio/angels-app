import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MyKeyboardAvoidingView = ({
  children,
}: {
  children: React.ReactElement[];
}) => (
  <KeyboardAwareScrollView
    // keyboardDismissMode="on-drag"
    // keyboardShouldPersistTaps="handled"
    // contentInsetAdjustmentBehavior="automatic"
    showsVerticalScrollIndicator={false}
    extraScrollHeight={60}
    enableAutomaticScroll={true}
    enableResetScrollToCoords={false}>
    {children}
  </KeyboardAwareScrollView>
);

export default MyKeyboardAvoidingView;
