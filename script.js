const products = [
  {id:1,name:"Everyday Carry Tote",category:"Accessories",price:18500,tag:"FEATURED",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Minimal Ceramic Vase",category:"Home",price:12500,tag:"HOME PICK",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Classic Timepiece",category:"Accessories",price:32000,tag:"TIMELESS",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Soft Living Throw",category:"Home",price:22000,tag:"COMFORT",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Daily Essentials Set",category:"Lifestyle",price:14500,tag:"EVERYDAY",image:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Modern Crossbody",category:"Accessories",price:27500,tag:"POPULAR",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Scented Candle",category:"Lifestyle",price:9500,tag:"LITTLE LUXURY",image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Sculpted Table Decor",category:"Home",price:16000,tag:"DESIGN PICK",image:"https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=85"}
];
const money = value => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);
let cart = [];
let activeCategory = "All";
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

function renderProducts(){
  const query = document.getElementById("productSearch").value.trim().toLowerCase();
  const shown = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)));
  productGrid.innerHTML = shown.length ? shown.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}">Add to bag +</button></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3 class="product-name">${p.name}</h3><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="mobile-add" data-add="${p.id}">Add +</button></div></div>
    </article>`).join("") : '<div class="no-results">No products match your search. Try another keyword.</div>';
}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2200)}
function addToCart(id){const product=products.find(p=>p.id===Number(id));if(!product)return;const found=cart.find(i=>i.id===product.id);if(found)found.quantity++;else cart.push({...product,quantity:1});renderCart();showToast(product.name+" added to your bag");}
function changeQuantity(id,amount){const item=cart.find(i=>i.id===Number(id));if(!item)return;item.quantity+=amount;if(item.quantity<=0)cart=cart.filter(i=>i.id!==item.id);renderCart()}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.quantity,0);
  const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent="("+count+")";
  document.getElementById("cartSubtotal").textContent=money(total);
  const container=document.getElementById("cartItems");
  if(!cart.length){container.innerHTML='<div class="empty-cart"><span>✧</span><h3>Your bag is waiting</h3><p>Add something lovely to get started.</p><button class="primary-button" id="continueShopping">Continue shopping ↗</button></div>';return}
  container.innerHTML=cart.map(item=>`<div class="cart-row"><img src="${item.image}" alt="${item.name}"><div><h4>${item.name}</h4><span class="cart-price">${money(item.price)}</span><div class="quantity-control"><button data-qty="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-qty="${item.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${item.id}">Remove</button></div>`).join("");
}
function openCart(){cartDrawer.classList.add("open");overlay.classList.add("show");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){cartDrawer.classList.remove("open");overlay.classList.remove("show");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow=""}

productGrid.addEventListener("click",e=>{const button=e.target.closest("[data-add]");if(button)addToCart(button.dataset.add)});
document.getElementById("categoryList").addEventListener("click",e=>{const button=e.target.closest("[data-category]");if(!button)return;activeCategory=button.dataset.category;document.querySelectorAll(".category-chip").forEach(chip=>chip.classList.toggle("selected",chip===button));renderProducts()});
document.getElementById("productSearch").addEventListener("input",renderProducts);
document.getElementById("searchFocus").addEventListener("click",()=>{document.getElementById("productSearch").focus();document.getElementById("shop").scrollIntoView({behavior:"smooth"})});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("cartItems").addEventListener("click",e=>{const qty=e.target.closest("[data-qty]");const remove=e.target.closest("[data-remove]");if(qty)changeQuantity(qty.dataset.qty,Number(qty.dataset.change));if(remove){cart=cart.filter(i=>i.id!==Number(remove.dataset.remove));renderCart()}if(e.target.closest("#continueShopping"))closeCart()});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your bag is empty");return}
  const lines=cart.map(i=>`${i.name} x ${i.quantity} — ${money(i.price*i.quantity)}`).join("\n");
  const total=cart.reduce((s,i)=>s+i.price*i.quantity,0);
  const message=encodeURIComponent(`Hello Damsam Store, I would like to place an order:\n\n${lines}\n\nSubtotal: ${money(total)}\n\nPlease confirm availability and delivery details.`);
  window.open("https://wa.me/?text="+message,"_blank","noopener");
});
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");const isOpen=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(isOpen))});
document.querySelectorAll("#mainNav a").forEach(link=>link.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false")}));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks for your interest! Updates will be available soon.";e.target.reset()});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();