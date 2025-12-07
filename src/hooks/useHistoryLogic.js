import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { loadSessions } from '../services/storage';

export const useHistoryLogic = () => {
  const [sessions, setSessions] = useState([]);
  const [groupedSessions, setGroupedSessions] = useState({});

  useFocusEffect(
    useCallback(() => { fetchData(); }, [])
  );

  const fetchData = async () => {
    const data = await loadSessions();
    const sorted = [...data].reverse(); // Most recent first
    setSessions(sorted);

    // Group by date
    const grouped = {};
    sorted.forEach(session => {
      const dateKey = new Date(session.date).toLocaleDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });
    setGroupedSessions(grouped);
  };

  return { sessions, groupedSessions, fetchData };
};