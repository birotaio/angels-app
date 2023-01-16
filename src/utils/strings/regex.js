export const emailFormat = new RegExp(
  // eslint-disable-next-line no-control-regex
  '([-!#-\'*+/-9=?A-Z^-~]+(.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+',
);
export const isAlphaNumeric = new RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[|]*)+/gm);
