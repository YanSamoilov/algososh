import { ElementStates } from "../../types/element-states";

export interface IListNode<T> {
  value: T;
  next: ListNode<T> | null;
  state: ElementStates;
}

export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  state: ElementStates;
  constructor(value: T, state: ElementStates, next?: ListNode<T> | null) {
    this.value = value;
    this.state = state;
    this.next = (next === undefined ? null : next);
  }
}
