import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
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
    color: '#1A1A1A',
    marginBottom: 4,
  },
  recipient: {
    fontSize: 14,
    color: '#5C5C5C',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positiveAmount: {
    color: '#1B7F3A',
  },
  negativeAmount: {
    color: '#C62828',
  },
});
