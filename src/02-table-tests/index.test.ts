// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: '2', b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'calculate (%a, %b, %action)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
