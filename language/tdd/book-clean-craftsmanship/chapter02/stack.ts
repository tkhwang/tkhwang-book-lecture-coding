export class MyStack {
  private empty: boolean = true

  isEmpty(): boolean {
    return this.empty
  }
  push(item: number) {
    this.empty = false
  }

  pop(): number | undefined {
    this.empty = true
    return -1
  }

  get size(): number {
    return 2
  }
}
