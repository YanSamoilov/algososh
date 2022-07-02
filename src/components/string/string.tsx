import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { symbolProps } from "../../types/data";
import styles from "./string.module.css";
import { awaitingChanges } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { swappingStrings } from "../../utils/string";

export const StringComponent: React.FC = () => {
  const [charArrWithState, setCharArrWithState] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharArrWithState(event.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: ElementStates.Default
      }
    }))
  }

  useEffect(() => {
    if (charArrWithState.length !== 0) {
      setDisableButton(false);
    }
    else {
      setDisableButton(true);
    }
  }, [charArrWithState])

  const handleClick = async () => {
    setInProgress(true);
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArrWithState[0].state === 'modified') {
      setCharArrWithState(charArrWithState.map((symbol: symbolProps) => {
        symbol.state = ElementStates.Default;
        return symbol
      }))
      await awaitingChanges(SHORT_DELAY_IN_MS);
    }
    const charsArr  = charArrWithState.map((el) => el.symbol)
    const numberOfSteps: number = swappingStrings(charsArr).numberOfSteps;
    for (let count = 0; count < numberOfSteps; count++) {
        // Меняем стейт нужных элементов на "Changing".
      charArrWithState[count].state = ElementStates.Changing;
      charArrWithState[charsArr.length - (count + 1)].state = ElementStates.Changing;
      setCharArrWithState([...charArrWithState]);
      await awaitingChanges(SHORT_DELAY_IN_MS);
      // Массив на необходимом этапе.
      swappingStrings(charsArr, count + 1).resultArray.forEach((el, idx) => {
        charArrWithState[idx].symbol = el
      })
      charArrWithState[count].state = ElementStates.Modified;
      charArrWithState[charsArr.length - (count + 1)].state = ElementStates.Modified;
      setCharArrWithState([...charArrWithState]);
      await awaitingChanges(SHORT_DELAY_IN_MS);
    }
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
          disabled={disableButton}
        />

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {charArrWithState && charArrWithState.map((el: symbolProps, ind) =>
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
