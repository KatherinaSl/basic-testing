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
  it.each(testCases)('simpleCalculator(%s)', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
