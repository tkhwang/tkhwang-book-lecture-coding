import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import { Form } from "./Form";

/* 코드 5-3
test("이름을 표시한다", () => {
  render(<Form name="taro" />);
});
*/

/* 코드 5-4
test("이름을 표시한다", () => {
  render(<Form name="taro" />);
  console.log(screen.getByText("taro"));
});
*/

/* 코드 5-7
test("heading을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("heading"));
});
*/

/* 코드 5-53
test("Snapshot: 계정명인 'taro'가 표시됐는지 확인한다", () => {
  const { container } = render(<Form name="jiro" />);
  expect(container).toMatchSnapshot();
});
*/

test("이름을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByText("taro")).toBeInTheDocument();
});

test("버튼을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("heading을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("heading")).toHaveTextContent("계정 정보");
});

test("버튼을 클릭하면 이벤트 핸들러가 실행된다", () => {
  const mockFn = jest.fn();
  render(<Form name="taro" onSubmit={mockFn} />);
  fireEvent.click(screen.getByRole("button"));
  expect(mockFn).toHaveBeenCalled();
});

test("Snapshot: 계정명인 'taro'가 표시된다", () => {
  const { container } = render(<Form name="taro" />);
  expect(container).toMatchSnapshot();
});

test("logRoles: 렌더링 결과로부터 역할과 접근 가능한 이름을 확인한다", () => {
  const { container } = render(<Form name="taro" />);
  logRoles(container);
});
