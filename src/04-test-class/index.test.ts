// Uncomment the code below and write your tests
import {
  BankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError
} from "./index";

describe("BankAccount", () => {
  test("should create account with initial balance", () => {
    const bankAccount = new BankAccount(100);

    expect(bankAccount.getBalance()).toBe(100);
  });

  test("should throw InsufficientFundsError error when withdrawing more than balance", () => {
    const bankAccount = new BankAccount(100);
    const insufficientFundsError = new InsufficientFundsError(bankAccount.getBalance());

    expect(() => bankAccount.withdraw(200)).toThrowError(insufficientFundsError);
  });

  test("should throw error when transferring more than balance", () => {
    const firstBankAccount = new BankAccount(100);
    const secondBankAccount = new BankAccount(0);
    const insufficientFundsError = new InsufficientFundsError(firstBankAccount.getBalance());

    expect(() => firstBankAccount.transfer(200, secondBankAccount)).toThrowError(insufficientFundsError);
  });

  test("should throw error when transferring to the same account", () => {
    const bankAccount = new BankAccount(100);

    expect(() => bankAccount.transfer(100, bankAccount)).toThrowError(TransferFailedError);
  });

  test("should deposit money", () => {
    const bankAccount = new BankAccount(100);
    bankAccount.deposit(200);

    expect(bankAccount.getBalance()).toBe(300);
  });

  test("should withdraw money", () => {
    const bankAccount = new BankAccount(200);
    bankAccount.withdraw(100);

    expect(bankAccount.getBalance()).toBe(100);
  });

  test("should transfer money", () => {
    const firstBankAccount = new BankAccount(1000);
    const secondBankAccount = new BankAccount(500);
    firstBankAccount.transfer(200, secondBankAccount);

    expect(firstBankAccount.getBalance()).toBe(800);
    expect(secondBankAccount.getBalance()).toBe(700);
  });

  test("fetchBalance should return number in case if request did not failed", async () => {
    const bankAccount = new BankAccount(0);
    const currentBalance = await bankAccount.fetchBalance();

    expect(typeof currentBalance).toBe("number");
  });

  test("should set new balance if fetchBalance returned number", async () => {
    const bankAccount = new BankAccount(0);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).not.toBe(0);
  });

  test("should throw SynchronizationFailedError if fetchBalance returned null", async () => {
    const bankAccount = new BankAccount(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
