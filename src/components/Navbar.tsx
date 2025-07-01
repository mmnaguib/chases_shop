import {
  faBars,
  faBoxOpen,
  faFileAlt,
  faFileInvoiceDollar,
  faHome,
  faReceipt,
  faTags,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
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
                <FontAwesomeIcon icon={faHome} />
                <span className="iconWithText">الصفحة الرئيسية</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faTags} />
                <span className="iconWithText"> التصنيفات</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBoxOpen} />
                <span className="iconWithText"> الاصناف</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchases" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                <span className="iconWithText">فاتورة شراء</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sales" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faReceipt} />
                <span className="iconWithText">الفاتورة بيع</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/invoices" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faFileAlt} />
                <span className="iconWithText">الفواتير</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUsers} />
                <span className="iconWithText">العملاء و الموردين</span>
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
