import { ElementStates } from "./element-states";

export interface symbolProps {
    symbol: string;
    state: ElementStates;
}

export interface numsProps {
    num: number;
    state: ElementStates;
}

export interface stringCharsProps {
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  tail?: string;
  head?: string;
  char?: string;
  state: ElementStates;
  extraCircle?: {
    char: string;
  }
}

export type pagesArrayProps = symbolProps | numsProps;
