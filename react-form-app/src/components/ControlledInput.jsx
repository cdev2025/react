import React, { useState } from "react";

function ControlledInput() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }
    alert(`입력된 이름: ${name}`);
  };

  return (
    <section>
      <h2>Controlled Component</h2>
      <input
        type="text"
        value={name}
        placeholder="이름을 입력하세요"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>확인</button>
      <p>현재 입력값: {name}</p>
    </section>
  );
}

export default ControlledInput;
