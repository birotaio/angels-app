export const LINKS = {};

export const CURRENCY = {
  current: '$',
};

export const HELP: {
  [key: string]: {display: string; value: string; type: string};
} = {};

const PREPROD = {
  DEV: true,
  API_URL: 'https://gateway.preprod.zoov.io',
  API_CLIENT_ID: 'cegaccqh5m2dmdnihck0',
};

export default {
  ...PREPROD,
};
