import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
}

export function HeartButton({ isLiked, count, onToggle }: HeartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`relative ${isLiked ? 'text-red-500' : ''}`}
    >
      <Heart className="h-4 w-4 mr-2" />
      <span>{count}</span>
      
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}