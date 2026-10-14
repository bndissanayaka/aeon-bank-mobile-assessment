import { create } from 'zustand';
import { getTransactions } from '../api/transactionApi';
import { Transaction } from '../types/transaction';
import { STRINGS } from '../constants/strings';
interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;

  fetchTransactions: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  getTransactionById: (refId: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  isRefreshing: false,
  error: null,

  fetchTransactions: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const transactions = await getTransactions();

      set({
        transactions,
        isLoading: false,
      });
    } catch {
      set({
        isLoading: false,
        error: STRINGS.unableToLoad,
      });
    }
  },

  refreshTransactions: async () => {
    try {
      set({
        isRefreshing: true,
        error: null,
      });

      const transactions = await getTransactions();

      set({
        transactions,
        isRefreshing: false,
      });
    } catch {
      set({
        isRefreshing: false,
        error: STRINGS.unableToRefresh,
      });
    }
  },

  getTransactionById: (refId: string) =>
    get().transactions.find(transaction => transaction.refId === refId),
}));
