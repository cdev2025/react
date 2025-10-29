import React, { useState } from "react";

function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // 스프레드 연산자(...)를 사용해 기존 상태 복사 + 특정 필드만 변경
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    if (!form.email.includes("@")) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (form.password.length < 8) {
      alert("비밀번호는 8자 이상이어야합니다.");
      return;
    }
    alert(`${form.name}님, 회원가입 완료!`);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <section>
      <h2>회원가입 폼</h2>
      <input
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="비밀번호 (8자 이상)"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>가입</button>
    </section>
  );
}

export default SignupForm;
