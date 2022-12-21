import {useState, useEffect, useRef} from 'react';
import {AppState} from 'react-native';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setAppStateVisible('active');
      }

      appState.current = nextAppState;
      setAppStateVisible('inactive');
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return appStateVisible;
};
