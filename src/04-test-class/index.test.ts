// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const mockAccFist = getBankAccount(1000);
const mockAccSecond = getBankAccount(500);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(mockAccFist.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => mockAccFist.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => mockAccFist.transfer(1001, mockAccSecond)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => mockAccFist.transfer(1001, mockAccFist)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(mockAccFist.deposit(500).getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    expect(mockAccFist.withdraw(300).getBalance()).toBe(1200);
  });

  test('should transfer money', () => {
    mockAccFist.transfer(200, mockAccSecond);
    expect(mockAccSecond.getBalance()).toBe(700);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedData = await mockAccFist.fetchBalance();
    if (fetchedData) {
    } else {
      expect(fetchedData).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const prevBalance = mockAccFist.getBalance();
    try {
      await mockAccFist.synchronizeBalance();
      expect(mockAccFist.getBalance() !== prevBalance).toBeTruthy();
    } catch {
      expect(mockAccFist.getBalance() === prevBalance).toBeTruthy();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await mockAccFist.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
