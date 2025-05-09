import { getBankAccount } from '.';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(5);
  const newBankAccount = getBankAccount(10);

  test('should create account with initial balance', () => {
    expect(getBankAccount(5).getBalance()).toBe(5);
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
    const balance = await bankAccount.fetchBalance();
    if (balance) {
      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockImplementation(async () => 15);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(15);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockImplementation(async () => null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
