import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  count: number;
  onClick: () => void;
}

export function ShareButton({ count, onClick }: ShareButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="relative"
    >
      <Share2 className="h-4 w-4 mr-2" />
      <span>{count}</span>
      
      <AnimatePresence>
        {isAnimating && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -20, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Share2 className="h-4 w-4 text-blue-400" />
            </motion.div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full bg-blue-400/20 rounded-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Button>
  );
}