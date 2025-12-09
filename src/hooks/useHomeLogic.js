import { useState, useEffect, useRef } from 'react';
import { AppState, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { 
  saveSession, loadCategories, saveCategories, loadTimers, saveTimers 
} from '../services/storage';

export const useHomeLogic = (onSessionComplete, onPause) => {
  const [timeLeft, setTimeLeft] = useState(1500); 
  const [initialTime, setInitialTime] = useState(1500); 
  const [isActive, setIsActive] = useState(false);
  const [focusLoss, setFocusLoss] = useState(0);
  const [mode, setMode] = useState('idle'); 

  const [category, setCategory] = useState('Study');
  const [categories, setCategories] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cats = await loadCategories();
    const times = await loadTimers();
    setCategories(cats);
    setTimeOptions(times);
    if (times.length > 0) {
      setInitialTime(times[1] * 60);
      setTimeLeft(times[1] * 60);
    }
    // Request notification permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Notifications are required for session alerts.');
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      completeSession();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState.match(/inactive|background/) && isActive) {
        // Keep timer running, just track distraction
        setFocusLoss((prev) => prev + 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [isActive]);

  const toggleTimer = () => {
    Haptics.selectionAsync();
    if (isActive) { 
      setIsActive(false); 
      setMode('paused'); 
      if (onPause) onPause();
    } 
    else { 
      setIsActive(true); 
      setMode('running'); 
    }
  };

  const completeSession = async () => {
    setIsActive(false);
    setMode('idle');
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Schedule notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Session Complete!',
        body: `Great job focusing on ${category}. Time to take a break!`,
        sound: true,
      },
      trigger: null, // Immediate
    });
    if (onSessionComplete) onSessionComplete();
  };

  const changeDuration = (minutes) => {
    Haptics.selectionAsync();
    const seconds = minutes * 60;
    setInitialTime(seconds); setTimeLeft(seconds); setFocusLoss(0); setMode('idle');
  };

  const resetTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(false); setMode('idle'); setTimeLeft(initialTime); setFocusLoss(0);
  };

  const saveCurrentSession = async () => {
    const duration = initialTime - timeLeft;
    const session = { date: new Date().toISOString(), duration, category, focusLoss };
    await saveSession(session);
    Alert.alert("Saved", "Session recorded.");
    resetTimer();
  };

  const addCategory = async (name) => {
    if (categories.includes(name)) return alert('Exists');
    const updated = [...categories, name];
    setCategories(updated); setCategory(name); await saveCategories(updated);
  };

  const addTimer = async (minutes) => {
    if (timeOptions.includes(minutes)) return alert('Exists');
    const updated = [...timeOptions, minutes].sort((a,b)=>a-b);
    setTimeOptions(updated); changeDuration(minutes); await saveTimers(updated);
  };

  const deleteItem = async (item, type, defaults) => {
    if (defaults.includes(item)) return alert("Cannot delete default");
    Alert.alert("Delete", `Remove ${item}?`, [{ text: "Cancel" }, { text: "Delete", style: "destructive", onPress: async () => {
        const list = type === 'cat' ? categories : timeOptions;
        const updated = list.filter(i => i !== item);
        if (type === 'cat') { setCategories(updated); await saveCategories(updated); if(category===item) setCategory('Study'); }
        else { setTimeOptions(updated); await saveTimers(updated); if(initialTime===item*60) changeDuration(updated[0]||25); }
    }}]);
  };

  return {
    timeLeft, initialTime, isActive, focusLoss, mode,
    category, categories, timeOptions, setCategory,
    toggleTimer, resetTimer, changeDuration, saveCurrentSession,
    addCategory, addTimer, deleteItem
  };
};