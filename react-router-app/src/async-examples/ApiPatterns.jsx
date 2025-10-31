import React, { useState } from "react";

function ApiPatterns() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setData(null);
    setError("");
    setLoading(true);
  };

  // 기본 fetch GET
  const basicFetch = async () => {
    reset();
    try {
      // JSONPlaceholder : JSONPlaceholder
      // https://jsonplaceholder.typicode.com/
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json(); // res.body(응답본문)을 json형식으로 파싱
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // 타임아웃 있는 fetch
  const timeoutFetch = async () => {
    reset();
    try {
      const controller = new AbortController(); // 요청 중단을 제어하는 객체
      setTimeout(() => controller.abort(), 3000);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
        signal: controller.signal,
      }); // signal은 AbortController와 fetch를 연결하는 통신선
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json(); // res.body(응답본문)을 json형식으로 파싱
      setData(json);
    } catch (e) {
      setError(e.name === "AbortError" ? "타임아웃(3초)" : e.message);
    } finally {
      setLoading(false);
    }
  };

  // POST 요청
  const postData = async () => {
    reset();
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "React 글",
          body: "POST 테스트",
          userId: 1,
        }),
      });
      if (!res.ok) throw new Error(`POST 실패: ${res.status}`);
      const json = await res.json(); // res.body(응답본문)을 json형식으로 파싱
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>3단계: 실무 API 패턴</h2>
      <button onClick={basicFetch} disabled={loading}>
        GET
      </button>
      <button onClick={timeoutFetch} disabled={loading}>
        타임아웃 GET
      </button>
      <button onClick={postData} disabled={loading}>
        POST
      </button>
      <p>로딩: {loading ? "진행중" : "대기"}</p>
      <p>에러: {error || "없음"}</p>
      {data && (
        <>
          <h4>응답:</h4>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </>
      )}
      <p>항상 HTTP 상태 체크 + 타임아웃 설정</p>
      <hr />
    </div>
  );
}

export default ApiPatterns;
