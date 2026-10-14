import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';

interface DetailRowProps {
  label: string;
  value: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const DetailRow = ({
  label,
  value,
  actionLabel,
  onActionPress,
}: DetailRowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>

        {actionLabel && onActionPress && (
          <Pressable
            onPress={onActionPress}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
          >
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
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
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  action: {
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
