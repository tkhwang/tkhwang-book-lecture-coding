import { router } from 'expo-router';
import { useContext } from 'react';
import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

import { WebViewContext } from '@/providers/WebViewProvider';

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';
function LoginScreen() {
  const context = useContext(WebViewContext);

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={event => {
          if (event.url === 'https://www.naver.com') {
            if (context?.webViewRefs && context.webViewRefs.current.length > 0) {
              context.webViewRefs.current.forEach(webView => {
                webView.reload();
              });
            }
            router.back();
          }
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

export default LoginScreen;
