import React, { useEffect, useState } from "react";

function Info() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("렌더링 완료! 현재 입력 상태: ", { name, nickname });
  });

  return (
    <section>
      <h2>useEffect 예제</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
      />
      <p>이름 : {name}</p>
      <p>닉네임 : {nickname}</p>
    </section>
  );
}

export default Info;
