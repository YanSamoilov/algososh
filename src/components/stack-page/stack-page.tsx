import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { stack } from "../../constants/stack";
import { pagesArrayProps } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>("");
  const [stackValues, setStackValues] = useState<Array<pagesArrayProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll('input')[0].value = "";
  }

  const handleResetStack = () => {
    stack.resetStack();
    setStackValues([]);
  }

  const handlePush = async () => {
    setInProgress(true);
    stack.push(inputValue);
    stackValues.push({
      symbol: inputValue,
      state: ElementStates.Changing
    })
    await awaitingChanges(SHORT_DELAY_IN_MS);
    stackValues.forEach((el: pagesArrayProps) => el.state = ElementStates.Default);
    setInputValue("");
    resetInput();
    setInProgress(false);
  }

  const handlePop = async () => {
    setInProgress(true);
    stack.pop();
    stackValues[stackValues.length - 1].state = ElementStates.Changing;
    await awaitingChanges(SHORT_DELAY_IN_MS);
    stackValues.pop();
    setInProgress(false);
  }

  const handleInputValue = (e: any) => {
    setInputValue(e.target.value);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles['flex-container']}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText
          onChange={handleInputValue}
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
          {stackValues && stackValues.map((elem: any, ind: any) =>
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
