import { useState } from 'react';
import { motion } from 'motion/react';
import { Bike, MapPin, DollarSign, LogOut, TrendingUp } from 'lucide-react';
import { Order } from '../App';

interface RiderHomeProps {
  onAcceptOrder: (order: Order) => void;
  onLogout: () => void;
}

const mockJobRequests: Order[] = [
  {
    id: '#4219',
    items: [
      {
        id: '1',
        name: 'Zinger Burger',
        price: 350,
        quantity: 1,
        specialInstructions: 'No Capsicum Please',
        image: ''
      }
    ],
    total: 400,
    status: 'ready',
    vendorName: 'Ayan Foods',
    deliveryAddress: 'Hostel 3, Room 82'
  },
  {
    id: '#4220',
    items: [
      {
        id: '2',
        name: 'Chicken Roll',
        price: 280,
        quantity: 2,
        image: ''
      }
    ],
    total: 610,
    status: 'ready',
    vendorName: 'Raju',
    deliveryAddress: 'Hostel 2, Room 45'
  }
];

export function RiderHome({ onAcceptOrder, onLogout }: RiderHomeProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [jobs, setJobs] = useState(mockJobRequests);

  const handleAccept = (order: Order) => {
    setJobs(jobs.filter(j => j.id !== order.id));
    onAcceptOrder(order);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
      <div className="px-6 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#007AFF20' }}
            >
              <Bike className="w-6 h-6" style={{ color: '#007AFF' }} />
            </div>
            <div>
              <h2 className="text-gray-900">Hi, Anas</h2>
              <p className="text-gray-600">Ready for deliveries</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ backgroundColor: '#F7F8FA' }}
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: '#F7F8FA' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: isOnline ? '#10B981' : '#EF4444' }}
            />
            <span className="text-gray-900">Status: {isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="px-4 py-2 rounded-lg text-white transition-transform active:scale-95"
            style={{ backgroundColor: isOnline ? '#EF4444' : '#10B981' }}
          >
            Go {isOnline ? 'Offline' : 'Online'}
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl" style={{ backgroundColor: '#007AFF20' }}>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>Today's Earnings</span>
            </div>
            <p className="text-gray-900">Rs 450</p>
          </div>
          <div className="p-4 rounded-2xl" style={{ backgroundColor: '#10B98120' }}>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span>Deliveries</span>
            </div>
            <p className="text-gray-900">9 completed</p>
          </div>
        </div>

        <h3 className="mb-4 text-gray-900">Available Deliveries</h3>
        
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bike className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No deliveries available</p>
            <p className="text-sm">We'll notify you when a new order comes in</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl border-2"
                style={{
                  backgroundColor: '#F7F8FA',
                  borderColor: '#007AFF'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="mb-1 text-gray-900">Order {job.id}</h4>
                    <p className="text-gray-600">{job.vendorName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">Rs 50</p>
                    <p className="text-gray-500">Delivery Fee</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#007AFF' }} />
                    <div>
                      <p className="text-gray-600">Pickup</p>
                      <p className="text-gray-900">TUC - {job.vendorName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                    <div>
                      <p className="text-gray-600">Drop-off</p>
                      <p className="text-gray-900">{job.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onTouchStart={(e) => {
                      const btn = e.currentTarget;
                      const startX = e.touches[0].clientX;
                      const startLeft = 0;
                      
                      const handleMove = (e: TouchEvent) => {
                        const currentX = e.touches[0].clientX;
                        const diff = currentX - startX;
                        if (diff > 0 && diff < btn.offsetWidth - 80) {
                          btn.style.setProperty('--slide-x', `${diff}px`);
                        }
                        if (diff > btn.offsetWidth - 100) {
                          handleAccept(job);
                          document.removeEventListener('touchmove', handleMove);
                          document.removeEventListener('touchend', handleEnd);
                        }
                      };
                      
                      const handleEnd = () => {
                        btn.style.setProperty('--slide-x', '0px');
                        document.removeEventListener('touchmove', handleMove);
                        document.removeEventListener('touchend', handleEnd);
                      };
                      
                      document.addEventListener('touchmove', handleMove);
                      document.addEventListener('touchend', handleEnd);
                    }}
                    onClick={() => handleAccept(job)}
                    className="w-full py-4 rounded-full text-white transition-transform relative overflow-hidden"
                    style={{ backgroundColor: '#007AFF' }}
                  >
                    <span className="relative z-10">Slide to Accept →</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
