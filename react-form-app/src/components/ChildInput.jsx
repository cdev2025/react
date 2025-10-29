import React from "react";

function ChildInput({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
}

export default ChildInput;
