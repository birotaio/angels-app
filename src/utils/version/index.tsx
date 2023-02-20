import {AnyMap} from '@interface/index';
import codePush, {
  DownloadProgressCallback,
  RemotePackage,
} from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';

const codepushUpdate = async ({
  descriptionHandler,
  progressHandler,
  exitHandler,
}: {
  descriptionHandler?: (text: AnyMap | null) => void;
  progressHandler?: DownloadProgressCallback;
  exitHandler?: (newVersion: boolean) => void;
}): Promise<RemotePackage | null | undefined> => {
  const {checkForUpdate, SyncStatus} = codePush;

  const {UPDATE_INSTALLED, UNKNOWN_ERROR, UP_TO_DATE, UPDATE_IGNORED} =
    SyncStatus;

  let update;

  try {
    update = await checkForUpdate();
  } catch (e) {
    console.log(e);
    exitHandler?.(false);
  }

  if (update) {
    try {
      descriptionHandler?.(JSON.parse(update.description));
    } catch (e) {
      descriptionHandler?.(null);
    }
    try {
      await codePush.sync(
        undefined,
        statusCode => {
          switch (statusCode) {
            case UPDATE_INSTALLED:
              exitHandler?.(true);
              break;
            case UNKNOWN_ERROR:
            case UP_TO_DATE:
            case UPDATE_IGNORED:
              exitHandler?.(false);
              break;
            default:
              break;
          }
        },
        progressHandler,
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    exitHandler?.(false);
  }
  return update;
};

const getVersion: () => Promise<string> = async () => {
  const metadata = await codePush.getUpdateMetadata();
  return `${metadata?.appVersion ?? ''}${metadata?.label ?? ''}`;
};

const restart = () => {
  codePush.restartApp();
};

const getAppVersion = () => {
  return `v${DeviceInfo.getVersion()}`;
};

export {codepushUpdate, getVersion, restart, getAppVersion};
