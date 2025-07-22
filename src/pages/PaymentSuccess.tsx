import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentSuccessProps {
  onGoHome: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-xl border-none rounded-2xl text-center py-8">
        <CardContent className="flex flex-col items-center space-y-6">
          <svg className="h-16 w-16 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2l4-4" />
          </svg>
          <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your payment. Your parking spot is reserved.</p>
          <Button className="w-full h-11 text-base mt-4" onClick={onGoHome}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess; 