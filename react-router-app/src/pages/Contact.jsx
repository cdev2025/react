import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    // 기본 동작을 막는다!!!
    e.preventDefault(); // form-> Submit(): HTML 새로고침 안됨.

    if (!name) return alert("이름을 입력하세요!");

    alert(`${name}님, 문의 접수되었습니다.`);
    navigate("/", { replace: true }); // Home으로 이동, 브라우저 히스토리 기록 교체(뒤로가기X)
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default Contact;
