import {AnyMap} from '@interface/index';

const getBike = ({app}: AnyMap) => app.bike;
const getApp = ({app}: AnyMap) => app;
const getDataProcessed = ({app}: AnyMap) => app.dataProcessed;

export const AppSelector = {
  getDataProcessed,
  getApp,
  getBike,
};
