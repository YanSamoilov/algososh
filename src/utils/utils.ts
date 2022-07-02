import { numsProps, symbolProps } from "../types/data";

export const awaitingChanges = async (millis: number) => new Promise(resolve => setTimeout(resolve, millis));

//Перестановка двух символов.
export const swap = (arr: Array<symbolProps | numsProps | string>, leftInd: number, rightInd: number) => {
    const temp = arr[leftInd];
    arr[leftInd] = arr[rightInd];
    arr[rightInd] = temp;
}
