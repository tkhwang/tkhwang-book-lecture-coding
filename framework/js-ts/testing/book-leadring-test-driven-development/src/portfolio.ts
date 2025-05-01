import { ICurrency, Money } from "./money";

const EURO_TO_USD_RATE = 1.2;

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
    if (money.currency === currency) {
      return money.amount;
    }

    return money.amount * EURO_TO_USD_RATE;
  }
}
