import React, { useState } from "react";

function PromiseBasics() {
  const [result, setResult] = useState([]);

  const log = (msg) => {
    const time = new Date().toLocaleDateString();
    const line = `[${time}] ${msg}`;
    setResult((prev) => [...prev, line]);
    console.log(line); // 콘솔에서 확인
  };

  const manualTest = () => {
    log("수동 테스트");
    new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve("✅ 수동 성공")
          : reject(new Error("❌ 수동 실패"));
      }, 3000);
    })
      .then((m) => log(m))
      .catch((e) => log(e.message));
  };

  return (
    <div>
      <h2>1단계: Promise 기초</h2>
      <button onClick={manualTest}>테스트 실행</button>
      <div>
        <h4>로그: </h4>
      </div>
      <p>Promise는 "미래의 값을 약속하는 객체"입니다.</p>
    </div>
  );
}

export default PromiseBasics;
