import {AnyMap} from '@interface/index';

const getBike = ({app}: AnyMap) => app.bike;

export const AppSelector = {
  getBike,
};
