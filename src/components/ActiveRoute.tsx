import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navigation, MapPin, Phone, Check } from 'lucide-react';
import { Order } from '../App';

interface ActiveRouteProps {
  order: Order | null;
  onArrived: () => void;
}

export function ActiveRoute({ order, onArrived }: ActiveRouteProps) {
  const [currentStep, setCurrentStep] = useState<'pickup' | 'delivering'>('pickup');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === 'pickup') {
        setCurrentStep('delivering');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="h-96 relative" style={{ backgroundColor: '#E5E7EB' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">Navigation Active</p>
            <p className="text-gray-900">
              {currentStep === 'pickup' 
                ? `Heading to ${order?.vendorName}` 
                : `Delivering to ${order?.deliveryAddress}`}
            </p>
            <p className="text-gray-500 mt-2">~5 mins away</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="opacity-80">Distance</p>
              <p>1.2 km</p>
            </div>
            <div>
              <p className="opacity-80">ETA</p>
              <p>5 mins</p>
            </div>
            <div>
              <p className="opacity-80">Earnings</p>
              <p>Rs 50</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-6">
          <h3 className="mb-4 text-gray-900">Delivery Progress</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentStep === 'pickup' ? 1.1 : 1 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: '#007AFF' }}
                >
                  {currentStep === 'delivering' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <MapPin className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                <div className="w-1 h-16 mt-2" style={{ backgroundColor: '#007AFF' }} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="mb-1 text-gray-900">Pickup from {order?.vendorName}</h4>
                <p className="text-gray-600">TUC</p>
                {currentStep === 'pickup' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm mt-2"
                    style={{ color: '#007AFF' }}
                  >
                    Heading there now...
                  </motion.p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentStep === 'delivering' ? 1.1 : 1,
                    backgroundColor: currentStep === 'delivering' ? '#10B981' : '#E5E7EB'
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                >
                  <MapPin 
                    className="w-5 h-5" 
                    style={{ color: currentStep === 'delivering' ? 'white' : '#9CA3AF' }}
                  />
                </motion.div>
              </div>
              <div className="flex-1 pt-1">
                <h4
                  className="mb-1 transition-colors"
                  style={{ color: currentStep === 'delivering' ? '#1F2937' : '#9CA3AF' }}
                >
                  Deliver to Student
                </h4>
                <p className="text-gray-600">{order?.deliveryAddress}</p>
                {currentStep === 'delivering' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm mt-2"
                    style={{ color: '#10B981' }}
                  >
                    On the way...
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: '#F7F8FA' }}>
          <h4 className="mb-3 text-gray-900">Order Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="text-gray-900">{order?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="text-gray-900">{order?.items.length} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="text-gray-900">Rs {order?.total}</span>
            </div>
          </div>
          {order?.specialInstructions && (
            <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: '#F1C40F20' }}>
              <p className="text-sm text-gray-700">
                ⚠️ {order.specialInstructions}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-full border-2 border-gray-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Phone className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Call Customer</span>
          </button>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onArrived}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
          style={{ backgroundColor: '#10B981' }}
        >
          {currentStep === 'pickup' ? 'Picked Up Order' : 'Arrived at Hostel'}
        </button>
      </div>
    </div>
  );
}
