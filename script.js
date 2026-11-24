const bag = [];

const bagDrawer = document.querySelector(".bag-drawer");
const bagItems = document.querySelector(".bag-items");
const bagCount = document.querySelector(".cart-count");
const bagTotal = document.querySelector(".bag-total");

function renderBag() {
  bagItems.innerHTML = bag.length
    ? bag.map((item, index) => `
      <div class="bag-item">
        <div class="bag-item-thumb"><span></span></div>
        <div><h3>${item.name}</h3><p>Qty 1 · $${item.price}</p></div>
        <button class="remove-item" type="button" data-index="${index}" aria-label="Remove ${item.name}">×</button>
      </div>`).join("")
    : '<p class="bag-empty">Your bag is empty.</p>';

  bagCount.textContent = bag.length;
  bagTotal.textContent = `$${bag.reduce((total, item) => total + item.price, 0)}`;
}

function openBag() {
  document.body.classList.add("bag-open");
  bagDrawer.setAttribute("aria-hidden", "false");
}

function closeBag() {
  document.body.classList.remove("bag-open");
  bagDrawer.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    const card = button.closest(".product-card");
    bag.push({
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price)
    });
    renderBag();
    openBag();
  });
});

document.querySelector(".cart-button").addEventListener("click", openBag);
document.querySelector(".close-bag").addEventListener("click", closeBag);
document.querySelector(".bag-overlay").addEventListener("click", closeBag);
bagItems.addEventListener("click", event => {
  const removeButton = event.target.closest(".remove-item");
  if (removeButton) {
    bag.splice(Number(removeButton.dataset.index), 1);
    renderBag();
  }
});
