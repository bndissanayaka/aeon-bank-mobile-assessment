import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DetailRow } from '../components/DetailRow';
import { RootStackParamList } from '../navigation/types';
import { useTransactionStore } from '../store/transactionStore';
import { formatCurrency } from '../utils/formatCurrency';
import { formatTransactionDateTime } from '../utils/formatDate';
import { shareTransaction } from '../utils/shareTransaction';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen = ({ route }: Props) => {
  const { transactionId } = route.params;

  const transaction = useTransactionStore(state =>
    state.getTransactionById(transactionId),
  );

  if (!transaction) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorTitle}>Transaction not found</Text>

        <Text style={styles.errorText}>
          The transaction details are unavailable.
        </Text>
      </View>
    );
  }

  const isPositive = transaction.amount >= 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Text style={styles.transferName}>{transaction.transferName}</Text>

        <Text
          style={[
            styles.amount,
            isPositive ? styles.positiveAmount : styles.negativeAmount,
          ]}
        >
          {isPositive ? '+' : ''}
          {formatCurrency(transaction.amount)}
        </Text>
      </View>

      <View style={styles.detailsCard}>
        <DetailRow label={STRINGS.refId} value={transaction.refId} />

        <DetailRow
          label={STRINGS.recipient}
          value={transaction.recipientName}
        />

        <DetailRow
          label={STRINGS.transferDate}
          value={formatTransactionDateTime(transaction.transferDate)}
        />

        <DetailRow
          label={STRINGS.transferAmount}
          value={formatCurrency(transaction.amount)}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.shareButton,
          pressed && styles.shareButtonPressed,
        ]}
        onPress={() => {
          shareTransaction(transaction).catch(error => {
            console.error(STRINGS.failedToShareTransaction, error);
          });
        }}
        accessibilityRole="button"
        accessibilityLabel={STRINGS.shareTranscDetails}
      >
        <Text style={styles.shareButtonText}>{STRINGS.shareTransc}</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  summary: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  transferName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
  },
  positiveAmount: {
    color: COLORS.success,
  },
  negativeAmount: {
    color: COLORS.error,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.error,
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  shareButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: COLORS.buttonPrimary,
    alignItems: 'center',
  },
  shareButtonPressed: {
    opacity: 0.8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.buttonText,
  },
});
