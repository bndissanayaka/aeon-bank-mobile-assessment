import {
  formatTransactionDate,
  formatTransactionDateTime,
} from '../src/utils/formatDate';

describe('transaction date formatting', () => {
  it('formats a short transaction date', () => {
    const result = formatTransactionDate('2024-10-15T12:34:56Z');

    expect(result).toContain('Oct');
    expect(result).toContain('2024');
  });

  it('formats a detailed transaction date and time', () => {
    const result = formatTransactionDateTime('2024-10-15T12:34:56Z');

    expect(result).toContain('October');
    expect(result).toContain('2024');
  });
});
