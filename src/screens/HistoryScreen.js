import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useHistoryLogic } from '../hooks/useHistoryLogic';
import { homeStyles as styles } from '../styles/homeStyles';
import { colors } from '../styles/colors';

export default function HistoryScreen() {
  const { groupedSessions } = useHistoryLogic();

  const fmtTime = (s) => { const m = Math.floor(s/60); const sec = s%60; return m===0 ? `${sec}s` : `${m}m ${sec}s`; };
  const fmtDate = (d) => { const date = new Date(d); return `${date.toLocaleDateString()} ${date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`; };

  const sections = Object.keys(groupedSessions).map(category => ({
    title: category,
    data: groupedSessions[category]
  }));

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyDate}>{fmtDate(item.date)}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.historyDuration}>{fmtTime(item.duration)}</Text>
        {item.focusLoss > 0 && <Text style={styles.historyLoss}>{item.focusLoss} distractions</Text>}
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
<View style={{ alignItems: 'center', marginBottom: 0, paddingTop: 40 , marginTop: -20}}>
        <Text style={styles.header}>History</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.date + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{color:'#999', textAlign:'center', marginTop:30}}>No sessions yet.</Text>}
        contentContainerStyle={{ padding: 24, paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}