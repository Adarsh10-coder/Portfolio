import React, { useState } from 'react';
import styled from 'styled-components';
import resumePdf from '../../assets/Adarsh_cv.pdf';

const ResumeButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;
    
    // Show loader
    setIsDownloading(true);

    // Fake delay to show off the animation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'Adarsh_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <StyledWrapper>
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <div className="loader" />
        ) : (
          <>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" width={22} height={22} fill="currentColor">
                <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
                <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
                <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
              </svg>
            </span>
            <span className="text">Resume</span>
          </>
        )}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    background: transparent;
    position: relative;
    width: 155px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid #17795E;
    border-radius: 25px;
    outline: none;
    overflow: hidden;
    color: #17795E;
    transition: color 0.3s 0.1s ease-out;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button .text {
    position: absolute;
    transition: all 0.3s ease-out;
    transform: translateX(12px);
  }

  button .icon {
    position: absolute;
    transition: all 0.3s ease-out;
    transform: translateX(-35px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover .text {
    transform: translateX(45px);
    opacity: 0;
  }

  button:hover .icon {
    transform: translateX(0);
  }

  button::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: "";
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  button:hover {
    color: #fff;
    border: 1px solid #17795E;
  }

  button:hover::before {
    box-shadow: inset 0 0 0 10em #17795E;
  }

  /* Loader styling (scaled down slightly to fit the pill) */
  .loader {
    width: 26px;
    height: 26px;
    color: #17795E;
    position: relative;
    background: radial-gradient(6.5px,currentColor 94%,#0000);
  }

  .loader:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(5.8px at bottom right,#0000 94%,currentColor) top left,
                radial-gradient(5.8px at bottom left ,#0000 94%,currentColor) top right,
                radial-gradient(5.8px at top right,#0000 94%,currentColor) bottom left,
                radial-gradient(5.8px at top left ,#0000 94%,currentColor) bottom right;
    background-size: 13px 13px;
    background-repeat: no-repeat;
    animation: loader 1.5s infinite cubic-bezier(0.3,1,0,1);
  }

  button:hover .loader {
    color: #fff;
  }

  @keyframes loader {
    33% {
      inset: -6.5px;
      transform: rotate(0deg);
    }
    66% {
      inset: -6.5px;
      transform: rotate(90deg);
    }
    100% {
      inset: 0;
      transform: rotate(90deg);
    }
  }
`;

export default ResumeButton;
