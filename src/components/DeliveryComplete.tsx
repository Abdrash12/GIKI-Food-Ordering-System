import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, DollarSign, Package } from 'lucide-react';

interface DeliveryCompleteProps {
  earnings: number;
  orderId: string;
  onBackToFeed: () => void;
}

export function DeliveryComplete({ earnings, orderId, onBackToFeed }: DeliveryCompleteProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleSubmitRating = () => {
    setHasRated(true);
    setTimeout(() => {
      onBackToFeed();
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center px-6">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="mb-8"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#10B98110' }}
        >
          <CheckCircle2 className="w-20 h-20" style={{ color: '#10B981' }} />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-gray-900 mb-3">Delivery Complete!</h1>
        <p className="text-gray-600 mb-2">Order {orderId} delivered successfully</p>
        <p className="text-gray-500">Great job completing this delivery</p>
      </motion.div>

      {/* Earnings Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full p-6 rounded-3xl mb-8"
        style={{ backgroundColor: '#10B98110', border: '2px solid #10B981' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">You Earned</p>
              <h2 className="text-gray-900">Rs {earnings}</h2>
            </div>
          </div>
          <div className="text-right">
            <Package className="w-6 h-6 mx-auto mb-1" style={{ color: '#10B981' }} />
            <p className="text-sm text-gray-600">+1 Delivery</p>
          </div>
        </div>
      </motion.div>

      {/* Rating Section */}
      {!hasRated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <div className="text-center mb-6">
            <h3 className="text-gray-900 mb-2">Rate this Customer</h3>
            <p className="text-gray-600">How was your delivery experience?</p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform"
              >
                <Star
                  className="w-12 h-12 transition-colors"
                  style={{
                    color: (hoveredRating || rating) >= star ? '#F1C40F' : '#E5E7EB',
                    fill: (hoveredRating || rating) >= star ? '#F1C40F' : 'transparent'
                  }}
                />
              </motion.button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToFeed}
              className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-700 transition-transform active:scale-95"
            >
              Skip
            </button>
            <button
              onClick={handleSubmitRating}
              disabled={rating === 0}
              className="flex-1 py-4 rounded-full text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#10B981' }}
            >
              Submit Rating
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-3" style={{ color: '#10B981' }} />
          <p className="text-gray-900 mb-1">Thank you for rating!</p>
          <p className="text-gray-600">Returning to deliveries...</p>
        </motion.div>
      )}
    </div>
  );
}
