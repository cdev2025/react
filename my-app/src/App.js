import "./App.css";
import Subject from "./Components/Subject";
import NAV from "./Components/NAV";
import Content from "./Components/Content";
import JSXBasic from "./Components/JSXBasic";
import ConditionalDemo from "./Components/ConditionalDemo";
import ListDemo from "./Components/ListDemo";
import UserCard from "./Components/UserCard";
import Counter from "./Components/Counter";

function App() {
  return (
    <div className="App">
      <h1> 콜백 props 실습</h1>
      <Counter />
      <hr />
      <h1>Props 기본 전달</h1>
      <UserCard name="홍길동" age={20} address="서울" />
      <UserCard name="이순신" age={22} address="통영" />
      <hr />
      <ListDemo />
      <hr />
      <ConditionalDemo />
      <hr />
      <JSXBasic />
      <hr />
      <h1>안녕하세요! React 첫 시간입니다.</h1>
      <p>성공적으로 React 환경이 설정되었습니다!</p>
      <hr />
      <Subject />
      <hr />
      <NAV />
      <hr />
      <Content />
    </div>
  );
}

export default App;
