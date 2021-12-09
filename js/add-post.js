'use strict';
const url = '10.114.32.115/app';

const addForm = document.querySelector('#addPostForm');
console.log('addForm', addPostForm);
/* Submit and post camping site form */
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  //const data = Object.fromEntries(fd);
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    alert('You need to log in before posting!');
    openLoginForm();
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      //'Content-Type': 'application/json',
    },
    body: fd,
    //body: JSON.stringify(data),
  };
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = `camping-post-detail.html?id=${json.post_id}`;
});

const priceSelect = document.querySelector('#price-select');
priceSelect.addEventListener('change', () => {
  if (priceSelect.selectedIndex === 0) {
    hidePrice();
  } else showPrice();
});

function showPrice() {
  const priceInput = document.querySelector('#price-input');
  priceInput.classList.add('showPriceInput');
}
function hidePrice() {
  const priceInput = document.querySelector('#price-input');
  priceInput.classList.remove('showPriceInput');
}
