import React, { useState } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount((c) => c + 1);
  const handleDecrease = () => setCount((c) => c - 1);
  const handleReset = () => setCount(0);

  return (
    <div>
      <CounterDisplay count={count} />
      <CounterControls
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onReset={handleReset}
      />
    </div>
  );
}

export default Counter;
