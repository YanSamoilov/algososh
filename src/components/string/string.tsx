import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { awaitingChanges, swap } from "../../utils/utils";
import { symbolProps } from "../../types/data";
import { changeState } from "../../utils/change-status";

import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [charArr, setCharArr] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Переставить символы с анимацией.
  const recursion = async (arr: Array<symbolProps>) => {
    setInProgress(true);
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      if (start === end) {
        changeState(arr, ElementStates.Changing, start, setCharArr);
        await awaitingChanges(250);
        changeState(arr, ElementStates.Modified, start, setCharArr);
      }
      changeState(arr, ElementStates.Changing, start, setCharArr, end);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      swap(arr, start, end);
      changeState(arr, ElementStates.Modified, start, setCharArr, end);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      end--;
    }
    setInProgress(false);
  }

  const handleChange = (event: any) => {
    setCharArr(event.target.value.split('').map((symbol: any) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  //Запуск функции перестановки по нажатию кнопки.
  const handleClick = () => {
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArr[0].state === 'modified') {
      setCharArr(charArr.map((symbol: any) => {
        symbol.state = ElementStates.Default;
        return symbol
      }))
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
            <li className={`${styles['list-elem']}`} key={ind}>
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
