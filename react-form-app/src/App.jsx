import { useState } from "react";
import "./App.css";
import SimpleForm from "./components/SimpleForm";
import SignupForm from "./components/SignupForm";
import ParentForm from "./components/ParentForm";
import ClickExample from "./components/ClickExample";
import ControlledInput from "./components/ControlledInput";
import LoginForm from "./components/LoginForm";
import Counter from "./components/Counter";
import Info from "./components/Info";
import Info2 from "./components/Info2";
import CleanupDemo from "./components/CleanupDemo";

function App() {
  const [tab, setTab] = useState("count");

  return (
    <div>
      <h1>Day 2: State 관리 & Form 처리 실습</h1>

      {/* 탭 메뉴 */}
      <div>
        <button onClick={() => setTab("count")}>useState 예제</button>
        <button onClick={() => setTab("info")}>useEffect 예제</button>
        <button onClick={() => setTab("info2")}>의존성 배열로 최적화</button>
        <button onClick={() => setTab("cleanup")}>cleanup함수 이해</button>
        <button onClick={() => setTab("click")}>onClick 전달 vs 호출</button>
        <button onClick={() => setTab("controlled")}>Controlled Input</button>
        <button onClick={() => setTab("login")}>로그인 폼</button>
        <button onClick={() => setTab("simple")}>단일 입력</button>
        <button onClick={() => setTab("signup")}>회원가입 폼</button>
        <button onClick={() => setTab("parent")}>상태 상승 (부모-자식)</button>
      </div>

      {/* 탭별 컴포넌트 출력 */}
      {tab === "count" && <Counter />}
      {tab === "info" && <Info />}
      {tab === "info2" && <Info2 />}
      {tab === "cleanup" && <CleanupDemo />}
      {tab === "click" && <ClickExample />}
      {tab === "controlled" && <ControlledInput />}
      {tab === "login" && <LoginForm />}
      {tab === "simple" && <SimpleForm />}
      {tab === "signup" && <SignupForm />}
      {tab === "parent" && <ParentForm />}
    </div>
  );
}

export default App;
