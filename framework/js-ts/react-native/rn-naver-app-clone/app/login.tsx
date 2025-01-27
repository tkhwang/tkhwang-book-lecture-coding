import { router } from 'expo-router';
import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';
function LoginScreen() {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={event => {
          console.log(`[+][LoginScreen]: event: ${event.url}`);

          if (event.url === 'https://www.naver.com') {
            // TODO: webview refresh
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
