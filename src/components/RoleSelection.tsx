import { motion } from 'motion/react';
import { User, ChefHat, Bike } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'vendor' | 'rider') => void;
  onBack?: () => void;
}

const roles = [
  {
    id: 'student' as const,
    title: 'Student',
    description: 'Order food from TUC to your Hostel',
    icon: User,
    color: '#FF6B00',
    bgColor: '#FF6B0010'
  },
  {
    id: 'vendor' as const,
    title: 'Vendor / Chef',
    description: 'Manage orders and kitchen operations',
    icon: ChefHat,
    color: '#007AFF',
    bgColor: '#007AFF10'
  },
  {
    id: 'rider' as const,
    title: 'Delivery Rider',
    description: 'Deliver orders and earn money',
    icon: Bike,
    color: '#10B981',
    bgColor: '#10B98110'
  }
];

export function RoleSelection({ onSelectRole, onBack }: RoleSelectionProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-gray-900 mb-3">Welcome to GIKI Food</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </motion.div>
      </div>

      {/* Role Cards */}
      <div className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              onClick={() => onSelectRole(role.id)}
              className="w-full p-6 rounded-3xl transition-all active:scale-95"
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #F0F0F0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: role.bgColor }}
                >
                  <Icon className="w-8 h-8" style={{ color: role.color }} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-gray-600">{role.description}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: role.bgColor }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 1.5L9 6L4.5 10.5"
                      stroke={role.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <p className="text-center text-gray-500 text-sm">
          Secure ordering system for GIKI Campus
        </p>
      </div>
    </div>
  );
}