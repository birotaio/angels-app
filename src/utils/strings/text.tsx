export const capitalize = (text: string | undefined) => {
  if (!text) {
    return '';
  }
  if (text?.length > 1) {
    return text[0].toUpperCase() + text.substring(1, text.length);
  } else {
    return text.toUpperCase();
  }
};
