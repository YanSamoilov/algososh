import React, { useCallback, useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { firstRandomListLength, list, reg } from "../../constants/list-page";
import { ElementStates } from "../../types/element-states";
import { InputsByListPage } from "../../types/inputs";
import {
  animationAddByIndexList,
  animationByAppendList,
  animationByPop,
  animationByPrependAndEmptyList,
  animationByShift,
  animationDeleteByIndex
} from "../../utils/list-animation";
import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IListNode } from "./ListNode";

import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [listValues, setListValues] = useState<Array<IListNode<string>>>([]);
  const [prelimForAdd, setPrelimForAdd] = useState<React.ReactElement | null>(null);
  const [valueForDelete, setValueForDelete] = useState<React.ReactElement | null>(null);
  const [indForPrelim, setIndForPrelim] = useState<number>(-1);
  const [indForDelete, setIndForDelete] = useState<number>(-1);
  const [isIndexValid, setIsIndexValid] = useState<boolean>(true);
  const [isInputIndexEmpty, setIsInputIndexEmpty] = useState<boolean>(true);
  const [isListEmpty, setIsListEmpty] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [inputIndexField, setInputIndexField] = useState<number | string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  useEffect(() => {
    const numberInputIndex = Number(inputIndex);
    setIsIndexValid(numberInputIndex < 0 || numberInputIndex > listValues.length - 1);
  }, [inputIndex]);

  useEffect(() => {
    setDisabledBtn(inputValue === "" || inProgress);
  }, [inputValue, inProgress])

  useEffect(() => {
    for (let i = 0; i < firstRandomListLength; i++) {
      list.prepend(Math.floor(Math.random() * 100).toString());
    }
    setListValues(list.toArray());
    return () => {
      setListValues([]);
      list.head = null;
      list.tail = null;
    }
  }, [])

  useEffect(() => {
    if (listValues)
      setIsListEmpty(listValues.length === 0);
  }, [listValues])

  useEffect(() => {
    inputIndex === -1 ? setInputIndexField("") : setInputIndexField(+inputIndex);
  }, [inputIndex])

  const handlePrepend = async () => {
    setInProgress(true);
    //Если список пустой, то запускается простая анимация.
    if (listValues === null) {
      list.prepend(inputValue);
      //Запуск анимации.
      animationByPrependAndEmptyList(list, setListValues);
    } else {
      //Предварительный круг со значением.
      setPrelimForAdd(<Circle state={ElementStates.Changing} letter={inputValue} isSmall={true} extraClass={styles.small} />)
      //Указать индекс предварительного значения для отображения предварительного круга.
      setIndForPrelim(0)
      await awaitingChanges(DELAY_IN_MS);
      list.prepend(inputValue);
      //Удалить отображение предварительного круга со значением.
      setIndForPrelim(-1);
      //Запуск анимации.
      animationByPrependAndEmptyList(list, setListValues);
    }
    resetInput(InputsByListPage.Value);
    setInProgress(false);
  }

  const handleAppend = async () => {
    setInProgress(true);
    //Если список пустой, то запускается простая анимация.
    if (listValues === null) {
      list.append(inputValue);
      animationByPrependAndEmptyList(list, setListValues);
    } else {
      //Индекс хвоста списка.
      const tailIndex = listValues.length - 1;
      //Предварительный круг со значением.
      setPrelimForAdd(<Circle state={ElementStates.Changing} letter={inputValue} isSmall={true} extraClass={styles.small} />)
      //Указать индекс предварительного значения для отображения предварительного круга.
      setIndForPrelim(tailIndex);
      await awaitingChanges(DELAY_IN_MS);
      list.append(inputValue);
      //Удалить отображение предварительного круга со значением.
      setIndForPrelim(-1);
      //Запуск анимации.
      animationByAppendList(list, setListValues, tailIndex);
    }
    resetInput(InputsByListPage.Value);
    setInProgress(false);
  }

  const handleAddByIndex = async () => {
    setInProgress(true);
    //Проверка, что индекс от 0 и меньше длины списка. Можно блокировать кнопку или выбрасывать ошибку.
    if (+inputIndex >= 0 && +inputIndex <= list.length + 1) {
      //Если список пустой, делаем prepend без показа предварительного круга сверху.
      if (listValues === null) {
        list.prepend(inputValue);
        animationByPrependAndEmptyList(list, setListValues);
      }
      //Если список не пустой, а индекс 0, происходит выполнение функции prepend.
      else if (+inputIndex === 0) {
        handlePrepend();
      } else {
        //Предварительный круг со значением.
        setPrelimForAdd(<Circle state={ElementStates.Changing} letter={inputValue} isSmall={true} extraClass={styles.small} />);
        await awaitingChanges(DELAY_IN_MS);
        //Запуск анимации поиска неободимого элемента по индексу и вставка его в список.
        await animationAddByIndexList(list, setListValues, setIndForPrelim, inputIndex, inputValue);
        //Удалить отображение предварительного круга со значением.
        setIndForPrelim(-1);
      }
    }
    resetInput(InputsByListPage.Index);
    setInProgress(false);
  }

  const handleShift = async () => {
    setInProgress(true);
    if (listValues.length !== 0) {
      //Значение для удаления.
      const deleteValue = listValues[0].value;
      //Установить предварительный круг со значением.
      setValueForDelete(<Circle state={ElementStates.Changing} letter={deleteValue} isSmall={true} extraClass={styles.small} />);
      //Установить индекс предварительного круга.
      setIndForDelete(0);
      //Запуск анимации.
      animationByShift(list, setListValues);
      await awaitingChanges(DELAY_IN_MS);
      list.shift();
      setIndForDelete(-1);
      setListValues(list.toArray);
    }
    resetInput(InputsByListPage.Value);
    resetInput(InputsByListPage.Index);
    setInProgress(false);
  }

  const handlePop = async () => {
    setInProgress(true);
    if (listValues.length !== 0) {
      //Значение для удаления.
      const deleteValue = listValues[listValues.length - 1].value;
      //Установить предварительный круг со значением.
      setValueForDelete(<Circle state={ElementStates.Changing} letter={deleteValue} isSmall={true} extraClass={styles.small} />);
      //Установить индекс предварительного круга.
      setIndForDelete(listValues.length - 1);
      //Запуск анимации.
      animationByPop(list, setListValues);
      await awaitingChanges(DELAY_IN_MS);
      list.pop();
      setIndForDelete(-1);
      setListValues(list.toArray);
    }
    resetInput(InputsByListPage.Value);
    resetInput(InputsByListPage.Index);
    setInProgress(false);
  }

  const handleDeleteByIndex = async () => {
    setInProgress(true);
    const inputIndexInNumber = +inputIndex;
    //Если удаление по индексу 0, то выполняем shift со всей анимацией.
    if (inputIndexInNumber === 0) {
      handleShift();
      return
    }
    //Если удаление по индексу 0, то выполняем pop со всей анимацией.
    if (inputIndexInNumber === listValues.length - 1) {
      handlePop();
    } else {
      //Считываем какое значение записано к удалению.
      const deleteValue = listValues[inputIndexInNumber].value;
      //Запуск анимации при удалении.
      await animationDeleteByIndex(list, inputIndexInNumber, setListValues);
      //Установить круг ниже необходимого индекса для анимации удаления и указание места.
      setValueForDelete(<Circle state={ElementStates.Changing} letter={deleteValue} isSmall={true} extraClass={styles.small} />)
      setIndForDelete(inputIndexInNumber);
      //Удалить значение из списка.
      list.deleteByIndex(inputIndexInNumber);
      await awaitingChanges(DELAY_IN_MS);
      //Удалить анимационное значение круга внизу.
      setIndForDelete(-1);
      //Сброс до дефолтного состояния списка после всех анимаций.
      list.resetToDefault(setListValues)
    }
    //Сброс инпутов.
    resetInput(InputsByListPage.Index);
    setInProgress(false);
  }

  const handleInputIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputIndexValue = e.target.value;
    if (reg.test(inputIndexValue)) {
      setInputIndex(+inputIndexValue);
      setIsInputIndexEmpty(false);
      return
    }
    setIsInputIndexEmpty(true);
    setInputIndex(-1);
  }

  //Сброс инпута.
  const resetInput = (typeInput: string) => {
    if (typeInput === "value") {
      setInputValue("");
      return
    }
    if (typeInput === "index") {
      setInputIndex(-1);
      setInputValue("");
    }
  }

  const handleInputValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles['flex-container']}`}>
        <Input
          name="value"
          maxLength={4}
          extraClass={styles.input}
          isLimitText
          onChange={handleInputValue}
          value={inputValue}
        />
        <Button
          text={"Добавить в head"}
          extraClass={styles.button}
          onClick={handlePrepend}
          disabled={disabledBtn}
        />
        <Button
          text={"Добавить в tail"}
          extraClass={styles.button}
          onClick={handleAppend}
          disabled={disabledBtn}
        />
        <Button
          text={"Удалить из head"}
          extraClass={styles.button}
          onClick={handleShift}
          disabled={isListEmpty || inProgress}
        />
        <Button
          text={"Удалить из tail"}
          extraClass={styles.button}
          onClick={handlePop}
          disabled={isListEmpty || inProgress}
        />
      </div>
      <div className={`${styles['flex-container']}`}>
        <Input
          name="index"
          extraClass={styles.input}
          onChange={handleInputIndexChange}
          value={inputIndexField}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={`${styles['button-long']}`}
          onClick={handleAddByIndex}
          disabled={isIndexValid || isInputIndexEmpty || disabledBtn}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={`${styles['button-long']}`}
          onClick={handleDeleteByIndex}
          disabled={isIndexValid || isInputIndexEmpty || inProgress}
        />
      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {listValues && listValues.map((elem: IListNode<string>, ind: number) =>
            <li className={`${styles['list-elem']}`} key={ind}>
              <div>
                {indForPrelim === ind &&
                  <div className={styles.prelim}>{prelimForAdd}</div>
                }
                {indForPrelim !== 0 &&
                  <p className={`${styles['list-el-info-top']}`}>{ind === 0 && "head"}</p>
                }
                <div className={`${styles['circle-container']}`}>
                  <Circle
                    extraClass={styles.circle}
                    letter={elem.value}
                    state={elem.state}
                  />
                  {listValues.length - 1 !== ind &&
                    <ArrowIcon
                      fill={elem.state === ElementStates.Default || elem.state === ElementStates.Modified ? "#0032FF" : "#D252E1"}
                    />
                  }
                </div>
                <p className={`${styles['list-el-info-bottom']}`}>{ind}</p>
                {indForDelete !== listValues.length - 1 &&
                  <p className={`${styles['list-el-info-bottom']}`}>{ind === listValues.length - 1 && "tail"}</p>
                }
                {indForDelete === ind &&
                  <div className={styles.delete}>{valueForDelete}</div>
                }
              </div>
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
