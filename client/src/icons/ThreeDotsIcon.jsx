import React from "react";

export default function ThreeDotsIcon({className}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="26.25px"
      height="26.25px"
      fill="#333"
      className={className}
    >
      <g>
        <circle cx="5" cy="12" r="2"></circle>
        <circle cx="12" cy="12" r="2"></circle>
        <circle cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );
}
