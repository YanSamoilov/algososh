import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  describe("Рендер с буквами и без букв", () => {
    it("Circle без буквы рендерится без ошибок", () => {
      const tree = renderer.create(<Circle />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Circle c буквами рендерится без ошибок", () => {
      const tree = renderer.create(<Circle letter="Symbols" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("Circle рендериться с head", () => {
    it("Circle cо строкой в head рендерится без ошибок", () => {
      const tree = renderer.create(<Circle head={"head"} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle c node в head рендерится без ошибок", () => {
      const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("Circle рендериться с tail", () => {
    it("Circle cо строкой в tail рендерится без ошибок", () => {
      const tree = renderer.create(<Circle tail={"test"} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle c node в tail рендерится без ошибок", () => {
      const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("Circle рендериться в разных состояниях", () => {
    it("Circle в состоянии default рендерится без ошибок", () => {
      const tree = renderer
        .create(<Circle state={ElementStates.Default} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle в состоянии Changing рендерится без ошибок", () => {
      const tree = renderer
        .create(<Circle state={ElementStates.Changing} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle в состоянии Modified рендерится без ошибок", () => {
      const tree = renderer
        .create(<Circle state={ElementStates.Modified} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle в состоянии Default рендерится без ошибок", () => {
      const tree = renderer
        .create(<Circle state={ElementStates.Default} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Circle в состоянии Active рендерится без ошибок", () => {
      const tree = renderer
        .create(<Circle state={ElementStates.Active} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  it("Circle с индексом рендерится без ошибок", () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle с пропом isSmall рендерится без ошибок", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
