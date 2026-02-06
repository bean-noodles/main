import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/popup.css";
import headerIcon from "../public/popup-header.svg";

function Popup() {
  return (
    <div className="popup-container">
      <div className="popup-header-wrapper">
        <img src={headerIcon} className="popup-header-icon" />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
