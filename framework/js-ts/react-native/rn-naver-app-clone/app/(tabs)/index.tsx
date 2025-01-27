import { useBackHandler } from '@react-native-community/hooks';
import { router } from 'expo-router';
import { useContext, useRef, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { useLogin } from '@/hooks/useLogin';
import { WebViewContext } from '@/providers/WebViewProvider';

export default function IndexScreen() {
  const webViewRef = useRef<WebView | null>(null);
  const context = useContext(WebViewContext);

  const { loadLoggedIn, onMessage } = useLogin();

  const [canGoBack, setCanGoBack] = useState(false);

  useBackHandler(() => {
    if (canGoBack && webViewRef.current !== null) {
      webViewRef.current?.goBack();
      return true;
    }
    return false;
  });

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        ref={ref => {
          if (ref) {
            context?.addWebView(ref);
          }
          webViewRef.current = ref;
        }}
        source={{ uri: 'https://m.naver.com/' }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          if (
            request.url.startsWith('https://m.naver.com') ||
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          ) {
            return true;
          }

          if (request.url?.startsWith('https://')) {
            router.navigate({
              pathname: 'browser',
              params: { initialUrl: request.url },
            });
            return false;
          }

          return true;
        }}
        onLoadEnd={() => {
          loadLoggedIn();
        }}
        onMessage={onMessage}
        onNavigationStateChange={event => {
          setCanGoBack(event.canGoBack);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
