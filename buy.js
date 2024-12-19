let cart = [];
let products = [];
let  hardcodedProducts = [
  {
    id: 1,
    name: 'Athletic Sock',
    price: 10.99,
    description: 'Durable socks made from lush fabric',
    imageUrl: 'athletic-cotton-socks-6-pairs.jpg'
    },
  {
    id: 2,
    name: 'Backpack',
    price: 9.99,
    description: 'Made from durable material',
    imageUrl:'backpack.jpg'
  },
  {
    id: 3,
    name: 'headset',
    price: 40.20,
    description: 'crystal-clear audio, and comfortable design',
    imageUrl:'headset.jpg'
  },
  {
    id: 4,
    name: 'Laptop',
    price: 50.9,
    description: 'Affordable Audio Excellence! Reliable sound quality, comfortable design, and budget-friendly',
    imageUrl:'laptop.jpg'
  },
  {
    id: 5,
    name: 'gamepad',
    price: 50.9,
    description: 'Elevate Your Gaming Experience! Advanced controls, customizable buttons, and durable construction',
    imageUrl:'gamePad.jpg'
  }
];


function renderProductList() {
  const productsGridElement = document.querySelector('.products-grid');
  const storedProducts = localStorage.getItem('products');
  
  
   products = hardcodedProducts;

  if (storedProducts) {
    const addedProducts = JSON.parse(storedProducts);
    products = products.concat(addedProducts);
  }
  
  const excludedProductNames = ['Wristwatch', 'Mouse', 'Bed', 'Throw pillow bed', 'Woman']; 
  const productListHtml = products.filter((product) => !excludedProductNames.includes(product.name)).map((product) => {
    return `
  <div class="product-container">
 <div class="product-image-container">
  <img class="product-image" src="${product.imageUrl}">
        </div>
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
        <div class="product-description">
          ${product.description}
        </div>
        <div class="product-price">
          ETH ${product.price}
        </div>
        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
          Add to Cart
        </button>
        <br>
        <button class="buy-button button-primary js-buy-button" data-product-id="${product.id}">
          Buy Now
        </button>
      </div>
    `;
  }).join('');
  
  productsGridElement.innerHTML = productListHtml;
  
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      const quantity = event.target.parentNode.querySelector('select').value;
      addToCart(productId, quantity);
      updateCartQuantity();
    });
  });
  
  document.querySelectorAll('.js-buy-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      const quantity = event.target.parentNode.querySelector('select').value;
      buyNow(productId, quantity);
    });
  });
}




function addToCart(productId, quantity) {
 const product = products.find((product) => product.id == productId);
 const existingProduct = cart.find((productInCart) => product.id == productId);
  
 if (existingProduct) {
   existingProduct.quantity += parseInt(quantity);
  } else {
    cart.push({ id: productId, quantity: parseInt(quantity), product: product });
 }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

function buyNow(productId, quantity) {
  addToCart(productId, quantity);
  updateCartQuantity();
  alert('Order successfully placed!');
}

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  const cartQuantityElement = document.querySelector('.cart-quantity');
  
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

renderProductList();

