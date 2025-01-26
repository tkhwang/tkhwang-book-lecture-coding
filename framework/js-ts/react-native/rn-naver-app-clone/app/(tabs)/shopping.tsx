import { router } from 'expo-router';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const SHOPPING_HOME_URL = 'https://shopping.naver.com/home';

function ShoppingScreen() {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: SHOPPING_HOME_URL }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          if (request.url?.startsWith(SHOPPING_HOME_URL) || request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)) {
            return false;
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

export default ShoppingScreen;
