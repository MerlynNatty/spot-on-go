// src/components/PaymentCard.tsx
import React from "react";
import axios from "axios";

interface PaymentProps {
  price: number;
  selectedSlotId: string;
  onSuccess: () => void;
}

const PaymentCard: React.FC<PaymentProps> = ({ price, selectedSlotId, onSuccess }) => {
  const handlePayment = async () => {
    try {
      // 1. Call backend to create Razorpay order
      const res = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: price * 100,
      });

      const { id: order_id } = res.data;

      const options = {
        key: "rzp_test_abc123xyz", // replace with your actual key
        amount: price * 100,
        currency: "INR",
        order_id,
        handler: async (response: any) => {
          // 2. Save selected slot after successful payment
          await axios.post("http://localhost:5000/api/slots/book", {
            slotId: selectedSlotId,
            paymentId: response.razorpay_payment_id,
          });

          onSuccess();
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert("Payment failed to start. Please try again.");
    }
  };

  return (
    <div>
      <p>Estimated Price: ₹{price}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentCard;
