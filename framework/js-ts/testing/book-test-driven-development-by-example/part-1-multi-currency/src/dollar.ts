import { Money } from "./money";

export class Dollar extends Money {
  constructor(private amount: number) {
    super();
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }

  equals(obj: any) {
    if (obj instanceof Dollar) {
      return this.amount === obj.amount;
    }
    throw new Error("[-] Wrong object type in equals() method");
  }
}
