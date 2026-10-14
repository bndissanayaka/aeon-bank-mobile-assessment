import { mockTransactionResponse } from '../mocks/transactions';
import { Transaction } from '../types/transaction';

const MOCK_API_DELAY = 500;

export const getTransactions = async (): Promise<Transaction[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, MOCK_API_DELAY));

  return [...mockTransactionResponse.data].sort(
    (a, b) =>
      new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime(),
  );
};
