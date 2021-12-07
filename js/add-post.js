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

/* ----- */

const login = document.getElementById('login');
const signup = document.getElementById('signup');
login.style.display = 'none';
signup.style.display = 'none';

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

/* ----- */


// NAVIGATION MENU
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((n) =>
    n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    })
);
