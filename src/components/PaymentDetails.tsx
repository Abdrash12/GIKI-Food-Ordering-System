import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Wallet, CreditCard, Banknote } from 'lucide-react';

interface PaymentDetailsProps {
  paymentMethod: string;
  onBack: () => void;
  onContinue: (details: any) => void;
}

export function PaymentDetails({ paymentMethod, onBack, onContinue }: PaymentDetailsProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const getMethodInfo = () => {
    switch (paymentMethod) {
      case 'easypaisa':
        return { name: 'Easypaisa', icon: Wallet, color: '#00A859' };
      case 'jazzcash':
        return { name: 'JazzCash', icon: CreditCard, color: '#FF6B00' };
      case 'cash':
        return { name: 'Cash on Delivery', icon: Banknote, color: '#6B7280' };
      default:
        return { name: 'Cash on Delivery', icon: Banknote, color: '#6B7280' };
    }
  };

  const methodInfo = getMethodInfo();
  const Icon = methodInfo.icon;
  const needsPhoneNumber = paymentMethod !== 'cash';

  const handleContinue = () => {
    if (needsPhoneNumber && phoneNumber.length < 11) {
      return; // Don't proceed if phone number is invalid
    }
    onContinue({ phoneNumber: needsPhoneNumber ? phoneNumber : null });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-gray-900">Payment Details</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${methodInfo.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: methodInfo.color }} />
            </div>
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="text-gray-900">{methodInfo.name}</p>
            </div>
          </div>
        </motion.div>

        {needsPhoneNumber ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 mb-2">
              {methodInfo.name} Account Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                  setPhoneNumber(value);
                }
              }}
              placeholder="03001234567"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors"
              style={{ backgroundColor: '#F7F8FA' }}
            />
            <p className="text-gray-500 mt-2">
              Enter your 11-digit {methodInfo.name} mobile account number
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: '#F7F8FA' }}
          >
            <Banknote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-gray-900">Cash on Delivery</h3>
            <p className="text-gray-600">
              Pay with cash when your order is delivered
            </p>
          </motion.div>
        )}

        {needsPhoneNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 rounded-2xl border-2"
            style={{ borderColor: '#F1C40F', backgroundColor: '#F1C40F10' }}
          >
            <p className="text-gray-700">
              ⚡ Payment will be processed after order confirmation
            </p>
          </motion.div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleContinue}
          disabled={needsPhoneNumber && phoneNumber.length < 11}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#FF6B00' }}
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
