import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { awaitingChanges, swap } from "../../utils/utils";
import { numsProps } from "../../types/data";
import {
  chacngeStateAfterLoopBubble,
  chacngeStateAfterLoopChoice,
  changingStateActiveBubble,
  changingStateActiveChoice,
  forChangingStateChoice
} from "../../utils/change-status";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {

  const [typeSort, setTypeSort] = useState<string>("choice");
  const [numsSorting, setNumsSorting] = useState<Array<numsProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const randomArr = () => {
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

  const handleClickSorting = (direction: string, typeSort: string) => {
    //Сброс уже отсортированного массива.
    if (numsSorting[0].state === 'modified') {
      setNumsSorting(numsSorting.map((el: numsProps) => {
        el.state = ElementStates.Default;
        return el
      }))
    }
    if (typeSort === "choice") choiceSorting(direction, numsSorting);
    else bubbleSorting(direction, numsSorting);
  }

  //Сортировка пузырьком.
  const bubbleSorting = async (direction: string, arr: Array<numsProps>) => {
    //Блокирование кнопок.
    setInProgress(true);

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
    //Разблокирование кнопок.
    setInProgress(false);
  }

  //Сортировка выбором.
  const choiceSorting = async (direction: string, arr: Array<numsProps>) => {
    //Блокирование кнопок.
    setInProgress(true);
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
    //Разблокирование кнопок.
    setInProgress(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles['flex-container']}`}>

        <RadioInput
          label="Выбор"
          extraClass={styles.radio}
          name="typeSorting"
          onClick={() => setTypeSort("choice")}
          value="choice"
          defaultChecked={true}
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          name="typeSorting"
          onClick={() => setTypeSort("bubble")}
          value="bubble"
        />

        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={() => handleClickSorting('ascending', typeSort)}
          disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => handleClickSorting('descending', typeSort)}
          disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="Новый массив"
          extraClass={styles.button}
          onClick={randomArr}
          isLoader={inProgress}
        />

      </div>
      <div className={`${styles['flex-container-list']}`}>
        <ul className={styles.list}>
          {numsSorting && numsSorting.map((el: numsProps, ind: number) =>
            <li key={ind} className={`${styles['list-elem']}`}>
              <Column index={el.num} state={el.state} extraClass={styles.column} />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
