let subtotal = 0;
let cart = [];


const calculateTax = subtotal => {
  const tax = subtotal * 0.13;
  const formattedTax = tax.toFixed(2);
  return formattedTax;
};

const calculateTotal = subtotal => {
  const tax = calculateTax(subtotal);
  const total = parseFloat(subtotal) + parseFloat(tax);
  const formattedTotal = total.toFixed(2);
  return formattedTotal;
};



$(document).on('click', '.add-button', function () {
  const title = $(this).data('title');
  const price = $(this).data('price');
  const id = $(this).data('id');
  const imgLink = "../vendor/argon/img/meal.png"

  

  cart.push(id);
  alert(JSON.stringify(cart))

  const element = `
  <li class="cart-item" data-id="${id}">
      <img src="${imgLink}" alt="${title}">
      <div class="cart-item-dets">
        <p class="cart-item-heading">${title}</p>
        <p class="g-price">€${price}</p>
      </div>
      <button class="remove-button"></button>
    </li>
  `;
  $('.cart-items').append(element);

  subtotal = subtotal + price;

  const formattedSubtotal = subtotal.toFixed(2);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  $('.cart-math').html(`
    <p class="cart-math-item">
      <span class="cart-math-header">Subtotal:</span>
      <span class="g-price subtotal">€${formattedSubtotal}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Tax:</span>
      <span class="g-price tax">€${tax}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Total:</span>
      <span class="g-price total">€${total}</span>
    </p>
  `);
});


//RIMUOVE ITEM DAL CARRELLO
$(document).on('click', '.remove-button', function () {
    const price = $(this).siblings('.cart-item-dets').find('.g-price').text().replace(/[^0-9.-]+/g,"");
    subtotal = subtotal - price;
  
    const id = $(this).closest('li').data('id');
    const index = cart.indexOf(id);
    const title = $(this).siblings('.cart-item-dets').find('.cart-item-heading').text();
    cart.splice(index, 1);
  
    $(this).closest('li').remove();
  
    const formattedSubtotal = subtotal.toFixed(2);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal);
  

$('.cart-math').html(`
  <p class="cart-math-item">
    <span class="cart-math-header">Subtotal:</span>
    <span class="g-price subtotal">€${formattedSubtotal}</span>
  </p>
  <p class="cart-math-item">
    <span class="cart-math-header">Tax:</span>
    <span class="g-price tax">€${tax}</span>
  </p>
  <p class="cart-math-item">
    <span class="cart-math-header">Total:</span>
    <span class="g-price total">€${total}</span>
  </p>
`);

alert(`'${title}' (ID: ${id}) removed from cart.`);
})


