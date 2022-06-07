import React, { useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { queue } from "../../constants/queue";
import { symbolProps } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue-page.module.css";

const firstQueueValues = Array(7).fill({
  state: ElementStates.Default,
  symbol: ""
})

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queueValues, setQueue] = useState<Array<symbolProps>>([...firstQueueValues]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleEnqueue = async () => {
    setInProgress(true);
    if (queue.isEmpty()) {
      queue.enqueue(inputValue);
      queueValues[0] = {
        symbol: inputValue,
        state: ElementStates.Changing
      }
      await awaitingChanges(DELAY_IN_MS);
      queueValues[0].state = ElementStates.Default;
    }
    else if (queue.getTail() === queue.values.length - 1 && queue.isEmptyElem(0)) {
      queue.enqueue(inputValue);
      queueValues[0] = {
        symbol: inputValue,
        state: ElementStates.Changing
      }
      await awaitingChanges(DELAY_IN_MS);
      queueValues[0].state = ElementStates.Default;
    }
    else if (queue.getTail() + 1 < queue.values.length && queue.isEmptyElem(queue.getTail() + 1)) {
      queue.enqueue(inputValue);
      queueValues[queue.getTail()] = {
        symbol: inputValue,
        state: ElementStates.Changing
      }
      await awaitingChanges(DELAY_IN_MS);
      queueValues[queue.getTail()].state = ElementStates.Default;
    }
    setInProgress(false);
    setInputValue("");
    resetInput();
  }

  const handleDequeue = async () => {
    setInProgress(true);
    queueValues[queue.getHead()].state = ElementStates.Changing;
    await awaitingChanges(DELAY_IN_MS);
    queueValues[queue.getHead()] = {
      state: ElementStates.Default,
      symbol: ""
    };
    queue.dequeue();
    setInProgress(false);
  }

  const handleClear = () => {
    queue.clear();
    setQueue([...firstQueueValues]);
  }

  //Сброс инпута.
  const resetInput = () => {
    setInputValue("");
  }

  const handleInputValue = (e: any) => {
    setInputValue(e.target.value)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles['flex-container']}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText
          value={inputValue}
          onChange={handleInputValue}
        />
        <Button
          text={"Добавить"}
          extraClass={styles.button}
          onClick={handleEnqueue}
          disabled={inputValue.length === 0 || inProgress}
        />
        <Button
          text={"Удалить"}
          extraClass={styles.button}
          onClick={handleDequeue}
          disabled={inProgress || queue.isEmpty()}
        />
        <Button
          text={"Очистить"}
          extraClass={styles.button}
          disabled={inProgress || queue.isEmpty()}
          onClick={handleClear}
        />
      </div>

      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {queueValues && queueValues.map((elem: symbolProps, ind: number) =>
            <li className={`${styles['list-elem']}`} key={ind}>
              <p className={`${styles['list-el-info']}`}>{ind === queue.getHead() ? "head" : " "}</p>
              <Circle
                letter={elem.symbol}
                state={elem.state}
              />
              <p className={`${styles['list-el-info']}`}>{ind === queue.getTail() ? "tail" : " "}</p>
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
