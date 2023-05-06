export class Money {
  constructor(protected amount: number) {}

  equals(obj: any) {
    if (obj instanceof Money) {
      const money = <Money>obj;
      return this.amount === obj.amount;
    }
    throw new Error("[-] Wrong object type in equals() method");
  }
}
