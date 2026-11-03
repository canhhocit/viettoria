import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  alphaSpeed: number;
  color: string;
}

export const HeritageParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette: Antique brass, soft gold leaf, warm paper
    const goldPalette = ['#B88A44', '#C89C54', '#E2CFA8', '#FAF7F0'];

    // Generate 40 subtle particles
    const particleCount = Math.min(45, Math.floor((width * height) / 25000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1, // Gently floating upwards like incense dust
      alpha: Math.random() * 0.5 + 0.1,
      maxAlpha: Math.random() * 0.6 + 0.2,
      alphaSpeed: Math.random() * 0.008 + 0.004,
      color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Oscillate transparency (twinkle)
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Wrap around borders
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#B88A44';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

export default HeritageParticles;
