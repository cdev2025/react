import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>React 종합 실습</h1>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        |<NavLink to="/products">Products</NavLink> |
        <NavLink to="/contact">Contact</NavLink> |
        <NavLink to="/async">비동기</NavLink> |
        <NavLink to="/api-demo">API 연동</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
