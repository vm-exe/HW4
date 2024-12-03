import { sum, multiply} from '../src/utils/math';

describe('Math Utilities', () => {
  test('sum adds numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('multiply multiplies numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
