import React, { useState } from "react";

// ListDemo: 할 일(Todo) 목록 관리하는 컴포넌트
function ListDemo() {
  // useState: React의 상태(State)를 관리하는 훅(Hook)
  // todos : 현재 할 일 목록 배열
  // setTodos : 할 일 목록을 변경하는함수
  const [todos, setTodos] = useState([
    { id: 1, text: "React 공부하기", completed: false },
    { id: 2, text: "JSX문법 익히기", completed: true },
    { id: 3, text: "컴포넌트 만들기", completed: false },
  ]);

  // 새로 입력할 할 일을 저장할 텍스트
  const [newTodo, setNewTodo] = useState("");

  // 새 할 일 추가 함수
  const addTodo = () => {
    // 문자열이 비어있지 않으면 실행
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now(), // 현재 시간 기반 임시 ID 생성(서버 발급)
        text: newTodo, // 입력한 텍스트
        completed: false,
      };
      setTodos([...todos, newItem]);
      setNewTodo(""); // 입력창 초기화
    }
  };

  //완료 상태 토글 함수
  const toggleTodo = (id) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed } // 상태 반전
            : todo // 나머지는 그대로 유지
      )
    );
  };

  return (
    <div>
      <h2>할 일 목록 (map 함수 활용)</h2>

      {/* 입력 폼 */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // 입력할 때마다 상태 갱신
          placeholder="새 할 일 입력"
          onKeyUp={(e) => e.key === "Enter" && addTodo()} // 엔터키로 추가 가능
        />
        <button onClick={addTodo}>추가</button>
      </div>

      {/* 목록 렌더링 */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id} // key 필수!
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            {todo.comleted && <span>✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListDemo;
