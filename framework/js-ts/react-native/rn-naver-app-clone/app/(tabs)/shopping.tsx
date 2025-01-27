import { router } from 'expo-router';
import { useCallback, useContext, useRef, useState } from 'react';
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { WebViewContext } from '@/providers/WebViewProvider';

const SHOPPING_HOME_URL = 'https://shopping.naver.com/ns/home';

function ShoppingScreen() {
  const webViewRef = useRef<WebView | null>(null);

  const context = useContext(WebViewContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (webViewRef.current !== null) {
      setRefreshing(true);
      webViewRef.current.reload();
    }
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <WebView
          ref={ref => {
            webViewRef.current = ref;
            if (ref) {
              context?.addWebView(ref);
            }
          }}
          source={{ uri: SHOPPING_HOME_URL }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onLoadEnd={() => {
            setRefreshing(false);
          }}
          onShouldStartLoadWithRequest={request => {
            if (request.url?.startsWith(SHOPPING_HOME_URL) || request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)) {
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
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
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
