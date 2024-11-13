import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/lib/notifications';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedIcon } from '@/components/ui/animated-icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NotificationsList } from './notifications-list';

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  },
  exit: { 
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export function NotificationsBell() {
  const { unreadCount } = useNotifications();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative inline-block">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-muted transition-colors duration-200"
          >
            <AnimatedIcon
              icon={<Bell className="h-4 w-4" />}
              type="notification"
            />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute -top-2 -right-2 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notificaciones</DialogTitle>
        </DialogHeader>
        <NotificationsList />
      </DialogContent>
    </Dialog>
  );
}