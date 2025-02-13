import { ElementStates } from "../../types/element-states";
import { ListNode } from "./ListNode";

export interface IList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  length: number;
  prepend: (value: T) => void;
  append: (value: T) => void;
  shift: () => void;
  pop: () => void;
  reset: () => void;
  toArray: () => void;
  addByIndex: (value: T, ind: number, isAppend: boolean) => void;
  deleteByIndex: (ind: number) => void;
  resetToDefault: (setListValues: Function) => void;
}

export class List<T> implements IList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = -1;
  }

  private addToEmptyList = (value: T) => {
    const node = new ListNode<T>(value, ElementStates.Default);
    this.head = node;
    this.tail = node;
    this.length++;
    return this
  }

  prepend = (value: T) => {
    if (this.length === -1) {
      this.addToEmptyList(value);
      return
    }
    const node = new ListNode<T>(value, ElementStates.Default, this.head);
    this.head = node;
    this.length++;
    return this
  }

  append = (value: T) => {
    if (this.tail === null) {
      this.addToEmptyList(value);
      return
    }
    const node = new ListNode<T>(value, ElementStates.Default);
    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this
  }

  shift = () => {
    if (this.length === -1) {
      return this
    }

    if (this.head !== null) {
      //Если один элелемент, то голова и хвост null.
      if (this.length === 0) {
        this.reset();
        return
      }
      //Если элементы еще есть, то head помещается на следующий элемент.
      this.head = this.head.next;
      this.length--;
    }
  }

  pop = () => {
    //Если список пустой.
    if (this.length === -1) {
      return this
    }

    let currentNode = this.head;
    //Если элемент один в списке, то обнуляем head и tail.
    if (this.length === 0) {
      this.reset();
      return this
    }
    //Если список не пустой, то ищем элемент ссылающийся на tail.
    while (currentNode) {
      //Если элемент ссылается на tail, то делаем его tail и его next обнуляем.
      if (currentNode.next === this.tail) {
        this.tail = currentNode;
        currentNode.next = null;
        this.length--;
        return this
      }
      //Перебираем элементы в цикле while выше.
      currentNode = currentNode.next;
    }
  }

  reset = () => {
    this.head = null;
    this.tail = null;
    this.length = -1;
  }

  toArray = () => {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  addByIndex = (value: T, ind: number, isAppend: boolean = true) => {
    //Если список пустой.
    if (this.length === -1 || ind > this.length || ind < 0) {
      return this
    }
    //Если добавлять в начало списка по индексу 0.
    if (ind === 0) {
      this.prepend(value);
      return this
    }
    //Если добавлять в конец списка.
    if (ind === this.length && isAppend) {
      this.append(value);
      return this
    }
    //При добавлении по индексу между head и tail.
    let currentInd = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (currentInd + 1 === ind) {
        const node = new ListNode<T>(value, ElementStates.Default, currentNode.next);
        currentNode.next = node;
        this.length++;
        return this
      }
      currentNode = currentNode.next;
      currentInd++;
    }
    return this
  }

  //Удаление по индексу.
  deleteByIndex = (ind: number) => {
    //Если список пустой.
    if (this.length === -1 || ind > this.length || ind < 0) {
      return this
    }
    //Если начало списка.
    if (ind === 0) {
      this.shift();
    }
    //Если конец списка.
    if (ind === this.length) {
      this.pop();
    }
    let currentInd = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (currentInd + 1 === ind) {
        const nodeForDelete = currentNode.next;
        if (nodeForDelete) {
          currentNode.next = nodeForDelete.next
          this.length--;
          return this
        }
      }
      currentNode = currentNode.next;
      currentInd++;
    }
    return this
  }

  resetToDefault = (setListValues: Function) => {
    let currentNode = this.head;
    while (currentNode) {
      currentNode.state = ElementStates.Default;
      currentNode = currentNode.next;
    }
    setListValues(this.toArray)
  }
}
