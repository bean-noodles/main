import "@src/components/Header/Header.css";
import Logo from "@src/../public/logo.svg";

export default function HeaderWithoutLogin() {
  return (
    <header style={{ width: "100%" }}>
      <div className="header-container">
        <div className="header-content">
          <img src={Logo} className="header-logo" alt="Logo" />
        </div>
      </div>
    </header>
  );
}
