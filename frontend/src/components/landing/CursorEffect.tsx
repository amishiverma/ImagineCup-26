import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  lifetime: number;
}

export const CursorEffect = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastMoveTime = useRef(Date.now());

  const colors = [
    'rgba(59, 130, 246, 0.8)', // blue
    'rgba(139, 92, 246, 0.8)', // purple
    'rgba(6, 182, 212, 0.8)', // cyan
    'rgba(168, 85, 247, 0.8)', // violet
  ];

  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      lastMoveTime.current = Date.now();

      // Create new particles near cursor when moving
      const newParticles: Particle[] = [];
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50;
        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          lifetime: 60,
        });
      }

      setParticles((prev) => [...prev, ...newParticles].slice(-15));

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTime.current;

      setParticles((prevParticles) => {
        return prevParticles
          .map((particle) => {
            // Calculate distance from mouse
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let newVx = particle.vx;
            let newVy = particle.vy;

            // Slow antigravity effect only when moving
            if (distance < 150 && distance > 0 && timeSinceMove < 200) {
              const force = (150 - distance) / 150;
              const angle = Math.atan2(dy, dx);
              newVx -= Math.cos(angle) * force * 0.3;
              newVy -= Math.sin(angle) * force * 0.3;
            }

            // Apply velocity damping
            newVx *= 0.92;
            newVy *= 0.92;

            const newX = particle.x + newVx;
            const newY = particle.y + newVy;

            const newLifetime = particle.lifetime - 1;
            const newOpacity = Math.max(0, newLifetime / 60);

            return {
              ...particle,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              lifetime: newLifetime,
              opacity: newOpacity,
            };
          })
          .filter((p) => p.lifetime > 0);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ overflow: 'hidden' }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: particle.opacity,
              scale: [1, 1.2, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.3,
              },
            }}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Subtle cursor glow only when moving */}
      {isMoving && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6, scale: [1, 1.2, 1] }}
          exit={{ opacity: 0 }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
            width: '80px',
            height: '80px',
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(15px)',
          }}
        />
      )}
    </div>
  );
};
