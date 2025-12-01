import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = '@focus_sessions';
const CATEGORIES_KEY = '@focus_categories';
const TIMERS_KEY = '@focus_timers';

// --- SESSIONS ---
export const saveSession = async (sessionData) => {
  try {
    const existingData = await loadSessions();
    const sessions = existingData ? existingData : [];
    sessions.push(sessionData);
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save session', e);
  }
};

export const loadSessions = async () => {
  try {
    const data = await AsyncStorage.getItem(SESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const clearData = async () => {
  await AsyncStorage.removeItem(SESSIONS_KEY);
};

// --- CATEGORIES ---
export const saveCategories = async (categories) => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories', e);
  }
};

export const loadCategories = async () => {
  try {
    const data = await AsyncStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : ['Study', 'Coding', 'Reading'];
  } catch (e) {
    return ['Study', 'Coding', 'Reading'];
  }
};

// --- TIMERS ---
export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (e) {
    console.error('Failed to save timers', e);
  }
};

export const loadTimers = async () => {
  try {
    const data = await AsyncStorage.getItem(TIMERS_KEY);
    return data ? JSON.parse(data) : [15, 25, 45, 60];
  } catch (e) {
    return [15, 25, 45, 60];
  }
};

// --- SEED DATA (FOR TESTING) ---
export const seedDatabase = async () => {
  const dummySessions = [];
  const categories = ['Study', 'Coding', 'Reading', 'Work', 'Math'];
  const now = new Date();

  // Generate data for the last 7 days
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date();
    dayDate.setDate(now.getDate() - i);
    
    // Create 3-5 sessions per day
    const sessionsCount = Math.floor(Math.random() * 3) + 3; 

    for (let k = 0; k < sessionsCount; k++) {
      // Random Duration: 10 mins (600s) to 60 mins (3600s)
      const duration = Math.floor(Math.random() * 3000) + 600;
      
      dummySessions.push({
        date: dayDate.toISOString(), // ISO String format
        duration: duration,
        category: categories[Math.floor(Math.random() * categories.length)],
        focusLoss: Math.floor(Math.random() * 4), // 0 to 3 distractions
      });
    }
  }

  // Save to storage
  await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(dummySessions));
};