import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import headerIcon from "../public/popup-header.svg";
import ProfileIcon from "../public/profile.svg";
import SettingIcon from "../public/setting.svg";
import ColorButton from "./content/colorButton.jsx";
import Arrowup from "../public/arrow_up.svg";
import Arrowdown from "../public/arrow_down.svg";
import Arrowback from "../public/arrow_back.svg";
import Logout from "../public/logout.svg";

function Popup() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState("main");

  useEffect(() => {
    const fetchResults = async () => {
      if (!window.chrome || !chrome.storage) return;

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

  const MainPage = () => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {results.length === 0 ? (
        <p>No results yet</p>
      ) : (
        results.map((r, idx) => (
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
        ))
      )}
    </ul>
  );

  const SettingsPage = ({ setPage }) => {
    const [toggle, setToggle] = useState(false);

    return (
      <div>
        {/* 뒤로가기 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            paddingBottom: 24,
            paddingTop: 8,
            cursor: "pointer",
          }}
          onClick={() => setPage("main")}
        >
          <img src={Arrowback} style={{ width: 16 }} />
          <div style={{ fontWeight: 500, fontSize: 14, color: "black" }}>
            뒤로 가기
          </div>
        </div>

        {/* iOS 토글 */}
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <div
            onClick={() => setToggle(!toggle)}
            style={{
              position: "relative",
              width: 33,
              height: 18,
              borderRadius: 9,
              backgroundColor: toggle ? "#0EA5E9" : "#e5e5ea",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 1,
                left: toggle ? 15 : 1,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                transition: "left 0.2s",
              }}
            />
          </div>
          <div style={{ fontSize: 14, fontWeight: 400 }}>
            검색 시 자동 전수 검사
          </div>
        </div>
        <div
          style={{
            width: 352,
            height: 1,
            backgroundColor: "#E5E5E5",
            marginTop: 24,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <div style={{ color: "#737373", fontWeight: 400, fontSize: 12 }}>
            서비스 이용약관
          </div>
          <div style={{ color: "#737373", fontWeight: 400, fontSize: 12 }}>
            개인정보 처리 방침
          </div>
          <div style={{ color: "#737373", fontWeight: 400, fontSize: 12 }}>
            오픈 소스 라이선스
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 뒤로가기 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "start",
            paddingBottom: 24,
            paddingTop: 8,
            cursor: "pointer",
          }}
          onClick={() => setPage("main")}
        >
          <img src={Arrowback} style={{ width: 16 }} />
          <div style={{ fontWeight: 500, fontSize: 14, color: "black" }}>
            뒤로 가기
          </div>
        </div>

        <img
          src={ProfileIcon}
          style={{ width: 128, height: 128, marginBottom: 24 }}
        ></img>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
          SYEONGMYING CHO
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            width: "100%",
            height: 40,
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <img src={Logout} style={{ width: 16 }}></img>
            <div style={{ color: "white", fontWeight: 500, fontSize: 14 }}>
              로그아웃
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: 300,
        height: page === "settings" ? 250 : page === "profile" ? 350 : 400,
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
          marginBottom: 16,
        }}
      >
        <img src={headerIcon} style={{ width: 118, height: 32 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={SettingIcon}
            style={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => setPage("settings")}
          />
          <img
            src={ProfileIcon}
            style={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => setPage("profile")}
          />
        </div>
      </div>

      {page === "main" ? (
        <MainPage />
      ) : page === "settings" ? (
        <SettingsPage setPage={setPage} />
      ) : (
        <ProfilePage />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
