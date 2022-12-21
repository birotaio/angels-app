import {firebase} from '@react-native-firebase/analytics';

const trackScreen = async (screen_name: string) => {
  await firebase.analytics().logScreenView({screen_name});
};

export default {core: firebase.analytics, trackScreen};
