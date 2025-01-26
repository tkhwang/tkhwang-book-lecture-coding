import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://www.naver.com/' }} style={{ flex: 1 }} />
    </View>
  );
}
