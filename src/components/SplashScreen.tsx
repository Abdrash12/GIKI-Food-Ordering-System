import { useEffect } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        >
          <UtensilsCrossed className="w-16 h-16" style={{ color: '#FF6B00' }} />
        </motion.div>
        <div>
          <h1 className="tracking-tight" style={{ fontSize: '40px', color: '#FF6B00' }}>GIKI Food</h1>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-12 text-gray-500"
      >
        Campus cravings, sorted.
      </motion.p>
    </div>
  );
}
