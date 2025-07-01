import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowMenu = !isMobile || (isMobile && isOpen);
  return (
    <div className="navbar">
      <FontAwesomeIcon
        className="toggleSideBar"
        icon={faBars}
        onClick={toggleMenu}
      />
      <nav>
        {shouldShowMenu && (
          <ul>
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                الصفحة الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={toggleMenu}>
                التصنيفات
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" onClick={toggleMenu}>
                الاصناف
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchases" onClick={toggleMenu}>
                فاتورة شراء
              </NavLink>
            </li>
            <li>
              <NavLink to="/sales" onClick={toggleMenu}>
                فاتورة بيع
              </NavLink>
            </li>
            <li>
              <NavLink to="/invoices" onClick={toggleMenu}>
                الفواتير
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" onClick={toggleMenu}>
                العملاء و الموردين
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
      <h3>Aboda Shop</h3>
    </div>
  );
};

export default Navbar;
