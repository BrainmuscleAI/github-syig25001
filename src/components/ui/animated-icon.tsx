import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: React.ReactNode;
  type?: 'heart' | 'comment' | 'share' | 'notification';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const PARTICLE_COLORS = {
  heart: ['#FF5D5D', '#FF7A7A', '#FF9B9B'],
  comment: ['#FFD700', '#FFE55C', '#FFF7D6'], // Yellow theme
  share: ['#7DD3FC', '#BAE6FD', '#E0F2FE'], // Light blue theme
  notification: ['#FF9B9B', '#FFB7B7', '#FFD4D4']
};

const PARTICLE_CONTENT = {
  heart: ['❤️', '💖', '💝', '💗', '💓'],
  comment: ['💬', '✨', '⭐', '🌟', '💫'],
  share: ['🚀', '💫', '✨', '🌟', '⭐'],
  notification: ['🔔', '✨', '🌟', '💫', '⭐']
};

const ACTIVE_COLORS = {
  heart: 'text-red-500',
  comment: 'text-yellow-500',
  share: 'text-blue-400',
  notification: 'text-red-500'
};

export function AnimatedIcon({ 
  icon, 
  type = 'heart', 
  isActive, 
  onClick,
  className 
}: AnimatedIconProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    scale: number;
    rotation: number;
    content: string;
    color: string;
  }>>([]);

  const createParticles = () => {
    const particleCount = type === 'heart' ? 8 : 12;
    const colors = PARTICLE_COLORS[type];
    const contents = PARTICLE_CONTENT[type];
    const spread = 40; // Reduced spread radius to keep particles closer to icon

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      content: contents[Math.floor(Math.random() * contents.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handleClick = () => {
    createParticles();
    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={cn(
          "transition-colors duration-200",
          isActive && ACTIVE_COLORS[type],
          className
        )}
      >
        {icon}
      </motion.div>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              scale: particle.scale,
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              opacity: 0
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ 
              fontSize: '1.25rem',
              color: particle.color,
              zIndex: 50
            }}
          >
            {particle.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}