import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { symbolProps } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { awaitingChanges } from "../../utils/utils";

export class Queue {
  values: Array<symbolProps>;
  head: number;
  tail: number;
  constructor(num: number) {
    this.values = Array.from({ length: num }, () => {
      return {
        symbol: "",
        state: ElementStates.Default,
      }
    });
    this.head = -1;
    this.tail = -1;
  }

  isEmpty = () => {
    return this.head === -1;
  }

  private isEmptyElem = (ind: number) => {
    return !this.values[ind].symbol;
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

  async enqueue(newvalue: string, setStackValues: Function) {
    //Добавить в пустую очередь первое значение.
    if (this.isEmpty()) {
      this.values[0] = { symbol: newvalue, state: ElementStates.Changing }
      setStackValues([...this.values])
      await awaitingChanges(SHORT_DELAY_IN_MS);
      this.values[0] = { symbol: newvalue, state: ElementStates.Default }
      this.setHead(0);
      this.setTail(0);
    }
    //Добавить значение в 0 индекс при заполнении очереди до конца.
    else if (this.getTail() === this.values.length - 1 && this.isEmptyElem(0)) {
      this.values[0] = { symbol: newvalue, state: ElementStates.Changing }
      setStackValues([...this.values])
      await awaitingChanges(SHORT_DELAY_IN_MS);
      this.values[0] = { symbol: newvalue, state: ElementStates.Default }
      this.setTail(0);
    }
    //Добавить значение в следующий индекс.
    else if (this.getTail() + 1 < this.values.length && this.isEmptyElem(this.getTail() + 1)) {
      this.values[this.getTail() + 1] = { symbol: newvalue, state: ElementStates.Changing }
      setStackValues([...this.values])
      await awaitingChanges(SHORT_DELAY_IN_MS);
      this.values[this.getTail() + 1] = { symbol: newvalue, state: ElementStates.Default }
      this.setTail(this.getTail() + 1);
    }
    setStackValues([...this.values])
  }

  async dequeue(setStackValues: Function) {
    //Анимация элементов.
    this.values[this.getHead()].state = ElementStates.Changing;
    setStackValues([...this.values])
    await awaitingChanges(SHORT_DELAY_IN_MS);
    this.values[this.getHead()].state = ElementStates.Default;
    //Удаление последнего значения.
    if (this.getHead() === this.getTail()) {
      this.values[this.getHead()].symbol = "";
      this.setTail(-1);
      this.setHead(-1);
      setStackValues([...this.values]);
    }
    //Удаление следующего значения.
    else if (this.getHead() !== -1 && this.getHead() + 1 < this.values.length) {
      this.values[this.getHead()].symbol = "";
      this.setHead(this.getHead() + 1)
      setStackValues([...this.values]);
    }
    //Удаление последнего значения с переходом на нулевой индекс.
    else if (this.getHead() === this.values.length - 1) {
      this.values[this.getHead()].symbol = "";
      this.setHead(0);
      setStackValues([...this.values]);
    }
  }

  clear(setStackValues: Function) {
    if (!this.isEmpty()) {
      this.values.map((el) => el.symbol = "")
      this.setHead(-1);
      this.setTail(-1);
    }
    setStackValues([...this.values]);
  }
}
