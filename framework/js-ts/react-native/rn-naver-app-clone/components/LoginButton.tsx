import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useLogin } from '@/hooks/useLogin';

function LoginButton() {
  const { isLoggedIn, loadLoggedIn } = useLogin();
  const iconName = isLoggedIn ? 'logout' : 'login';

  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(() => {
    setIsFocused(true);

    return () => {
      setIsFocused(false);
    };
  });

  useEffect(() => {
    if (isFocused) {
      loadLoggedIn();
    }
  }, [isFocused, loadLoggedIn]);

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
