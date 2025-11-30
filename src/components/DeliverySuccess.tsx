import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface DeliverySuccessProps {
  earnings: number;
  onBackToFeed: () => void;
}

export function DeliverySuccess({ earnings, onBackToFeed }: DeliverySuccessProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-6">
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
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="mb-3 text-gray-900">Delivery Complete!</h1>
        <p className="text-gray-600">Great job, Anas</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm p-6 rounded-3xl mb-8"
        style={{ backgroundColor: '#10B98120' }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <DollarSign className="w-8 h-8" style={{ color: '#10B981' }} />
          <p className="text-gray-900" style={{ fontSize: '48px' }}>+{earnings}</p>
        </div>
        <p className="text-center text-gray-600">Earnings for this delivery</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm space-y-4 mb-12"
      >
        <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Total Today</span>
          </div>
          <span className="text-gray-900">Rs 500</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Deliveries Completed</span>
          </div>
          <span className="text-gray-900">10</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onBackToFeed}
        className="w-full max-w-sm py-4 rounded-full text-white transition-transform active:scale-95"
        style={{ backgroundColor: '#007AFF' }}
      >
        Back to Feed
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-gray-500"
      >
        View Earnings History
      </motion.button>
    </div>
  );
}
