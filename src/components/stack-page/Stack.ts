interface IStack<T> {
  pop: () => void;
  push: (newvalue: T) => void;
  resetStack: () => void;
}

export class Stack<T> implements IStack<T>{
  values: Array<T>;
  constructor() {
    this.values = []
  }

  async pop() {
    this.values.pop();
  }

  async push(newvalue: T) {
    this.values.push(newvalue);
  }

  resetStack() {
    this.values.length = 0;
  }
}
