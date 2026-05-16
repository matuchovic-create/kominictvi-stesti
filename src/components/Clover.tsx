export default function Clover() {
  return (
    <>
      <style>{`
        @keyframes cWow {
          0%,100% { transform: rotate(-3deg) scale(1); }
          25% { transform: rotate(0deg) scale(1.12); }
          50% { transform: rotate(3deg) scale(1); }
          75% { transform: rotate(0deg) scale(1.1); }
        }
        @keyframes cGlow {
          0%,100% { filter: drop-shadow(0 0 2px #4ade80); }
          50% { filter: drop-shadow(0 0 8px #4ade80) drop-shadow(0 0 16px #22c55e); }
        }
        .c-anim {
          transform-origin: 40px 40px;
          animation: cWow 3s ease-in-out infinite, cGlow 2s ease-in-out infinite;
        }
      `}</style>
      <svg width="36" height="36" viewBox="0 0 80 80" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "6px" }}>
        <defs>
          <radialGradient id="cl1" cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#bbf7d0"/>
            <stop offset="35%" stopColor="#4ade80"/>
            <stop offset="70%" stopColor="#16a34a"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
          <radialGradient id="cl2" cx="65%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="35%" stopColor="#22c55e"/>
            <stop offset="70%" stopColor="#15803d"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
          <radialGradient id="cl3" cx="35%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="35%" stopColor="#22c55e"/>
            <stop offset="70%" stopColor="#166534"/>
            <stop offset="100%" stopColor="#052e16"/>
          </radialGradient>
          <radialGradient id="cl4" cx="65%" cy="65%" r="75%">
            <stop offset="0%" stopColor="#bbf7d0"/>
            <stop offset="35%" stopColor="#4ade80"/>
            <stop offset="70%" stopColor="#16a34a"/>
            <stop offset="100%" stopColor="#052e16"/>
          </radialGradient>
          <radialGradient id="clc" cx="35%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#86efac"/>
            <stop offset="100%" stopColor="#14532d"/>
          </radialGradient>
        </defs>
        <g className="c-anim">
          <g transform="translate(40,40) rotate(-45)">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl1)"/>
            <path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/>
          </g>
          <g transform="translate(40,40) rotate(45)">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl2)"/>
            <path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/>
          </g>
          <g transform="translate(40,40) rotate(-135)">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl3)"/>
            <path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/>
          </g>
          <g transform="translate(40,40) rotate(135)">
            <path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#cl4)"/>
            <path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/>
          </g>
          <circle cx="40" cy="40" r="4" fill="#052e16"/>
          <circle cx="40" cy="40" r="2.5" fill="url(#clc)"/>
          <circle cx="39" cy="39" r="1" fill="#bbf7d0" opacity="0.9"/>
        </g>
      </svg>
    </>
  );
}
