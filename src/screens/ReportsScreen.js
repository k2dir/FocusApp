import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

import { useReportsLogic } from '../hooks/useReportsLogic';
import { reportsStyles as styles } from '../styles/reportsStyles';
import { colors } from '../styles/colors';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#fff", backgroundGradientTo: "#fff", color: (o=1)=>`rgba(74, 144, 226, ${o})`, strokeWidth: 2, barPercentage: 0.6, decimalPlaces: 0, labelColor: (o=1)=>`rgba(99, 110, 114, ${o})`
};

export default function ReportsScreen() {
  const { viewMode, setViewMode, stats, pieData, barData, barLabels, recentSessions, handleClearData } = useReportsLogic();

  const fmtTime = (s) => { const m = Math.floor(s/60); const sec = s%60; return m===0 ? `${sec}s` : `${m}m ${sec}s`; };
  const fmtDate = (d) => { const date = new Date(d); return `${date.toLocaleDateString()} ${date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`; };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Analytics</Text>
          <TouchableOpacity onPress={handleClearData}><Ionicons name="trash-outline" size={20} color={colors.danger} /></TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          {['Today', 'Total'].map(m => (
            <TouchableOpacity key={m} style={[styles.toggleBtn, viewMode===m && styles.toggleBtnActive]} onPress={()=>setViewMode(m)}>
              <Text style={[styles.toggleText, viewMode===m && styles.toggleTextActive]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsRow}>
          <Card style={{ flex: 1, alignItems: 'center' }}><Text style={styles.cardTitle}>Focus Time</Text><Text style={styles.cardValue}>{fmtTime(stats.time)}</Text></Card>
          <Card style={{ flex: 1, alignItems: 'center' }}><Text style={styles.cardTitle}>Distractions</Text><Text style={styles.cardValue}>{stats.distractions}</Text></Card>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distribution</Text>
          {pieData.length > 0 ? (
            <PieChart data={pieData} width={screenWidth-48} height={200} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" paddingLeft="0" center={[10,0]} absolute={false} />
          ) : <Text style={styles.noData}>No data yet.</Text>}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Trend</Text>
          <BarChart data={{ labels: barLabels, datasets: [{ data: barData }] }} width={screenWidth-70} height={220} yAxisLabel="" yAxisSuffix="" chartConfig={chartConfig} style={styles.graphStyle} showValuesOnTopOfBars />
        </View>

        <Text style={styles.sectionHeader}>History</Text>
        {recentSessions.length > 0 ? recentSessions.map((s, i) => (
          <View key={i} style={styles.historyItem}>
            <View><Text style={styles.historyCat}>{s.category}</Text><Text style={styles.historyDate}>{fmtDate(s.date)}</Text></View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.historyDuration}>{fmtTime(s.duration)}</Text>
              {s.focusLoss > 0 && <Text style={styles.historyLoss}>{s.focusLoss} distractions</Text>}
            </View>
          </View>
        )) : <Text style={{color:'#999', marginBottom:20}}>No recent sessions.</Text>}
        <View style={{height:40}} />
      </ScrollView>
    </SafeAreaView>
  );
}