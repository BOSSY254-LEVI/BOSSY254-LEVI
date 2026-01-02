import { useEffect, useRef } from 'react';
import './theme.css';

export function ModernBackground() {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Generate dynamic particles
    if (particlesRef.current) {
      const particlesContainer = particlesRef.current;
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'network-particle';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
      }

      return () => {
        while (particlesContainer.firstChild) {
          particlesContainer.removeChild(particlesContainer.firstChild);
        }
      };
    }
  }, []);

  return (
    <div className="tech-background">
      <div className="gradient-mesh"></div>
      <div className="circuit-board"></div>
      <div className="hologram-grid"></div>
      <div className="energy-orb"></div>
      <div className="energy-orb"></div>
      
      <div className="particle-network" ref={particlesRef}></div>
      
      <div className="data-streams">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="data-stream"></div>
        ))}
      </div>
    </div>
  );
}