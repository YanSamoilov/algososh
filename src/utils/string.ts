import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { symbolProps } from "../types/data";
import { ElementStates } from "../types/element-states";
import { changeState } from "./change-status";
import { awaitingChanges, swap } from "./utils";

  //Переставить символы с анимацией.
  // export const recursion = async (arr: Array<symbolProps>, setCharArr: Function) => {
  //   let end = arr.length - 1;
  //   for (let start = 0; start <= end; start++) {
  //     if (start === end) {
  //       changeState(arr, ElementStates.Changing, start, setCharArr);
  //       await awaitingChanges(250);
  //       changeState(arr, ElementStates.Modified, start, setCharArr);
  //     }
  //     changeState(arr, ElementStates.Changing, start, setCharArr, end);
  //     await awaitingChanges(SHORT_DELAY_IN_MS);
  //     swap(arr, start, end);
  //     changeState(arr, ElementStates.Modified, start, setCharArr, end);
  //     await awaitingChanges(SHORT_DELAY_IN_MS);
  //     end--;
  //   }
  // }

  export const swappingStrings = (arr: Array<symbolProps>) => {
    let stringsEachSteps = [arr];
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      // if (start === end) {
      //   stringsEachSteps.push(arr);
      //   break;
      // }
      debugger
      swap(arr, start, end);
      stringsEachSteps.push(arr);
      console.log(stringsEachSteps);
      end--;
    }
    // console.log(stringsEachSteps);

    return stringsEachSteps
  }
