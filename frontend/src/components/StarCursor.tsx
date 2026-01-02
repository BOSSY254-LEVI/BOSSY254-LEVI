import { useEffect, useState } from 'react';

export function StarCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: id++ }];
        // Keep only last 20 points
        return newTrail.slice(-20);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail stars */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="pointer-events-none fixed z-[9999]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length * 0.6,
          }}
        >
          <svg
            width={8 + (index / trail.length) * 8}
            height={8 + (index / trail.length) * 8}
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spin"
            style={{ animationDuration: '3s' }}
          >
            <path
              d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z"
              fill={`hsl(${191 + index * 5}, 91%, ${56 + index}%)`}
            />
          </svg>
        </div>
      ))
      }
      
      {/* Main star cursor */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-md"
            style={{
              background: 'radial-gradient(circle, hsl(191, 91%, 56%) 0%, transparent 70%)',
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          {/* Main star */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spin drop-shadow-[0_0_10px_hsl(191,91%,56%)]"
            style={{ animationDuration: '4s' }}
          >
            <path
              d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.27L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z"
              fill="url(#starGradient)"
              stroke="hsl(191, 91%, 70%)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(191, 91%, 56%)" />
                <stop offset="100%" stopColor="hsl(280, 100%, 70%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Sparkle particles */}
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-primary rounded-full animate-ping" />
          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-accent rounded-full animate-ping animation-delay-200" />
        </div>
      </div>
    </>
  );
}

