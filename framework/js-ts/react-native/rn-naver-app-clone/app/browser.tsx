import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useMemo, useRef, useState } from 'react';
import { Animated, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

import { WebViewContext } from '@/providers/WebViewProvider';

function NavButton({
  iconName,
  disabled,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.button} disabled={disabled} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color={disabled ? 'gray' : 'white'} />
    </TouchableOpacity>
  );
}

function BrowserScreen() {
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;

  const webViewRef = useRef<WebView | null>(null);

  const context = useContext(WebViewContext);

  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(() => url.replace('https://', '').split('/')[0], [url]);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <WebView
        // ref={webViewRef}
        ref={ref => {
          webViewRef.current = ref;
          if (ref) {
            context?.addWebView(ref);
          }
        }}
        source={{ uri: initialUrl }}
        style={{ flex: 1 }}
        onNavigationStateChange={event => {
          setUrl(event.url);
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
        }}
        onLoadProgress={event => {
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
      />
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.back();
          }}
        >
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton iconName="arrow-left" disabled={!canGoBack} onPress={() => webViewRef.current?.goBack()} />
        <NavButton iconName="arrow-right" disabled={!canGoForward} onPress={() => webViewRef.current?.goForward()} />
        <NavButton iconName="refresh" onPress={() => webViewRef.current?.reload()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'black',
  },
  urlContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  urlText: {
    color: 'white',
  },
  loadingBarBackground: {
    backgroundColor: 'white',
    height: 3,
  },
  loadingBar: {
    backgroundColor: 'green',
    height: '100%',
    width: '50%',
  },
  navigator: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconOutline: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconText: {
    color: 'white',
  },
});

export default BrowserScreen;
