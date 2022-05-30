import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { symbolProps } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { awaitingChanges } from "../../utils/utils";

export class Stack {
  values: Array<symbolProps>;
  constructor() {
    this.values = []
  }

  async pop(setStackValues: Function) {
    this.values[this.values.length - 1].state = ElementStates.Changing;
    setStackValues([...this.values]);
    await awaitingChanges(SHORT_DELAY_IN_MS);
    this.values.pop();
    setStackValues([...this.values]);
  }

  async push(newvalue: string, setStackValues: Function) {
    let elemToPush = {
      state: ElementStates.Changing,
      symbol: newvalue
    }
    this.values.push(elemToPush);
    setStackValues([...this.values]);
    await awaitingChanges(SHORT_DELAY_IN_MS);
    this.values[this.values.length - 1].state = ElementStates.Default;
    setStackValues([...this.values]);
  }

  resetStack(setStackValues: Function) {
    this.values.length = 0;
    setStackValues([...this.values]);
  }
}
