import remoteConfig from '@react-native-firebase/remote-config';

type RemoteValue = {
  key: string;
  source: string;
  value: string;
};

const getAllValues = async (): Promise<RemoteValue[]> => {
  try {
    const parameters = remoteConfig().getAll();
    return Object.entries(parameters).map($ => {
      const [key, entry] = $;
      return {key, source: entry.getSource(), value: entry.asString()};
    });
  } catch (e: any) {
    return e?.message;
  }
};

export default {
  getAllValues,
};
