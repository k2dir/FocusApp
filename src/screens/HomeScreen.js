import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Logic & Components
import { useHomeLogic } from '../hooks/useHomeLogic';
import { homeStyles as styles } from '../styles/homeStyles';
import { colors } from '../styles/colors';
import Card from '../components/Card';
import AppButton from '../components/AppButton';

export default function HomeScreen() {
  const {
    timeLeft, initialTime, isActive, focusLoss, mode,
    category, categories, timeOptions, setCategory,
    toggleTimer, resetTimer, changeDuration, saveCurrentSession,
    addCategory, addTimer, deleteItem
  } = useHomeLogic();

  // Modal State (View only state)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('category');
  const [inputText, setInputText] = useState('');

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleAdd = () => {
    if (!inputText.trim()) return;
    if (modalType === 'category') addCategory(inputText.trim());
    else addTimer(parseInt(inputText));
    setModalVisible(false); setInputText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Deep Focus</Text>

        {/* Categories */}
        <View style={styles.catWrapper}>
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={categories} keyExtractor={i=>i} contentContainerStyle={styles.catList}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.catPill, category === item && styles.catPillActive]} 
                onPress={() => { Haptics.selectionAsync(); setCategory(item); }} 
                onLongPress={() => deleteItem(item, 'cat', ['Study','Coding','Reading'])} disabled={mode !== 'idle'}>
                <Text style={[styles.catText, category === item && styles.catTextActive]}>{item}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.addBtn} onPress={() => {setModalType('category'); setModalVisible(true);}} disabled={mode !== 'idle'}>
                <Ionicons name="add" size={20} color={colors.primary} />
              </TouchableOpacity>
            }
          />
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <View style={[styles.timerCircle, isActive && styles.timerCircleActive]}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.statusText}>{mode === 'running' ? 'FOCUSING' : (mode === 'idle' ? 'READY' : 'PAUSED')}</Text>
          </View>
        </View>

        {/* Time Options (Idle Only) */}
        {mode === 'idle' && (
          <View style={{height: 60, marginBottom: 20}}>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={timeOptions} keyExtractor={i=>i.toString()} contentContainerStyle={{paddingHorizontal:10, gap:10}}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.timeBtn, initialTime === item * 60 && styles.timeBtnActive]} 
                  onPress={() => changeDuration(item)} onLongPress={() => deleteItem(item, 'time', [15,25,45,60])}>
                  <Text style={[styles.timeBtnText, initialTime === item * 60 && styles.timeBtnTextActive]}>{item}m</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity style={styles.addBtnCircle} onPress={() => {setModalType('timer'); setModalVisible(true);}}>
                   <Ionicons name="add" size={24} color={colors.subtext} />
                </TouchableOpacity>
              }
            />
          </View>
        )}

        {/* Stats (Active) */}
        {mode !== 'idle' && (
          <View style={styles.statsRow}>
            <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
            <Text style={styles.statLabel}>Distractions: {focusLoss}</Text>
          </View>
        )}

        {/* Controls */}
        {mode !== 'summary' && (
          <View style={styles.btnRow}>
            <AppButton title={isActive ? "Pause" : (mode === 'paused' ? "Resume" : "Start Focus")} onPress={toggleTimer} icon={isActive?"pause":"play"} color={isActive?colors.warning:colors.primary} style={{ flex: 1 }} />
            {mode !== 'idle' && (
              <TouchableOpacity style={styles.resetBtn} onPress={resetTimer}><Ionicons name="refresh" size={24} color={colors.danger} /></TouchableOpacity>
            )}
          </View>
        )}

        {/* Summary Card */}
        {(mode === 'paused' || mode === 'summary') && (
          <View style={styles.summaryContainer}>
            <Card style={{ width: '100%' }}>
              <Text style={styles.summaryTitle}>{mode === 'summary' ? 'Session Complete' : 'Paused'}</Text>
              <View style={styles.divider} />
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Category</Text><Text style={styles.summaryValue}>{category}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Time</Text><Text style={styles.summaryValue}>{formatTime(initialTime - timeLeft)}</Text></View>
              <View style={styles.summaryBtnRow}>
                <AppButton title="Discard" onPress={resetTimer} icon="trash-outline" color={colors.danger} outline style={{ flex: 1 }} />
                <AppButton title="Save" onPress={saveCurrentSession} icon="checkmark-circle" color={colors.success} style={{ flex: 1 }} />
              </View>
            </Card>
          </View>
        )}

        <View style={{height:50}} />
        
        {/* Simple Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add {modalType === 'category' ? 'Category' : 'Timer'}</Text>
              <TextInput style={styles.input} placeholder={modalType === 'category' ? "Name..." : "Minutes..."} 
                keyboardType={modalType === 'timer' ? 'numeric' : 'default'} onChangeText={setInputText} autoFocus />
              <View style={styles.modalBtns}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{padding:10, marginRight:10}}><Text>Cancel</Text></TouchableOpacity>
                <AppButton title="Add" onPress={handleAdd} style={{height:40}} />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}