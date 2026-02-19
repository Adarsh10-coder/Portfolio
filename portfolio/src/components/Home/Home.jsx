import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const greetings = [
    "Hello World",
    "नमस्ते दुनिया",
    "Hola Mundo",
    "Bonjour le Monde",
    "こんにちは世界",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Typewriter + Rotation Logic
  useEffect(() => {
    if (charIndex < greetings[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + greetings[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % greetings.length);
          setFade(true);
        }, 400);
      }, 2000);
    }
  }, [charIndex, index]);

  return (
    <div style={styles.wrapper}>
      
      {/* Spline (UNCHANGED) */}
      <Spline scene="https://prod.spline.design/9hHqtjWyIt0sTGhI/scene.splinecode" />

      {/* Overlapping Greeting */}
      <h1
        style={{
          opacity: fade ? 1 : 0,
        }}
        className="glitch"
      >
        {text}
      </h1>

      {/* Styles */}
      <style>
        {`
          .glitch {
            position: absolute;
            top: 120px;   /* moved higher */
            left: 50%;
            transform: translateX(-50%);
            font-size: 3rem;
            font-weight: bold;
            color: #a855f7;
            transition: opacity 0.4s ease-in-out;
            pointer-events: none;
          }

          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            width: 100%;
          }

          .glitch::before {
            color: #ff00ff;
            z-index: -1;
            animation: glitchTop 1.5s infinite alternate;
          }

          .glitch::after {
            color: #00ffff;
            z-index: -2;
            animation: glitchBottom 1.5s infinite alternate;
          }

          @keyframes glitchTop {
            0% { transform: translate(-1px, -1px); }
            50% { transform: translate(1px, 1px); }
            100% { transform: translate(-1px, 0); }
          }

          @keyframes glitchBottom {
            0% { transform: translate(1px, 1px); }
            50% { transform: translate(-1px, -1px); }
            100% { transform: translate(1px, 0); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#000",
    position: "relative",
    paddingTop: "80px", // space below header
  },
};
