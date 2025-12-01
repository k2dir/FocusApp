import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export default function AppButton({ onPress, title, icon, color = colors.primary, outline = false, style }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.button, 
        outline ? { borderWidth: 1, borderColor: color, backgroundColor: 'transparent' } : { backgroundColor: color },
        style
      ]}
    >
      {icon && <Ionicons name={icon} size={20} color={outline ? color : '#fff'} style={{ marginRight: 8 }} />}
      <Text style={[styles.text, { color: outline ? color : '#fff' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});