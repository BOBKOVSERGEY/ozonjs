// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // checkbox
  const checkbox = () => {
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
  const cart = () => {
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
  const sortFilter = () => {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.getElementById('discount-checkbox');



    // filter price
    const min = document.getElementById('min');
    const max = document.getElementById('max');

    /*const filterPrice = () => {
      cards.forEach((elem) => {
        const elemPrice = elem.querySelector('.card-price');
        const price = parseFloat(elemPrice.textContent);
        console.log(price);

        if ((min.value && price < min.value) || (max.value && price > max.value)) {
          elem.parentNode.style.display = 'none';
        } else {
          elem.parentNode.style.display = '';
        }

      });

    };*/



    discountCheckbox.addEventListener('change', filter);

    min.addEventListener('change', filter);
    max.addEventListener('change', filter);


    // end filter price


    // search
    const search = document.querySelector('.search-wrapper_input'),
          searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
      // flag i игнор регистр
      const searchText = new RegExp(search.value.trim(), 'i');

      cards.forEach((item) => {
        const title = item.querySelector('.card-title');
        if (!searchText.test(title.textContent.trim())) {
          item.parentNode.style.display = 'none';
        } else {
          item.parentNode.style.display = '';
        }
      });
    });
    // end search

  };

  const filter = () => {
    const cards = document.querySelectorAll('.goods .card'),
      discountCheckbox = document.getElementById('discount-checkbox');
    // filter price
    const min = document.getElementById('min');
    const max = document.getElementById('max');

    const activeLi = document.querySelector('.catalog-list li.active');

    cards.forEach((item) => {
      const elemPrice = item.querySelector('.card-price');
      const price = parseFloat(elemPrice.textContent);
      const discount = item.querySelector('.card-sale');

      if ((min.value && price < min.value) || (max.value && price > max.value)) {
        item.parentNode.style.display = 'none';
      } else if (discountCheckbox.checked && !discount) {
        item.parentNode.style.display = 'none';
      } else if (activeLi) {
        if (item.dataset.category !== activeLi.textContent) {
          item.parentNode.style.display = 'none';
        } else {
          item.parentNode.style.display = '';
        }
      } else {
        item.parentNode.style.display = '';
      }

    });
  };
  // end filter sales


  // get data
  const getData = () => {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Данные не получены ошибка: ' + response.status);
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        //console.log(err);
        console.warn(err);
        goodsWrapper.innerHTML = '<h1>Что то пошло не так!</h1>';
      });
    // pending - ожидание
    // resolved - решено
    // rejected - отвергнуто

    //console.log(fetch('../db/db.json'));
  };


  // end get data

  // render products
  // выводим карточки товара
  const renderCards = (data) => {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach( item => {
      console.log(item);
      const card = document.createElement('div');
      card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
      card.innerHTML = `
          <div class="card" data-category="${item.category}">
          ${item.sale = item.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
              <span class="card-img-top"
                style="background-image: url('${item.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
              <div class="card-price" style="${item.sale ? 'color:red' : ''}">${item.price} ₽</div>
              <h5 class="card-title">${item.title}</h5>
              <button class="btn btn-primary">В корзину</button>
            </div>
          </div>
      `;
      goodsWrapper.appendChild(card);

    })
  };


  // end render products

  const renderCatalog = () => {
    const cards = document.querySelectorAll('.goods .card');

    // создаем коолекцию
    const categories = new Set();

    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');

    const catalogBtn = document.querySelector('.catalog-button');
    catalogBtn.addEventListener('click', (event) => {
      console.log(event);
      if (catalogWrapper.style.display) {
        catalogWrapper.style.display = '';
      } else {
        catalogWrapper.style.display = 'block';
      }

      if (event.target.tagName === 'LI') {
        cards.forEach((item) => {
          if (item.dataset.category === event.target.textContent) {
            item.parentNode.style.display = ''
          } else {
            item.parentNode.style.display = 'none'
          }
        });
        allLi.forEach(item => {
          if (item === event.target) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        filter();
      }

    });

    cards.forEach((item) => {
      categories.add(item.dataset.category);
    });

   categories.forEach((item)  => {
     catalogList.insertAdjacentHTML('beforeend', `<li>${item}</li>`)
    });

   const allLi = catalogList.querySelectorAll('li');

  };

  getData().then( (data) => {
    renderCards(data);
    renderCatalog();
    sortFilter();
    checkbox();
    cart();

  });

});