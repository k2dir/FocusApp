import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const reportsStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 24 },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },

  toggleContainer: { flexDirection: 'row', backgroundColor: colors.border, borderRadius: 12, padding: 4, marginBottom: 25 },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  toggleBtnActive: { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  toggleText: { color: colors.subtext, fontWeight: '600', fontSize: 13 },
  toggleTextActive: { color: colors.text, fontWeight: '700' },

  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 25 },
  cardTitle: { fontSize: 12, color: '#B2BEC3', fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  cardValue: { fontSize: 22, fontWeight: '700', color: colors.text },

  chartContainer: { backgroundColor: colors.surface, borderRadius: 24, padding: 20, marginBottom: 20, elevation: 2 },
  chartTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 15 },
  graphStyle: { borderRadius: 16, paddingRight: 0 },
  noData: { textAlign: 'center', color: '#B2BEC3', marginVertical: 30, fontStyle: 'italic' },

  sectionHeader: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 15, marginTop: 10 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1 },
  historyCat: { fontWeight: '600', color: colors.text, fontSize: 16 },
  historyDate: { color: '#B2BEC3', fontSize: 12, marginTop: 4 },
  historyDuration: { fontWeight: '700', color: colors.primary, fontSize: 16 },
  historyLoss: { color: colors.danger, fontSize: 12, marginTop: 2 }
});