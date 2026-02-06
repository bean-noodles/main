import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import headerIcon from "../public/popup-header.svg";
import ProfileIcon from "../public/profile.svg";
import SettingIcon from "../public/setting.svg";
import ColorButton from "./content/colorButton.jsx";
import Arrowup from "../public/arrow_up.svg";
import Arrowdown from "../public/arrow_down.svg";

function Popup() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!window.chrome || !chrome.storage) {
        console.log("chrome.storage.local not available yet");
        return;
      }

      chrome.storage.local.get("searchResults", (data) => {
        if (data.searchResults) {
          const withExpanded = data.searchResults.map((r) => ({
            ...r,
            expanded: false,
          }));
          setResults(withExpanded);
        }
      });
    };

    fetchResults();
  }, []);

  const getDomainFromLink = (link) => {
    const match = link.match(/\/\/([^/]+)\//);
    return match ? match[1] : link;
  };

  const toggleExpand = (idx) => {
    setResults((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, expanded: !r.expanded } : r))
    );
  };

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontWeight: "semibold",
                    fontSize: 16,
                    textDecoration: "none",
                    color: "#000000",
                    padding: "16px 0px",
                  }}
                >
                  {getDomainFromLink(r.link)}
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <ColorButton
                    title={r.badgeInfo.title}
                    link={r.badgeInfo.link}
                  />
                  <img
                    src={r.expanded ? Arrowdown : Arrowup}
                    style={{ width: 16, height: 16, cursor: "pointer" }}
                    onClick={() => toggleExpand(idx)}
                  />
                </div>
              </div>

              {/* 확장 영역 */}
              <div
                style={{
                  height: r.expanded ? 96 : 0,
                  overflow: "hidden",
                  transition: "height 0.3s",
                }}
              >
                {r.expanded && <p style={{ margin: 0 }}>여기에 추가 공간</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
