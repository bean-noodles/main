import React, { useState } from "react";

import redIcon from "../assets/icon/red.svg";
import yellowIcon from "../assets/icon/yellow.svg";
import greenIcon from "../assets/icon/green.svg";
import greyIcon from "../assets/Icon/grey.svg";

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
    <div className={`mainBadge badge-${selected.color}`} onClick={handleClick}>
      <img src={selected.icon} className="badge-icon" />
      {selected.label}
    </div>
  );
}
