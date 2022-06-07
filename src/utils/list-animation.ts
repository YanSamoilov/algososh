import { DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { awaitingChanges } from "./utils";

//Анимация добавления значения в пустой список или на 0 индекс.
export const animationByPrependAndEmptyList = async (list: any, setListValues: Function) => {
  //Изменить статус первого элемента на модифицированный.
  list.head.state = ElementStates.Modified;
  //Отобразить список.
  setListValues(list.toArray);
  await awaitingChanges(DELAY_IN_MS);
  //Изменить статус первого элемента на дефолтный.
  list.head.state = ElementStates.Default;
  setListValues(list.toArray);
}

//Анимация добавления значения в конец списка.
export const animationByAppendList = async (list: any, setListValues: Function, tailIndex: number) => {
  //Изменить статус первого элемента на модифицированный.
  list.tail.state = ElementStates.Modified;
  //Отобразить список.
  setListValues(list.toArray);
  await awaitingChanges(DELAY_IN_MS);
  //Изменить статус первого элемента на дефолтный.
  list.tail.state = ElementStates.Default;
  setListValues(list.toArray);
}

//Анимация добавления элемента по индексу.
export const animationAddByIndexList = async (list: any, setListValues: Function, setIndForPrelim: Function, ind: number, inputValue: string) => {
  let currentInd = 0;
  let currentNode = list.head;
  //Поиск необходимого элемента с изменением его статуса от головы.
  while (currentInd < ind - 1) {
    if (currentNode) {
      setIndForPrelim(currentInd);
      currentNode.state = ElementStates.Changing;
      setListValues(list.toArray);
      await awaitingChanges(DELAY_IN_MS);
    }
    currentNode = currentNode.next;
    currentInd++;
  }
  //Изменить статус нужного по индексу элемента изменяемый.
  currentNode.state = ElementStates.Changing;
  //Отобразить список.
  setListValues(list.toArray);
  setIndForPrelim(currentInd);
  await awaitingChanges(DELAY_IN_MS);
  list.addByIndex(inputValue, +ind, false);
  setIndForPrelim(-1);
  //Изменить статус элемента на модифицированный.
  currentNode.next.state = ElementStates.Modified;
  setListValues(list.toArray);
  await awaitingChanges(DELAY_IN_MS);
  //Сброс всех измененных статусов во время анимации на дефолтный.
  list.resetToDefault(setListValues)
  setListValues(list.toArray);
}

export const animationByShift = async (list: any, setListValues: Function) => {
  list.head.value = "";
  setListValues(list.toArray);
  await awaitingChanges(DELAY_IN_MS);
}

export const animationByPop = async (list: any, setListValues: Function) => {
  list.tail.value = "";
  setListValues(list.toArray);
  await awaitingChanges(DELAY_IN_MS);
}

export const animationDeleteByIndex = async (list: any, indexForDelete: number, setListValues: Function) => {
  let currentInd = 0;
  let currentNode = list.head;
  //Поиск необходимого элемента с изменением его статуса от головы.
  while (currentInd <= indexForDelete - 1) {
    if (currentNode) {
      currentNode.state = ElementStates.Changing;
      setListValues(list.toArray);
      await awaitingChanges(DELAY_IN_MS);
    }
    currentNode = currentNode.next;
    currentInd++;
  }
  currentNode.value = "";
  setListValues(list.toArray);
}
