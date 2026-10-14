import { getTransactions } from '../src/api/transactionApi';

describe('getTransactions', () => {
  it('returns transactions sorted from latest to oldest', async () => {
    const transactions = await getTransactions();

    expect(transactions.length).toBeGreaterThan(0);

    for (let index = 0; index < transactions.length - 1; index++) {
      const currentDate = new Date(transactions[index].transferDate).getTime();

      const nextDate = new Date(transactions[index + 1].transferDate).getTime();

      expect(currentDate).toBeGreaterThanOrEqual(nextDate);
    }
  });
});
