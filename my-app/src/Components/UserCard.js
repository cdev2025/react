import React from "react";

function UserCard({ name, age, address }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>나이 : {age} </p>
      <p>주소: {address}</p>
    </div>
  );
}

export default UserCard;
