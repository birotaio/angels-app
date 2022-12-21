const convertMeterInKms = (
  meters: number | undefined,
  floor?: boolean | undefined,
) => ({
  value: meters
    ? floor
      ? Math.floor(meters / 1000)
      : (meters / 1000).toFixed(1)
    : 0,
  units: 'km',
});

export const distances = {convertMeterInKms};
