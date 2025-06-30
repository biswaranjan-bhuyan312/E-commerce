const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalMrp = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.floor(totalMrp * 0.02);
    const final = Math.floor(totalMrp - discount);

    document.getElementById("totalMrp").textContent = `₹${totalMrp}`;
    document.getElementById("discount").textContent = `− ₹${discount}`;
    document.getElementById("finalAmount").textContent = `₹${final}`;

    function selectPayment(method) {
      const buttons = document.querySelectorAll('.option');
      buttons.forEach(btn => btn.classList.remove('active'));

      let label = '';
      if (method === 'cod') {
        label = `
          <h4>Pay On Delivery (Cash/UPI)</h4>
          <input type="text" placeholder="Enter last 4 digits of mobile for confirmation" />
          <p>You can pay via Cash or UPI at the time of delivery.</p>
        `;
      } else {
        label = `
          <h4>${method.toUpperCase()} Payment</h4>
          <input type="text" placeholder="Enter mock details (e.g., card or UPI ID)" />
          <p>This is just a simulation form.</p>
        `;
      }

      document.getElementById('paymentDetails').innerHTML = label;
      event.target.classList.add('active');
    }

    function placeOrder() {
      alert("Your order has been placed successfully!");
      localStorage.removeItem("cartItems");
      window.location.href = "thankyou.html";
    }