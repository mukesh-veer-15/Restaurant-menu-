// Sample data for menu items
const menuData = [
    { id: 1, name: "Vegan Salad", price: 8.99, type: "vegan", image: "https://th.bing.com/th/id/OIP.4Ng4C8kpeYWhQkW5aLrfMgHaLH?rs=1&pid=ImgDetMain" },
    { id: 2, name: "Gluten-Free Pasta", price: 12.99, type: "gluten-free", image: "https://www.cottercrunch.com/wp-content/uploads/2016/11/creamy-tomato-gluten-free-penne-pasta.jpg" },
    { id: 3, name: "Classic Burger", price: 10.99, type: "all", image: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg" },
    { id: 4, name: "Vegan Smoothie", price: 6.99, type: "vegan", image: "https://www.vegansmoothierecipes.com/wp-content/uploads/2021/07/healthy-blueberry-banana-smoothie-5-1024x1536.jpg" },
    { id: 5, name: "Gluten-Free Pizza", price: 14.99, type: "gluten-free", image: "https://images-gmi-pmc.edge-generalmills.com/c8cbc66e-8f56-4fcd-ae39-582c7d15668f.jpg" }
];

let order = [];

// Display menu items
function displayMenu(items) {
    const menuItemsContainer = document.getElementById('menuItems');
    menuItemsContainer.innerHTML = '';

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'col-md-6 col-lg-4 menu-item-card';

        itemCard.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top menu-item-img" alt="${item.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">$${item.price.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="addToOrder(${item.id})">Add to Order</button>
                </div>
            </div>
        `;
        menuItemsContainer.appendChild(itemCard);
    });
}

// Filter menu items based on type
function filterMenu(type) {
    const filteredItems = type === 'all' ? menuData : menuData.filter(item => item.type === type);
    displayMenu(filteredItems);
}

// Add item to order
function addToOrder(itemId) {
    const item = menuData.find(i => i.id === itemId);
    order.push(item);
    updateOrderSummary();
}

// Update the order summary on the sidebar
function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    orderSummary.innerHTML = '';

    // Create a summary of each item
    order.forEach((item, index) => {
        const orderItem = document.createElement('p');
        orderItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="btn btn-sm btn-danger" onclick="removeFromOrder(${index})">&times;</button>
        `;
        orderSummary.appendChild(orderItem);
    });

    // Update total
    const totalAmount = document.getElementById('totalAmount');
    const total = order.reduce((acc, item) => acc + item.price, 0);
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
}

// Remove item from order
function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderSummary();
}

// Confirm order (final action)
function confirmOrder() {
    if (order.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order confirmed! Thank you!");
        order = [];
        updateOrderSummary();
    }
}

// Initialize menu
filterMenu('all');
