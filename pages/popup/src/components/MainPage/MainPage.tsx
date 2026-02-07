import "@src/components/MainPage/MainPage.css";
import getDomainFromLink from "@src/utils/getDomainFromLink";
import { useEffect, useState } from "react";
import Arrowup from "@src/../public/icons/arrow_up.svg";
import Arrowdown from "@src/../public/icons/arrow_down.svg";
import ColorButton from "@src/components/ColorButton/ColorButton";
import ReloadIcon from "@src/../public/icons/reload.svg";

interface Result {
  link: string;
  badgeInfo: {
    title: string;
    link: string;
  };
  expanded: boolean;
}

export default function MainPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [page, setPage] = useState("main");
  const [isGoogleHome, setIsGoogleHome] = useState(false);

  const toggleExpand = (idx: number) => {
    setResults((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, expanded: !r.expanded } : r)),
    );
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!window.chrome || !chrome.storage) return;

      chrome.storage.local.get("searchResults", (data) => {
        if (data.searchResults) {
          const withExpanded = data.searchResults.map(
            (r: Omit<Result, "expanded">) => ({
              ...r,
              expanded: false,
            }),
          );
          setResults(withExpanded);
        }
      });
    };
    fetchResults();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url);

        if (url.pathname === "/settings") {
          setPage("settings");
        } else if (
          url.hostname === "www.google.com" &&
          (url.pathname === "/" || url.pathname === "")
        ) {
          setPage("main");
          setIsGoogleHome(true);
        } else {
          setPage("main");
          setIsGoogleHome(false);
        }
      }
    });
  }, []);

  return (
    <ul className="results-list">
      {results.length === 0 ? (
        <div className="reload-wrapper">
          <div
            className="reload-button"
            onClick={() => {
              chrome.tabs.query(
                { active: true, currentWindow: true },
                (tabs) => {
                  if (tabs[0]?.id) {
                    chrome.tabs.reload(tabs[0].id);
                  }
                },
              );
            }}
          >
            <div className="reload-button-content">
              <img src={ReloadIcon} alt="Reload" />
              <div className="reload-button-text">새로고침</div>
            </div>
          </div>
          <p className="reload-help-text">
            구글 검색 결과 페이지가 맞는지 확인해주세요.
          </p>
        </div>
      ) : (
        results.map((r, idx) => (
          <li key={idx} className="result-item">
            <div className="result-row" onClick={() => toggleExpand(idx)}>
              <div className="result-title">{getDomainFromLink(r.link)}</div>

              <div className="result-actions">
                <ColorButton
                  title={r.badgeInfo.title}
                  link={r.badgeInfo.link}
                />
                <img
                  src={r.expanded ? Arrowdown : Arrowup}
                  className="arrow-icon"
                />
              </div>
            </div>

            {/* 확장 영역 */}
            <div
              className={`expand-area ${r.expanded ? "expanded" : "collapsed"}`}
            >
              {r.expanded && <p className="expand-content">여기에 추가 공간</p>}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
