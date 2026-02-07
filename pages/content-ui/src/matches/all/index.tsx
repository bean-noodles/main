import { createRoot } from "react-dom/client";
import inlineCss from "../../../dist/all/index.css?inline";
import App from "@src/matches/all/App";

console.log("[CEB] Content UI script loaded");

function injectReactBadges() {
  const h3List = document.querySelectorAll("a h3");

  h3List.forEach((h3) => {
    const element = h3 as HTMLElement;
    if (element.dataset.extInjected) return;
    element.dataset.extInjected = "true";

    const anchor = element.closest("a");
    if (!anchor) return;

    const title = element.innerText;
    const link = anchor.href;
    if (!title || !link) return;

    // Create shadow host
    const shadowHost = document.createElement("span");
    shadowHost.className = "recon-badge-host";
    shadowHost.style.display = "inline-flex";
    shadowHost.style.alignItems = "center";
    shadowHost.style.marginLeft = "8px";
    shadowHost.style.verticalAlign = "middle";
    element.appendChild(shadowHost);

    // Create shadow root
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });

    // Add styles
    const style = document.createElement("style");
    style.textContent = inlineCss;
    shadowRoot.appendChild(style);

    // Create mount point
    const mountPoint = document.createElement("div");
    mountPoint.style.display = "inline-flex";
    shadowRoot.appendChild(mountPoint);

    // Render React component
    const root = createRoot(mountPoint);
    root.render(<App title={title} link={link} />);
  });
}

// Initial injection
injectReactBadges();

// Watch for dynamic content changes
const observer = new MutationObserver(() => {
  injectReactBadges();
});
observer.observe(document.body, { childList: true, subtree: true });
