import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowLeft } from 'lucide-react';

interface RatingProps {
  onSubmit: () => void;
  onBack?: () => void;
}

export function Rating({ onSubmit, onBack }: RatingProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/50 flex items-end z-50"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full bg-white rounded-t-3xl p-6"
      >
        {onBack && (
          <div className="mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{ backgroundColor: '#F7F8FA' }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        )}

        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        
        <h2 className="text-center mb-2 text-gray-900">How was your meal?</h2>
        <p className="text-center text-gray-600 mb-8">Rate your experience</p>

        <div className="flex justify-center gap-2 mb-8">
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

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Additional Feedback (Optional)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us more about your experience..."
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none resize-none"
            style={{ backgroundColor: '#F7F8FA' }}
            rows={4}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-700 transition-transform active:scale-95"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 py-4 rounded-full text-white transition-transform active:scale-95 disabled:opacity-50"
            style={{ backgroundColor: '#FF6B00' }}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}