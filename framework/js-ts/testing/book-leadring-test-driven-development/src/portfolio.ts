import { ICurrency, Money } from "./money";

export class Portfolio {
  moneys: Money[] = [];

  constructor() {}

  add(...moneys: Money[]) {
    this.moneys.push(...moneys);
  }

  evaluate(currency: ICurrency) {
    const total = this.moneys.reduce((sum, money) => {
      return sum + money.amount;
    }, 0);

    return new Money(total, currency);
  }
}
