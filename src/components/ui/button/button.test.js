import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, fireEvent, screen } from "@testing-library/react";

describe('Кнопка рендерится без ошибок', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text="Some text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Кнопка без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Заблокированная кнопка", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка в состоянии загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})

it("Нажатие на кнопку вызывает корректный alert", () => {
  window.alert = jest.fn();
  render(<Button text="Push Button" onClick={alert("Alert")} />);
  const button = screen.getByText("Push Button");
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledWith("Alert");
});
