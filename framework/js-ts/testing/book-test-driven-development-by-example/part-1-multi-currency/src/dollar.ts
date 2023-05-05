export class Dollar {
  constructor(public amount: number) {}

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
