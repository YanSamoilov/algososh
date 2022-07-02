import { numsProps } from "../types/data";
import { ElementStates } from "../types/element-states";
import { swap } from "./utils";

//Сортировка пузырьком.
export const bubbleSorting = (
  direction: "ascending" | "descending",
  arrayToSort: Array<numsProps>,
  step?: number
): { resultArray: Array<numsProps>; numberOfSteps: number } => {
  const arr = [...arrayToSort];
  arr.forEach((el) => (el.state = ElementStates.Default));
  const { length } = arr;
  let count = 0;
  let isSwapped: boolean;
  do {
    isSwapped = false;
    for (let i = 0; i < length - 1; i++) {
      // Поменять стейт выбранных элементов.
      arr[i].state = ElementStates.Changing;
      arr[i + 1].state = ElementStates.Changing;
      count++;
      if (step && step === count)
        return { resultArray: arr, numberOfSteps: count };
      if (
        (direction === "ascending" ? arr[i].num : arr[i + 1].num) >
        (direction === "ascending" ? arr[i + 1].num : arr[i].num)
      ) {
        arr[i].state = ElementStates.Active;
        arr[i + 1].state = ElementStates.Active;
        count++;
        if (step && step === count)
          return { resultArray: arr, numberOfSteps: count };
          swap(arr, i, i + 1);
        arr[i].state = ElementStates.Active;
        arr[i + 1].state = ElementStates.Active;
        count++;
        if (step && step === count)
          return { resultArray: arr, numberOfSteps: count };
          isSwapped = true;
      }
      arr[i].state = ElementStates.Default;
      arr[i + 1].state = ElementStates.Default;
    }
  } while (isSwapped);
  arr.forEach((el) => (el.state = ElementStates.Modified));
  return { resultArray: arr, numberOfSteps: count };
};

// //Сортировка выбором.
export const choiceSorting = (
  direction: "ascending" | "descending",
  arrayToSort: Array<numsProps>,
  step?: number
): { resultArray: Array<numsProps>; numberOfSteps: number } => {
  const arr = [...arrayToSort];
  arr.forEach((el) => (el.state = ElementStates.Default));
  const { length } = arr;
  let count = 0;
  for (let i = 0; i < length; i++) {
    let swapInd = i;
    arr[i].state = ElementStates.Active;
    count++;
    if (step && step === count)
      return { resultArray: arr, numberOfSteps: count };
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      count++;
      if (step && step === count)
        return { resultArray: arr, numberOfSteps: count };
      if (
        (direction === "ascending" ? arr[swapInd].num : arr[j].num) >
        (direction === "ascending" ? arr[j].num : arr[swapInd].num)
      ) {
        arr[j].state = ElementStates.Active;
        arr[swapInd].state =
          i === swapInd ? ElementStates.Active : ElementStates.Default;
        swapInd = j;
        count++;
        if (step && step === count)
          return { resultArray: arr, numberOfSteps: count };
      }
      if (j !== swapInd) arr[j].state = ElementStates.Default;
    }
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified;
      count++;
      if (step && step === count)
        return { resultArray: arr, numberOfSteps: count };
    }
    else {
      swap(arr, i, swapInd);
      arr[i].state = ElementStates.Modified;
      count++;
      if (step && step === count)
        return { resultArray: arr, numberOfSteps: count };

      arr[swapInd].state = ElementStates.Default;
      count++;
      if (step && step === count)
        return { resultArray: arr, numberOfSteps: count };
    }
  }
  return { resultArray: arr, numberOfSteps: count };
};

export const randomArr = (setNumsSorting: Function) => {
  let premNums = [];
  const countNums = Math.floor(Math.random() * 14 + 3);
  for (let i = 0; i < countNums; i++) {
    premNums.push({
      num: Math.floor(Math.random() * 101),
      state: ElementStates.Default
    });
  }
  setNumsSorting([...premNums]);
}
