import { groupTransactionsByDate } from '../src/utils/groupTransactionsByDate';
import { Transaction } from '../src/types/transaction';

describe('groupTransactionsByDate', () => {
  it('groups transactions with the same date together', () => {
    const transactions: Transaction[] = [
      {
        refId: '1',
        transferDate: '2024-10-15T12:00:00Z',
        recipientName: 'John',
        transferName: 'Transfer',
        amount: 100,
      },
      {
        refId: '2',
        transferDate: '2024-10-15T14:00:00Z',
        recipientName: 'Jane',
        transferName: 'Transfer',
        amount: 200,
      },
    ];

    const sections = groupTransactionsByDate(transactions);

    expect(sections).toHaveLength(1);
    expect(sections[0].data).toHaveLength(2);
  });
});
