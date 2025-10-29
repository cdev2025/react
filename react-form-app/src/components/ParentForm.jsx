import React, { useState } from "react";
import ChildInput from "./ChildInput";

function ParentForm() {
  const [user, setUser] = useState({ name: "", age: "" });

  return (
    <section>
      <h2>상태 상승 패턴 실험</h2>
      <ChildInput
        label="이름"
        value={user.name}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value });
        }}
      />
      <ChildInput
        label="나이"
        value={user.age}
        onChange={(e) => {
          setUser({ ...user, age: e.target.value });
        }}
      />
      <button
        onClick={() => {
          alert(`이름: ${user.name}\n나이: ${user.age}`);
        }}
      >
        출력
      </button>
    </section>
  );
}

export default ParentForm;
