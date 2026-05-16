"use client";
import { useEffect, useRef } from "react";

export default function Clover() {
  return (
    <svg width="40" height="40" viewBox="0 0 80 80" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "6px" }}>
        <defs>
          <radialGradient id="cl1g" cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#bbf7d0"/>
            <stop offset="35%" stopColor="#4ade80"/>
            <stop offset="70%" stopColor="#16a34a"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
          <radialGradient id="cl2g" cx="65%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="35%" stopColor="#22c55e"/>
            <stop offset="70%" stopColor="#15803d"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
          <radialGradient id="cl3g" cx="35%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="35%" stopColor="#22c55e"/>
            <stop offset="70%" stopColor="#166534"/>
            <stop offset="100%" stopColor="#052e16"/>
          </radialGradient>
          <radialGradient id="cl4g" cx="65%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#bbf7d0"/>
            <stop offset="35%" stopColor="#4ade80"/>
            <stop offset="70%" stopColor="#16a34a"/>
            <stop offset="100%" stopColor="#052e16"/>
          </radialGradient>
          <radialGradient id="clcg" cx="35%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
        </defs>
        <g >
          <g >
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl1g)" transform="translate(40,40) rotate(-45)"/>
            <ellipse  cx="29" cy="27" rx="5" ry="3" fill="#d1fae5" transform="rotate(-45 29 27)"/>
          </g>
          <g >
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl2g)" transform="translate(40,40) rotate(45)"/>
            <ellipse  cx="51" cy="27" rx="5" ry="3" fill="#d1fae5" transform="rotate(45 51 27)"/>
          </g>
          <g >
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl3g)" transform="translate(40,40) rotate(-135)"/>
            <ellipse  cx="29" cy="53" rx="5" ry="3" fill="#d1fae5" transform="rotate(135 29 53)"/>
          </g>
          <g >
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl4g)" transform="translate(40,40) rotate(135)"/>
            <ellipse  cx="51" cy="53" rx="5" ry="3" fill="#d1fae5" transform="rotate(-135 51 53)"/>
          </g>
          <g >
            <circle cx="40" cy="40" r="5" fill="#052e16"/>
            <circle cx="40" cy="40" r="3" fill="url(#clcg)"/>
            <circle cx="39" cy="39" r="1.2" fill="#bbf7d0" opacity="0.95"/>
          </g>
          <polygon  points="28,26 29,23 30,26 27,24 31,24" fill="#86efac"/>
          <polygon  points="52,22 53,19 54,22 51,20 55,20" fill="#4ade80"/>
          <polygon  points="22,53 23,50 24,53 21,51 25,51" fill="#86efac"/>
          <polygon  points="56,51 57,48 58,51 55,49 59,49" fill="#4ade80"/>
        </g>
      </svg>
  );
}
