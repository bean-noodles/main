// src/content/colorButton.jsx

import { useState } from "react";

import redIcon from "../../public/red.svg?inline";
import yellowIcon from "../../public/yellow.svg?inline";
import greenIcon from "../../public/green.svg?inline";
import greyIcon from "../../public/grey.svg?inline";

const STATUS = [
  { label: "안전", color: "green", icon: greenIcon },
  { label: "주의", color: "yellow", icon: yellowIcon },
  { label: "위험", color: "red", icon: redIcon },
  { label: "검사", color: "grey", icon: greyIcon },
];

export default function ColorButton({ title, link }) {
  const [selected] = useState(() => {
    return STATUS[Math.floor(Math.random() * STATUS.length)];
  });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log({
      status: selected.label,
      title,
      link,
    });
  };

  return (
    <div
      className={`mainBadge badge-${selected.color}`}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "Pretendard Variable, sans-serif",
        cursor: "pointer",
        userSelect: "none",
        color: "white",
        backgroundColor:
          selected.color === "green"
            ? "#059669"
            : selected.color === "yellow"
            ? "#ca8a04"
            : selected.color === "red"
            ? "#dc2626"
            : "#525252",
        borderRadius: 6,
        padding: "0 6px",
        height: 22,
        width: 58,
      }}
    >
      <img
        src={selected.icon}
        style={{ width: 16, height: 16 }}
        alt={selected.label}
      />
      {selected.label}
    </div>
  );
}
