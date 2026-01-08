// PRICE CALCULATOR
const basePrice = 20;
const addons = document.querySelectorAll('.addon');
const totalDisplay = document.getElementById('total');
const shipping = document.getElementById('shipping');

function updatePrice() {
    let total = basePrice;
    addons.forEach(addon => {
        if (addon.checked) total += parseInt(addon.value);
    });
    if (shipping.checked) total += 8;
    totalDisplay.textContent = total;
}

// Event listeners
addons.forEach(addon => addon.addEventListener('change', updatePrice));
shipping.addEventListener('change', updatePrice);
