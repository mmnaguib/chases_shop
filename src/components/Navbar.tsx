import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="user-info">
        <span>مرحبا , عبدوووو</span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">الصفحة الرئيسية</NavLink>
          </li>
          <li>
            <NavLink to="/categories">التصنيفات</NavLink>
          </li>
          <li>
            <NavLink to="/items">الاصناف</NavLink>
          </li>
          <li>
            <NavLink to="/purchases">فاتورة شراء</NavLink>
          </li>
          <li>
            <NavLink to="/sales">فاتورة بيع</NavLink>
          </li>
          <li>
            <NavLink to="/invoices">الفواتير</NavLink>
          </li>
          <li>
            <NavLink to="/users">العملاء و الموردين</NavLink>
          </li>
        </ul>
      </nav>
      <h3>Aboda Shop</h3>
    </div>
  );
};

export default Navbar;
