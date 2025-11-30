import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

interface CheckoutConfirmationProps {
  total: number;
  paymentMethod: string;
  paymentDetails: any;
  onCancel: () => void;
  onConfirm: () => void;
}

export function CheckoutConfirmation({ total, paymentMethod, paymentDetails, onCancel, onConfirm }: CheckoutConfirmationProps) {
  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'easypaisa':
        return 'Easypaisa';
      case 'jazzcash':
        return 'JazzCash';
      case 'cash':
        return 'Cash on Delivery';
      default:
        return 'Cash on Delivery';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/50 flex items-end z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white rounded-t-3xl p-6"
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#FF6B0020' }}
          >
            <ShoppingBag className="w-10 h-10" style={{ color: '#FF6B00' }} />
          </div>
        </div>

        <h2 className="text-center mb-2 text-gray-900">Confirm Order</h2>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to place this order?
        </p>

        <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Total</span>
            <span className="text-gray-900">Rs {total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment:</span>
            <span className="text-gray-900">{getPaymentMethodName()}</span>
          </div>
          {paymentDetails?.phoneNumber && (
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Account:</span>
              <span className="text-gray-900">{paymentDetails.phoneNumber}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-4 rounded-full border-2 border-gray-200 text-gray-700 transition-transform active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-4 rounded-full text-white transition-transform active:scale-95"
            style={{ backgroundColor: '#10B981' }}
          >
            Place Order
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}