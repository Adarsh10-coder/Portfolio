import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import greypic from '../../assets/greypic.png';
import redpic from '../../assets/redpic.png';
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
        zIndex: isDragging ? 50 : 30,
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
  const { scrollY } = useScroll();
  const [dimensions, setDimensions] = useState({ vh: 800, vw: 1200 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        vh: window.innerHeight,
        vw: window.innerWidth,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { vh, vw } = dimensions;

  // Calculate offsets to position the image further right as requested
  const initialXOffset = 120; // Starts 120px to the right of center
  // 0.25 was center of right column. 0.35 pushes it closer to the right edge.
  const finalXOffset = Math.min(vw, 1200) * 0.35;

  // Raw transforms tied directly to scroll
  // The scroll distance is roughly 1 viewport height (vh)
  const rawY = useTransform(scrollY, [0, vh], [0, vh * 0.78]); 
  const rawRotateY = useTransform(scrollY, [0, vh], [0, 180]);
  const rawScale = useTransform(scrollY, [0, vh], [1, 2]);

  // Apply spring physics for that "more smooth", premium feel
  const springConfig = { stiffness: 70, damping: 20, mass: 0.8 };
  const y = useSpring(rawY, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(rawScale, springConfig);
  
  // Spring the numeric offset for X translation
  const rawXOffset = useTransform(scrollY, [0, vh], [initialXOffset, finalXOffset]);
  const xOffset = useSpring(rawXOffset, springConfig);
  const x = useTransform(xOffset, (val) => `calc(-50% + ${val}px)`);

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Central Content */}
        <div className="hero-main-content">
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
          
          <motion.div 
            className="hero-photo-wrapper"
            style={{ 
              x, // Use the dynamically calculated x position
              y, 
              rotateY, 
              scale,
              // Z-index 5 puts it behind the text (which will be z-index 20)
              zIndex: 5 
            }}
          >
            <div className="hero-photo-front">
              <img 
                src={greypic} 
                alt="Aditya Grey" 
                className="hero-profile-pic"
              />
            </div>
            <div className="hero-photo-back">
              <img 
                src={redpic} 
                alt="Aditya Red" 
                className="hero-profile-pic"
              />
            </div>
          </motion.div>
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
