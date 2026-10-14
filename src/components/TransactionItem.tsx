import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/formatCurrency';
import { formatTransactionDate } from '../utils/formatDate';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: () => void;
}

export const TransactionItem = ({
  transaction,
  onPress,
}: TransactionItemProps) => {
  const isPositive = transaction.amount >= 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.transferName}, ${
        transaction.recipientName
      }, ${formatCurrency(transaction.amount)}`}
    >
      <View style={styles.details}>
        <Text style={styles.title}>{transaction.transferName}</Text>

        <Text style={styles.recipient}>{transaction.recipientName}</Text>

        <Text style={styles.date}>
          {formatTransactionDate(transaction.transferDate)}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          isPositive ? styles.positiveAmount : styles.negativeAmount,
        ]}
      >
        {isPositive ? '+' : ''}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.surface,
    borderBottomColor: COLORS.border,
  },
  pressed: {
    opacity: 0.7,
  },
  details: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  recipient: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSubtle,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positiveAmount: {
    color: COLORS.success,
  },
  negativeAmount: {
    color: COLORS.error,
  },
});
