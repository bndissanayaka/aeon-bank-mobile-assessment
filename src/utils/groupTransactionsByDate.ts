import { Transaction } from '../types/transaction';
import { formatTransactionDate } from './formatDate';

export interface TransactionSection {
  title: string;
  data: Transaction[];
}

export const groupTransactionsByDate = (
  transactions: Transaction[],
): TransactionSection[] => {
  const groups = transactions.reduce<Record<string, Transaction[]>>(
    (accumulator, transaction) => {
      const date = formatTransactionDate(transaction.transferDate);

      if (!accumulator[date]) {
        accumulator[date] = [];
      }

      accumulator[date].push(transaction);

      return accumulator;
    },
    {},
  );

  return Object.entries(groups).map(([title, data]) => ({
    title,
    data,
  }));
};
