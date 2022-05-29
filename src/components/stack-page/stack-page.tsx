import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { symbolProps } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stackValues, setStackValues] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Добавить элемент в конец стека.
  const push = async (arrValues: Array<symbolProps>, newvalue: any) => {
    setInProgress(true);
    let elemToPush = {
      state: ElementStates.Changing,
      symbol: newvalue
    }
    arrValues.push(elemToPush);
    setStackValues([...arrValues]);
    await awaitingChanges(SHORT_DELAY_IN_MS);
    arrValues[arrValues.length - 1].state = ElementStates.Default;
    setStackValues([...arrValues]);
    setInProgress(false);
  }

  //Удалить элемент с конеца стека.
  const pop = async (arrValues: Array<symbolProps>) => {
    setInProgress(true);
    arrValues[arrValues.length - 1].state = ElementStates.Changing;
    setStackValues([...arrValues]);
    await awaitingChanges(SHORT_DELAY_IN_MS);
    arrValues.pop();
    setStackValues([...arrValues]);
    setInProgress(false);
  }

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll('input')[0].value = "";
  }

  //Очистить все данные.
  const resetStack = (arrValues: Array<symbolProps>) => {
    arrValues.length = 0;
    setStackValues([...arrValues]);
  }

  const handleResetStack = () => {
    resetStack(stackValues);
  }

  const handlePush = () => {
    push(stackValues, inputValue);
    setInputValue("");
    resetInput();
  }

  const handlePop = () => {
    pop(stackValues);
  }


  return (
    <SolutionLayout title="Стек">
      <div className={`${styles['flex-container']}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText={true}
          onChange={(e: any) => { setInputValue(e.target.value) }}
        />
        <Button
          text={"Добавить"}
          extraClass={styles.button}
          disabled={inputValue.length === 0 || inProgress}
          onClick={handlePush}
        />
        <Button
          text={"Удалить"}
          extraClass={styles.button}
          onClick={handlePop}
          disabled={stackValues.length === 0 || inProgress}
        />
        <Button
          text={"Очистить"}
          extraClass={styles.button}
          disabled={stackValues.length === 0 || inProgress}
          onClick={handleResetStack}
        />
      </div>

      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {stackValues && stackValues.map((elem, ind) =>
            <li className={`${styles['list-elem']}`} key={ind}>
              {ind === stackValues.length - 1 &&
                <p className={`${styles['list-el-info']}`}>top</p>}
              <Circle
                letter={elem.symbol}
                state={elem.state}
              />
              <p className={`${styles['list-el-info']}`}>{ind}</p>
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
