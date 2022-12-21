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
  MAPBOX_STYLE_URL: 'mapbox://styles/benbirota/clbwdi9kz002l14o2w2xexyhs',
  MAPBOX_PK:
    'pk.eyJ1IjoiYmVuYmlyb3RhIiwiYSI6ImNsYndianF0NjFybTEzbnFkaDQ1NnJ4aDMifQ.0IAZFc4DU8_wWH_YaMqE2g',
};

export default {
  ...PREPROD,
};
