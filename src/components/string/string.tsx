import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./string.module.css";
import { awaitingChanges } from "../../utils/utils";

interface symbolProps {
  symbol: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [charArr, setCharArr] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Изменить статус/внешний вид символов.
  const changeState = (arr: any, status: string, start: number, end?: number) => {
    arr[start].state = status;
    if (end) {
      arr[end].state = status;
    }
    setCharArr([...arr]);
  }

  //Перестановка двух символов.
  const swap = (arr: Array<symbolProps>, leftInd: number, rightInd: number) => {
    const temp = arr[leftInd];
    arr[leftInd] = arr[rightInd];
    arr[rightInd] = temp;
  }

  //Переставить символы с анимацией.
  const recursion = async (arr: Array<symbolProps>) => {
    setInProgress(true);
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      if (start === end) {
        changeState(arr, ElementStates.Changing, start);
        await awaitingChanges(250);
        changeState(arr, ElementStates.Modified, start);
      }
      changeState(arr, ElementStates.Changing, start, end);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      swap(arr, start, end);
      changeState(arr, ElementStates.Modified, start, end);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      end--;
    }
    setInProgress(false);
  }

  //Рендер вводимых символов.
  const handleChange = (event: any) => {
    setCharArr(event.target.value.split('').map((symbol: any) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  //Запуск функции перестановки по нажатию кнопки.
  const handleClick = async () => {
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArr[0].state === 'modified') {
      setCharArr(charArr.map((symbol: any) => {
        symbol.state = ElementStates.Default;
        return symbol
      }))
      await awaitingChanges(SHORT_DELAY_IN_MS);
    }
    recursion(charArr);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles['flex-container']}`}>

        <Input
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          formOfWord={"символов"}
          onChange={handleChange}
        />

        <Button text={'Развернуть'} onClick={handleClick} isLoader={inProgress}></Button>

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {charArr && charArr.map((el: symbolProps, ind) =>
            <li className={`${styles['list-elem']}` } key={ind}>
              <Circle
                letter={el.symbol}
                state={el.state}
              />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
