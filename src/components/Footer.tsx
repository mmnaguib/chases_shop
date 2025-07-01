import { faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
      <Link
        to="https://wa.me/201275830217"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#fff" }}
      >
        <FontAwesomeIcon icon={faPhoneSquare} />
        <span className="iconWithText"> WhatsApp</span>
      </Link>
    </footer>
  );
};

export default Footer;
