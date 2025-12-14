import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadSessions, clearData, seedDatabase } from '../services/storage';
import { colors } from '../styles/colors';

export const useReportsLogic = () => {
  const [viewMode, setViewMode] = useState('Today');
  const [stats, setStats] = useState({ time: 0, distractions: 0 });
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([0,0,0,0,0,0,0]);
  const [barLabels, setBarLabels] = useState([]);

  useFocusEffect(
    useCallback(() => { fetchData(); }, [viewMode])
  );

  const fetchData = async () => {
    const data = await loadSessions();
    processStats(data);
  };

  const handleClearData = () => {
    Alert.alert("Reset", "Delete all history?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: async () => { await clearData(); fetchData(); } }
    ]);
  };

  const handleSeedData = async () => {
    await seedDatabase();
    fetchData();
  };

  const processStats = (data) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();

    // 1. Filter
    const filtered = viewMode === 'Today' ? data.filter(i => i.date.startsWith(todayStr)) : data;
    
    // 2. Totals
    const totalTime = filtered.reduce((acc, i) => acc + i.duration, 0);
    const totalLoss = filtered.reduce((acc, i) => acc + i.focusLoss, 0);
    setStats({ time: totalTime, distractions: totalLoss });

    // 3. Pie Data
    const catMap = {};
    filtered.forEach(i => { catMap[i.category] = (catMap[i.category] || 0) + i.duration; });
    const pColors = [colors.primary, colors.success, colors.warning, colors.danger, "#A3CB38"];
    setPieData(Object.keys(catMap).map((c, i) => ({
      name: c, population: catMap[c], color: pColors[i % pColors.length], legendFontColor: colors.subtext, legendFontSize: 12
    })));

    // 4. Bar Data
    const bData = [], bLabels = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(now.getDate() - i); 
      const dStr = d.toISOString().split('T')[0];
      bLabels.push(days[d.getDay()]);
      const dailySum = data.filter(x => x.date.startsWith(dStr)).reduce((a, b) => a + b.duration, 0);
      bData.push(parseFloat((dailySum / 60).toFixed(1)));
    }
    setBarData(bData);
    setBarLabels(bLabels);
  };

  return { viewMode, setViewMode, stats, pieData, barData, barLabels, handleClearData, handleSeedData };
};