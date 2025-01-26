import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

function HomeIcon({ focused, color }: { focused: boolean; color: string }) {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
}

function ShoppingIcon({ focused, color }: { focused: boolean; color: string }) {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        // tabBarInactiveTintColor: 'white',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          tabBarLabel: 'Shopping',
          tabBarIcon: ShoppingIcon,
        }}
      />
    </Tabs>
  );
}
