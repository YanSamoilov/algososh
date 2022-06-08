import React, { useCallback, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { bubbleSorting, choiceSorting, randomArr } from "../../utils/sorting";
import { numsProps } from "../../types/data";

import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {

  const [typeSort, setTypeSort] = useState<string>("choice");
  const [numsSorting, setNumsSorting] = useState<Array<numsProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const startSorting = useCallback(async (direction: string, typeSort: string) => {
    //Сброс уже отсортированного массива.
    if (numsSorting[0].state === 'modified') {
      setNumsSorting(numsSorting.map((el: numsProps) => {
        el.state = ElementStates.Default;
        return el
      }))
    }
    //Блокирование кнопок.
    setInProgress(true);
    //Сортировка выбором.
    if (typeSort === "choice") await choiceSorting(direction, numsSorting, setNumsSorting);
    //Сортировка пузырьком.
    else {
      await bubbleSorting(direction, numsSorting, setNumsSorting);
    }
    //Разблокирование кнопок.
    setInProgress(false);
  }, [numsSorting])

  const handleClickChangeSortingToChoice = () => {
    setTypeSort("choice");
  }

  const handleClickChangeSortingToBubble = () => {
    setTypeSort("bubble")
  }

  const handleClickStartAscendingSorting = () => {
    startSorting('ascending', typeSort)
  }

  const handleClickStartDescendingSorting = () => {
    startSorting('descending', typeSort)
  }

  const handleClickNewArr = () => {
    randomArr(setNumsSorting);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles['flex-container']}`}>

        <RadioInput
          label="Выбор"
          extraClass={styles.radio}
          name="typeSorting"
          onClick={handleClickChangeSortingToChoice}
          value="choice"
          defaultChecked
        />
        <RadioInput
          label="Пузырёк"
          extraClass={styles.radio}
          name="typeSorting"
          onClick={handleClickChangeSortingToBubble}
          value="bubble"
        />

        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={handleClickStartAscendingSorting}
          disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={handleClickStartDescendingSorting}
          disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="Новый массив"
          extraClass={styles.button}
          onClick={handleClickNewArr}
          isLoader={inProgress}
        />

      </div>
      <div className={`${styles['flex-container-list']}`}>
        <ul className={styles.list}>
          {numsSorting && numsSorting.map((el: numsProps, ind: number) =>
            <li key={ind} className={`${styles['list-elem']}`}>
              <Column index={el.num} state={el.state} extraClass={styles.column} />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
