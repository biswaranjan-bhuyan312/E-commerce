 const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalMrp = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.floor(totalMrp * 0.02);
    const final = Math.floor(totalMrp - discount);

    document.getElementById("totalMrp").textContent = `₹${totalMrp}`;
    document.getElementById("discount").textContent = `− ₹${discount}`;
    document.getElementById("finalAmount").textContent = `₹${final}`;

    // Address form submission
    document.getElementById("addressForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const addressData = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        pincode: document.getElementById("pincode").value,
        address: document.getElementById("address").value,
        town: document.getElementById("town").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
      };

      localStorage.setItem("userAddress", JSON.stringify(addressData));

      alert("Address saved successfully!");

      // Redirect to checkout page
      window.location.href = "checkout.html";
    });