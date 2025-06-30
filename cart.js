let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const container = document.getElementById("cartItemsContainer");
const itemCount = document.getElementById("itemCount");
const totalPrice = document.getElementById("totalPrice");
const totalAmount = document.getElementById("totalAmount");

function renderCart() {
  container.innerHTML = "";

  cartItems.forEach((item, index) => {
    if (!item.quantity) item.quantity = 1;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>
          <s>₹${(item.price * 1.5).toFixed(2)}</s>
          <strong>₹${item.price}</strong>
        </p>
        <div class="quantity-controls">
          <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button>
          <span id="qty-${index}">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <div class="cart-item-actions">
          <button onclick="removeItem(${item.id})">REMOVE</button>
        </div>
      </div>
    `;

    container.appendChild(itemDiv);
  });

  updateSummary();
}

function changeQuantity(index, delta) {
  if (cartItems[index].quantity + delta >= 1) {
    cartItems[index].quantity += delta;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
}

function removeItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

function updateSummary() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const price = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  itemCount.textContent = totalItems;
  totalPrice.textContent = `₹${price.toFixed(2)}`;
  const discount = price * 0.02;
  const platformFee = 4;
  totalAmount.textContent = `₹${(price - discount + platformFee).toFixed(2)}`;
}

renderCart();

document.querySelector(".place-order").addEventListener("click", () => {
  window.location.href = "address.html";
});

