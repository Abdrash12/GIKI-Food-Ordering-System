import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navigation, MapPin, Phone, Package, Clock, DollarSign } from 'lucide-react';

interface DeliveryJob {
  id: string;
  orderId: string;
  vendorName: string;
  vendorLocation: string;
  deliveryAddress: string;
  hostel: string;
  room: string;
  items: Array<{ name: string; quantity: number }>;
  earnings: number;
  distance: string;
  specialInstructions?: string;
}

interface DeliveryRouteProps {
  job: DeliveryJob;
  onRequestOTP: () => void;
  onBack: () => void;
}

export function DeliveryRoute({ job, onRequestOTP, onBack }: DeliveryRouteProps) {
  const [currentStep, setCurrentStep] = useState<'pickup' | 'delivering'>('pickup');
  const [eta, setEta] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === 'pickup') {
        setCurrentStep('delivering');
        setEta(7);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Map Area */}
      <div className="h-96 relative" style={{ backgroundColor: '#E5E7EB' }}>
        {/* Map Mockup */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-900 mb-2">
              {currentStep === 'pickup' 
                ? `Heading to ${job.vendorName}` 
                : `Delivering to ${job.hostel}`}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{eta} mins away</span>
            </div>
          </div>
        </div>

        {/* Route Line Visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
          <motion.path
            d={currentStep === 'pickup' 
              ? "M 80 280 Q 150 200, 200 150" 
              : "M 200 150 Q 250 200, 313 280"}
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="grid grid-cols-3 gap-4 text-white text-center">
            <div>
              <p className="text-sm opacity-80">Distance</p>
              <p>{job.distance}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">ETA</p>
              <p>{eta} mins</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Earnings</p>
              <p>Rs {job.earnings}</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm" style={{ backgroundColor: currentStep === 'pickup' ? '#007AFF' : '#10B981' }}>
          {currentStep === 'pickup' ? 'Going to Pickup' : 'Delivering'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Progress Steps */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Delivery Progress</h3>
          <div className="space-y-6">
            {/* Pickup Step */}
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentStep === 'pickup' ? 1.1 : 1,
                    backgroundColor: currentStep === 'delivering' ? '#10B981' : '#007AFF'
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </motion.div>
                <div className="w-1 h-16 mt-2" style={{ backgroundColor: currentStep === 'delivering' ? '#10B981' : '#007AFF' }} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-gray-900 mb-1">Pickup from {job.vendorName}</h4>
                <p className="text-gray-600">{job.vendorLocation}</p>
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

            {/* Delivery Step */}
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
                <p className="text-gray-600">{job.deliveryAddress}</p>
                {currentStep === 'delivering' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm mt-2"
                    style={{ color: '#10B981' }}
                  >
                    On the way to deliver...
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: '#F7F8FA' }}>
          <h4 className="text-gray-900 mb-3">Order Details</h4>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="text-gray-900">{job.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="text-gray-900">{job.items.length} items</span>
            </div>
          </div>
          <div className="space-y-1">
            {job.items.map((item, i) => (
              <p key={i} className="text-sm text-gray-700">
                {item.quantity}x {item.name}
              </p>
            ))}
          </div>
          {job.specialInstructions && (
            <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: '#F1C40F20' }}>
              <p className="text-sm" style={{ color: '#856404' }}>
                ⚠️ {job.specialInstructions}
              </p>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <button
          className="w-full py-3 rounded-full border-2 border-gray-200 flex items-center justify-center gap-2 transition-transform active:scale-95 mb-4"
        >
          <Phone className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Call Customer</span>
        </button>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onRequestOTP}
          disabled={currentStep === 'pickup'}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#10B981' }}
        >
          {currentStep === 'pickup' ? 'Heading to Pickup...' : 'Arrived – Request OTP'}
        </button>
      </div>
    </div>
  );
}
