export class MyStack {
  private empty: boolean = true

  isEmpty(): boolean {
    return this.empty
  }
  push(item: number) {
    this.empty = false
  }
}
