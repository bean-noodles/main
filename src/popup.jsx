import React from "react";
import ReactDOM from "react-dom/client";

function Popup() {
  return (
    <div className="popup">
      <h1>Hello, Extension!</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
