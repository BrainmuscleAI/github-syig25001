import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentButtonProps {
  count: number;
  onClick: () => void;
}

export function CommentButton({ count, onClick }: CommentButtonProps) {
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
      <MessageCircle className="h-4 w-4 mr-2" />
      <span>{count}</span>
      
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 15, 0],
            }}
            exit={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-yellow-400/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}