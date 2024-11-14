document.addEventListener('DOMContentLoaded', function () {
    // Simple alert to showcase interactivity for the Order Now button
    const orderButton = document.querySelector('.order-btn');
    orderButton.addEventListener('click', () => {
        alert('Redirecting to the Order Online page!');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Event listener for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Item added to cart!');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Add simple hover effect to team members
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('mouseover', () => {
            member.style.transform = 'scale(1.05)';
            member.style.transition = 'transform 0.3s';
        });

        member.addEventListener('mouseout', () => {
            member.style.transform = 'scale(1)';
        });
    });
});

// Initialize Google Map and markers for restaurant locations
function initMap() {
    const locations = [
        { name: 'Downtown Branch', lat: 40.712776, lng: -74.005974 },
        { name: 'Uptown Branch', lat: 40.730610, lng: -73.935242 },
        { name: 'Suburb Branch', lat: 40.678178, lng: -73.944158 }
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.712776, lng: -74.005974 },
        zoom: 12
    });

    // Add markers to the map
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name
        });
    });

    // Search feature
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    const geocoder = new google.maps.Geocoder();

    searchButton.addEventListener('click', () => {
        const address = searchInput.value;
        if (address) {
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(14);
                } else {
                    alert('Location not found: ' + status);
                }
            });
        }
    });
}

// Load the map when the page loads
window.onload = initMap;

// Simple form validation for the Contact Form
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation checks
    if (name === '' || email === '' || phone === '' || message === '') {
        alert('Please fill in all fields.');
    } else {
        alert('Thank you for your message! We will get back to you soon.');
        // Here you can add functionality to send the form data to the server
        document.getElementById('contactForm').reset(); // Reset the form
    }
});

let cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price;
    });

    document.getElementById('totalAmount').innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderSummaryDiv = document.getElementById('orderSummary');
    orderSummaryDiv.innerHTML = '<h3>Order Summary</h3>';
    
    cart.forEach(item => {
        const summaryItem = document.createElement('p');
        summaryItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        orderSummaryDiv.appendChild(summaryItem);
    });

    document.getElementById('checkoutModal').style.display = 'flex';
}

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('confirmationModal').style.display = 'flex';
    cart = [];
    updateCart();
});

function closeModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}
