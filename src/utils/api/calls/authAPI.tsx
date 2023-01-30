import fifteenSDK from '..';

const login = async (email: string, password: string) => {
  return (await fifteenSDK()).login('basic', {email, password});
};

export const authAPI = {login};
