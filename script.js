const products = [
  {id:1,name:"Chicken Sharwama {Single Sausage}",category:"Sharwama",price:2500,tag:"Best Seller",emoji:"🌯",description:"Grilled chicken, fresh veggies, sauces wrapped in a soft flatbread. Our signature.",image:"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=82"},
  {id:2,name:"Chicken Sharwama {Double Sausage}",category:"Sharwama",price:3000,tag:"Best Seller",emoji:"🌯",description:"Grilled chicken, fresh veggies, sauces wrapped in a soft flatbread. Our signature.",image:"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=82"},
  {id:3,name:"Beef Sharwama",category:"Sharwama",price:3500,tag:"Popular",emoji:"🫔",description:"Seasoned beef strips with crisp cabbage and our house special sauce in a warm wrap.",image:"https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=700&q=82"},
  {id:4,name:"Mixed Sharwama",category:"Sharwama",price:4000,tag:"",emoji:"🌮",description:"The best of both — chicken and beef together. For those who can't choose.",image:"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=82"},
  {id:5,name:"Barbeque Chicken",category:"Barbeque",price:15000,tag:"Smoky",emoji:"🍗",description:"Smoky, charcoal-grilled chicken seasoned to perfection. Served hot off the grill.",image:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=700&q=82"},
  {id:6,name:"Barbeque Fish",category:"Barbeque",price:10000,tag:"",emoji:"🐟",description:"Fresh grilled fish with our signature spice blend. Rich flavour, tender flesh.",image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=82"},
  {id:7,name:"Asun",category:"Asun",price:1500,tag:"Spicy 🌶️",emoji:"🥩",description:"Spicy peppered goat meat — a classic Nigerian BBQ snack. Hot, smoky and addictive.",image:"https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=700&q=82"},
  {id:8,name:"Fries & Chicken",category:"Fries",price:4000,tag:"",emoji:"🍟",description:"Crispy golden fries paired with seasoned fried chicken. Comfort food at its best.",image:"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=82"},
  {id:9,name:"Garnished Noodles & Fried Egg",category:"Noodles",price:2000,tag:"Light Meal",emoji:"🍜",description:"Seasoned stir-fried noodles topped with a perfectly fried egg. Quick and satisfying.",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=82"},
  {id:10,name:"Spicy Noodles & Fried Egg (Plantain)",category:"Noodles",price:2500,tag:"",emoji:"♨️",description:"Hearty noodles combined with a perfectly fried egg. Quick and satisfying.",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=82"},
  {id:11,name:"Jollof rice and Beef",category:"Noodles",price:2500,tag:"",emoji:"🍛",description:"Hearty noodles combined with our flavourful grilled chicken pieces.",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=82"},
  {id:12,name:"Jollof rice and Chicken (Medium)",category:"Noodles",price:3000,tag:"Popular",emoji:"🍛",description:"Hearty Jollof rice combined with our flavourful grilled chicken pieces.",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=82"},
  {id:13,name:"Jollof rice and Chicken (Big)",category:"Noodles",price:3500,tag:"",emoji:"🍛",description:"Hearty Jollof rice combined with our flavourful grilled chicken pieces.",image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=82"},
  {id:14,name:"Pasta and Beef",category:"Noodles",price:2300,tag:"",emoji:"🍝",description:"Seasoned stir-fried Pasta combined with our flavourful grilled beef pieces.",image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=82"},
  {id:15,name:"Pasta and Chicken (Medium)",category:"Noodles",price:2800,tag:"",emoji:"🍝",description:"Seasoned stir-fried Pasta combined with our flavourful grilled chicken pieces.",image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=82"},
  {id:16,name:"Pasta and Chicken (Big)",category:"Noodles",price:3400,tag:"",emoji:"🍝",description:"Seasoned stir-fried Pasta combined with our flavourful grilled chicken pieces.",image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=82"}
];
const WHATSAPP_NUMBER = "2347081992566";
const money = value => "₦" + Number(value).toLocaleString("en-NG");
let cart = [];
let activeCategory = "All";
const menuGrid = document.getElementById("menuGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

function renderMenu() {
  const query = document.getElementById("menuSearch").value.trim().toLowerCase();
  const shown = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)));
  menuGrid.innerHTML = shown.length ? shown.map(p =>
    '<article class="menu-card"><div class="menu-photo"><img src="' + p.image + '" alt="' + p.name.replace(/"/g, "&quot;") + '" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'image-fallback\')"><span class="menu-tag">' + (p.tag || p.category) + '</span></div><div class="menu-info"><span class="menu-category">' + p.category + '</span><h3 class="menu-name">' + p.name + '</h3><p class="menu-description">' + p.description + '</p><div class="menu-bottom"><strong class="menu-price">' + money(p.price) + '</strong><button class="add-button" data-add="' + p.id + '">Add +</button></div></div></article>'
  ).join("") : '<div class="no-results">No menu items match that search. Try another name or category.</div>';
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function addToCart(id) {
  const product = products.find(p => p.id === Number(id));
  if (!product) return;
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({...product, quantity:1});
  renderCart();
  showToast(product.name + " added to cart");
}
function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === Number(id));
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(p => p.id !== item.id);
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCount").textContent = "(" + count + " items)";
  document.getElementById("cartTotalItems").textContent = count + (count === 1 ? " item" : " items");
  document.getElementById("cartSubtotal").textContent = money(total);
  const container = document.getElementById("cartItems");
  if (!cart.length) {
    container.innerHTML = '<div class="empty-cart"><span>🛒</span><h3>Your cart is empty</h3><p>Add your favourites from our menu.</p><button class="primary-button" id="continueShopping">Browse Menu ↗</button></div>';
    return;
  }
  container.innerHTML = cart.map(item =>
    '<div class="cart-row"><div><h4>' + item.name + '</h4><span class="cart-price">' + money(item.price * item.quantity) + '</span><div class="cart-row-actions"><button data-qty="' + item.id + '" data-change="-1" aria-label="Decrease quantity">−</button><span>' + item.quantity + '</span><button data-qty="' + item.id + '" data-change="1" aria-label="Increase quantity">+</button><button class="remove-item" data-remove="' + item.id + '">Remove</button></div></div></div>'
  ).join("");
}
function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function prepareOrderText() {
  return cart.map(item => item.quantity + "x " + item.name + " — " + money(item.price * item.quantity)).join("\n") +
    "\n\nTotal items: " + cart.reduce((sum, item) => sum + item.quantity, 0) +
    "\nTotal: " + money(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});
document.getElementById("categoryFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
  renderMenu();
});
document.querySelectorAll("[data-jump-category]").forEach(link => link.addEventListener("click", () => {
  activeCategory = link.dataset.jumpCategory;
  document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === activeCategory));
  renderMenu();
}));
document.getElementById("menuSearch").addEventListener("input", renderMenu);
document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.getElementById("cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.qty, Number(quantityButton.dataset.change));
  if (removeButton) {
    cart = cart.filter(item => item.id !== Number(removeButton.dataset.remove));
    renderCart();
  }
  if (event.target.closest("#continueShopping")) {
    closeCart();
    document.getElementById("menu").scrollIntoView({behavior:"smooth"});
  }
});
document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
  showToast("Cart cleared");
});
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  document.getElementById("orderDetails").value = prepareOrderText();
  closeCart();
  document.getElementById("contact").scrollIntoView({behavior:"smooth"});
  showToast("Add your details to complete the order");
});
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const location = document.getElementById("preferredLocation").value;
  const order = document.getElementById("orderDetails").value.trim();
  if (!name || !phone || !location || !order) {
    showToast("Please complete all order details");
    return;
  }
  const message = "Hello Damsam Treats! I would like to place an order.\n\nName: " + name + "\nPhone: " + phone + "\nPreferred location: " + location + "\n\nMy order:\n" + order + "\n\nPlease confirm my order. Thank you.";
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const opened = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(opened));
});
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderMenu();
renderCart();