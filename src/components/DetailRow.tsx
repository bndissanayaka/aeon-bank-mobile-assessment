import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
interface DetailRowProps {
  label: string;
  value: string;
}

export const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.buttonPrimary,
    fontWeight: '500',
  },
});
