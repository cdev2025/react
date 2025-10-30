import React from "react";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>React Router 핵심 기능 체험 중!</p>

      <button onClick={() => navigate(-1)}>◀️ 이전 페이지로 이동</button>
    </div>
  );
}

export default Home;
