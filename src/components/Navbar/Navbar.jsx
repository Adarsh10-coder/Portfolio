import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Music, ExternalLink, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [currentTime, setCurrentTime] = useState('');
  const lenis = useLenis();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 1. Handle background blur when scrolling
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Intersection Observer to spy on sections and update active nav link
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when a section enters the middle 20% of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSection = navLinks.find(
            (link) => link.href === `#${entry.target.id}`
          );
          if (activeSection) {
            setActiveLink(activeSection.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections mapped to navLinks
    navLinks.forEach((link) => {
      if (link.href.startsWith('#')) {
        const targetId = link.href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, linkName, href) => {
    e.preventDefault();
    setActiveLink(linkName);
    setMobileMenuOpen(false); // Close mobile menu if open

    if (href.startsWith('#')) {
      if (lenis) {
        // Use Lenis for butter-smooth scrolling
        lenis.scrollTo(href, { 
          duration: 1.8, // Slower, more luxurious duration
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Smooth easing
        });
      } else {
        // Fallback
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
      window.history.pushState(null, '', href);
    }
  };


  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <a 
          href="#home" 
          className="navbar-brand"
          onClick={(e) => handleNavClick(e, 'Home', '#home')}
        >
          <span className="brand-logo">A</span>
          <span className="brand-text">Portfolio</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links glass-panel">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.name, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button className="icon-btn search-btn">
            <span className="search-text">Search...</span>
            <kbd>⌘K</kbd>
          </button>
          
          <button className="icon-btn rounded-btn" title="Toggle Music">
            <Music size={18} />
          </button>
          
          <div className="time-pill" title="Current Local Time">
            <span className="blinking-dot"></span>
            <span>{currentTime}</span>
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`mobile-nav-link ${activeLink === link.name ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.name, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
