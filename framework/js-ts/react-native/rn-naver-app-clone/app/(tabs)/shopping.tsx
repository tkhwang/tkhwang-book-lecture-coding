import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
      <MaterialCommunityIcons name="shopping" size={24} color="black" />
      <MaterialCommunityIcons name="home" size={24} color="black" />
    </View>
  );
}

export default ShoppingScreen;
