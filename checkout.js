// Retrieve and display saved address
    const address = JSON.parse(localStorage.getItem("userAddress"));
    if (address) {
      document.getElementById("savedAddress").innerHTML = `
        <p><strong>${address.name}</strong> (Mobile: ${address.mobile})</p>
        <p>${address.address}, ${address.town}</p>
        <p>${address.city}, ${address.state} - ${address.pincode}</p>
        <p><em>Pay on Delivery available</em></p>
      `;
    } else {
      document.getElementById("savedAddress").innerText = "No address found. Please go back and add one.";
    }

    // Retrieve cart and display price summary
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalMrp = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.floor(totalMrp * 0.02);
    const final = Math.floor(totalMrp - discount);

    document.getElementById("totalMrp").textContent = `₹${totalMrp}`;
    document.getElementById("discount").textContent = `− ₹${discount}`;
    document.getElementById("finalAmount").textContent = `₹${final}`;

    // Optional: You can add functionality to the checkout button
    document.querySelector(".checkout-button").addEventListener("click", () => {
    window.location.href = "payment.html";
    });


function addNewAddress() {
  window.location.href = "address.html";
}

function removeAddress() {
  localStorage.removeItem("userAddress");
  document.getElementById("savedAddress").innerHTML = "<p style='color: gray;'>Address removed. Please add a new address.</p>";
  document.querySelector(".change-address-btn").style.display = "none";
  document.querySelector(".remove-address-btn").style.display = "none";
}

