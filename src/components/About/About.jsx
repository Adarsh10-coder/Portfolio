import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        <div className="about-grid">
          <div className="about-text-content">
            <h2 className="title-large gradient-text">HELLO!</h2>
            <p className="about-description">
              I am a passionate Full-Stack Developer dedicated to building beautiful, functional, and user-centric digital experiences. I believe in the power of modern web technologies to transform ideas into reality.
            </p>
            <p className="about-description">
              When I'm not coding, I'm exploring new design trends, contributing to open source, and continuously pushing the boundaries of what's possible on the web.
            </p>
            
            <div className="about-skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">UI/UX</span>
            </div>
          </div>
          
          <div className="about-image-placeholder">
            {/* The animated image from Hero will land here */}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
