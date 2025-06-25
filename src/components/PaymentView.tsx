
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface PaymentViewProps {
  onNavigateBack: () => void;
}

const PaymentView = ({ onNavigateBack }: PaymentViewProps) => {
  const handlePayment = (method: string) => {
    console.log(`Payment attempted with ${method}`);
    alert(`Payment with ${method} would be processed here`);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNavigateBack}
          className="absolute top-6 left-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Payment Card */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {/* Price Header */}
            <div className="bg-[#101D3D] text-white p-6 text-center">
              <h2 className="text-lg font-semibold">Estimated Price: ₹80.00</h2>
            </div>

            {/* Payment Options */}
            <div className="p-6 space-y-4">
              <Button
                onClick={() => handlePayment('Google Pay')}
                variant="outline"
                className="w-full h-14 flex items-center justify-center space-x-3 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-gray-800 font-medium">Google Pay</span>
                </div>
              </Button>

              <Button
                onClick={() => handlePayment('Parkin Pay')}
                variant="outline"
                className="w-full h-14 flex items-center justify-center space-x-3 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#101D3D] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <span className="text-gray-800 font-medium">Parkin Pay</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentView;
