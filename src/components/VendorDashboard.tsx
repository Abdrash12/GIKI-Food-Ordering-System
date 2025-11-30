import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Package, Clock, DollarSign } from 'lucide-react';

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

const mockOrders: Order[] = [
  {
    id: '#4219',
    items: [
      { name: 'Zinger Burger', quantity: 2 },
      { name: 'Chicken Roll', quantity: 1 }
    ],
    specialInstructions: 'No Capsicum Please',
    paymentStatus: 'paid',
    timeReceived: '2 mins ago',
    status: 'new',
    total: 850,
    deliveryAddress: 'Hostel 3, Room 82'
  },
  {
    id: '#4218',
    items: [
      { name: 'Beef Roll', quantity: 3 }
    ],
    paymentStatus: 'cash',
    timeReceived: '5 mins ago',
    status: 'preparing',
    total: 900,
    deliveryAddress: 'Hostel 5, Room 45'
  },
  {
    id: '#4217',
    items: [
      { name: 'Chicken Burger', quantity: 2 },
      { name: 'Zinger Burger', quantity: 1 }
    ],
    specialInstructions: 'Extra spicy, no onions',
    paymentStatus: 'paid',
    timeReceived: '8 mins ago',
    status: 'new',
    total: 850,
    deliveryAddress: 'Hostel 1, Room 23'
  }
];

interface VendorDashboardProps {
  onSelectOrder: (order: Order) => void;
  onViewReadyOrders: () => void;
  onLogout: () => void;
}

export function VendorDashboard({ onSelectOrder, onViewReadyOrders, onLogout }: VendorDashboardProps) {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState<'new' | 'preparing'>('new');

  const filteredOrders = orders.filter(order => order.status === activeTab);
  const readyOrdersCount = orders.filter(order => order.status === 'ready').length;

  const todayStats = {
    totalOrders: 24,
    revenue: 12500,
    avgTime: '18 mins'
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-1">Vendor Dashboard</h1>
            <p className="text-gray-600">Ayan Foods</p>
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl" style={{ backgroundColor: '#007AFF10' }}>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4" style={{ color: '#007AFF' }} />
              <span className="text-sm text-gray-600">Orders</span>
            </div>
            <p className="text-gray-900">{todayStats.totalOrders}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: '#10B98110' }}>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <p className="text-gray-900">Rs {todayStats.revenue}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ backgroundColor: '#F1C40F10' }}>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4" style={{ color: '#F1C40F' }} />
              <span className="text-sm text-gray-600">Avg Time</span>
            </div>
            <p className="text-gray-900">{todayStats.avgTime}</p>
          </div>
        </div>

        {/* Ready Orders Banner */}
        {readyOrdersCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onViewReadyOrders}
            className="w-full p-4 rounded-xl mb-4 flex items-center justify-between transition-transform active:scale-95"
            style={{ backgroundColor: '#10B98110', border: '2px solid #10B981' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">{readyOrdersCount} Orders Ready</p>
                <p className="text-sm text-gray-600">Awaiting rider pickup</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
        <button
          onClick={() => setActiveTab('new')}
          className="flex-1 py-4 transition-colors relative"
          style={{ color: activeTab === 'new' ? '#007AFF' : '#6B7280' }}
        >
          New Orders
          {activeTab === 'new' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: '#007AFF' }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('preparing')}
          className="flex-1 py-4 transition-colors relative"
          style={{ color: activeTab === 'preparing' ? '#007AFF' : '#6B7280' }}
        >
          Preparing
          {activeTab === 'preparing' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: '#007AFF' }}
            />
          )}
        </button>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No {activeTab} orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.button
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectOrder(order)}
                className="w-full p-4 rounded-2xl text-left transition-transform active:scale-95"
                style={{
                  backgroundColor: '#F7F8FA',
                  border: order.specialInstructions ? '2px solid #F1C40F' : '2px solid transparent'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.timeReceived}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: order.paymentStatus === 'paid' ? '#10B98110' : '#F1C40F10',
                        color: order.paymentStatus === 'paid' ? '#10B981' : '#F1C40F'
                      }}
                    >
                      {order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus === 'cash' ? 'COD' : 'Pending'}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-gray-700 mb-1">
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                </div>

                {order.specialInstructions && (
                  <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: '#F1C40F20' }}>
                    <p className="text-sm" style={{ color: '#856404' }}>
                      ⚠️ <strong>Special:</strong> {order.specialInstructions}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Rs {order.total}</p>
                  <p className="text-sm text-gray-500">{order.deliveryAddress}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}