import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import analytics from '@utils/firebase/analytics';
import {useCallback} from 'react';

const useTracking = (name: string) => {
  // Tracking
  const isFocused = useIsFocused();
  const focusCallback = useCallback(() => {
    if (isFocused) {
      console.log(`useTracking ${name}`);
      analytics.trackScreen(name);
    }
  }, [isFocused, name]);
  useFocusEffect(focusCallback);
  //
  return isFocused;
};

export default useTracking;
