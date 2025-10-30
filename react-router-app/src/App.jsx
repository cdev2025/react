import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AsyncLab from "./async-examples/AsyncLab";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* 중첩 라우트 : Layout이 부모, 나머지가 자식 */}
      <Route path="/" element={<Layout />}>
        {/* index: 부모 경로(/) 정확히 일치할 때 렌더링*/}
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} />

        {/* 비동기 실습 페이지 */}
        <Route path="async" element={<AsyncLab />} />

        {/* 404 처리 : 모든 미매칭 경로 잡음 (반드시 마지막에 위치) */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
