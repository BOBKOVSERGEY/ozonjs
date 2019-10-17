// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // checkbox
  {
    const checkboxes  = document.querySelectorAll('.filter-check_checkbox');
    checkboxes.forEach((elem) => {
      elem.addEventListener('change', () => {
        if (elem.checked) {
          elem.nextElementSibling.classList.add('checked');
        } else {
          elem.nextElementSibling.classList.remove('checked');
        }
      });
    });
   /* checkbox.addEventListener('change', () => {
      // see all methods and properties
      console.dir(checkbox);
      if (checkbox.checked) {
        checkbox.classList.add('active');
        // take next neighbour
        checkbox.nextElementSibling.classList.add('checked');
      } else {
        checkbox.nextElementSibling.classList.remove('checked');
      }

    });*/
  }
  // end checkbox

  // cart
  {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtnModal = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
      modalCart.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    closeBtnModal.addEventListener('click', () => {
      modalCart.style.display = '';
      document.body.style.overflow = 'visible';
    });

    // add to cart
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty');

    cards.forEach((item) => {
      const btnAddToCart = item.querySelector('button');
      btnAddToCart.addEventListener('click', () => {
        // клонирум div с вложенными элементами
        const cardClone = item.cloneNode(true);



        cartWrapper.appendChild(cardClone);

        showData();

        const removeBtn = cardClone.querySelector('.btn');
        removeBtn.textContent = 'Удалить из корзины';

        removeBtn.addEventListener('click', () => {
          cardClone.remove();
          showData();
        });
      });
    });
    // end add to cart


    const showData = () => {
      const itemsInCart = cartWrapper.querySelectorAll('.card'),
            counterCart = document.querySelector('.counter'),
            cardPrice = cartWrapper.querySelectorAll('.card-price'),
            cartTotal = document.querySelector('.cart-total span');

      let sum = 0;

      cardPrice.forEach((elem) => {
        let price = parseFloat(elem.textContent);
        sum += price;
      });

      cartTotal.textContent = sum;

      counterCart.textContent = itemsInCart.length;

      if (itemsInCart.length !== 0) {
        // удаляем элемент из dom дерева
        cartEmpty.remove();
      } else {
        cartWrapper.appendChild(cartEmpty);
      }


    };

  }
  // end cart

  // filter sales
  {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.getElementById('discount-checkbox');

    discountCheckbox.addEventListener('change', () => {
      cards.forEach((item) => {
        if (discountCheckbox.checked) {

          console.log(new Boolean(item.querySelector('.card-sale')));

          if (item.querySelector('.card-sale')) {

          }
        } else {

        }
      })
    });

  }
  // end filter sales

});