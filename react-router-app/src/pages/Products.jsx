import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: "1", name: "키보드" },
  { id: "2", name: "마우스" },
  { id: "3", name: "모니터" },
  { id: "4", name: "노트북" },
  { id: "5", name: "헤드셋" },
];

function Products() {
  return (
    <div>
      <h2>상품 목록</h2>
      {products.map((p) => (
        // 링크 추가 : products/{id} -> js문법
        <div key={p.id}>
          <Link to={`/products/${p.id}`}>{p.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
