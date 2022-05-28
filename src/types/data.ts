import { ElementStates } from "./element-states";

export interface symbolProps {
    symbol: string;
    state: ElementStates;
}

export interface numsProps {
    num: number;
    state: ElementStates;
}

export type pagesArrayProps = symbolProps | numsProps;