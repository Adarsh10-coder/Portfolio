import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Music, ExternalLink, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Experience', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <a href="#" className="navbar-brand">
          <span className="brand-logo">A</span>
          <span className="brand-text">Portfolio</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links glass-panel">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
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
          
          <button className="icon-btn rounded-btn" title="Toggle Theme">
            <Sun size={18} />
          </button>
          
          <a href="#" className="icon-btn rounded-btn" title="External Link">
            <ExternalLink size={18} />
          </a>

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
            <a key={link.name} href={link.href} className="mobile-nav-link">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
