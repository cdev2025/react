import React, { useState } from "react";
import { mockApi } from "./utils";

function AsyncAwaitBasics() {
  const [status, setStatus] = useState("대기 중");
  const [loading, setLoading] = useState(false);

  // Promise 방식 - 체이닝
  const promiseWay = () => {
    setLoading(true);
    setStatus("Promise 실행 중...");
    mockApi("Promise 데이터", 3000)
      .then((d) => setStatus(`✅ ${d}`))
      .catch((e) => setStatus(`❌ ${e.message}`))
      .finally(() => setLoading(false));
  };

  // async/await 방식 - 동기 코드처럼
  const asyncWay = async () => {
    setLoading(true);
    setStatus("async/await 실행 중...");
    try {
      const d = await mockApi("async/await 데이터", 3000);
      setStatus(`✅ ${d}`);
    } catch (e) {
      setStatus(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 순차적 비동기 작업
  const sequential = async () => {
    setLoading(true);
    try {
      setStatus("1단계: 사용자...");
      const user = await mockApi("사용자 : 홍길동", 600);
      setStatus("2단계: 권한...");
      const auth = await mockApi("권한: 관리자", 600);
      setStatus("3단계: 데이터...");
      const data = await mockApi("대시보드", 800);
      setStatus(`✅ 완료: ${user} / ${auth} / ${data}`);
    } catch (e) {
      setStatus(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <br />
      <hr />
      <h2>2단계: async/await 변환</h2>
      <button onClick={promiseWay} disabled={loading}>
        Promise 방식
      </button>
      <button onClick={asyncWay} disabled={loading}>
        async/await 방식
      </button>
      <button onClick={sequential} disabled={loading}>
        순차 작업
      </button>
      <p>
        상태: {loading && "⏳ "}
        {status}
      </p>
      <p>async/await는 동기 코드처럼 직관적입니다.</p>
      <hr />
    </div>
  );
}

export default AsyncAwaitBasics;
