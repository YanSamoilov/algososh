import { swappingStrings } from '../../utils/string';

describe("Проверка разворота строки с четным числом символов", () => {
  let testString = "1234";

  it("верно возвращает конечный результат", () => {
    expect(swappingStrings(testString).resultArray.join("")).toBe("4321");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swappingStrings(testString, 1).resultArray.join("")).toBe("4231");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swappingStrings(testString, 2).resultArray.join("")).toBe("4321");
  });
});

describe("Проверка разворота строки с нечетным числом символов", () => {
  let testString = "1234567";

  it("верно возвращает конечный результат", () => {
    expect(swappingStrings(testString).resultArray.join("")).toBe("7654321");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swappingStrings(testString, 1).resultArray.join("")).toBe("7234561");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swappingStrings(testString, 2).resultArray.join("")).toBe("7634521");
  });
});

describe("Проверка разворота строки с одним символом", () => {
  let testString = "1";

  it("верно возвращает конечный результат", () => {
    expect(swappingStrings(testString).resultArray.join("")).toBe("1");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swappingStrings(testString, 1).resultArray.join("")).toBe("1");
  });
});

describe("Проверка разворота пустой строки", () => {
  let testString = "";

  it("верно возвращает конечный результат", () => {
    expect(swappingStrings(testString).resultArray.join("")).toBe("");
  });
});
