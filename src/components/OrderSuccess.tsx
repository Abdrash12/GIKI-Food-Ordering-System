import { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string;
  vendorName: string;
  onTrackOrder: () => void;
  onBack?: () => void;
}

export function OrderSuccess({ orderId, vendorName, onTrackOrder, onBack }: OrderSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTrackOrder();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onTrackOrder]);

  return (
    <div className="w-full h-full bg-white flex flex-col px-6">
      {onBack && (
        <div className="pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ backgroundColor: '#F7F8FA' }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="mb-8"
        >
          <CheckCircle2 className="w-32 h-32" style={{ color: '#10B981' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="mb-3 text-gray-900">Order Placed!</h1>
          <p className="text-gray-600 mb-2">Order {orderId}</p>
          <p className="text-gray-500">Sent to {vendorName}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FF6B00' }} />
          <p className="text-gray-500">Waiting for vendor to accept...</p>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onTrackOrder}
        className="mb-12 w-full py-4 rounded-full text-white transition-transform active:scale-95"
        style={{ backgroundColor: '#FF6B00' }}
      >
        Track Order
      </motion.button>
    </div>
  );
}