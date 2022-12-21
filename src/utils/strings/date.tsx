import moment from 'moment';

const H = 3600;
export const FORMAT = {
  MMDD: 'MM[/]DD',
  MMYY: 'MM[/]YY',
  YYYY_MM: 'YYYY-MM',
  YYYY_MM_DD: 'YYYY-MM-DD',
  YYYYMMDD_HHMM: 'YYYY/MM/DD HH:mm',
  MMDD_HHMM: 'MM/DD HH:mm',
  HHMMSS: 'HH:mm:ss',
  HHMM: 'H[h] m[min]',
  MM: 'm[min]',
  H: 'H',
  M: 'm',
};

const getNextDay = (add: number, _format?: string) =>
  moment()
    .add(add, 'day')
    .format(_format || FORMAT.YYYY_MM_DD);

const getNow = (_format?: string) =>
  moment().format(_format || FORMAT.YYYY_MM_DD);

const format = (date: string, _format?: string) =>
  moment(date).format(_format || FORMAT.YYYY_MM_DD);

const convertSecondsInTime = (seconds: number | undefined) => {
  if (!seconds) {
    return {value: 0, units: 'min'};
  }
  if (seconds < H) {
    return {value: Math.floor(seconds / 60), units: 'min'};
  } else if (seconds < 24 * H) {
    return {value: Math.floor(seconds / H), units: 'hours'};
  } else {
    return {value: Math.floor(seconds / (24 * H)), units: 'days'};
  }
};

const convertSecondsInFormat = (seconds: number) => {
  const date = moment().startOf('day').seconds(seconds);
  return {
    hours: date.format(FORMAT.H),
    minutes: date.format(FORMAT.M),
  };
};

export const dates = {
  FORMAT,
  getNow,
  getNextDay,
  convertSecondsInTime,
  convertSecondsInFormat,
  format,
};
