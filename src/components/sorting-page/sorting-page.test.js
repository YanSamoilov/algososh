import { bubbleSorting, choiceSorting, randomArr } from "../../utils/sorting";
import { ElementStates } from "../../types/element-states";

describe("Проверка алгоритма сортировки выбором", () => {
  let testArray;

  beforeEach(() => {
    testArray = [
      {
        num: 3,
        state: ElementStates.Default,
      },
      {
        num: 1,
        state: ElementStates.Default,
      },
      {
        num: 2,
        state: ElementStates.Default,
      },
      {
        num: 7,
        state: ElementStates.Default,
      },
      {
        num: 9,
        state: ElementStates.Default,
      },
    ];
  });

  it("верно возвращает конечный результат (descending)", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
      {
        num: 7,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 2,
        state: ElementStates.Modified,
      },
      {
        num: 1,
        state: ElementStates.Modified,
      },
    ];
    expect(
      choiceSorting("descending", testArray).resultArray).toStrictEqual(resultArr);
  });
  it("верно возвращает конечный результат (ascending)", () => {
    const resultArr = [
      {
        num: 1,
        state: ElementStates.Modified,
      },
      {
        num: 2,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 7,
        state: ElementStates.Modified,
      },
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(choiceSorting("ascending", testArray).resultArray).toStrictEqual(resultArr);
  });
  it("верно работает с пустым массивом", () => {
    const resultArr = [];
    expect(choiceSorting("descending", []).resultArray).toStrictEqual(resultArr);
  });
  it("верно работает с массивом из одного элемента", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(
      choiceSorting("descending", [
        {
          num: 9,
          state: ElementStates.Default,
        },
      ]).resultArray).toStrictEqual(resultArr);
  });
});

describe("Проверка алгоритма сортировки пузырьком", () => {
  let testArray;

  beforeEach(() => {
    testArray = [
      {
        num: 3,
        state: ElementStates.Default,
      },
      {
        num: 1,
        state: ElementStates.Default,
      },
      {
        num: 2,
        state: ElementStates.Default,
      },
      {
        num: 7,
        state: ElementStates.Default,
      },
      {
        num: 9,
        state: ElementStates.Default,
      },
    ];
  });

  it("верно возвращает конечный результат (descending)", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
      {
        num: 7,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 2,
        state: ElementStates.Modified,
      },
      {
        num: 1,
        state: ElementStates.Modified,
      },
    ];
    expect(bubbleSorting("descending", testArray).resultArray).toStrictEqual(resultArr);
  });
  it("верно возвращает конечный результат (ascending)", () => {
    const resultArr = [
      {
        num: 1,
        state: ElementStates.Modified,
      },
      {
        num: 2,
        state: ElementStates.Modified,
      },
      {
        num: 3,
        state: ElementStates.Modified,
      },
      {
        num: 7,
        state: ElementStates.Modified,
      },
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(bubbleSorting("ascending", testArray).resultArray).toStrictEqual(resultArr);
  });
  it("верно работает с пустым массивом", () => {
    const resultArr = [];
    expect(bubbleSorting("descending", []).resultArray).toStrictEqual(
      resultArr
    );
  });
  it("верно работает с массивом из одного элемента", () => {
    const resultArr = [
      {
        num: 9,
        state: ElementStates.Modified,
      },
    ];
    expect(
      bubbleSorting("descending", [
        {
          num: 9,
          state: ElementStates.Default,
        },
      ]).resultArray
    ).toStrictEqual(resultArr);
  });
});

