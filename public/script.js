let selectedSlot = null;
let pricePerHour = 15;
let hours = 1;

document.querySelectorAll(".slot").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedSlot = btn.dataset.slot;
    alert(`Selected: ${selectedSlot}`);
  });
});

document.getElementById("payBtn").addEventListener("click", async () => {
  if (!selectedSlot) return alert("Please select a slot");

  const amount = pricePerHour * hours;

  try {
    const res = await fetch("http://localhost:5000/api/orders/create-razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_1Jt8jqsQB9Hmrd",
      amount: order.amount,
      currency: order.currency,
      name: "Smart Parking",
      description: `Booking slot ${selectedSlot}`,
      order_id: order.id,
      handler: async function (response) {
        alert("Payment successful!");

        // Save booking to DB
        await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slot: selectedSlot,
            amount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          })
        });

        alert("Slot booked!");
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment failed:", err);
    alert("Failed to start payment");
  }
});
