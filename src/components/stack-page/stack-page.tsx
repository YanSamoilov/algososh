import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack-class";

import styles from "./stack-page.module.css";

let stack = new Stack();

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>("");
  const [stackValues, setStackValues] = useState<any>(stack.values);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll('input')[0].value = "";
  }

  const handleResetStack = () => {
    stack.resetStack(setStackValues);
  }

  const handlePush = async () => {
    setInProgress(true);
    stack.push(inputValue, setStackValues);
    setInputValue("");
    resetInput();
    setInProgress(false);
  }

  const handlePop = async () => {
    setInProgress(true);
    await stack.pop(setStackValues);
    setInProgress(false);
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
