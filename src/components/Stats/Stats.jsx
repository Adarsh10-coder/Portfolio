import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Eye, Heart } from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import WifiLoader from './WifiLoader';
import TextLoader from './TextLoader';
import './Stats.css';

const Stats = () => {
  const [views, setViews] = useState(20);
  const [appreciationCount, setAppreciationCount] = useState(30);
  const [hasAppreciated, setHasAppreciated] = useState(false);
  const [hearts, setHearts] = useState([]);
  const viewIncremented = useRef(false);

  const viewsRef = useRef(null);
  const isInView = useInView(viewsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Views Logic
    let currentViews = 20;
    if (!viewIncremented.current) {
      const storedViews = parseInt(localStorage.getItem('portfolio_views') || '0');
      const newViews = storedViews + 1;
      localStorage.setItem('portfolio_views', newViews.toString());
      currentViews = 20 + newViews;
      setViews(currentViews);
      viewIncremented.current = true;
    } else {
      const storedViews = parseInt(localStorage.getItem('portfolio_views') || '0');
      currentViews = 20 + storedViews;
      setViews(currentViews);
    }

    // Appreciation Logic
    const storedAppreciations = parseInt(localStorage.getItem('portfolio_appreciations') || '0');
    setAppreciationCount(30 + storedAppreciations);

    if (sessionStorage.getItem('has_appreciated') === 'true') {
      setHasAppreciated(true);
    }
  }, []);

  const [githubData, setGithubData] = useState({
    repos: 36,
    followers: 189,
    following: 41,
    stars: 124,
    location: 'Loading...'
  });

  const [isLoadingGithub, setIsLoadingGithub] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://api.github.com/users/Adarsh10-coder').then(res => res.json()),
      fetch('https://api.github.com/users/Adarsh10-coder/repos?per_page=100').then(res => res.json())
    ])
      .then(([userData, reposData]) => {
        if (!userData.message) {
          let totalStars = 0;
          if (Array.isArray(reposData)) {
            totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
          }

          setGithubData({
            repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            stars: totalStars,
            location: userData.location || 'Not specified'
          });
          setIsLoadingGithub(false);
        }
      })
      .catch(err => {
        console.error("Error fetching GitHub data:", err);
        setIsLoadingGithub(false);
      });
  }, []);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, views, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (viewsRef.current) {
            viewsRef.current.textContent = Math.round(value);
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, views]);

  const handleAppreciate = () => {
    if (hasAppreciated) return;

    setAppreciationCount(prev => prev + 1);
    setHasAppreciated(true);
    sessionStorage.setItem('has_appreciated', 'true');

    const storedAppreciations = parseInt(localStorage.getItem('portfolio_appreciations') || '0');
    localStorage.setItem('portfolio_appreciations', (storedAppreciations + 1).toString());

    // Create floating hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 40 - 20,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setHearts(newHearts);

    setTimeout(() => setHearts([]), 1000);
  };



  return (
    <section id="stats" className="stats-section">
      <div className="stats-container">

        {/* Section 1: Portfolio Stats */}
        <div className="stats-group">
          <div className="stats-header">
            <h2>About this portfolio</h2>
            <p>Insights and metrics about this portfolio website</p>
          </div>

          <div className="stats-cards-grid">
            <div className="stat-card views">
              <span className="stat-label">
                <Eye size={16} color="#8b5cf6" /> Total Views
              </span>
              <h3 className="stat-value" ref={viewsRef}>0</h3>
              <p className="stat-subtext">Unique page visits since Aug-2026</p>
            </div>

            <div className="stat-card appreciation">
              <span className="stat-label">
                <Heart size={16} color="#f43f5e" /> Appreciation Count
              </span>
              <motion.h3
                key={appreciationCount}
                initial={{ scale: 1.5, color: '#ffffff' }}
                animate={{ scale: 1, color: '#fb7185' }}
                className="stat-value"
              >
                {appreciationCount}
              </motion.h3>
              <div
                className="heart-pill"
                onClick={handleAppreciate}
                style={{
                  cursor: hasAppreciated ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  transition: 'transform 0.2s',
                  transform: hasAppreciated ? 'scale(1)' : undefined
                }}
              >
                <Heart size={14} fill="currentColor" />
                <span>{hasAppreciated ? 'Thank you, much appreciated!' : 'Love this portfolio'}</span>

                <AnimatePresence>
                  {hearts.map(h => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                      animate={{
                        opacity: 0,
                        x: h.x,
                        y: h.y - 60,
                        scale: h.scale
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ position: 'absolute', pointerEvents: 'none' }}
                    >
                      <Heart size={16} color="#f43f5e" fill="#f43f5e" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: GitHub Stats */}
        <div className="stats-group">
          <div className="stats-header">
            <h2>GitHub Stats</h2>
            <p>Insights and metrics about my GitHub profile</p>
          </div>

          <div className="github-heatmap-card" style={{ minHeight: '180px' }}>
            {isLoadingGithub ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                <WifiLoader />
              </div>
            ) : (
              <>
                <GitHubCalendar
                  username="Adarsh10-coder"
                  colorScheme="light"
                  blockSize={15}
                  blockMargin={5}
                  fontSize={16}
                  theme={{
                    light: ['#f0fdf4', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'],
                  }}
                  renderBlock={(block, activity) => (
                    React.cloneElement(block, {
                      'data-tooltip-id': 'react-tooltip',
                      'data-tooltip-html': `${activity.count} contributions on ${activity.date}`,
                      style: {
                        ...block.props.style,
                        rx: 4, // border radius for blocks
                        ry: 4,
                      }
                    })
                  )}
                />
                <Tooltip id="react-tooltip" />
              </>
            )}
          </div>

          <div className="stats-cards-grid">
            <div className="stat-card hireable">
              <span className="stat-label">Hireable</span>
              <h3 className="stat-value">Yes</h3>
            </div>

            <div className="stat-card">
              <span className="stat-label">Total Public Repositories</span>
              {isLoadingGithub ? (
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center', marginTop: '0.5rem' }}>
                  <TextLoader />
                </div>
              ) : (
                <h3 className="stat-value">{githubData.repos}</h3>
              )}
            </div>

            <div className="stat-card">
              <span className="stat-label">Followers</span>
              {isLoadingGithub ? (
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center', marginTop: '0.5rem' }}>
                  <TextLoader />
                </div>
              ) : (
                <h3 className="stat-value">{githubData.followers}</h3>
              )}
            </div>

            <div className="stat-card">
              <span className="stat-label">Following</span>
              {isLoadingGithub ? (
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center', marginTop: '0.5rem' }}>
                  <TextLoader />
                </div>
              ) : (
                <h3 className="stat-value">{githubData.following}</h3>
              )}
            </div>

            <div className="stat-card">
              <span className="stat-label">Total Stars Earned</span>
              {isLoadingGithub ? (
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center', marginTop: '0.5rem' }}>
                  <TextLoader />
                </div>
              ) : (
                <h3 className="stat-value">{githubData.stars}</h3>
              )}
            </div>

            <div className="stat-card">
              <span className="stat-label">Location</span>
              <h3 className="stat-value" style={{ fontSize: '2.5rem', alignSelf: 'flex-start', marginTop: 'auto' }}>Jamshedpur, Jharkhand</h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;
