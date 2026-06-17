import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isOnImage, setIsOnImage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 15 };
  const circleX = useSpring(cursorX, springConfig);
  const circleY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('img, [data-cursor="view"]')) {
        setIsOnImage(true);
        setIsHovering(false);
      } else if (
        target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
      ) {
        setIsHovering(true);
        setIsOnImage(false);
      } else {
        setIsHovering(false);
        setIsOnImage(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot - follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </motion.div>

      {/* Trailing circle - follows with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: circleX,
          y: circleY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isOnImage ? 60 : isHovering ? 54 : 36,
            height: isOnImage ? 60 : isHovering ? 54 : 36,
            borderColor: isHovering || isOnImage ? '#DC2626' : 'rgba(255,255,255,0.3)',
            backgroundColor: isOnImage ? 'rgba(220,38,38,0.1)' : 'transparent',
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border flex items-center justify-center"
        >
          {isOnImage && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-inter uppercase tracking-[0.2em] text-white"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
