import React from "react";
import styled from "styled-components";

const Header = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Stacks", "Contact"];

  return (
    <Wrapper>
      <nav className="nav">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 16px;
  z-index: 50;
  width: 100%;
  display: flex;
  justify-content: center;

  .nav {
    padding: 14px 40px;
    backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(139, 92, 246, 0.3);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.2);
    border-radius: 999px;
    max-width: 95%;
  }

  ul {
    display: flex;
    gap: 60px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    position: relative;
    color: #d1d5db;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;

    transition: 
      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      color 0.3s ease,
      text-shadow 0.5s ease;

    will-change: transform;
    white-space: nowrap;
  }

  .nav-item:hover {
    transform: translateY(-6px);
    color: #ffffff;
    text-shadow: 0 6px 25px rgba(168, 85, 247, 0.6);
  }

  .nav-item::before,
  .nav-item::after {
    position: absolute;
    content: "";
    width: 160%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    z-index: -1;
  }

  .nav-item:hover::before {
    top: -70%;
    background-image:
      radial-gradient(circle, #a855f7 20%, transparent 20%),
      radial-gradient(circle, #7c3aed 20%, transparent 20%),
      radial-gradient(circle, #9333ea 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%;
    background-position: 20% 90%, 50% 90%, 80% 90%;
    animation: topBubbles 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .nav-item:hover::after {
    bottom: -70%;
    background-image:
      radial-gradient(circle, #7c3aed 20%, transparent 20%),
      radial-gradient(circle, #9333ea 20%, transparent 20%),
      radial-gradient(circle, #a855f7 20%, transparent 20%);
    background-size: 18% 18%, 15% 15%, 20% 20%;
    background-position: 30% 0%, 60% 0%, 90% 0%;
    animation: bottomBubbles 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes topBubbles {
    0% {
      background-position: 20% 90%, 50% 90%, 80% 90%;
    }
    100% {
      background-position: 20% 0%, 50% -25%, 80% -15%;
      background-size: 0% 0%, 0% 0%, 0% 0%;
    }
  }

  @keyframes bottomBubbles {
    0% {
      background-position: 30% 0%, 60% 0%, 90% 0%;
    }
    100% {
      background-position: 30% 100%, 60% 130%, 90% 120%;
      background-size: 0% 0%, 0% 0%, 0% 0%;
    }
  }

  /* ============================= */
  /* 📱 Tablet */
  /* ============================= */
  @media (max-width: 1024px) {
    .nav {
      padding: 12px 28px;
    }

    ul {
      gap: 40px;
    }

    .nav-item {
      font-size: 16px;
    }
  }

  /* ============================= */
  /* 📱 Mobile */
  /* ============================= */
  @media (max-width: 768px) {
    .nav {
      padding: 10px 18px;
      width: 95%;
    }

    ul {
      gap: 28px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    ul::-webkit-scrollbar {
      display: none;
    }

    .nav-item {
      font-size: 14px;
    }
  }

  /* ============================= */
  /* 📱 Small Mobile */
  /* ============================= */
  @media (max-width: 480px) {
    .nav {
      padding: 8px 14px;
    }

    ul {
      gap: 20px;
    }

    .nav-item {
      font-size: 13px;
    }
  }
`;


export default Header;
