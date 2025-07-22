import React, { useState } from 'react';
import MapView from '@/components/MapView';
import ReservationView from '@/components/ReservationView';
import PaymentView from '@/components/PaymentView';

// Import the new PaymentSuccess page (to be created)
import PaymentSuccess from './PaymentSuccess';

type Screen = 'map' | 'reservation' | 'payment' | 'paymentSuccess';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('map');

  const navigateToReservation = () => setCurrentScreen('reservation');
  const navigateToPayment = () => setCurrentScreen('payment');
  const navigateToMap = () => setCurrentScreen('map');
  const navigateBack = () => {
    if (currentScreen === 'payment') {
      setCurrentScreen('reservation');
    } else if (currentScreen === 'reservation') {
      setCurrentScreen('map');
    }
  };
  const handlePaymentSuccess = () => setCurrentScreen('paymentSuccess');

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-xl">
      {currentScreen === 'map' && (
        <MapView onNavigateToReservation={navigateToReservation} />
      )}
      {currentScreen === 'reservation' && (
        <ReservationView 
          onNavigateToPayment={navigateToPayment}
          onNavigateBack={navigateBack}
        />
      )}
      {currentScreen === 'payment' && (
        <PaymentView onNavigateBack={navigateBack} onPaymentSuccess={handlePaymentSuccess} />
      )}
      {currentScreen === 'paymentSuccess' && (
        <PaymentSuccess onGoHome={navigateToMap} />
      )}
    </div>
  );
};

export default Index;
