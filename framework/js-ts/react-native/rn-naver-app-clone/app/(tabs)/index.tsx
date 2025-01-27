import { router } from 'expo-router';
import { useContext } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { WebViewContext } from '@/providers/WebViewProvider';

export default function IndexScreen() {
  const context = useContext(WebViewContext);

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        ref={ref => {
          if (ref) {
            context?.addWebView(ref);
          }
        }}
        source={{ uri: 'https://m.naver.com/' }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          // console.log(request);
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
