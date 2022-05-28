import { ElementStates } from "../types/element-states";

//Сортировка пузырьком.
//Активный статус проверяемого элемента и возвращени предыдущему неподходящему default для сортировки пузырьком.
export const changingStateActiveBubble = (arr: any, active: number, status: string, callback: Function) => {
    arr[active].state = status;
    arr[active + 1].state = status;
    if (arr[active - 1]) arr[active - 1].state = ElementStates.Default;
    callback([...arr]);
}

//Сброс статусов после окончания цикла сортировки пузырьком.
export const chacngeStateAfterLoopBubble = (arr: any, end: number, callback: Function) => {
    if (end != 0) arr[end - 1].state = ElementStates.Default;
    arr[end].state = ElementStates.Modified;
    callback([...arr]);
}

//Сортировка выбором.
//Активный статус проверяемого элемента и возвращени предыдущему неподходящему default для сортировки выбором.
export const changingStateActiveChoice = (arr: any, active: number, callback: Function) => {
    arr[active].state = ElementStates.Active;
    if (arr[active - 1].state !== ElementStates.Changing) arr[active - 1].state = ElementStates.Default;
    callback([...arr]);
}

//Изменение статусов после каждого цикла Выбором. Первыйс-модифицированный, остальные в default.
export const chacngeStateAfterLoopChoice = (arr: any, start: number, callback: Function) => {
    for (let i = start; i < arr.length; i++) {
        if (i === start) arr[i].state = ElementStates.Modified;
        else arr[i].state = ElementStates.Default;
    }
    callback([...arr]);
}

//Смена статусов changing для сортировки выбором.
export const forChangingStateChoice = (arr: any, forChange: number, callback: Function, previous?: number, start?: number) => {
    //Изменяем статус на changing наименьшего на настоящий момент элемента.
    arr[forChange].state = ElementStates.Changing;

    //Возвращаем статус default предыдущему элементу, если найден новый по условию и проверка, 
    //чтобы это была не первая колонка.
    if (previous && start?.toString() && previous !== start) arr[previous].state = ElementStates.Default;

    callback([...arr]);
}

//String-Page
//Изменить статус/внешний вид символов.
export const changeState = (arr: any, status: string, start: number, callback: Function, end?: number) => {
    arr[start].state = status;
    if (end) {
        arr[end].state = status;
    }
    callback([...arr]);
}