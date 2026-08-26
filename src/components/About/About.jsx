import { motion } from 'framer-motion';
import './About.css';
import LinkedInButton from './LinkedInButton';
import ResumeButton from './ResumeButton';

const About = () => {
  return (
    <motion.section 
      className="about-section" 
      id="about"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="about-container">
        
        <div className="about-grid">
          <div className="about-text-content">
            <h2 className="title-large gradient-text">HELLO!</h2>
            <p className="about-description">
              I am Adarsh Raj a passionate Full-Stack Developer dedicated to building beautiful, functional, and user-centric digital experiences. I believe in the power of modern web technologies to transform ideas into reality.
            </p>
            <p className="about-description">
              When I'm not coding, I'm exploring new design trends, contributing to open source, and continuously pushing the boundaries of what's possible on the web.
            </p>
            
            <div style={{ display: 'flex', gap: '3rem', marginTop: '1.5rem' }}>
              <LinkedInButton />
              <ResumeButton />
            </div>
          </div>
          
          <div className="about-image-placeholder">
            {/* The animated image from Hero will land here */}
          </div>
        </div>
        
      </div>
    </motion.section>
  );
};

export default About;
