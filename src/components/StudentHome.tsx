import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Clock, ShoppingCart } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  status: 'open' | 'closed';
  cuisine: string;
  image: string;
}

const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Ayan Foods',
    rating: 4.5,
    deliveryTime: '25-30 mins',
    status: 'open',
    cuisine: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
  },
  {
    id: '2',
    name: 'Raju',
    rating: 4.3,
    deliveryTime: '20-25 mins',
    status: 'open',
    cuisine: 'Desi',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'
  },
  {
    id: '3',
    name: 'Hot & Spicy',
    rating: 4.7,
    deliveryTime: '30-35 mins',
    status: 'open',
    cuisine: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1606502281004-f86cf1282af5?w=400'
  }
];

const categories = [
  { name: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { name: 'Desi', image: 'https://images.unsplash.com/photo-1712218275818-6bbb7e5a0a44?w=200' },
  { name: 'Drinks', image: 'https://images.unsplash.com/photo-1732029543356-44fadaeeca51?w=200' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1529690678884-189e81f34ef6?w=200' },
  { name: 'BBQ', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200' }
];

interface StudentHomeProps {
  onSelectVendor: (vendor: Vendor) => void;
  cartItemCount?: number;
  onViewCart?: () => void;
}

export function StudentHome({ onSelectVendor, cartItemCount = 0, onViewCart }: StudentHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Filter vendors based on selected category
  const filteredVendors = selectedCategory === 'All' 
    ? vendors 
    : vendors.filter(vendor => vendor.cuisine === selectedCategory);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
      <div className="px-6 pt-12 pb-6 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900">{getGreeting()}</h2>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for rolls, burgers..."
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors"
            style={{ backgroundColor: '#F7F8FA' }}
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('All')}
            className="flex-shrink-0 px-6 py-3 rounded-full transition-all"
            style={{
              backgroundColor: selectedCategory === 'All' ? '#FF6B00' : '#F7F8FA',
              color: selectedCategory === 'All' ? '#FFFFFF' : '#6B7280'
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="flex-shrink-0 rounded-2xl overflow-hidden transition-all relative"
              style={{
                width: '100px',
                height: '100px',
                border: selectedCategory === category.name ? '3px solid #FF6B00' : '3px solid transparent'
              }}
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-end justify-center pb-2"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                }}
              >
                <span className="text-white text-sm px-2 py-1">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-24 flex-1">
        <h3 className="mb-4 text-gray-900">
          {selectedCategory === 'All' ? 'Popular Vendors' : `${selectedCategory} Vendors`}
        </h3>
        <div className="space-y-4">
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor, index) => (
              <motion.button
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectVendor(vendor)}
                className="w-full rounded-2xl overflow-hidden text-left transition-transform active:scale-95"
                style={{ backgroundColor: '#F7F8FA' }}
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: vendor.status === 'open' ? '#10B981' : '#EF4444' }}
                  >
                    {vendor.status === 'open' ? 'Open' : 'Closed'}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="mb-2 text-gray-900">{vendor.name}</h4>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400" style={{ color: '#F1C40F' }} />
                      <span>{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                    <span>• {vendor.cuisine}</span>
                  </div>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No vendors found in this category</p>
            </div>
          )}
        </div>
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