import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import headerIcon from "../public/popup-header.svg";
import ProfileIcon from "../public/profile.svg";
import SettingIcon from "../public/setting.svg";

export default function Popup() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!chrome?.storage?.local) return; // chrome.storage가 없으면 그냥 무시

    chrome.storage.local.get("searchResults", (data) => {
      if (data.searchResults) setResults(data.searchResults);
    });
  }, []);

  return (
    <div
      style={{
        width: 300,
        fontFamily: "Pretendard Variable, sans-serif",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <img src={headerIcon} style={{ width: 118, height: 32 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={SettingIcon} style={{ width: 24, height: 24 }} />
          <img src={ProfileIcon} style={{ width: 24, height: 24 }} />
        </div>
      </div>

      {results.length === 0 ? (
        <p>No results yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {results.map((r, idx) => (
            <li key={idx} style={{ marginBottom: 12 }}>
              <a
                href={r.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#1a0dab",
                }}
              >
                {r.title}
              </a>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#4d5156" }}>
                {r.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
