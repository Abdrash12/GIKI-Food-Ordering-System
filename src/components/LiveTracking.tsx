import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Check, ArrowLeft } from 'lucide-react';
import { Order } from '../App';

interface LiveTrackingProps {
  order: Order | null;
  onComplete: () => void;
  onBack?: () => void;
}

const statuses = [
  { id: 'accepted', label: 'Order Accepted', time: '2 mins ago' },
  { id: 'preparing', label: 'Preparing', time: '5 mins ago' },
  { id: 'ready', label: 'Ready for Pickup', time: '12 mins ago' },
  { id: 'picked_up', label: 'Picked Up', time: '15 mins ago' },
  { id: 'arriving', label: 'Arriving', time: 'Now' }
];

export function LiveTracking({ order, onComplete, onBack }: LiveTrackingProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev < statuses.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => onComplete(), 2000);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="h-64 relative" style={{ backgroundColor: '#E5E7EB' }}>
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform active:scale-95 z-10"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>Map View</p>
            <p className="text-sm">TUC → Hostel 3</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-6">
          <h2 className="mb-2 text-gray-900">Order {order?.id}</h2>
          <p className="text-gray-600">{order?.vendorName}</p>
        </div>

        <div className="relative mb-8">
          {statuses.map((status, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isActive = index === currentStatusIndex;

            return (
              <div key={status.id} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, backgroundColor: '#E5E7EB' }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted ? '#FF6B00' : '#E5E7EB'
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  {index < statuses.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: '100%',
                        backgroundColor: isCompleted ? '#FF6B00' : '#E5E7EB'
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-1 flex-1 absolute top-10"
                    />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <h4
                    className="mb-1 transition-colors"
                    style={{ color: isCompleted ? '#1F2937' : '#9CA3AF' }}
                  >
                    {status.label}
                  </h4>
                  <p className="text-gray-500">{status.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#007AFF20' }}
          >
            <span style={{ color: '#007AFF' }}>AN</span>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900">Anas</h4>
            <p className="text-gray-600">Your delivery rider</p>
          </div>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
            style={{ backgroundColor: '#10B981' }}
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}