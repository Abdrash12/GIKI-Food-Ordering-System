import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Package, Clock, MapPin, Bike } from 'lucide-react';

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number }>;
  total: number;
  deliveryAddress: string;
  readyTime: string;
  specialInstructions?: string;
}

const mockReadyOrders: Order[] = [
  {
    id: '#4216',
    items: [
      { name: 'Zinger Burger', quantity: 2 },
      { name: 'Beef Roll', quantity: 1 }
    ],
    total: 950,
    deliveryAddress: 'Hostel 2, Room 45',
    readyTime: '2 mins ago',
    specialInstructions: 'Extra sauce'
  },
  {
    id: '#4215',
    items: [
      { name: 'Chicken Roll', quantity: 3 }
    ],
    total: 840,
    deliveryAddress: 'Hostel 4, Room 12',
    readyTime: '5 mins ago'
  },
  {
    id: '#4214',
    items: [
      { name: 'Chicken Burger', quantity: 1 },
      { name: 'Zinger Burger', quantity: 2 }
    ],
    total: 850,
    deliveryAddress: 'Hostel 1, Room 78',
    readyTime: '8 mins ago'
  }
];

interface ReadyOrdersQueueProps {
  onBack: () => void;
}

export function ReadyOrdersQueue({ onBack }: ReadyOrdersQueueProps) {
  const [orders, setOrders] = useState(mockReadyOrders);
  const [assigningOrder, setAssigningOrder] = useState<string | null>(null);

  const handleAssignRider = (orderId: string) => {
    setAssigningOrder(orderId);
    setTimeout(() => {
      setOrders(orders.filter(order => order.id !== orderId));
      setAssigningOrder(null);
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform active:scale-95"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-1">Ready Orders</h1>
            <p className="text-gray-600">{orders.length} orders awaiting pickup</p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B98110' }}>
            <Package className="w-6 h-6" style={{ color: '#10B981' }} />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No ready orders</p>
            <p className="text-sm mt-2">Orders will appear here when marked as ready</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl"
                style={{
                  backgroundColor: '#F7F8FA',
                  border: assigningOrder === order.id ? '2px solid #10B981' : '2px solid transparent'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{order.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Ready {order.readyTime}</span>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: '#10B98110', color: '#10B981' }}
                  >
                    Ready
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
                  <div className="p-2 rounded-lg mb-3" style={{ backgroundColor: '#F1C40F20' }}>
                    <p className="text-sm" style={{ color: '#856404' }}>
                      ⚠️ {order.specialInstructions}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{order.deliveryAddress}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-900">Rs {order.total}</p>
                  <button
                    onClick={() => handleAssignRider(order.id)}
                    disabled={assigningOrder === order.id}
                    className="px-4 py-2 rounded-full text-white flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                    style={{ backgroundColor: '#10B981' }}
                  >
                    <Bike className="w-4 h-4" />
                    <span>{assigningOrder === order.id ? 'Assigning...' : 'Assign Rider'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
