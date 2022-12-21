import {Linking} from 'react-native';

export const displayLink = ({value, type}: {value: string; type: string}) => {
  let url: string;
  if (type === 'email') {
    url = 'mailto:' + value;
  } else if (type === 'phone') {
    url = 'tel:' + value;
  } else if (type === 'twitter') {
    url = 'https://twitter.com/' + value;
  } else {
    url = value;
  }
  Linking.openURL(url)
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
};
