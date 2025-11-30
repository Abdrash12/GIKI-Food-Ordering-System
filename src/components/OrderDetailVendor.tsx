import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, DollarSign, User } from 'lucide-react';

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number }>;
  specialInstructions?: string;
  paymentStatus: 'paid' | 'pending' | 'cash';
  timeReceived: string;
  status: 'new' | 'preparing' | 'ready';
  total: number;
  deliveryAddress: string;
}

interface OrderDetailVendorProps {
  order: Order;
  onBack: () => void;
  onStartPreparing: () => void;
  onMarkReady: () => void;
}

export function OrderDetailVendor({ order, onBack, onStartPreparing, onMarkReady }: OrderDetailVendorProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStartPreparing = () => {
    setCurrentStatus('preparing');
    onStartPreparing();
  };

  const handleMarkReady = () => {
    setCurrentStatus('ready');
    onMarkReady();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform active:scale-95"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-1">Order {order.id}</h1>
            <p className="text-gray-600">{order.timeReceived}</p>
          </div>
          <div
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: currentStatus === 'new' ? '#007AFF10' : currentStatus === 'preparing' ? '#F1C40F10' : '#10B98110',
              color: currentStatus === 'new' ? '#007AFF' : currentStatus === 'preparing' ? '#F1C40F' : '#10B981'
            }}
          >
            {currentStatus === 'new' ? 'New' : currentStatus === 'preparing' ? 'Preparing' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Customer Info */}
        <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
          <h3 className="text-gray-900 mb-3">Delivery Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-gray-900">{order.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="text-gray-900">Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Order Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ backgroundColor: '#F7F8FA' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: '#007AFF' }}
                  >
                    {item.quantity}
                  </div>
                  <p className="text-gray-900">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="mb-6 p-4 rounded-2xl"
            style={{ backgroundColor: '#F1C40F20', border: '2px solid #F1C40F' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Special Instructions</h3>
                <p className="text-gray-700">{order.specialInstructions}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Info */}
        <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
          <h3 className="text-gray-900 mb-3">Payment Details</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">Rs {order.total - 50}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">Rs 50</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">Rs {order.total}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Payment Method</span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: order.paymentStatus === 'paid' ? '#10B98110' : '#F1C40F10',
                  color: order.paymentStatus === 'paid' ? '#10B981' : '#F1C40F'
                }}
              >
                {order.paymentStatus === 'paid' ? 'Paid Online' : 'Cash on Delivery'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200">
        {currentStatus === 'new' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleStartPreparing}
            className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
            style={{ backgroundColor: '#007AFF' }}
          >
            Start Preparing
          </motion.button>
        )}
        {currentStatus === 'preparing' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleMarkReady}
            className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
            style={{ backgroundColor: '#10B981' }}
          >
            Mark as Ready
          </motion.button>
        )}
        {currentStatus === 'ready' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#10B98110' }}>
              <Clock className="w-8 h-8" style={{ color: '#10B981' }} />
            </div>
            <p className="text-gray-900 mb-1">Order Ready!</p>
            <p className="text-gray-600">Waiting for rider to pick up</p>
          </div>
        )}
      </div>
    </div>
  );
}
