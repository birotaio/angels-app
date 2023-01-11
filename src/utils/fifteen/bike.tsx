import constants from '@utils/constants';

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

export default {parseQrCodeUrl};
