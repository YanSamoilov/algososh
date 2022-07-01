import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps, symbolProps } from "../../types/data";
import styles from "./string.module.css";
// import { recursion } from "../../utils/string";
import { changeState } from "../../utils/change-status";
import { awaitingChanges, swap } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swappingStrings } from "../../utils/string";

export const StringComponent: React.FC = () => {
  const [charArr, setCharArr] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharArr(event.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  useEffect(() => {
    if (charArr.length !== 0) {
      setDisableButton(false);
    }
    else {
      setDisableButton(true);
    }
  }, [charArr])

  // //Запуск функции перестановки по нажатию кнопки.
  // const handleClick = async () => {
  //   //Вернуть в дефолтное состояние, если строка уже отсортирована.
  //   if (charArr[0].state === 'modified') {
  //     setCharArr(charArr.map((symbol: symbolProps) => {
  //       symbol.state = ElementStates.Default;
  //       return symbol
  //     }))
  //   }
  //   setInProgress(true);
  //   await recursion(charArr, setCharArr);
  //   setInProgress(false);
  // }

  const handleClick = async () => {
    setInProgress(true);
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArr[0].state === 'modified') {
      setCharArr(charArr.map((symbol: symbolProps) => {
        symbol.state = ElementStates.Default;
        return symbol
      }))
      await awaitingChanges(SHORT_DELAY_IN_MS);
    }
    swappingStrings(charArr);
    // let end = charArr.length - 1;
    // for (let start = 0; start <= end; start++) {
    //   if (start === end) {
    //     setCharArr(changeState(charArr, ElementStates.Changing, start));
    //     await awaitingChanges(250);
    //     setCharArr(changeState(charArr, ElementStates.Modified, start));
    //   }
    //   setCharArr([...changeState(charArr, ElementStates.Changing, start, end)]);
    //   await awaitingChanges(SHORT_DELAY_IN_MS);
    //   swap(charArr, start, end);
    //   setCharArr([...changeState(charArr, ElementStates.Modified, start, end)]);
    //   await awaitingChanges(SHORT_DELAY_IN_MS);
    //   end--;
    // }
    // setInProgress(false);
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
          disabled={disableButton}
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
