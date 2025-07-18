import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BreathingCircle({ show, color = '#3B82F6' }) {
  const [phase, setPhase] = useState('inhale');

  useEffect(() => {
    if (!show) return;
    const timer = setInterval(() => {
      setPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 3000);
    return () => clearInterval(timer);
  }, [show]);

  return show ? (
    <div
      style={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.4 : 1,
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
        }}
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}88, ${color}33)`,
          boxShadow: `0 0 30px ${color}88`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: '500',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      >
        {phase === 'inhale' ? 'Breathe In...' : 'Breathe Out...'}
      </motion.div>
    </div>
  ) : null;
}
