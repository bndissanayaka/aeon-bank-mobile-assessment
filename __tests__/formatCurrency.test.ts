import { formatCurrency } from '../src/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats a positive MYR amount', () => {
    const result = formatCurrency(1500);

    expect(result).toContain('1,500.00');
  });

  it('formats a negative MYR amount', () => {
    const result = formatCurrency(-500);

    expect(result).toContain('500.00');
    expect(result).toContain('-');
  });
});
