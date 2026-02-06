import ReactDOM from "react-dom/client";
import "./styles/popup.css";
import headerIcon from "../public/popup-header.svg";
import ProfileIcon from "../public/profile.svg";
import SettingIcon from "../public/setting.svg";

export default function Popup() {
  return (
    <div className="popup-container">
      <div className="popup-header-wrapper">
        <img src={headerIcon} className="popup-header-icon" />
        <div className="popup-header-right-wrapper">
          <img src={SettingIcon} className="popup-header-right-icon" />
          <img src={ProfileIcon} className="popup-header-right-icon" />
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
