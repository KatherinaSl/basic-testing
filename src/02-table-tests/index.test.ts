// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  {
    a: 2,
    b: 2,
    action: Action.Exponentiate,
    expected: 4,
  },
  { a: 2, b: 2, action: '%', expected: null },
  { a: null, b: 2, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // test('should blah-blah', () => {
  //   expect(true).toBe(true);
  // });
  // Consider to use Jest table tests API to test all cases above
  it.each(testCases)('simpleCalculator(%s)', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
