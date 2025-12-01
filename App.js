import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { configureNotifications } from './src/services/notifications';

configureNotifications();

export default function App() {
  return <AppNavigator />;
}