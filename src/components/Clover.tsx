export default function Clover() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "5px" }}>
      <defs>
        <radialGradient id="lg1" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#6ee7b7"/>
          <stop offset="45%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </radialGradient>
        <radialGradient id="lg2" cx="62%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="45%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </radialGradient>
        <radialGradient id="lg3" cx="38%" cy="68%" r="65%">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="45%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#022c22"/>
        </radialGradient>
        <radialGradient id="lg4" cx="62%" cy="68%" r="65%">
          <stop offset="0%" stopColor="#6ee7b7"/>
          <stop offset="45%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#022c22"/>
        </radialGradient>
        <radialGradient id="cgr" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#6ee7b7"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </radialGradient>
      </defs>

      {/* Lístek nahoře */}
      <circle cx="50" cy="28" r="22" fill="url(#lg1)"/>
      <path d="M50,50 Q44,38 46,22" stroke="#064e3b" strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M46,34 Q40,32 36,27" stroke="#064e3b" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <ellipse cx="43" cy="20" rx="7" ry="4" fill="#a7f3d0" opacity="0.3" transform="rotate(-25 43 20)"/>
      <circle cx="52" cy="10" r="2.8" fill="#a7f3d0" opacity="0.65"/>

      {/* Lístek vpravo */}
      <circle cx="72" cy="50" r="22" fill="url(#lg2)"/>
      <path d="M50,50 Q62,44 78,46" stroke="#064e3b" strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M66,46 Q68,40 72,36" stroke="#064e3b" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <ellipse cx="80" cy="43" rx="7" ry="4" fill="#a7f3d0" opacity="0.3" transform="rotate(65 80 43)"/>
      <circle cx="90" cy="51" r="2.5" fill="#a7f3d0" opacity="0.6"/>

      {/* Lístek dole */}
      <circle cx="50" cy="72" r="22" fill="url(#lg3)"/>
      <path d="M50,50 Q44,62 46,78" stroke="#064e3b" strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M46,66 Q40,68 36,73" stroke="#064e3b" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <ellipse cx="43" cy="80" rx="7" ry="4" fill="#a7f3d0" opacity="0.3" transform="rotate(25 43 80)"/>
      <circle cx="51" cy="90" r="2.5" fill="#a7f3d0" opacity="0.6"/>

      {/* Lístek vlevo */}
      <circle cx="28" cy="50" r="22" fill="url(#lg4)"/>
      <path d="M50,50 Q38,44 22,46" stroke="#064e3b" strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M34,46 Q32,40 28,36" stroke="#064e3b" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <ellipse cx="20" cy="43" rx="7" ry="4" fill="#a7f3d0" opacity="0.3" transform="rotate(-65 20 43)"/>
      <circle cx="10" cy="51" r="2.8" fill="#a7f3d0" opacity="0.65"/>

      {/* Střed */}
      <circle cx="50" cy="50" r="8" fill="#052e16"/>
      <circle cx="50" cy="50" r="5" fill="url(#cgr)"/>
      <circle cx="48" cy="48" r="2" fill="#bbf7d0" opacity="0.85"/>
    </svg>
  );
}
