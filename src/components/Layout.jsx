import { ModernBackground } from './ModernBackground';
import { useScroll, useTransform, motion } from 'framer-motion';

export function Layout({ children }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  return (
    <>
      <ModernBackground />
      
      <motion.div
        style={{
          scale,
          opacity,
          position: 'relative',
          zIndex: 1
        }}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </motion.div>
    </>
  );
}