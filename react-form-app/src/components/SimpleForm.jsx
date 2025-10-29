import React, { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return alert("이름을 입력하세요!");
    alert(`안녕하세요, ${name}님!`);
    setName(""); // 입력창 초기화
  };

  return (
    <section>
      <h2>기초 폼 실습</h2>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>확인</button>
    </section>
  );
}

export default SimpleForm;
