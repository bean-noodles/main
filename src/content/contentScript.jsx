import "./contentStyle.css";
import React from "react";
import { createRoot } from "react-dom/client";
import ColorButton from "./colorButton";

console.log("contentScript loaded");

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

    const wrapper = document.createElement("div");
    wrapper.className = "h3-wrapper";

    h3.parentNode.insertBefore(wrapper, h3);

    wrapper.appendChild(h3);

    const mountPoint = document.createElement("span");
    wrapper.appendChild(mountPoint);

    const root = createRoot(mountPoint);
    root.render(<ColorButton title={title} link={link} />);
  });
}

injectReactButton();

const observer = new MutationObserver(() => {
  injectReactButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
