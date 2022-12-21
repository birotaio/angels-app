import layoutStyle from '@style/layoutStyle';
import {getToken} from '@utils/api';
import constants from '@utils/constants';
import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';
import {WebViewSourceUri} from 'react-native-webview/lib/WebViewTypes';
import MyScreen from './MyScreen';

type MyWebViewProps = {
  route: string;
  onPopAction: () => void;
  returnUrl?: string;
  checkUrl: (url: string) => boolean;
  api?: boolean;
  useCookieAsParameter?: boolean;
  source: WebViewSourceUri;
};

const MyWebView: FC<WebViewProps & MyWebViewProps> = ({
  route,
  onPopAction,
  source,
  useCookieAsParameter,
  returnUrl,
  checkUrl,
  ...props
}) => {
  const [_t, _setT] = useState<string | null>(null);
  const [_isLoading, _setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getT = async () => {
      _setT(await getToken());
    };
    getT();
  }, []);

  return (
    <MyScreen noPadding>
      {(_t ||
        (source &&
          (!useCookieAsParameter || (useCookieAsParameter && _t)))) && (
        <WebView
          {...props}
          basicAuthCredential={{username: 'choosit', password: 'preprod1'}}
          source={
            source
              ? {
                  ...source,
                  uri: `${source?.uri}?c=${_t?.replace('sbk_session_id=', '')}`,
                }
              : {
                  uri: `${
                    props.api ? constants.API_URL : constants.SITE_URL
                  }${route}`,
                  headers: {
                    Cookie: `${_t}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: 'POST',
                  body: `return_url=${returnUrl}`,
                }
          }
          onError={e => console.log('onError', e)}
          onHttpError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.log(
              'onHttpError WebView received error status code: ',
              nativeEvent.statusCode,
            );
          }}
          onLoad={() => {
            _setIsLoading(true);
          }}
          onLoadEnd={syntheticEvent => {
            // update component to be aware of loading status
            const {nativeEvent} = syntheticEvent;
            console.log('onLoadEnd', nativeEvent);
            _setIsLoading(false);
          }}
          onNavigationStateChange={({canGoBack, url}) => {
            console.log('nav', canGoBack, url);
            if (checkUrl?.(url)) {
              onPopAction();
            }
          }}
        />
      )}
      {_isLoading && (
        <View style={[layoutStyle.absFill, layoutStyle.center]}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </MyScreen>
  );
};

export default MyWebView;
