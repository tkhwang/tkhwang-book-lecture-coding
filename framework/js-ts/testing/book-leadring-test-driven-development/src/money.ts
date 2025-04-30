export class Money {
  amount: number;
  currency: "USD" | "EUR";

  constructor(amount: number, currency: "USD" | "EUR") {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }
}
