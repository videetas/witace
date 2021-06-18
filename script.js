const productDetails = [
{
  name: "Bamboo Keychain",
  price: 99,
  imageUrl:
  "https://kabadiwala.com/wp-content/uploads/2018/02/Bamboo_Keychain.png",
  qty: 10,
  heading: "ECO-FRIENDLY KEYCHAIN",
  des:
  "Bamboo keychain is made of eco friendly bamboo material with 100% handmade crafts, it is nontoxic, non irritation, flexible and lightweight," },
  {
    name: "Recycled Plastic Rugs",
    price: 300,
    imageUrl:
    "https://www.onyalife.com/wp-content/uploads/kilimanjaro-black-new-corner_folded_2-150x150.jpg",
    qty: 10,
    heading: "Functional And Attractive",
    des:
    "Woven from premium quality recycled plastic, the beautiful and affordable recycled plastic rugs make several statments at the same time" },
    {
      name: "Cotton Shopping Bags",
      price: 100,
      imageUrl:
      "https://5.imimg.com/data5/PV/BS/UB/SELLER-28766427/cotton-grocery-shopping-bag-500x500.jpg",
      qty: 10,
      heading: "REUSE RUDUCE RECYCLE",
      des:
      "Instead of using the produce bags and throwing them out when your food is brought, use the reusable produce bags and throw away a plastic produce bag again." },
      {
        name: "Bio Degradable Pots",
        price: 599,
        imageUrl:
        "https://5.imimg.com/data5/MB/VV/MY-15280482/biodegradable-coir-pot-500x500.jpg",
        qty: 10,
        heading: "ECO FRIENDLY!",
        des:
        "Help keep your garden safe from plastic and rubber pollution with these Western biodegradable garden pots." },
        {
          name: "Compostable Bowls",
          price: 399,
          imageUrl:
          "https://www.onyalife.com/wp-content/uploads/Compostable-Bowls.png",
          qty: 10,
          heading: "ECO FRIENDLY!",
          des:
          "You can use a compostable bowl that’s both human and environmentally friendly." },
          {
            name: "Recycled Plastic Belts",
            price: 249,
            imageUrl:
            "https://www.onyalife.com/wp-content/uploads/Jelt-Belt-150x150.png",
            qty: 10,
            heading: "Functional and socially impactful.",
            des:
            "Jelt was established with the purpose of creating a product that everyone would need, while promoting and encouraging objectives that serve the common good." },
            {
              name: "Reusable Bags",
              price: 49,
              imageUrl:
              "https://www.onyalife.com/wp-content/uploads/Apple-Produce-Bag-5pk-e1468257190623-300x276.jpg",
              qty: 100,
              heading: "REUSE RUDUCE RECYCLE",
              des:
              "Instead of using the produce bags and throwing them out when your food is brought, use the reusable produce bags and throw away a plastic produce bag again." },
              {
                name: "Wooden Coaster",
                price: 24900,
                imageUrl:
                "https://kabadiwala.com/wp-content/uploads/2018/02/SSC024.png",
                qty: 10,
                heading: "ECO-FRIENDLY MINI COASTER: ",
                des:
                "Lemon slice themed wooden solid raw wood coaster set of 4. Perfect for dining table/bar table/cafes/gifting." },
                {
                  name: "Flower Bottle",
                  price: 499,
                  imageUrl:
                  "https://kabadiwala.com/wp-content/uploads/2018/03/WK-16-5.jpg",
                  qty: 10,
                  heading: "Made from upcycled glass bottles",
                  des:
                  "The eco-friendly Flower Bottle is kiln-formed in a furnace at 700 degree Celsius, is fade-proof and washable and ready to use ‘re good to go" },


{
  name: "Bamboo Notepad",
  price: 499,
  imageUrl:
  "https://kabadiwala.com/wp-content/uploads/2018/02/Bamboo_Notepad_with_Pen.png",
  qty: 25,
  heading: "ECO-FRIENDLY MINI NOTEPAD: ",
  des:
  "This beautiful notebook is made of 100% recycled paper, as you can see from the distinctive yellowish color of its pages. This eco-friendly notebook has 70 lined pages, it is just great for all purposes!" }];


const cartDetails = [];
var rewards=50;
var discount=0;
//click events {
function addItem(event) {
  let btnClicked =
  event.parentElement.parentElement.parentElement.parentElement.parentElement;
  let noStocks = btnClicked.getElementsByClassName("out-of-stock-cover")[0];
  if (noStocks.style.display == "flex") return;
  let name = btnClicked.getElementsByClassName("product-name")[0].innerText;
  let price = parseFloat(
  btnClicked.
  getElementsByClassName("product-price")[0].
  innerText.replace("₹ ", ""));

  let imgSrc = btnClicked.getElementsByClassName("product-img")[0].src;
  SwitchBtns(btnClicked);
  let cartItem = {
    name,
    price,
    imgSrc,
    qty: 1 };

  CartItems(cartItem);
  cartDetails.push(cartItem);
  RenderCart();
  CartItemsTotal();
}

function removeItem(event) {
  let btnClicked = event.parentElement;
  let itemName = btnClicked.getElementsByClassName("name")[0].innerText;
  let productNames = document.getElementsByClassName("product-name");
  cartDetails.forEach((item, i) => {
    if (itemName == item.name) {
      cartDetails.splice(i, 1);
      for (let name of productNames) {
        if (itemName == name.innerText) {
          let found = name.parentElement.parentElement;
          SwitchBtns(found);
        }
      }
    }
  });
  RenderCart();
  CartIsEmpty();
  CartItemsTotal();
}

function clearCart() {
  ToggleBackBtns();
  cartDetails.length = 0;
  RenderCart();
  CartIsEmpty();
  CartItemsTotal();
}

function qtyChange(event, handler) {
  let btnClicked = event.parentElement.parentElement;
  let isPresent = btnClicked.classList.contains("btn-add");
  let itemName = isPresent ?
  btnClicked.parentElement.parentElement.getElementsByClassName(
  "product-name")[
  0].innerText :
  btnClicked.parentElement.getElementsByClassName("name")[0].innerText;
  let productNames = document.getElementsByClassName("product-name");
  for (let name of productNames) {
    if (itemName == name.innerText) {
      let productBtn = name.parentElement.parentElement.getElementsByClassName(
      "qty-change")[
      0];
      cartDetails.forEach((item, i) => {
        if (itemName == item.name) {
          if (handler == "add" && item.qty < 10) {
            item.qty += 1;
            btnClicked.innerHTML = QtyBtn(item.qty);
            productBtn.innerHTML = QtyBtn(item.qty);
          } else if (handler == "sub") {
            item.qty -= 1;
            btnClicked.innerHTML = QtyBtn(item.qty);
            productBtn.innerHTML = QtyBtn(item.qty);
            if (item.qty < 1) {
              cartDetails.splice(i, 1);
              productBtn.innerHTML = AddBtn();
              productBtn.classList.toggle("qty-change");
            }
          } else {
            document.getElementsByClassName("purchase-cover")[0].style.display =
            "block";
            document.getElementsByClassName("stock-limit")[0].style.display =
            "flex";
            sideNav(0);
          }
        }
      });
    }
  }
  RenderCart();
  CartIsEmpty();
  CartItemsTotal();
}

function limitPurchase(event) {
  document.getElementsByClassName("purchase-cover")[0].style.display = "none";
  event.parentElement.style.display = "none";
  sideNav(1);
}

function sideNav(handler) {
  let sideNav = document.getElementsByClassName("side-nav")[0];
  let cover = document.getElementsByClassName("cover")[0];
  sideNav.style.right = handler ? "0" : "-100%";
  cover.style.display = handler ? "block" : "none";
  CartIsEmpty();
}

function buy(handler) {
  if (cartDetails.length == 0) return;
  sideNav(!handler);
  document.getElementsByClassName("purchase-cover")[0].style.display = handler ?
  "block" :
  "none";
  document.getElementsByClassName("order-now")[0].innerHTML = handler ?
  Purchase() :
  "";
}

function order() {
  let invoice = document.getElementsByClassName("invoice")[0];
  invoice.style.height = "500px";
  invoice.style.width = "400px";
  invoice.innerHTML = OrderConfirm();
  ToggleBackBtns();
  Stocks();
  clearCart();
}

function okay(event) {
  let container = document.getElementsByClassName("invoice")[0];
  if (event.target.innerText == "continue") {
    container.style.display = "none";
    document.getElementsByClassName("purchase-cover")[0].style.display = "none";
  } else {
    event.target.innerText = "continue";
    event.target.parentElement.getElementsByClassName(
    "order-details")[
    0].innerHTML = `<em class='thanks'>Thanks for shopping with us</em>`;
    container.style.height = "180px";
  }
}
//}

// button components for better Ux {
function AddBtn() {
  return `
<div>
  <button onclick='addItem(this)' class='add-btn'>Add <i class='fas fa-chevron-right'></i></button>
</div>`;
}

function QtyBtn(qty = 1) {
  if (qty == 0) return AddBtn();
  return `
<div>
  <button class='btn-qty' onclick="qtyChange(this,'sub')"><i class='fas fa-chevron-left'></i></button>
  <p class='qty'>${qty}</p>
  <button class='btn-qty' onclick="qtyChange(this,'add')"><i class='fas fa-chevron-right'></i></button>
</div>`;
}
//}

//Ui components {
function Product(product = {}) {
  let { name, price, imageUrl, heading, des } = product;
  return `
<div class='card'>
  <div class='top-bar'>
  <i class="fas fa-leaf"></i>
    <em class="stocks">In Stock</em>
  </div>
  <div class='img-container'>
    <img class='product-img' src='${imageUrl}' alt='' />
    <div class='out-of-stock-cover'><span>Out Of Stock</span></div>
  </div>
  <div class='details'>
    <div class='name-fav'>
      <strong class='product-name'>${name}</strong>
      <button onclick='this.classList.toggle("fav")' class='heart'><i class='fas fa-heart'></i></button>
    </div>
    <div class='wrapper'>
      <h5>${heading}</h5>
      <p>${des}</p>
    </div>
    <div class='purchase'>
      <p class='product-price'>₹ ${price}</p>
      <span class='btn-add'>${AddBtn()}</span>
    </div>
  </div>
</div>`;
}

function CartItems(cartItem = {}) {
  let { name, price, imgSrc, qty } = cartItem;
  return `
<div class='cart-item'>
  <div class='cart-img'>
    <img src='${imgSrc}' alt='' />
  </div>
  <strong class='name'>${name}</strong>
  <span class='qty-change'>${QtyBtn(qty)}</span>
  <p class='price'>₹ ${price * qty}</p>
  <button onclick='removeItem(this)'><i class='fas fa-trash'></i></button>
</div>`;
}

function Banner() {
  return `
<div class='banner'>
  <h1 class="titlee">Shop Green Now And Flaunt Your Lack of Carbon Footprint!</h1>
  <ul class="box-area">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  </ul>
  <div class='main-cart'>${DisplayProducts()}</div>
  <div class='begin'>
    <strong>Reward Remaining: <span class='reward'>0</span></strong>
  </div>
  <div class='nav'>
  
    <button onclick='sideNav(1)'><i class='fas fa-shopping-cart' style='font-size:2rem;'></i></button>
    <span class= 'total-qty'>0</span>
  </div>
  <div onclick='sideNav(0)' class='cover'></div>
  <div class='cover purchase-cover'></div>
  <div class='cart'>${CartSideNav()}</div>
  <div class='stock-limit'>
    <em>You Can Only Buy 10 Items For Each Product</em>
    <button class='btn-ok' onclick='limitPurchase(this)'>Okay</button>
  </div>
<div  class='order-now'></div>
</div>`;
}

function CartSideNav() {
  return `
<div class='side-nav'>
  <button onclick='sideNav(0)'><i class='fas fa-times'></i></button>
  <h2>Cart</h2>
  <div class='cart-items'></div>
  <div class='final'>
   <strong>Discount: ₹ <span class='discount'>0</span>.00/-</strong>

    <strong>Total: ₹ <span class='total'>0</span>.00/-</strong>

    <div class='action'>
      <button onclick='buy(1)' class='btn buy'>Purchase <i class='fas fa-credit-card' style='color:#6665dd;'></i></button>
      <button onclick='clearCart()' class='btn clear'>Clear Cart <i class='fas fa-trash' style='color:#bb342f;'></i></button>
    </div>
  </div>
</div>`;
}

function Purchase() {
  let toPay = document.getElementsByClassName("total")[0].innerText;
  let itemNames = cartDetails.map(item => {
    return `<span>${item.qty} x ${item.name}</span>`;
  });
  let itemPrices = cartDetails.map(item => {
    return `<span>₹ ${item.price * item.qty}</span>`;
  });
  return `
<div class='invoice'>
  <div class='shipping-items'>
    <div class='item-names'>${itemNames.join("")}</div>
    <div class='items-price'>${itemPrices.join("+")}</div>
  </div>
<hr>
  <div class='payment'>
    <em>payment</em>
    <div>
      <p>total amount to be paid:</p><span class='pay'>₹ ${toPay}</span>
    </div>
  </div>
  <div class='order'>
    <button onclick='order()' class='btn-order btn'>Order Now</button>
    <button onclick='buy(0)' class='btn-cancel btn'>Cancel</button>
  </div>
</div>`;
}

function OrderConfirm() {
  let orderId = Math.round(Math.random() * 1000);
  let totalCost = document.getElementsByClassName("total")[0].innerText;
  return `
<div>
  <div class='order-details'>
    <em>your order has been placed</em>
    <p>Your order-id is : <span>${orderId}</span></p>
    <p>your order will be delivered to you in 3-5 working days</p>
    <p>you can pay <span>₹ ${totalCost}</span> by card or any online transaction method after the products have been delivered to you</p>
  </div>
  <button onclick='okay(event)' class='btn-ok'>okay</button>
</div>`;
}
//}

//updates Ui components {
function DisplayProducts() {
  let products = productDetails.map(product => {
    return Product(product);
  });
  return products.join("");
}

function DisplayCartItems() {
  let cartItems = cartDetails.map(cartItem => {
    return CartItems(cartItem);
  });
  return cartItems.join("");
}

function RenderCart() {
  document.getElementsByClassName(
  "cart-items")[
  0].innerHTML = DisplayCartItems();
}

function SwitchBtns(found) {
  let element = found.getElementsByClassName("btn-add")[0];
  element.classList.toggle("qty-change");
  let hasClass = element.classList.contains("qty-change");
  found.getElementsByClassName("btn-add")[0].innerHTML = hasClass ?
  QtyBtn() :
  AddBtn();
}

function ToggleBackBtns() {
  let btns = document.getElementsByClassName("btn-add");
  for (let btn of btns) {
    if (btn.classList.contains("qty-change")) {
      btn.classList.toggle("qty-change");
    }
    btn.innerHTML = AddBtn();
  }
}

function CartIsEmpty() {
  let emptyCart = `<span class='empty-cart'>Looks Like You Haven't Added Any Product In The Cart</span>`;
  if (cartDetails.length == 0) {
    document.getElementsByClassName("cart-items")[0].innerHTML = emptyCart;
  }
}

function CartItemsTotal() {
  let totalPrice = cartDetails.reduce((totalCost, item) => {
    return totalCost + item.price * item.qty;
  }, 0);
  let totalQty = cartDetails.reduce((total, item) => {
    return total + item.qty;
  }, 0);
  if(totalPrice>500){
    discount=rewards*20/100;
  }
  else{
    discount=rewards*10/100;
  }
  
  document.getElementsByClassName("total")[0].innerText = Math.max(totalPrice-discount,0);
  document.getElementsByClassName("total-qty")[0].innerText = totalQty;
  document.getElementsByClassName("discount")[0].innerText = discount;

}

function Stocks() {
  cartDetails.forEach(item => {
    productDetails.forEach(product => {
      if (item.name == product.name && product.qty >= 0) {
        product.qty -= item.qty;
        if (product.qty < 0) {
          product.qty += item.qty;
          document.getElementsByClassName("invoice")[0].style.height = "180px";
          document.getElementsByClassName(
          "order-details")[
          0].innerHTML = `<em class='thanks'>Stocks Limit Exceeded</em>`;
        } else if (product.qty == 0) {
          OutOfStock(product, 1);
        } else if (product.qty <= 5) {
          OutOfStock(product, 0);
        }
      }
    });
  });
}

function OutOfStock(product, handler) {
  let products = document.getElementsByClassName("card");
  for (let items of products) {
    let stocks = items.getElementsByClassName("stocks")[0];
    let name = items.getElementsByClassName("product-name")[0].innerText;
    if (product.name == name) {
      if (handler) {
        items.getElementsByClassName("out-of-stock-cover")[0].style.display =
        "flex";
        stocks.style.display = "none";
      } else {
        stocks.innerText = "Only Few Left";
        stocks.style.color = "orange";
      }
    }
  }
}
//*********************************************************************************************************************************************************************************************//
function calc_cf_basic(elec_units, petrol, diesel, LPG){
  //From CO2 emission factor database, version 06, CEA (Government of India), http://www.cea.nic.in/reports/planning/cdm_co2/cdm_co2.htm 
  const Emission_Factor_Electricity = 0.8;

  //Following Emission factors are taken from the file “Emission factors from across the sector -tool”,  
  //extracted from http://www.ghgprotocol.org/calculation-tools/alltools
  const Emission_Factor_Petrol = 2.296;
  const Emission_Factor_Deisel = 2.653;  
  const Emission_Factor_LPG = 2.983;
  
  var elec_cf = elec_units*Emission_Factor_Electricity;
  var petrol_cf = petrol*Emission_Factor_Petrol;
  var diesel_cf = diesel*Emission_Factor_Deisel;
  var LPG_cf = LPG*Emission_Factor_LPG;
  
  //Return carbon footprint in tonnes of CO2
  return (elec_cf + petrol_cf + diesel_cf + LPG_cf)/1000; 
}

function update_coins(Balance, elec_units, petrol, diesel, LPG, past_cf, streak){
  var cf_basic = calc_cf_basic(elec_units, petrol, diesel, LPG);
  var add_to_balance;
  if(cf_basic>past_cf){
      set_streak(0);
      add_to_balance=0;
  }
  else{
      set_streak(++streak);
      //Scaling factor is determined keeping user-convenience in mind (ensuring a practical coin balance)
      //Streak is also take into consideration
      var scaling_factor = 0.5*streak*100; 
      //Scale the difference in carbon footprint to update the number of coins
      add_to_balance= Math.round((past_cf-cf_basic)*scaling_factor);
  }

//database me past_cf update karna hai
  past_cf=cf_basic;
  console.log(past_cf);
//database me Balance update karna hai
  Balance+=add_to_balance;
  console.log(Balance);
  return Balance;
}

function set_streak(new_streak){
  //database me streak ko ye new streak set krde.
  console.log("new_streak "+new_streak);
  return new_streak;
}


/*Test:
var Balance=100;
var elec_units=1;
var petrol=1;
var diesel=1; 
var LPG=1;
var past_cf=0.10;
var streak=1;
console.log(update_coins(Balance, elec_units, petrol, diesel, LPG, past_cf, streak));
*/
//****************************************************************************************************************//
function App() {
  return `
<div>
  ${Banner()}
</div>`;
}
//}

// injects the rendered component's html
document.getElementById("app").innerHTML = App();