// src/pages/Home.tsx
import React, { useState } from "react";
import PaymentCard from "../components/PaymentCard";

const Home = () => {
  const [price, setPrice] = useState(80); // or calculate dynamically
  const [selectedSlotId, setSelectedSlotId] = useState("slot123");

  const handleSuccess = () => {
    alert("Payment & Slot Booking successful!");
  };

  return (
    <div>
      <h2>Select a Slot</h2>
      {/* Replace with actual slot UI */}
      <select onChange={(e) => setSelectedSlotId(e.target.value)}>
        <option value="slot123">10:00 AM</option>
        <option value="slot456">11:00 AM</option>
      </select>

      <PaymentCard price={price} selectedSlotId={selectedSlotId} onSuccess={handleSuccess} />
    </div>
  );
};

export default Home;
