import {useEffect} from 'react';
import {BackHandler} from 'react-native';

/* useBackButton */
export const useBackButton = (handler: () => boolean) => {
  // Frustration isolated! Yay! 🎉
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};
