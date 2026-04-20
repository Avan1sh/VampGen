'use client';
import { useEffect, useRef } from 'react';

export default function InteractiveStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    const colors = ['#a855f7', '#ef4444', '#d8b4fe', '#fca5a5']; // subtle purple and red

    class Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      baseVx: number;
      baseVy: number;
      vx: number;
      vy: number;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // Slow base drift
        this.baseVx = (Math.random() - 0.5) * 0.4;
        this.baseVy = (Math.random() - 0.5) * 0.4;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Add a slight glow effect
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update(canvasWidth: number, canvasHeight: number) {
        // Screen bounds wrapping
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;

        // Mouse interaction (repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;
        
        if (distance < interactionRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          // Scale force based on proximity
          const force = (interactionRadius - distance) / interactionRadius;
          
          // Push away
          this.vx -= forceDirectionX * force * 0.8;
          this.vy -= forceDirectionY * force * 0.8;
        } else {
          // Gradually pull velocity back to the base smooth drift
          this.vx += (this.baseVx - this.vx) * 0.05;
          this.vy += (this.baseVy - this.vy) * 0.05;
        }

        // Apply a gentle friction limit
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      // Adjust density based on screen size (prevent overloading low-res monitors)
      const density = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < density; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      // Clear with slight trailing opacity for smoother tails if desired. 
      // For sharp stars, just clearRect.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update(canvas.width, canvas.height);
        star.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
