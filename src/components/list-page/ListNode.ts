export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  state: string;
  constructor(value: T, state: string, next?: ListNode<T> | null) {
    this.value = value;
    this.state = state;
    this.next = (next === undefined ? null : next);
  }
}
