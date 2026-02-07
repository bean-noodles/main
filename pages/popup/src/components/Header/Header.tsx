import "@src/components/Header/Header.css";
import Logo from "@src/../public/logo.svg";
import SettingIcon from "@src/../public/icons/setting.svg";
import DefaultProfileIcon from "@src/../public/profile.svg";
import { userStorage } from "@extension/storage";
import { useStorage } from "@extension/shared";

interface HeaderProps {
  setPage: (page: "main" | "settings" | "profile") => void;
}

export default function Header({ setPage }: HeaderProps) {
  const userState = useStorage(userStorage);
  const profileImage = userState.user?.picture || DefaultProfileIcon;

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
              src={profileImage}
              className="profile-icon" // Ensure this class handles circular cropping if needed, or inline style
              alt="Profile"
              onClick={() => setPage("profile")}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
