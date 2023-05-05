export class Dollar {
  constructor(public value: number) {}

  times(num: number) {
    this.value = this.value * num;
    return this.value;
  }
}
