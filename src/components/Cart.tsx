import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Home } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  cart: CartItem[];
  deliveryAddress: { hostel: string; room: string };
  onUpdateAddress: (address: { hostel: string; room: string }) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Cart({ cart, deliveryAddress, onUpdateAddress, onBack, onContinue }: CartProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

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
        <h2 className="text-gray-900">Your Cart</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl flex gap-4"
              style={{ backgroundColor: '#F7F8FA' }}
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="mb-1 text-gray-900">{item.name}</h4>
                {item.specialInstructions && (
                  <div className="flex items-start gap-1 mb-2">
                    <span className="px-2 py-1 rounded text-gray-700" style={{ backgroundColor: '#F1C40F40', fontSize: '12px' }}>
                      {item.specialInstructions}
                    </span>
                  </div>
                )}
                <p className="text-gray-900">Rs {item.price} × {item.quantity}</p>
              </div>
              <p className="text-gray-900 flex-shrink-0">Rs {item.price * item.quantity}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="mb-3 text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Address
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-gray-600 mb-2">Hostel</label>
              <select
                value={deliveryAddress.hostel}
                onChange={(e) => onUpdateAddress({ ...deliveryAddress, hostel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors"
                style={{ backgroundColor: '#F7F8FA' }}
              >
                <option>Hostel 1</option>
                <option>Hostel 2</option>
                <option>Hostel 3</option>
                <option>Hostel 4</option>
                <option>Hostel 5</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Room Number</label>
              <input
                type="text"
                value={deliveryAddress.room}
                onChange={(e) => onUpdateAddress({ ...deliveryAddress, room: e.target.value })}
                placeholder="e.g., 82"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors"
                style={{ backgroundColor: '#F7F8FA' }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl space-y-3" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>Rs {deliveryFee}</span>
          </div>
          <div className="h-px bg-gray-300" />
          <div className="flex justify-between text-gray-900">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
          style={{ backgroundColor: '#FF6B00' }}
        >
          Select Payment Method
        </button>
      </div>
    </div>
  );
}
