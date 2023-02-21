import {TranslateKeyProps} from '@assets/locales/locale';
import {
  Battery0,
  Battery10,
  Battery100,
  Battery20,
  Battery30,
  Battery40,
  Battery50,
  Battery60,
  Battery70,
  Battery80,
  Battery90,
  InRun,
  Lock,
  Station,
  Unlock,
} from '@assets/svg';
import {ApiSchema} from '@fifteen/sdk';
import constants from '@utils/constants';
import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

const parseQrCodeUrl = (url: string | undefined): number | null => {
  if (!url) {
    return null;
  }
  const bikeId = url?.replace(constants.BIKE_URL, '');
  if (bikeId?.length > 0) {
    try {
      const bikeNumber = parseInt(bikeId, 10);

      return isNaN(bikeNumber) ? null : bikeNumber;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export type BikeStatusUI = {
  isLocked: boolean;
  status: TranslateKeyProps;
  lockStatus: TranslateKeyProps;
  lockIcon: FC<SvgProps>;
  batteryLevel: string;
  batteryIcon: FC<SvgProps>;
  statusIcon: FC<SvgProps>;
};
export const getBikeStatusDisplay = (
  bike: ApiSchema['bike.Bike'],
): BikeStatusUI => {
  var status: TranslateKeyProps | null = null;
  var statusIcon: FC<SvgProps> = Station;
  var lockStatus: TranslateKeyProps | null = null;
  var lockIcon: FC<SvgProps> = Lock;
  var batteryLevel = '';
  var batteryIcon: FC<SvgProps> = Battery0;

  switch (bike?.maintenance_state) {
    case 16:
      status = 'bike-pick-up';
      break;
    case 11:
      status = 'bike-reallocation';
      break;
    case 7:
    case 8:
    case 9:
    case 17:
    case 18:
      status = 'bike-warehouse';
      break;
    case 10:
      status = 'bike-to-reallocate';
      break;
    case 2:
      status = 'bike-to-fix';
      break;
    case 15:
      status = 'bike-to-pick-up';
      break;
  }

  if (!status) {
    switch (bike?.status) {
      case 2:
      case 3:
      case 4:
      case 5:
        status = 'bike-in-use';
        statusIcon = InRun;
        break;
      default:
        status = 'bike-default-status';
        break;
    }
  }

  const isLocked = bike?.lock_info?.status === 1;
  if (isLocked) {
    lockStatus = 'bike-lock';
    lockIcon = Lock;
  } else {
    lockStatus = 'bike-unlock';
    lockIcon = Unlock;
  }
  const battery_charge = bike?.battery_community?.state_of_charge ?? 0;

  batteryLevel = `${battery_charge} %`;

  if (battery_charge < 10) {
    batteryIcon = Battery0;
  } else if (battery_charge >= 10 && battery_charge < 20) {
    batteryIcon = Battery10;
  } else if (battery_charge >= 20 && battery_charge < 30) {
    batteryIcon = Battery20;
  } else if (battery_charge >= 30 && battery_charge < 40) {
    batteryIcon = Battery30;
  } else if (battery_charge >= 40 && battery_charge < 50) {
    batteryIcon = Battery40;
  } else if (battery_charge >= 50 && battery_charge < 60) {
    batteryIcon = Battery50;
  } else if (battery_charge >= 60 && battery_charge < 70) {
    batteryIcon = Battery60;
  } else if (battery_charge >= 70 && battery_charge < 80) {
    batteryIcon = Battery70;
  } else if (battery_charge >= 80 && battery_charge < 90) {
    batteryIcon = Battery80;
  } else if (battery_charge >= 90) {
    if (battery_charge === 100) {
      batteryIcon = Battery100;
    } else {
      batteryIcon = Battery90;
    }
  }

  return {
    isLocked,
    status,
    statusIcon,
    lockStatus,
    lockIcon,
    batteryLevel,
    batteryIcon,
  };
};

export default {parseQrCodeUrl};
