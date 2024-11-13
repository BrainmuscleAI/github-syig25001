import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  modalContent?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function DashboardCard({
  title,
  children,
  modalContent,
  className = '',
  icon,
}: DashboardCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        onClick={() => modalContent && setShowModal(true)}
        className={`cursor-pointer ${modalContent ? 'hover:shadow-lg' : ''}`}
      >
        <Card className={`p-6 lighting-card hover:border-primary/50 transition-all ${className}`}>
          {icon && (
            <div className="flex items-center gap-2 mb-4">
              {icon}
              <h3 className="font-semibold">{title}</h3>
            </div>
          )}
          {!icon && title && <h3 className="font-semibold mb-4">{title}</h3>}
          {children}
        </Card>
      </motion.div>

      {modalContent && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {modalContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}