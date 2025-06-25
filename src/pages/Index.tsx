
import React, { useState } from 'react';
import MapView from '@/components/MapView';
import ReservationView from '@/components/ReservationView';
import PaymentView from '@/components/PaymentView';

type Screen = 'map' | 'reservation' | 'payment';

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
        <PaymentView onNavigateBack={navigateBack} />
      )}
    </div>
  );
};

export default Index;
