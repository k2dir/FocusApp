import * as Notifications from 'expo-notifications';

export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false, // <--- HIDDEN (No visual banner)
      shouldPlaySound: true,  // <--- AUDIO ON (Default system sound)
      shouldSetBadge: false,
    }),
  });
};

export const playDefaultSound = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Session Complete", // Required but won't be seen
      sound: true, // Uses default system sound
    },
    trigger: null, // Instant
  });
};