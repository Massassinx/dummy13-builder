const basePrice = 20;
const addons = document.querySelectorAll('.addon');
const totalDisplay = document.getElementById('total');

addons.forEach(addon => {
  addon.addEventListener('change', updatePrice);
});

function updatePrice() {
  let total = basePrice;
  addons.forEach(addon => {
    if (addon.checked) {
      total += parseInt(addon.value);
    }
  });
  totalDisplay.textContent = total;
}

function submitOrder() {
  alert("Order submitted! You’ll be contacted for payment.");
}
