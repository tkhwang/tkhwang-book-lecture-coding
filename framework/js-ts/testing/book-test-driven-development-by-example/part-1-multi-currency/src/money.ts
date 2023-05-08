export class Money {
  constructor(protected amount: number) {}

  equals(obj: any) {
    if (!(obj instanceof Money)) {
      throw new Error("[-] Wrong object type in equals() method");
    }
    if (this.constructor !== obj.constructor) {
      throw new Error("[-] trying to compare different classes.");
    }

    const money = <Money>obj;
    return this.amount === obj.amount;
  }
}
