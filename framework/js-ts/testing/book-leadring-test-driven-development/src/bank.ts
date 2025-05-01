import { ICurrency, Money } from "./money";

export class Bank {
  exchangeRates: Map<string, number>;

  constructor() {
    this.exchangeRates = new Map();
  }

  addExchangeRate(from: ICurrency, to: ICurrency, rate: number) {
    const key = `${from}->${to}`;
    this.exchangeRates.set(key, rate);
  }

  convert(money: Money, currency: ICurrency) {
    if (money.currency === currency) return new Money(money.amount, currency);

    const key = `${money.currency}->${currency}`;
    const rate = this.exchangeRates.get(key);
    if (!rate) throw new Error(`${key}`);

    return new Money(money.amount * rate, currency);
  }
}
