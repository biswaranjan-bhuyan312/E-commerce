const bookmarkedProducts = new Set(); // globally track bookmarks

// Toggle between signup and login forms (used by links inside forms)
function toggleForms() {
    document.getElementById("signupForm").classList.toggle("hidden");
    document.getElementById("loginForm").classList.toggle("hidden");
}

// Handle Register button click
document.querySelector(".register").addEventListener("click", function () {
    document.querySelector(".form-wrapper").classList.remove("hidden");
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
});

// Handle Login button click
document.querySelector(".login").addEventListener("click", function () {
    document.querySelector(".form-wrapper").classList.remove("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
});

// Signup form submit
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const mobileno = document.getElementById("mobileno").value;
    const password = document.getElementById("password").value;
    const profileUrl = document.getElementById("profileUrl").value;

    const userData = {
        username: username,
        email: email,
        mobileno: mobileno,
        password: password,
        profileUrl: profileUrl
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful! Data stored in localStorage.");
    toggleForms();
});

// Login form submit
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === loginEmail && savedUser.password === loginPassword) {
        alert("Login successful! Welcome " + savedUser.username);

         document.getElementById("productList").style.display = "flex";
        
        localStorage.setItem("isLoggedIn", "true");  // set flag
        document.querySelector(".form-wrapper").classList.add("hidden");

        const profileImg = document.createElement("img");
        profileImg.src = savedUser.profileUrl;
        profileImg.alt = "Profile";
        profileImg.classList.add("user-profile");
        document.getElementById("profileImageContainer").innerHTML = ''; // clear if already exists
        document.getElementById("profileImageContainer").appendChild(profileImg);
    } else {
        alert("Invalid email or password. Please try again.");
    }
});







// Fetch products and display them
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayProducts(data); // ✅ Correct function call with correct data structure
        loadBookmarksFromStorage(data);
    })
    .catch(error => {
        console.error("Error fetching products:", error);
    });

// Display products on screen
function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear previous data

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.setAttribute("data-id", product.id);

        //Bookmark
        const bookmark = document.createElement("span");
        bookmark.innerHTML = "🤍";
        bookmark.classList.add("bookmark-icon");
        card.appendChild(bookmark);

        bookmark.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering product page redirection
            if (!bookmarkedProducts.has(product.id)) {
                bookmarkedProducts.add(product.id);
                bookmark.innerHTML = "❤️";
                addToBookmark(product);
            } else {
                bookmarkedProducts.delete(product.id);
                bookmark.innerHTML = "🤍";
                removeFromBookmark(product.id);
            }
        });


        // Product image
        const image = document.createElement("img");
        image.src = product.image || "";
        image.alt = product.title;
        image.classList.add("product-image");

        // Product title
        const title = document.createElement("h2");
        title.innerText = product.title;

        // Product price
        const price = document.createElement("p");
        price.innerText = `Price: ₹${product.price}`;

        //Add to cart 
        const cart = document.createElement("button");
        cart.innerText = "Add to Cart";
        cart.classList.add("add-to-cart");

        cart.addEventListener("click", (e) => {
        e.stopPropagation(); // stop card redirect
        addToCart(product);
        });

        // Append all to card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(cart);

        //product details page redirect
        card.addEventListener("click",()=>{
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product-details.html"; 
});

        // Add card to productList
        productList.appendChild(card);
    });

document.getElementById("cartBtn").addEventListener("click", () => {
    window.location.href = "cart.html";
    });
}

function addToBookmark(product) {
    const bookmarkList = document.getElementById("bookmarkList");

    const listItem = document.createElement("li");
    listItem.setAttribute("data-id", product.id);
    listItem.textContent = product.title;
    listItem.style.cursor = "pointer";

    // 🔁 Make item clickable
    listItem.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product-details.html";
    });

    bookmarkList.appendChild(listItem);
    // Save updated list
    saveBookmarksToStorage();
}

function removeFromBookmark(productId) {
    const bookmarkList = document.getElementById("bookmarkList");
    const item = bookmarkList.querySelector(`li[data-id='${productId}']`);
    if (item) bookmarkList.removeChild(item);
    // Save updated list
    saveBookmarksToStorage();
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("bookmarkToggle");
    const bookmarkList = document.getElementById("bookmarkList");

    toggleBtn.addEventListener("click", () => {
        bookmarkList.classList.toggle("hidden");
    });
});

function saveBookmarksToStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(Array.from(bookmarkedProducts)));
}

function loadBookmarksFromStorage(products) {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    saved.forEach(id => {
        const product = products.find(p => p.id === id);
        if (product) {
            bookmarkedProducts.add(product.id);
            addToBookmark(product);

            // update heart icon to red
            const heart = document.querySelector(`.product-card[data-id="${product.id}"] .bookmark-icon`);
            if (heart) heart.innerHTML = "❤️";
        }
    });
}


function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const exists = cartItems.find(item => item.id === product.id);
    if (!exists) {
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert(`${product.title} added to cart!`);
    } else {
        alert("This item is already in your cart.");
    }
}


function removeFromCart(product){
    
}

// ✅ On page load, check if already logged in
window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        document.querySelector(".form-wrapper").classList.add("hidden");
        document.getElementById("productList").style.display = "flex";

        try {
            const savedUser = JSON.parse(localStorage.getItem("user"));
            if (savedUser && savedUser.profileUrl) {
                const img = document.createElement("img");
                img.src = savedUser.profileUrl;
                img.alt = "Profile";
                img.classList.add("user-profile");
                document.getElementById("profileImageContainer").innerHTML = '';
                document.getElementById("profileImageContainer").appendChild(img);
            }
        } catch (e) {
            console.error("Error loading profile image:", e);
        }
    }
});

// ✅ Toggle profile dropdown on profile image click
document.addEventListener("click", function (e) {
    const profileImg = document.getElementById("profileImageContainer");
    const dropdown = document.getElementById("profileDropdown");

    // If clicked on image
    if (profileImg.contains(e.target)) {
        dropdown.classList.toggle("hidden");

        // Populate user details
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            document.getElementById("dropdownName").innerText = user.username;
            document.getElementById("dropdownEmail").innerText = user.email;
            document.getElementById("dropdownPhone").innerText = user.mobileno;
        }
    }
    // If clicked outside image and outside dropdown, close it
    else if (!dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});

// ✅ Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
});





