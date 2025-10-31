import React from "react";
import PromiseBasics from "./PromiseBasics";
import AsyncAwaitBasics from "./AsyncAwaitBasics";
import ApiPatterns from "./ApiPatterns";

function AsyncLab() {
  return (
    <div>
      <h2>비동기 처리</h2>
      <p>Promise ▶️ async/await ▶️ fetch API 순서로 학습해보세요!</p>

      <PromiseBasics />
      <AsyncAwaitBasics />
      <ApiPatterns />
    </div>
  );
}

export default AsyncLab;
