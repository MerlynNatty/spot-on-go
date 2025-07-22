import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface PaymentViewProps {
  onNavigateBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentView = ({ onNavigateBack, onPaymentSuccess }: PaymentViewProps) => {
  const [loading, setLoading] = useState(false);

  // Function to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  // Function to handle Razorpay payment
  const handleRazorpayPayment = async () => {
    setLoading(true);
    await loadRazorpayScript();
    try {
      // Call backend to create Razorpay order
      const res = await fetch('/api/orders/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 80, currency: 'INR' }) // amount in INR
      });
      const order = await res.json();
      if (!order.id) throw new Error('Failed to create order');

      const options = {
        key: 'rzp_test_1Jt8jqsQB9Hmrd', // Replace with your Razorpay test key ID
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Spot On Go',
        description: 'Parking Payment',
        handler: function (response: any) {
          // You get payment_id, order_id, and signature here
          // You should verify this on your backend for real apps
          setLoading(false);
          onPaymentSuccess();
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: { color: '#101D3D' }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setLoading(false);
      alert('Payment failed to start. Please try again.');
    }
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
          disabled={loading}
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
            {/* Payment Options or Loading */}
            <div className="p-6 space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <svg className="animate-spin h-10 w-10 text-[#101D3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-[#101D3D] font-semibold text-lg">Redirecting to payment...</span>
                </div>
              ) : (
                <Button
                  onClick={handleRazorpayPayment}
                  variant="outline"
                  className="w-full h-14 flex items-center justify-center space-x-3 bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-xl"
                >
                  <span className="text-gray-800 font-medium">Pay with Razorpay</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentView;
