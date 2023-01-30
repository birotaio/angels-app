import fifteenSDK from '..';

const getStations = async () => {
  return (await fifteenSDK()).api.get('/stations', {
    params: {fields: 'location,label'},
  });
};

export const mapApi = {getStations};
