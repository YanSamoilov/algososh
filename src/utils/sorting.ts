import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { numsProps } from "../types/data";
import { ElementStates } from "../types/element-states";
import { chacngeStateAfterLoopBubble, chacngeStateAfterLoopChoice, changingStateActiveBubble, changingStateActiveChoice, forChangingStateChoice } from "./change-status";
import { awaitingChanges, swap } from "./utils";

//Сортировка пузырьком.
export const bubbleSorting = async (direction: string, arr: Array<numsProps>, setNumsSorting: Function) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      //Смена статусов активных столбцов.
      changingStateActiveBubble(arr, j, ElementStates.Active, setNumsSorting);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      if (direction === "ascending") {
        if (arr[j].num > arr[j + 1].num) {
          //Смена статусов столбцов подлежащих перестановке.
          changingStateActiveBubble(arr, j, ElementStates.Changing, setNumsSorting);
          await awaitingChanges(SHORT_DELAY_IN_MS);
          swap(arr, j, j + 1);
          setNumsSorting(arr);
          await awaitingChanges(SHORT_DELAY_IN_MS);
        }
      } else {
        if (arr[j].num < arr[j + 1].num) {
          //Смена статусов столбцов подлежащих перестановке.
          changingStateActiveBubble(arr, j, ElementStates.Changing, setNumsSorting);
          await awaitingChanges(SHORT_DELAY_IN_MS);
          swap(arr, j, j + 1);
          setNumsSorting(arr);
          await awaitingChanges(SHORT_DELAY_IN_MS);
        }
      }
    }
    await awaitingChanges(SHORT_DELAY_IN_MS);
    //Смена статусов после каждого цикла.
    chacngeStateAfterLoopBubble(arr, i, setNumsSorting)
  }
}

//Сортировка выбором.
export const choiceSorting = async (direction: string, arr: Array<numsProps>, setNumsSorting: Function) => {
  const end = arr.length;

  for (let i = 0; i < end; i++) {
    //Установка как первого элемента как максимального/минимального.
    let operationInd = i;
    let operationColumn = arr[i].num;
    //Изменение статуса первого элемента на changing.
    forChangingStateChoice(arr, operationInd, setNumsSorting)

    for (let j = i + 1; j < end; j++) {
      //Изменить статус активного столбца и вернуть предыдущий в default/changing.
      changingStateActiveChoice(arr, j, setNumsSorting)
      await awaitingChanges(400);

      //Выбор направления сортировки.
      if (direction === 'ascending') {
        if (arr[j].num < operationColumn) {
          let previous = operationInd;
          operationInd = j;
          operationColumn = arr[j].num;
          forChangingStateChoice(arr, operationInd, setNumsSorting, previous, i);
        }
      }
      else if (direction === 'descending') {
        if (arr[j].num > operationColumn) {
          let previous = operationInd;
          operationInd = j;
          operationColumn = arr[j].num;
          forChangingStateChoice(arr, operationInd, setNumsSorting, previous, i);
        }
      }
    }
    //Перестановка столбцов, если был найден новый.
    if (i !== operationInd) {
      swap(arr, i, operationInd);
    }
    //Сброс статусов на default, кроме первого столбца, он становится модифицированным.
    chacngeStateAfterLoopChoice(arr, i, setNumsSorting);
  }
}

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
