import { Money } from "./money";

export class Franc extends Money {
  constructor(private amount: number) {
    super();
  }

  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }

  equals(obj: any) {
    if (obj instanceof Franc) {
      return this.amount === obj.amount;
    }
    throw new Error("[-] Wrong object type in equals() method");
  }
}
