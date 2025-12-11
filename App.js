import React from 'react';
import * as Notifications from 'expo-notifications';
import AppNavigator from './src/navigation/AppNavigator';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return <AppNavigator />;
}