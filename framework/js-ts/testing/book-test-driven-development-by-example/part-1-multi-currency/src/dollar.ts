export class Dollar {
  public value: number;
  constructor(value: number) {
    this.value = value;
  }

  times(num: number) {
    this.value = this.value * num;
    return this.value;
  }
}
