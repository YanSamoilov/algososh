import React, { useCallback, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fiboCalc } from "../../utils/fibonacci";
import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";

//Рендер каждого числа.
const renderNum = (num: number, ind: number) => (
    <li className={`${styles['list-elem']}`} key={ind}>
      <Circle
        letter={`${num}`}
      />
      <p>{ind}</p>
    </li>
  )

export const FibonacciPage: React.FC = () => {
  const [inputNum, setInputNum] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isNumCorrect, setIsNumCorrect] = useState<boolean>(false);
  const [fiboNums, setFiboNums] = useState<Array<number>>([]);

  //Активация кнопки калькуляции при изменении поля ввода.
  useEffect(() => {
    setIsNumCorrect(inputNum > 0 && inputNum < 20);
  }, [inputNum]);

  //Нажатие кнопки Рассчитать.
  const handleClickToShow = useCallback(async () => {
    setInProgress(true);
    const nums = [];
    for (let i = 1; i <= inputNum + 1; i++) {
      await awaitingChanges(SHORT_DELAY_IN_MS)
      nums.push(fiboCalc(i))
      setFiboNums([...nums]);
    }
    setInProgress(false);
  }, [inputNum])

  const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNum(+e.target.value)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles['flex-container']}`}>

        <Input
          extraClass={styles.input}
          isLimitText
          max={19}
          type={"number"}
          onChange={handleInputNumber}
        />

        <Button
          text={'Рассчитать'}
          onClick={handleClickToShow}
          disabled={!isNumCorrect}
          isLoader={inProgress} />

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {fiboNums && fiboNums.map((el, ind) =>
            renderNum(el, ind)
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
