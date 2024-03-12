document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
    const cartDisplay = document.querySelector('.cart-display');

    // updates cart dispaly
    function updateCartDisplay() {
        cartDisplay.innerHTML = '';
        for (const [productId, productDetails] of Object.entries(cart)) {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <p>Product: ${productDetails.name}</p>
                <p>Price: $${productDetails.price}</p>
                <p>Quantity: ${productDetails.quantity}</p>
                <button class="remove-from-cart" data-product-id="${productId}">Remove</button>
            `;
            cartDisplay.appendChild(productDiv);
        }
    }

    // add to cart
    function addToCart(product) {
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = { ...product, quantity: 1 };
        }
        updateCartDisplay();
    }

    // the details of item being added to cart
    document.addEventListener('click', (event) => {
        if (event.target.matches('.add-to-cart')) {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = event.target.dataset.productPrice;
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice
            });
        }
    });

    // details of removing from cart
    cartDisplay.addEventListener('click', (event) => {
        if (event.target.matches('.remove-from-cart')) {
            const productId = event.target.dataset.productId;
            if (cart[productId].quantity > 1) {
                cart[productId].quantity -= 1;
            } else {
                delete cart[productId];
            }
            updateCartDisplay();
        }
    });
});
