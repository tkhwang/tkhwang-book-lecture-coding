import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

function LoginButton() {
  const isLoggedIn = false;
  const iconName = isLoggedIn ? 'logout' : 'login';

  const onPressLogin = useCallback(() => {
    router.navigate({ pathname: 'login' });
  }, []);

  const onPressLogout = useCallback(() => {
    router.navigate({ pathname: 'logout' });
  }, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} size={24} color="white" />
    </TouchableOpacity>
  );
}

export default LoginButton;
