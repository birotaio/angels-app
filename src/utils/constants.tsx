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
  BIKE_URL: 'https://www.thisebike.com/?bike_id=',
  API_CLIENT_ID_IOS: 'cegaccqh5m2dmdnihck0',
  API_CLIENT_ID_ANDROID: 'cerde7dureat091q84d0',
  API_KEY: 'OTE0NDg1YzktNWI1My00Nzk0LWE2ODAtNTlkNjkwNTQwYmE2',
  MAPBOX_STYLE_URL: 'mapbox://styles/benbirota/clbwdi9kz002l14o2w2xexyhs',
  MAPBOX_PK:
    'pk.eyJ1IjoiYmVuYmlyb3RhIiwiYSI6ImNsYndianF0NjFybTEzbnFkaDQ1NnJ4aDMifQ.0IAZFc4DU8_wWH_YaMqE2g',
};

export default {
  ...PREPROD,
};
