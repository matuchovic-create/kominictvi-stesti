"use client";
import { useEffect, useRef } from "react";

export default function Clover() {
  return (
    <>
      <style>{`
        @keyframes cSway {
          0%,100% { transform: rotate(-4deg) scale(1); }
          25%  { transform: rotate(0deg) scale(1.15) translateY(-2px); }
          50%  { transform: rotate(4deg) scale(1.05); }
          75%  { transform: rotate(0deg) scale(1.12) translateY(-1px); }
        }
        @keyframes cGlow {
          0%,100% { filter: drop-shadow(0 0 1px #4ade80); }
          50%      { filter: drop-shadow(0 0 6px #4ade80) drop-shadow(0 0 14px #22c55e) drop-shadow(0 0 28px #86efac); }
        }
        @keyframes cL1 {
          0%,100% { transform: translate(40px,40px) rotate(-45deg) scale(1); }
          30%     { transform: translate(40px,40px) rotate(-42deg) scale(1.08); }
          60%     { transform: translate(40px,40px) rotate(-48deg) scale(0.97); }
        }
        @keyframes cL2 {
          0%,100% { transform: translate(40px,40px) rotate(45deg) scale(1); }
          30%     { transform: translate(40px,40px) rotate(48deg) scale(1.08); }
          60%     { transform: translate(40px,40px) rotate(42deg) scale(0.97); }
        }
        @keyframes cL3 {
          0%,100% { transform: translate(40px,40px) rotate(-135deg) scale(1); }
          30%     { transform: translate(40px,40px) rotate(-132deg) scale(1.08); }
          60%     { transform: translate(40px,40px) rotate(-138deg) scale(0.97); }
        }
        @keyframes cL4 {
          0%,100% { transform: translate(40px,40px) rotate(135deg) scale(1); }
          30%     { transform: translate(40px,40px) rotate(138deg) scale(1.08); }
          60%     { transform: translate(40px,40px) rotate(132deg) scale(0.97); }
        }
        @keyframes cShine {
          0%,100% { opacity: 0.15; }
          50%      { opacity: 0.6; }
        }
        @keyframes cCenter {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.25); }
        }
        @keyframes cSpark {
          0%   { opacity: 0; transform: translate(0,0) scale(0); }
          20%  { opacity: 1; transform: translate(0,-4px) scale(1.2); }
          80%  { opacity: 0.6; transform: translate(0,-8px) scale(0.8); }
          100% { opacity: 0; transform: translate(0,-12px) scale(0); }
        }
        .ca { transform-origin: 40px 40px; animation: cSway 2.8s ease-in-out infinite, cGlow 2s ease-in-out infinite; }
        .cl1 { transform-origin: 40px 40px; animation: cL1 2.4s 0s ease-in-out infinite; }
        .cl2 { transform-origin: 40px 40px; animation: cL2 2.4s 0.6s ease-in-out infinite; }
        .cl3 { transform-origin: 40px 40px; animation: cL3 2.4s 1.2s ease-in-out infinite; }
        .cl4 { transform-origin: 40px 40px; animation: cL4 2.4s 1.8s ease-in-out infinite; }
        .cs  { animation: cShine 2s ease-in-out infinite; }
        .cs2 { animation: cShine 2s 0.5s ease-in-out infinite; }
        .cs3 { animation: cShine 2s 1s ease-in-out infinite; }
        .cs4 { animation: cShine 2s 1.5s ease-in-out infinite; }
        .cc  { transform-origin: 40px 40px; animation: cCenter 1.8s ease-in-out infinite; }
        .csp1 { transform-origin: 28px 25px; animation: cSpark 2s 0.2s ease-out infinite; }
        .csp2 { transform-origin: 52px 22px; animation: cSpark 2s 0.9s ease-out infinite; }
        .csp3 { transform-origin: 22px 52px; animation: cSpark 2s 1.6s ease-out infinite; }
        .csp4 { transform-origin: 56px 50px; animation: cSpark 2s 0.5s ease-out infinite; }
      `}</style>
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
        <g className="ca">
          <g className="cl1">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl1g)" transform="translate(40,40) rotate(-45)"/>
            <ellipse className="cs" cx="29" cy="27" rx="5" ry="3" fill="#d1fae5" transform="rotate(-45 29 27)"/>
          </g>
          <g className="cl2">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl2g)" transform="translate(40,40) rotate(45)"/>
            <ellipse className="cs2" cx="51" cy="27" rx="5" ry="3" fill="#d1fae5" transform="rotate(45 51 27)"/>
          </g>
          <g className="cl3">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl3g)" transform="translate(40,40) rotate(-135)"/>
            <ellipse className="cs3" cx="29" cy="53" rx="5" ry="3" fill="#d1fae5" transform="rotate(135 29 53)"/>
          </g>
          <g className="cl4">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl4g)" transform="translate(40,40) rotate(135)"/>
            <ellipse className="cs4" cx="51" cy="53" rx="5" ry="3" fill="#d1fae5" transform="rotate(-135 51 53)"/>
          </g>
          <g className="cc">
            <circle cx="40" cy="40" r="5" fill="#052e16"/>
            <circle cx="40" cy="40" r="3" fill="url(#clcg)"/>
            <circle cx="39" cy="39" r="1.2" fill="#bbf7d0" opacity="0.95"/>
          </g>
          <polygon className="csp1" points="28,26 29,23 30,26 27,24 31,24" fill="#86efac"/>
          <polygon className="csp2" points="52,22 53,19 54,22 51,20 55,20" fill="#4ade80"/>
          <polygon className="csp3" points="22,53 23,50 24,53 21,51 25,51" fill="#86efac"/>
          <polygon className="csp4" points="56,51 57,48 58,51 55,49 59,49" fill="#4ade80"/>
        </g>
      </svg>
    </>
  );
}
