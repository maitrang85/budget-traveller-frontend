'use strict';

const url = 'http://localhost:3000';
const addForm = document.querySelector('#addPostForm');

/* Submit and post camping site form */
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  //const data = Object.fromEntries(fd);
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
  console.log(response);
  const json = await response.json();
  alert(json.message);
  location.href = 'main-page.html';
});

const priceSelect = document.querySelector('#price-select');
priceSelect.addEventListener("change", () => {
  if(priceSelect.selectedIndex === 0) {
    hidePrice();
  } else
    showPrice();
})

function showPrice() {
  const priceInput = document.querySelector("#price-input");
  priceInput.classList.add('showPriceInput');
}
function hidePrice() {
  const priceInput = document.querySelector("#price-input");
  priceInput.classList.remove('showPriceInput');
}

