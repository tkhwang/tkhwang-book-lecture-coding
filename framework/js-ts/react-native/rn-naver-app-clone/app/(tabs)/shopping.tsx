import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

function ShoppingScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Shopping</Text>
      <TouchableOpacity
        onPress={() => {
          router.navigate('browser');
        }}
      >
        <Text>Go to Browser</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingScreen;
