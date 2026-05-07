import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

interface BubbleBackgroundProps {
  count?: number;
}

export const BubbleBackground = ({ count = 20 }: BubbleBackgroundProps) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 15 + 15,
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
    const interval = setInterval(generateBubbles, 20000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="bubbles-bg" aria-hidden="true">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const ParticleBackground = ({ count = 30 }: BubbleBackgroundProps) => {
  const [particles, setParticles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 20 + 20,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 30000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="particles-bg" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const GradientOrbs = () => (
  <>
    <div className="gradient-orb orb-1 orb-pulse" aria-hidden="true" />
    <div className="gradient-orb orb-2 orb-pulse" aria-hidden="true" />
    <div className="gradient-orb orb-3 orb-pulse" aria-hidden="true" />
  </>
);
