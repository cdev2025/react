import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !pw.trim()) {
      return alert("이메일과 비밀번호를 입력해주세요.");
    }
    alert(`로그인 시도: ${email}`);
  };

  return (
    <section>
      <h2>종합 실습 - 로그인 폼</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <p>입력한 이메일: {email || "(없음)"}</p>
    </section>
  );
}

export default LoginForm;
