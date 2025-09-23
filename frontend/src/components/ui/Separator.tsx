import React from "react";
import clsx from "clsx";

type SeparatorProps = {
  width?: string;
  color?: string;
  className?: string;
};

export const Separator: React.FC<SeparatorProps> = ({
  width = "w-full",
  color = "bg-gradient-to-r from-electric to-tealblue",
  className,
}) => {
  return (
    <div
      className={clsx(
        "h-[2px] rounded-full opacity-80",
        width,
        color,
        className
      )}
    />
  );
};

export default Separator;