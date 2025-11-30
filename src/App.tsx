import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { RoleSelection } from './components/RoleSelection';
import { Login } from './components/Login';
import { StudentHome } from './components/StudentHome';
import { VendorMenu } from './components/VendorMenu';
import { ItemDetail } from './components/ItemDetail';
import { Cart } from './components/Cart';
import { PaymentSelection } from './components/PaymentSelection';
import { PaymentDetails } from './components/PaymentDetails';
import { CheckoutConfirmation } from './components/CheckoutConfirmation';
import { OrderSuccess } from './components/OrderSuccess';
import { LiveTracking } from './components/LiveTracking';
import { Rating } from './components/Rating';
import { VendorDashboard } from './components/VendorDashboard';
import { OrderDetailVendor } from './components/OrderDetailVendor';
import { ReadyOrdersQueue } from './components/ReadyOrdersQueue';
import { RiderDashboard } from './components/RiderDashboard';
import { DeliveryRoute } from './components/DeliveryRoute';
import { OTPVerification } from './components/OTPVerification';
import { DeliveryComplete } from './components/DeliveryComplete';

export type UserRole = 'student' | 'vendor' | 'rider' | null;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'picked_up' | 'arriving' | 'delivered';
  vendorName: string;
  deliveryAddress: string;
  specialInstructions?: string;
  riderId?: string;
  riderName?: string;
}

export default function App() {
  const [screen, setScreen] = useState<string>('splash');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedVendorOrder, setSelectedVendorOrder] = useState<any>(null);
  const [selectedDeliveryJob, setSelectedDeliveryJob] = useState<any>(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    hostel: 'Hostel 3',
    room: '82'
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setScreen('cart');
  };

  const placeOrder = () => {
    const order: Order = {
      id: '#4219',
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50,
      status: 'pending',
      vendorName: selectedVendor?.name || 'Ayan Foods',
      deliveryAddress: `${deliveryAddress.hostel}, Room ${deliveryAddress.room}`,
      specialInstructions: cart[0]?.specialInstructions
    };
    setCurrentOrder(order);
    setScreen('orderSuccess');
    
    setTimeout(() => {
      if (currentOrder) {
        setCurrentOrder({ ...currentOrder, status: 'accepted' });
      }
    }, 2000);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onComplete={() => setScreen('roleSelection')} />;
      case 'roleSelection':
        return <RoleSelection 
          onSelectRole={(role) => {
            setUserRole(role);
            setScreen('login');
          }}
        />;
      case 'login':
        return <Login 
          role={userRole}
          onLogin={() => {
            if (userRole === 'student') setScreen('studentHome');
            else if (userRole === 'vendor') setScreen('vendorDashboard');
            else if (userRole === 'rider') setScreen('riderDashboard');
          }}
          onBack={() => setScreen('roleSelection')}
        />;
      case 'studentHome':
        return <StudentHome 
          onSelectVendor={(vendor) => {
            setSelectedVendor(vendor);
            setScreen('vendorMenu');
          }}
          cartItemCount={cart.length}
          onViewCart={cart.length > 0 ? () => setScreen('cart') : undefined}
        />;
      case 'vendorMenu':
        return <VendorMenu 
          vendor={selectedVendor}
          onBack={() => setScreen('studentHome')}
          onSelectItem={(item) => {
            setSelectedItem(item);
            setScreen('itemDetail');
          }}
          cartItemCount={cart.length}
          onViewCart={cart.length > 0 ? () => setScreen('cart') : undefined}
        />;
      case 'itemDetail':
        return <ItemDetail 
          item={selectedItem}
          onBack={() => setScreen('vendorMenu')}
          onAddToCart={addToCart}
        />;
      case 'cart':
        return <Cart 
          cart={cart}
          deliveryAddress={deliveryAddress}
          onUpdateAddress={setDeliveryAddress}
          onBack={() => setScreen('vendorMenu')}
          onContinue={() => setScreen('payment')}
        />;
      case 'payment':
        return <PaymentSelection 
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
          onBack={() => setScreen('cart')}
          onContinue={() => setScreen('paymentDetails')}
        />;
      case 'paymentDetails':
        return <PaymentDetails 
          paymentMethod={paymentMethod}
          onBack={() => setScreen('payment')}
          onContinue={(details) => {
            setPaymentDetails(details);
            setScreen('checkout');
          }}
        />;
      case 'checkout':
        return <CheckoutConfirmation 
          total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50}
          paymentMethod={paymentMethod}
          paymentDetails={paymentDetails}
          onCancel={() => setScreen('paymentDetails')}
          onConfirm={placeOrder}
        />;
      case 'orderSuccess':
        return <OrderSuccess 
          orderId={currentOrder?.id || '#4219'}
          vendorName={currentOrder?.vendorName || 'Ayan Foods'}
          onTrackOrder={() => setScreen('liveTracking')}
          onBack={() => setScreen('studentHome')}
        />;
      case 'liveTracking':
        return <LiveTracking 
          order={currentOrder}
          onComplete={() => setScreen('rating')}
          onBack={() => setScreen('studentHome')}
        />;
      case 'rating':
        return <Rating 
          onSubmit={() => {
            setCart([]);
            setCurrentOrder(null);
            setScreen('studentHome');
          }}
          onBack={() => setScreen('studentHome')}
        />;
      
      // Vendor Screens
      case 'vendorDashboard':
        return <VendorDashboard 
          onSelectOrder={(order) => {
            setSelectedVendorOrder(order);
            setScreen('orderDetailVendor');
          }}
          onViewReadyOrders={() => setScreen('readyOrdersQueue')}
          onLogout={() => {
            setUserRole(null);
            setScreen('roleSelection');
          }}
        />;
      case 'orderDetailVendor':
        return <OrderDetailVendor 
          order={selectedVendorOrder}
          onBack={() => setScreen('vendorDashboard')}
          onStartPreparing={() => {
            // Update order status
            setTimeout(() => setScreen('vendorDashboard'), 500);
          }}
          onMarkReady={() => {
            // Update order status
            setTimeout(() => setScreen('vendorDashboard'), 500);
          }}
        />;
      case 'readyOrdersQueue':
        return <ReadyOrdersQueue 
          onBack={() => setScreen('vendorDashboard')}
        />;
      
      // Rider Screens
      case 'riderDashboard':
        return <RiderDashboard 
          onAcceptJob={(job) => {
            setSelectedDeliveryJob(job);
            setScreen('deliveryRoute');
          }}
          onLogout={() => {
            setUserRole(null);
            setScreen('roleSelection');
          }}
        />;
      case 'deliveryRoute':
        return <DeliveryRoute 
          job={selectedDeliveryJob}
          onRequestOTP={() => setScreen('otpVerification')}
          onBack={() => setScreen('riderDashboard')}
        />;
      case 'otpVerification':
        return <OTPVerification 
          onVerify={() => setScreen('deliveryComplete')}
          onBack={() => setScreen('deliveryRoute')}
        />;
      case 'deliveryComplete':
        return <DeliveryComplete 
          earnings={selectedDeliveryJob?.earnings || 50}
          orderId={selectedDeliveryJob?.orderId || '#4219'}
          onBackToFeed={() => {
            setSelectedDeliveryJob(null);
            setScreen('riderDashboard');
          }}
        />;
      default:
        return <SplashScreen onComplete={() => setScreen('roleSelection')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[393px] h-[852px] bg-white relative overflow-hidden shadow-2xl">
        {renderScreen()}
      </div>
    </div>
  );
}