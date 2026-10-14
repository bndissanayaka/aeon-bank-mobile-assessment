import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    borderBottomColor: '#E5E5E5',
  },
  label: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});
