interface IQueue<T> {
  enqueue: (newvalue: T) => void;
  dequeue: () => void;
  isEmpty: () => boolean;
  isEmptyElem: (ind: number) => boolean;
  getTail: () => number;
  getHead: () => number;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  values: Array<T | string>;
  head: number;
  tail: number;
  constructor(num: number) {
    this.values = Array(num).fill("");
    this.head = -1;
    this.tail = -1;
  }

  isEmpty = () => {
    return this.head === -1;
  }

  isEmptyElem = (ind: number) => {
    return !this.values[ind];
  }

  getTail = () => {
    return this.tail;
  }

  private setTail = (ind: number) => {
    this.tail = ind;
  }

  getHead = () => {
    return this.head;
  }

  private setHead = (ind: number) => {
    this.head = ind;
  }

  async enqueue(newvalue: T) {
    //Добавить в пустую очередь первое значение.
    if (this.isEmpty()) {
      this.values[0] = newvalue;
      this.setHead(0);
      this.setTail(0);
    }
    //Добавить значение в 0 индекс при заполнении очереди до конца.
    else if (this.getTail() === this.values.length - 1 && this.isEmptyElem(0)) {
      this.values[0] = newvalue;
      this.setTail(0);
    }
    // //Добавить значение в следующий индекс.
    else if (this.getTail() + 1 < this.values.length && this.isEmptyElem(this.getTail() + 1)) {
      this.values[this.getTail() + 1] = newvalue;
      this.setTail(this.getTail() + 1);
    }
  }

  async dequeue() {
    //Удаление последнего значения.
    if (this.getHead() === this.getTail()) {
      this.values[this.getHead()] = "";
      this.setTail(-1);
      this.setHead(-1);
    }
    //Удаление следующего значения.
    else if (this.getHead() !== -1 && this.getHead() + 1 < this.values.length) {
      this.values[this.getHead()] = "";
      this.setHead(this.getHead() + 1)
    }
    //Удаление последнего значения с переходом на нулевой индекс.
    else if (this.getHead() === this.values.length - 1) {
      this.values[this.getHead()] = "";
      this.setHead(0);
    }
  }

    clear() {
      if (!this.isEmpty()) {
        this.values.map((el) => el = "")
        this.setHead(-1);
        this.setTail(-1);
      }
    }
}
