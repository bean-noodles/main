import { useState } from "react";

import RedIcon from "../../../public/icons/green.svg";
import YellowIcon from "../../../public/icons/yellow.svg";
import GreenIcon from "../../../public/icons/green.svg";
import GreyIcon from "../../../public/icons/grey.svg";

interface StatusItem {
  label: string;
  color: "green" | "yellow" | "red" | "grey";
  icon: string;
}

const STATUS: StatusItem[] = [
  { label: "안전", color: "green", icon: GreenIcon },
  { label: "주의", color: "yellow", icon: YellowIcon },
  { label: "위험", color: "red", icon: RedIcon },
  { label: "검사", color: "grey", icon: GreyIcon },
];

interface ColorButtonProps {
  title: string;
  link: string;
}

const COLOR_MAP: Record<StatusItem["color"], string> = {
  green: "#059669",
  yellow: "#ca8a04",
  red: "#dc2626",
  grey: "#525252",
};

export default function ColorButton({ title, link }: ColorButtonProps) {
  const [selected] = useState<StatusItem>(() => {
    return STATUS[Math.floor(Math.random() * STATUS.length)];
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
      <img
        src={selected.icon}
        style={{ width: 16, height: 16 }}
        alt={selected.label}
      />
      {selected.label}
    </div>
  );
}
