import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Clock, AlertCircle, LogOut } from 'lucide-react';

interface KitchenOrder {
  id: string;
  items: string[];
  specialInstructions?: string;
  elapsed: string;
  status: 'new' | 'preparing' | 'ready';
  studentName: string;
  room: string;
}

const mockOrders: KitchenOrder[] = [
  {
    id: '#4219',
    items: ['1x Zinger Burger', '1x Fries'],
    specialInstructions: 'NO CAPSICUM',
    elapsed: '05:20',
    status: 'new',
    studentName: 'Saad',
    room: 'Hostel 3, Room 82'
  },
  {
    id: '#4218',
    items: ['2x Chicken Roll', '1x Coke'],
    elapsed: '12:45',
    status: 'preparing',
    studentName: 'Ahmed',
    room: 'Hostel 2, Room 45'
  },
  {
    id: '#4217',
    items: ['1x Beef Burger', '1x Fries', '1x Pepsi'],
    specialInstructions: 'Extra sauce',
    elapsed: '18:30',
    status: 'ready',
    studentName: 'Bilal',
    room: 'Hostel 1, Room 23'
  }
];

interface KitchenDisplayProps {
  onLogout: () => void;
}

export function KitchenDisplay({ onLogout }: KitchenDisplayProps) {
  const [orders, setOrders] = useState(mockOrders);
  const [showHandoffModal, setShowHandoffModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<KitchenOrder | null>(null);

  const handleStatusChange = (orderId: string, newStatus: 'preparing' | 'ready') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (newStatus === 'ready') {
      const order = orders.find(o => o.id === orderId);
      setSelectedOrder(order || null);
      setShowHandoffModal(true);
    }
  };

  const handleReject = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#FF6B00';
      case 'preparing': return '#F1C40F';
      case 'ready': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
      <div className="px-6 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#007AFF20' }}
            >
              <ChefHat className="w-6 h-6" style={{ color: '#007AFF' }} />
            </div>
            <div>
              <h2 className="text-gray-900">Kitchen Display</h2>
              <p className="text-gray-600">Ayan Foods</p>
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
        <div className="flex gap-4">
          <div className="flex-1 p-3 rounded-xl" style={{ backgroundColor: '#FF6B0020' }}>
            <p className="text-gray-600">New</p>
            <p className="text-gray-900">
              {orders.filter(o => o.status === 'new').length}
            </p>
          </div>
          <div className="flex-1 p-3 rounded-xl" style={{ backgroundColor: '#F1C40F20' }}>
            <p className="text-gray-600">Preparing</p>
            <p className="text-gray-900">
              {orders.filter(o => o.status === 'preparing').length}
            </p>
          </div>
          <div className="flex-1 p-3 rounded-xl" style={{ backgroundColor: '#10B98120' }}>
            <p className="text-gray-600">Ready</p>
            <p className="text-gray-900">
              {orders.filter(o => o.status === 'ready').length}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-2xl border-2"
            style={{
              backgroundColor: '#F7F8FA',
              borderColor: getStatusColor(order.status)
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="mb-1 text-gray-900">Order {order.id}</h4>
                <p className="text-gray-600">{order.studentName} • {order.room}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{order.elapsed}</span>
              </div>
            </div>

            {order.specialInstructions && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-3 rounded-xl mb-3 border-2 flex items-start gap-2"
                style={{
                  backgroundColor: '#F1C40F30',
                  borderColor: '#F1C40F'
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F1C40F' }} />
                <div>
                  <p className="text-gray-900 mb-1">⚠️ {order.specialInstructions}</p>
                </div>
              </motion.div>
            )}

            <div className="mb-4 space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-gray-700">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {order.status === 'new' && (
                <>
                  <button
                    onClick={() => handleReject(order.id)}
                    className="px-4 py-2 rounded-lg text-red-600 transition-transform active:scale-95"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'preparing')}
                    className="flex-1 py-2 rounded-lg text-white transition-transform active:scale-95"
                    style={{ backgroundColor: '#007AFF' }}
                  >
                    Start Preparing
                  </button>
                </>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => handleStatusChange(order.id, 'ready')}
                  className="w-full py-2 rounded-lg text-white transition-transform active:scale-95"
                  style={{ backgroundColor: '#10B981' }}
                >
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowHandoffModal(true);
                  }}
                  className="w-full py-2 rounded-lg text-white transition-transform active:scale-95"
                  style={{ backgroundColor: '#10B981' }}
                >
                  Assign Rider
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showHandoffModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-end z-50"
            onClick={() => setShowHandoffModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              <h2 className="text-center mb-2 text-gray-900">Order Ready!</h2>
              <p className="text-center text-gray-600 mb-6">
                Order {selectedOrder.id} is ready for pickup
              </p>

              <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: '#F7F8FA' }}>
                <p className="text-gray-600 mb-2">Assigning to nearest rider...</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#007AFF20' }}
                  >
                    <span style={{ color: '#007AFF' }}>AN</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900">Anas</h4>
                    <p className="text-gray-600">Available nearby</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrders(orders.filter(o => o.id !== selectedOrder.id));
                  setShowHandoffModal(false);
                }}
                className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
                style={{ backgroundColor: '#007AFF' }}
              >
                Confirm & Notify Rider
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
