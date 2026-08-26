import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import greypic from '../../assets/greypic.png';
import redpic from '../../assets/redpic.png';
import './Hero.css';

const DraggableShape = ({ src, alt, initialClass }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
      initial={{ scale: 0, opacity: 0, rotate: -30 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.6 }}
      className={`abstract-shape ${initialClass}`}
      style={{
        cursor: 'grab',
        zIndex: 30,
      }}
      whileDrag={{ cursor: 'grabbing', zIndex: 50, scale: 1.1 }}
    >
      <div className="shape-tooltip">Drag me</div>
      <div className="animate-float">
        <img src={src} alt={alt} draggable="false" />
      </div>
    </motion.div>
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

  const initialXOffset = 120;
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
    <section id="home" className="hero-section">
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

          <motion.div 
            className="hero-words"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.2, delayChildren: 0.2 } 
              }
            }}
          >
            <motion.div 
              className="hero-word"
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { type: "spring", stiffness: 40, damping: 15 } 
                }
              }}
            >
              FULL-STACK
            </motion.div>
            <motion.div 
              className="hero-word"
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { type: "spring", stiffness: 40, damping: 15 } 
                }
              }}
            >
              DEVELOPER
            </motion.div>
          </motion.div>

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
        <motion.div 
          className="hero-metadata"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="meta-left">©2026</div>
          <div className="meta-right">/CREATING SINCE 2024</div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
