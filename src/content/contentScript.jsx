import { createRoot } from "react-dom/client";
import ColorButton from "./colorButton";

console.log("Content script loaded");

function injectReactButton() {
  const h3List = document.querySelectorAll("a h3");

  h3List.forEach((h3) => {
    if (h3.dataset.extInjected) return;
    h3.dataset.extInjected = "true";

    const anchor = h3.closest("a");
    if (!anchor) return;

    const title = h3.innerText;
    const link = anchor.href;
    if (!title || !link) return;

    const mountPoint = document.createElement("span");
    mountPoint.className = "badge-mount";
    h3.appendChild(mountPoint);

    const root = createRoot(mountPoint);
    root.render(<ColorButton title={title} link={link} />);
  });
}

function collectSearchResults() {
  const results = [];

  const h3List = document.querySelectorAll("h3");

  h3List.forEach((h3) => {
    const anchor = h3.closest("a");
    if (!anchor) return;

    const title = h3.innerText.trim();
    const link = anchor.href;
    if (!title || !link) return;

    const resultBlock =
      h3.closest("div[jscontroller]") || h3.closest("div[data-snhf]");
    if (!resultBlock) return;

    const descriptionEl =
      resultBlock.querySelector("div.VwiC3b") ||
      resultBlock.querySelector("span.VwiC3b") ||
      resultBlock.querySelector("div[role='heading'] ~ div") ||
      null;

    const rawDescription = descriptionEl ? descriptionEl.innerText.trim() : "";
    const description = cleanDescription(rawDescription);

    results.push({ title, link, description, badgeInfo: { title, link } });
    chrome.storage.local.set({ searchResults: results });
  });

  return results;
}

function updateResultsStorage() {
  const results = collectSearchResults();
  console.log("Content script results:", results);
  chrome.storage.local.set({ searchResults: results });
}

injectReactButton();
updateResultsStorage();

const observer = new MutationObserver(() => {
  injectReactButton();
  updateResultsStorage();
});
observer.observe(document.body, { childList: true, subtree: true });

function cleanDescription(text) {
  return text.replace(/^\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.\s*—\s*/, "");
}
