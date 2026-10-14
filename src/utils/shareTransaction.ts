import { Share } from 'react-native';

import { Transaction } from '../types/transaction';
import { formatCurrency } from './formatCurrency';
import { formatTransactionDateTime } from './formatDate';

export const shareTransaction = async (
  transaction: Transaction,
): Promise<void> => {
  const message = [
    'Transaction Details',
    '',
    `Reference ID: ${transaction.refId}`,
    `Transaction: ${transaction.transferName}`,
    `Recipient: ${transaction.recipientName}`,
    `Date: ${formatTransactionDateTime(transaction.transferDate)}`,
    `Amount: ${formatCurrency(transaction.amount)}`,
  ].join('\n');

  await Share.share({
    message,
  });
};
