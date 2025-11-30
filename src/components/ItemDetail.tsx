import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { CartItem } from '../App';

interface ItemDetailProps {
  item: any;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ItemDetail({ item, onBack, onAddToCart }: ItemDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('No Capsicum Please');

  const handleAddToCart = () => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      specialInstructions,
      image: item.image
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="relative flex-shrink-0">
        <div className="h-80 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="mb-2 text-gray-900">{item.name}</h1>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <p className="text-gray-900 flex-shrink-0 ml-4">Rs {item.price}</p>
          </div>

          <div className="mb-6">
            <h4 className="mb-3 text-gray-900">Quantity</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 transition-transform active:scale-95"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-gray-900 min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
                style={{ backgroundColor: '#FF6B00' }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-3 text-gray-900">Special Instructions</h4>
            <div
              className="p-4 rounded-2xl border-2"
              style={{
                backgroundColor: '#F1C40F20',
                borderColor: '#F1C40F'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#F1C40F' }}
                />
                <p className="text-gray-700">
                  This field is crucial for dietary restrictions and preferences
                </p>
              </div>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., No onions, extra sauce, less spicy..."
                className="w-full mt-2 p-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none resize-none"
                style={{ backgroundColor: 'white' }}
                rows={3}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95 flex items-center justify-between px-6"
          style={{ backgroundColor: '#FF6B00' }}
        >
          <span>Add to Cart</span>
          <span>Rs {item.price * quantity}</span>
        </button>
      </div>
    </div>
  );
}
