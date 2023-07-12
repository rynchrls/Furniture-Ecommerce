//cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}

// close cart

closeCart.onclick = () => {
    cart.classList.remove('active')
}



//cart working js
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
//making function
function ready () {

    //remove item
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartRemove = cartContent.getElementsByClassName('cart-remove')
    for (let i = 0; i < cartRemove.length; i++) {
        var remove = cartRemove[i];
        remove.addEventListener('click', removeItem)
    }

    //add to cart
    let addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        var addtoCart = addCart[i]
        addtoCart.addEventListener('click', addcartClicked)
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
    }
    //buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}
// buy button
function buyButtonClicked() {
    alert("Your order is placed")
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// remove from )the cart
function removeItem(event) {
    var itemRemove = event.target;
    itemRemove.parentElement.remove();

    updateTotal();
}

//quantity changes
function quantityChanged(event) {
    var input = event.target
    if (input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}



// add to cart
function addcartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var imgsrc = shopProducts.getElementsByClassName('product-img')[0].src;
    addproductcart(title,price,imgsrc)
    updateTotal(); 
}

// add to cart
function addproductcart(title, price, imgsrc) {
    var cartbox = document.createElement('div')
    cartbox.classList.add('cart-box');
    var cartcontent = document.getElementsByClassName('cart-content')[0];
    var productTitle = cartcontent.getElementsByClassName('cart-product-title')
    for (let i = 0; i < productTitle.length; i++) {
        if (productTitle[i].innerHTML == title) {
            alert('You have already add this to your cart')
            return;
        }
    }

    var cartshopbox = `
    <img src="${imgsrc}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash cart-remove'></i>`
    cartbox.innerHTML = cartshopbox;
    cartcontent.append(cartbox)
    cartbox.querySelectorAll('.cart-remove')[0]
    .addEventListener('click', removeItem)
    cartbox.querySelectorAll('.cart-quantity')[0]
    .addEventListener('change', quantityChanged)
}



//update total
function updateTotal() {
    var cartconts = document.getElementsByClassName('cart-content')[0]
    var cartboxes = cartconts.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartboxes.length; i++) {
    var boxes = cartboxes[i];
    var priceElement = boxes.getElementsByClassName('cart-price')[0]
    var quantityElement = boxes.getElementsByClassName('cart-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value;
    total = total + (price * quantity); 
    }
    //if price have cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
