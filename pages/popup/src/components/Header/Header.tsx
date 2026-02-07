import "@src/components/Header/Header.css";
import Logo from "@src/../public/logo.svg";
import SettingIcon from "@src/../public/icons/setting.svg";
import ProfileIcon from "@src/../public/profile.svg";

interface HeaderProps {
  setPage: (page: "main" | "settings" | "profile") => void;
}

export default function Header({ setPage }: HeaderProps) {
  return (
    <header>
      <div className="header-container">
        <div className="header-content">
          <img src={Logo} className="header-logo" alt="Logo" />
          <div className="header-icons">
            <img
              src={SettingIcon}
              className="header-icon"
              alt="Settings"
              onClick={() => setPage("settings")}
            />
            <img
              src={ProfileIcon}
              className="profile-icon"
              alt="Profile"
              onClick={() => setPage("profile")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
