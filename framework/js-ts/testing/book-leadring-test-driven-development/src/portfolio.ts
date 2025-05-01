import { ICurrency, Money } from "./money";

const EURO_TO_USD_RATE = 1.2;

const exchangeRates = new Map<string, number>();
exchangeRates.set("EUR->USD", 1.2);
exchangeRates.set("USD->KRW", 1100);

export class Portfolio {
  moneys: Money[] = [];

  constructor() {}

  add(...moneys: Money[]) {
    this.moneys.push(...moneys);
  }

  evaluate(currency: ICurrency) {
    const total = this.moneys.reduce((sum, money) => {
      return sum + this.convert(money, currency);
    }, 0);

    return new Money(total, currency);
  }

  convert(money: Money, currency: ICurrency) {
    if (money.currency === currency) return money.amount;

    const key = `${money.currency}->${currency}`;
    const rate = exchangeRates.get(key);

    if (!rate) throw new Error(key);

    return money.amount * rate;
  }
}
