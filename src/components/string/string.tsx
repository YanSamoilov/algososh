import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { symbolProps } from "../../types/data";
import styles from "./string.module.css";
import { recursion } from "../../utils/string";

export const StringComponent: React.FC = () => {
  const [charArr, setCharArr] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    }
    setInProgress(true);
    await recursion(charArr, setCharArr);
    setInProgress(false);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles['flex-container']}`}>

        <Input
          extraClass={styles.input}
          isLimitText
          maxLength={11}
          formOfWord={"символов"}
          onChange={handleChange}
        />

        <Button
          text={'Развернуть'}
          onClick={handleClick}
          isLoader={inProgress}
        />

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
