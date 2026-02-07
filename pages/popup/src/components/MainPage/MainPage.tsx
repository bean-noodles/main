import "@src/components/MainPage/MainPage.css";
import getDomainFromLink from "@src/utils/getDomainFromLink";
import { useEffect, useState } from "react";
import Arrowup from "@src/../public/icons/arrow_up.svg";
import Arrowdown from "@src/../public/icons/arrow_down.svg";
import ColorButton from "@src/components/ColorButton/ColorButton";

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
}
