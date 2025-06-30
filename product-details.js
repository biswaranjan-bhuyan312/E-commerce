const product = JSON.parse(localStorage.getItem("selectedProduct"));

        if (product) {
            const container = document.getElementById("productDetails");
            container.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}" />
            </div>
            <div>
                <h1>${product.title}</h1>
                <h3>Price: ₹${product.price}</h3>
                <p>${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <button>Add to Cart</button>
            </div>
            `;
        } else {
            document.getElementById("productDetails").innerHTML = "<p>No product selected.</p>";
        }