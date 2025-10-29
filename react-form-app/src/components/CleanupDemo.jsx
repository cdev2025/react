import React, { useEffect, useState } from "react";

function CleanupDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <section>
      <h2>cleanup 함수 예제</h2>
      {/* 버튼 클릭 시 visible 값을 반전 시킴 */}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "컴포넌트 숨기기" : "컴포넌트 보이기"}
      </button>
      <hr />
      {/*  visible이 true일 때만 EffectComponent렌더링 */}
      {visible && <EffectComponent />}
    </section>
  );
}

function EffectComponent() {
  useEffect(() => {
    console.log("EffectComponent 마운트 됨");
    return () => {
      console.log("EffectComponent 언마운트됨");
    };
  }, []);

  return <p>컴포넌트가 화면에 표시 중입니다.</p>;
}

export default CleanupDemo;
