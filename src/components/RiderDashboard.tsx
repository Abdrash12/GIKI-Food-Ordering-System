import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Package, MapPin, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Order } from '../App';

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
  status: 'available' | 'accepted';
}

const mockJobs: DeliveryJob[] = [
  {
    id: 'job-1',
    orderId: '#4219',
    vendorName: 'Ayan Foods',
    vendorLocation: 'TUC',
    deliveryAddress: 'Hostel 3, Room 82',
    hostel: 'Hostel 3',
    room: '82',
    items: [
      { name: 'Zinger Burger', quantity: 2 },
      { name: 'Chicken Roll', quantity: 1 }
    ],
    earnings: 50,
    distance: '1.2 km',
    specialInstructions: 'No Capsicum Please',
    status: 'available'
  },
  {
    id: 'job-2',
    orderId: '#4218',
    vendorName: 'Raju',
    vendorLocation: 'TUC',
    deliveryAddress: 'Hostel 5, Room 45',
    hostel: 'Hostel 5',
    room: '45',
    items: [
      { name: 'Beef Roll', quantity: 3 }
    ],
    earnings: 50,
    distance: '1.5 km',
    status: 'available'
  },
  {
    id: 'job-3',
    orderId: '#4217',
    vendorName: 'Hot & Spicy',
    vendorLocation: 'TUC',
    deliveryAddress: 'Hostel 1, Room 23',
    hostel: 'Hostel 1',
    room: '23',
    items: [
      { name: 'Chicken Burger', quantity: 2 },
      { name: 'Zinger Burger', quantity: 1 }
    ],
    earnings: 50,
    distance: '0.8 km',
    specialInstructions: 'Extra spicy, no onions',
    status: 'available'
  }
];

interface RiderDashboardProps {
  onAcceptJob: (job: DeliveryJob) => void;
  onLogout: () => void;
}

export function RiderDashboard({ onAcceptJob, onLogout }: RiderDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [jobs, setJobs] = useState(mockJobs);

  const todayStats = {
    deliveries: 12,
    earnings: 600,
    hours: 4.5,
    rating: 4.8
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">Rider Dashboard</h1>
            <p className="text-gray-600">Welcome back, Anas</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F7F8FA' }}
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Online Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl mb-4" style={{ backgroundColor: isOnline ? '#10B98110' : '#EF444410' }}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'animate-pulse' : ''}`} style={{ backgroundColor: isOnline ? '#10B981' : '#EF4444' }} />
            <div>
              <p className="text-gray-900">{isOnline ? 'You are Online' : 'You are Offline'}</p>
              <p className="text-sm text-gray-600">{isOnline ? 'Receiving delivery requests' : 'Not receiving requests'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-14 h-8 rounded-full relative transition-colors ${isOnline ? 'bg-[#10B981]' : 'bg-gray-300'}`}
          >
            <motion.div
              animate={{ x: isOnline ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-6 h-6 rounded-full bg-white"
            />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#10B98110' }}>
            <Package className="w-5 h-5 mx-auto mb-1" style={{ color: '#10B981' }} />
            <p className="text-gray-900">{todayStats.deliveries}</p>
            <p className="text-xs text-gray-600">Deliveries</p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#F1C40F10' }}>
            <DollarSign className="w-5 h-5 mx-auto mb-1" style={{ color: '#F1C40F' }} />
            <p className="text-gray-900">Rs {todayStats.earnings}</p>
            <p className="text-xs text-gray-600">Earned</p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#007AFF10' }}>
            <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: '#007AFF' }} />
            <p className="text-gray-900">{todayStats.hours}h</p>
            <p className="text-xs text-gray-600">Online</p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#FF6B0010' }}>
            <TrendingUp className="w-5 h-5 mx-auto mb-1" style={{ color: '#FF6B00' }} />
            <p className="text-gray-900">{todayStats.rating}</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
        </div>
      </div>

      {/* Available Deliveries */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h2 className="text-gray-900 mb-4">Available Deliveries</h2>
        
        {!isOnline ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="mb-2">You are offline</p>
            <p className="text-sm">Turn on online mode to receive delivery requests</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No available deliveries</p>
            <p className="text-sm mt-2">New requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl"
                style={{
                  backgroundColor: '#F7F8FA',
                  border: job.specialInstructions ? '2px solid #F1C40F' : '2px solid transparent'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{job.orderId}</h3>
                    <p className="text-sm text-gray-600">{job.vendorName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">+Rs {job.earnings}</p>
                    <p className="text-sm text-gray-500">{job.distance}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-gray-600">Pickup from</p>
                      <p className="text-gray-900">{job.vendorLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                    <div className="text-sm">
                      <p className="text-gray-600">Deliver to</p>
                      <p className="text-gray-900">{job.hostel}, Room {job.room}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 text-sm text-gray-700">
                  {job.items.map((item, i) => (
                    <p key={i}>{item.quantity}x {item.name}</p>
                  ))}
                </div>

                {job.specialInstructions && (
                  <div className="p-2 rounded-lg mb-3" style={{ backgroundColor: '#F1C40F20' }}>
                    <p className="text-sm" style={{ color: '#856404' }}>
                      ⚠️ {job.specialInstructions}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onAcceptJob(job)}
                  className="w-full py-3 rounded-full text-white transition-transform active:scale-95"
                  style={{ backgroundColor: '#10B981' }}
                >
                  Accept Delivery
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}