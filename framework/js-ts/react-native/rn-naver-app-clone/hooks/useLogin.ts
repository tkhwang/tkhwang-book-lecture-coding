import { useCallback, useContext } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';

import { WebViewContext } from '@/providers/WebViewProvider';

export function useLogin() {
  const context = useContext(WebViewContext);

  const loadLoggedIn = useCallback(() => {
    context?.webViewRefs.current.forEach(webView => {
      webView.injectJavaScript(`
            (function() {
            window.ReactNativeWebView.postMessage(document.cookie);
        })())
        `);
    });
  }, [context]);

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      console.log(`[+][useLogin] ${JSON.stringify(event.nativeEvent.data)}`);

      const cookieString = event.nativeEvent.data;
      context?.setIsLoggedIn(cookieString.includes('NID_SES'));
    },
    [context],
  );

  return {
    loadLoggedIn,
    onMessage,
    isLoggedIn: context?.isLoggedIn === true,
  };
}
