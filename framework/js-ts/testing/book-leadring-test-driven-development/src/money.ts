export class Money {
  amount: number;
  currency: "USD" | "EUR" | "KRW";

  constructor(amount: number, currency: "USD" | "EUR" | "KRW") {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor: number): Money {
    if (divisor === 0) throw new Error("divisor is 0");

    return new Money(this.amount / divisor, this.currency);
  }

  equals(money: Money): boolean {
    return this.amount === money.amount && this.currency === money.currency;
  }
}
