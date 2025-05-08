// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(5);
  const newBankAccount = getBankAccount(10);

  // beforeEach(() => {
  //   // Reset all mocks before each test to ensure clean state
  //   jest.restoreAllMocks();
  // });
  // const getBalanceSpy = jest.spyOn(bankAccount, 'getBalance');
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(8)).toThrow(
      'Insufficient funds: cannot withdraw more than 5',
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(8, newBankAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 5',
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(4, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(4);
    expect(bankAccount.getBalance()).toEqual(9);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(4);
    expect(bankAccount.getBalance()).toEqual(5);
  });

  test('should transfer money', () => {
    bankAccount.transfer(4, newBankAccount);
    expect(bankAccount.getBalance()).toEqual(1);
    expect(newBankAccount.getBalance()).toEqual(14);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');
    // const testBankAccount = getBankAccount(85);
    // await expect(testBankAccount.fetchBalance()).resolves.toBeLessThanOrEqual(
    //   100,
    // );
    // await expect(
    //   testBankAccount.fetchBalance(),
    // ).resolves.toBeGreaterThanOrEqual(2);
    // const mockMath = Object.create(global.Math);
    // mockMath.random = () => 50;
    // global.Math = mockMath;
    // // jest.spyOn(global.Math, 'random').mockReturnValue(50);
    // const balance = await bankAccount.fetchBalance();
    // expect(balance).toEqual(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // const balance = await bankAccount.fetchBalance();
    // await expect(bankAccount.fetchBalance()).resolves.toEqual(
    //   bankAccount.getBalance(),
    // );
    // const testBankAccount = getBankAccount(85);
    // await expect(testBankAccount.synchronizeBalance()).resolves.toEqual(
    //   testBankAccount.getBalance(),
    // );
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // const testBankAccount = getBankAccount(0);
    // await expect(testBankAccount.fetchBalance()).toBeNull();
    // const balance = await bankAccount.synchronizeBalance();
    // expect(balance).toBeNull();
    // expect(() => )
  });
});
