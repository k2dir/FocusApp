import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'timer' : 'timer-outline';
  } else if (route.name === 'Reports') {
    iconName = focused ? 'bar-chart' : 'bar-chart-outline';
  } else if (route.name === 'History') {
    iconName = focused ? 'list' : 'list-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5 },
          tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}