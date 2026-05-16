"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 3200);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s ease",
        opacity: hidden ? 0 : 1,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
          fontWeight: 300,
          letterSpacing: "0.3em",
          color: "#f5f0eb",
          opacity: 0,
          animation: "fadeInUp 1s 0.5s forwards",
        }}
      >
        KOMINICTVÍ ŠTĚSTÍ
      </div>
      <div
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.5em",
          color: "#E8650A",
          marginTop: "1rem",
          textTransform: "uppercase",
          opacity: 0,
          animation: "fadeInUp 1s 1s forwards",
        }}
      >
        Prémiový komínový servis
      </div>
      <div
        style={{
          width: 200,
          height: 1,
          background: "rgba(255,255,255,0.1)",
          marginTop: "3rem",
          overflow: "hidden",
          opacity: 0,
          animation: "fadeIn 0.5s 1.2s forwards",
        }}
      >
        <div
          style={{
            height: "100%",
            width: 0,
            background: "linear-gradient(90deg, #E8650A, #FF8C42)",
            animation: "loadBar 1.5s 1.3s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      </div>
    </div>
  );
}
