import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Clock, MapPin, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Zinger Burger',
    price: 350,
    description: 'Crispy fried chicken with special sauce',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Burgers'
  },
  {
    id: '2',
    name: 'Chicken Burger',
    price: 250,
    description: 'Classic grilled chicken burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
    category: 'Burgers'
  },
  {
    id: '3',
    name: 'Beef Roll',
    price: 300,
    description: 'Tender beef wrapped in fresh paratha',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    category: 'Rolls'
  },
  {
    id: '4',
    name: 'Chicken Roll',
    price: 280,
    description: 'Spicy chicken with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1610903128105-752ef422a907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcm9sbCUyMHdyYXB8ZW58MXx8fHwxNzY0NTM1NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rolls'
  }
];

interface VendorMenuProps {
  vendor: any;
  onBack: () => void;
  onSelectItem: (item: MenuItem) => void;
  cartItemCount?: number;
  onViewCart?: () => void;
}

export function VendorMenu({ vendor, onBack, onSelectItem, cartItemCount = 0, onViewCart }: VendorMenuProps) {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img
            src={vendor?.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
            alt={vendor?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-white mb-2">{vendor?.name || 'Ayan Foods'}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400" style={{ color: '#F1C40F' }} />
              <span>{vendor?.rating || 4.5}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{vendor?.deliveryTime || '25-30 mins'}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>TUC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
        {['Menu', 'Reviews', 'Info'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className="flex-1 py-4 transition-colors relative"
            style={{
              color: activeTab === tab.toLowerCase() ? '#FF6B00' : '#6B7280'
            }}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#FF6B00' }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="px-6 py-6 flex-1">
        {activeTab === 'menu' && (
          <div className="space-y-4 pb-20">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectItem(item)}
                className="w-full p-4 rounded-2xl flex gap-4 text-left transition-transform active:scale-95"
                style={{ backgroundColor: '#F7F8FA' }}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-1 text-gray-900">{item.name}</h4>
                  <p className="text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-gray-900">Rs {item.price}</p>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  +
                </button>
              </motion.button>
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="text-center py-12 text-gray-500">
            <p>No reviews yet</p>
          </div>
        )}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-gray-900">Location</h4>
              <p className="text-gray-600">TUC (The Utility Complex), GIKI Campus</p>
            </div>
            <div>
              <h4 className="mb-2 text-gray-900">Opening Hours</h4>
              <p className="text-gray-600">9:00 AM - 11:00 PM</p>
            </div>
          </div>
        )}
      </div>

      {cartItemCount > 0 && onViewCart && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-full text-white shadow-lg flex items-center gap-3 transition-transform active:scale-95"
          style={{ backgroundColor: '#FF6B00', maxWidth: '361px', width: 'calc(100% - 64px)' }}
          onClick={onViewCart}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="flex-1">View Cart</span>
          <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
            {cartItemCount}
          </span>
        </motion.button>
      )}
    </div>
  );
}