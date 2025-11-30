import { motion } from 'motion/react';
import { ArrowLeft, Wallet, CreditCard, Banknote, Check } from 'lucide-react';

interface PaymentSelectionProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const paymentMethods = [
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    icon: Wallet,
    color: '#00A859'
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    icon: CreditCard,
    color: '#FF6B00'
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: Banknote,
    color: '#6B7280'
  }
];

export function PaymentSelection({ selectedMethod, onSelectMethod, onBack, onContinue }: PaymentSelectionProps) {
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
        <h2 className="text-gray-900">Payment Method</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <p className="text-gray-600 mb-6">Choose how you'd like to pay</p>
        <div className="space-y-3">
          {paymentMethods.map((method, index) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectMethod(method.id)}
              className="w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4"
              style={{
                backgroundColor: selectedMethod === method.id ? `${method.color}10` : '#F7F8FA',
                borderColor: selectedMethod === method.id ? method.color : 'transparent'
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${method.color}20` }}
              >
                <method.icon className="w-6 h-6" style={{ color: method.color }} />
              </div>
              <span className="flex-1 text-left text-gray-900">{method.name}</span>
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: method.color }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
          style={{ backgroundColor: '#FF6B00' }}
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
