import { useState, useEffect } from 'react';
import greypic from '../../assets/greypic.png';
import './Hero.css';

// Draggable Shape Component
const DraggableShape = ({ src, alt, initialClass }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`abstract-shape ${initialClass}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 50 : 30, /* Higher than text z-index: 20 */
      }}
      onMouseDown={() => setIsDragging(true)}
      onDoubleClick={() => setIsDragging(true)}
    >
      {!isDragging && <div className="shape-tooltip">Double click to move me</div>}
      <div className={!isDragging ? 'animate-float' : ''}>
        <img src={src} alt={alt} draggable="false" />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Central Content */}
        <div className="hero-main-content">
          {/* Abstract Shapes (inside main content for relative alignment) */}
          <DraggableShape 
            src="https://framerusercontent.com/images/OLDYsHB9RMavvQrkVRNy08ZXYE.png?scale-down-to=512&width=2550&height=2550"
            alt="3D Star"
            initialClass="shape-star"
          />
          
          <DraggableShape 
            src="https://framerusercontent.com/images/lIIjRX5gxRdY7UWw5wqIXicPOA.png?scale-down-to=512&width=2550&height=2550"
            alt="3D Lightning"
            initialClass="shape-lightning"
          />
          <div className="hero-words">
            <div className="hero-word">FULL-STACK</div>
            <div className="hero-word">DEVELOPER</div>
          </div>
          
          <div className="hero-photo-wrapper">
            <img 
              src={greypic} 
              alt="Aditya" 
              className="hero-profile-pic"
            />
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="hero-metadata">
          <div className="meta-left">©2026</div>
          <div className="meta-right">/CREATING SINCE 2020</div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
