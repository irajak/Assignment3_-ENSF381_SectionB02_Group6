document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
    const cartDisplay = document.querySelector('.cart-display');
    

    function updateCartDisplay() {
        cartDisplay.innerHTML = '<h2 class="cart-title">Shopping Cart</h2>'; 
        for (const [productId, productDetails] of Object.entries(cart)) {
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
                <span>${productDetails.name} - $${productDetails.price} - ${productDetails.quantity}    </span>
                <button class="remove-from-cart" data-product-id="${productId}">Remove</button>
            `;
            cartDisplay.appendChild(productDiv);
        }
    }
    
    

    function addToCart(product) {
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = { ...product, quantity: 1 };
        }
        customAlert(`${product.name} has been added to the cart.`);
        updateCartDisplay();
    }

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

function customAlert(message) {
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    const alertModal = document.createElement('div');
    alertModal.className = 'custom-alert-modal';
    alertModal.innerHTML = `<div class="custom-alert-message">This page says <br> ${message}</div>
                            <button class="custom-alert-close">OK</button>`;
    document.body.appendChild(overlay);
    document.body.appendChild(alertModal);

    document.querySelector('.custom-alert-close').onclick = function() {
        document.body.removeChild(overlay);
        document.body.removeChild(alertModal);
    };
}

