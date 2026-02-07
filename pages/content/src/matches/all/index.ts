console.log("[CEB] All content script loaded");

interface SearchResult {
  title: string;
  link: string;
  description: string;
  badgeInfo: {
    title: string;
    link: string;
  };
}

function cleanDescription(text: string): string {
  return text.replace(/^\d{4}\.\s*\d{1,2}\.\s*\d{1,2}\.\s*—\s*/, "");
}

function collectSearchResults(): SearchResult[] {
  const results: SearchResult[] = [];
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

    const rawDescription = descriptionEl
      ? (descriptionEl as HTMLElement).innerText.trim()
      : "";
    const description = cleanDescription(rawDescription);

    results.push({ title, link, description, badgeInfo: { title, link } });
  });

  return results;
}

function updateResultsStorage(): void {
  const results = collectSearchResults();
  console.log("[CEB] Content script results:", results);
  chrome.storage.local.set({ searchResults: results });
}

// Initial collection
updateResultsStorage();

// Watch for dynamic content changes
const observer = new MutationObserver(() => {
  updateResultsStorage();
});
observer.observe(document.body, { childList: true, subtree: true });
