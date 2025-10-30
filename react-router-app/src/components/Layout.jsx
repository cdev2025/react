import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>React Router</h1>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        |<NavLink to="/products">Products</NavLink> |
        <NavLink to="/contact">Contact</NavLink> |
        <NavLink to="/async">비동기 실습</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
