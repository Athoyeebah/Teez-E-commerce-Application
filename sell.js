




window.onload = () => {

  const addProductForm = document.getElementById('add-product-form');
  let products = [];


addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productPrice = document.getElementById('product-price').value;
  const productImageUrl = document.getElementById('product-image').value;
  const product = {
    id: Date.now(),
    name: productName,
    description: productDescription,
    price: productPrice,
    imageUrl: productImageUrl
  };
  
  const savedProducts = localStorage.getItem('products');
    

   if (savedProducts) {
     products = JSON.parse(savedProducts);
    }

    products.push(product);
    
   localStorage.setItem('products', JSON.stringify(products));
  
  window.location.href = 'buy.html';
  renderProductList();
});
};