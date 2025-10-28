import React from "react";

function CounterControls({ onIncrease, onDecrease, onReset }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={onDecrease}> -1 </button>
      <button onClick={onReset}> Reset </button>
      <button onClick={onIncrease}> +1 </button>
    </div>
  );
}

export default CounterControls;
