import {Camera} from 'react-native-vision-camera';

const checkAndAskCameraPermission = async (): Promise<boolean> => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  if (cameraPermission !== 'authorized') {
    const request = await Camera.requestCameraPermission();
    return request === 'authorized';
  } else {
    return true;
  }
};

export {checkAndAskCameraPermission};
