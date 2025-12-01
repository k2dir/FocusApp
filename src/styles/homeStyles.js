import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const homeStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContainer: { alignItems: 'center', padding: 24, paddingBottom: 50 },
  header: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 20 },

  // Categories
  catWrapper: { height: 50, marginBottom: 20 },
  catList: { alignItems: 'center', paddingHorizontal: 5 },
  catPill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.border, marginRight: 10 },
  catPillActive: { backgroundColor: colors.primary, elevation: 4 },
  catText: { color: colors.subtext, fontWeight: '600' },
  catTextActive: { color: '#fff' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary },

  // Timer
  timerContainer: { marginBottom: 30, alignItems: 'center', justifyContent: 'center' },
  timerCircle: { 
    width: 260, height: 260, borderRadius: 130, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
    ...Platform.select({ android: { elevation: 10 }, ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 } }) 
  },
  timerCircleActive: { borderWidth: 2, borderColor: colors.primary },
  timerText: { fontSize: 64, fontWeight: '200', color: colors.text, fontVariant: ['tabular-nums'] },
  statusText: { fontSize: 14, letterSpacing: 2, color: '#B2BEC3', marginTop: 10, fontWeight: '600' },

  // Time Options
  timeBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  timeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeBtnText: { color: colors.subtext, fontWeight: '600' },
  timeBtnTextActive: { color: '#fff' },
  addBtnCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' },

  // Controls
  statsRow: { flexDirection: 'row', marginBottom: 30, alignItems: 'center', gap: 8 },
  statLabel: { color: colors.warning, fontWeight: '600' },
  btnRow: { flexDirection: 'row', alignItems: 'center', width: '100%', gap: 15, marginBottom: 20 },
  resetBtn: { width: 50, height: 50, backgroundColor: colors.surface, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.danger },

  // Summary
  summaryContainer: { width: '100%', alignItems: 'center', marginTop: 20 },
  summaryTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 15 },
  divider: { width: '100%', height: 1, backgroundColor: colors.divider, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
  summaryLabel: { fontSize: 16, color: colors.subtext },
  summaryValue: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  summaryBtnRow: { flexDirection: 'row', marginTop: 20, gap: 15, width: '100%' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: colors.surface, borderRadius: 20, padding: 24, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: colors.text },
  input: { borderBottomWidth: 1, borderBottomColor: colors.border, padding: 10, fontSize: 16, marginBottom: 20 },
  modalBtns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
});