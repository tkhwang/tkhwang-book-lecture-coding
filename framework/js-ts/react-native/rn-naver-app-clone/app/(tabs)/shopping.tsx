import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function ShoppingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://shopping.naver.com/ns/home' }} style={{ flex: 1 }} />
    </View>
  );
}

export default ShoppingScreen;
