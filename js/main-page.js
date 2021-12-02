'use strict';
const url = 'http://localhost:3000';
/*
    For testing purposes
    Hide/show buttons for different types of users
    E.g. logged in, not logged in
*/
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
profile.style.display = 'none'; // For logged in users:
logout.style.display = 'none'; // profile, logout -> display: inline-block
login.style.display = 'inline-block'; // login, signup -> display: none
signup.style.display = 'inline-block';

/*
    Script to create the cards for camping spots

*/
const cards = document.querySelector('#cards');
const createCards = (posts) => {
  cards.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    const card_item = document.createElement('div');
    card_item.className = 'cards_item filter1';

    const card = document.createElement('div');
    card.className = 'card';

    const card_image = document.createElement('div');
    card_image.className = 'card_image';

    const img = document.createElement('img');
    img.src = 'https://picsum.photos/500/300/?grayscale';

    const card_content = document.createElement('div');
    card_content.className = 'card_content';

    const h2 = document.createElement('h2');
    h2.className = 'card_title';
    h2.innerHTML = 'Title';

    const p = document.createElement('p');
    p.className = 'card_text';
    p.innerHTML = 'Description';

    const btn = document.createElement('button');
    btn.className = 'btn card_btn';
    btn.innerHTML = 'Read more';

    card_item.appendChild(card);
    card.appendChild(card_image);
    card_image.appendChild(img);
    card.appendChild(card_content);
    card_content.appendChild(h2);
    card_content.appendChild(p);
    card_content.appendChild(btn);
    cards.appendChild(card_item);
  }
};

const getPost = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post', fetchOptions);
    const posts = await response.json();
    //const spots = [1, 2, 3];
    createCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();

/*
    Placeholder script for filtering - copy paste from
    https://www.w3schools.com/howto/howto_js_portfolio_filter.asp
*/

filterSelection('all');
function filterSelection(selected) {
  let cards = document.getElementsByClassName('cards_item');
  if (selected === 'all') selected = '';
  // Add the "show" class to the filtered elements, and remove the "show" class from the elements that are not selected
  for (let i = 0; i < cards.length; i++) {
    removeClass(cards[i], 'show');
    if (cards[i].className.indexOf(selected) > -1) addClass(cards[i], 'show');
  }
}
// Show filtered elements
function addClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) === -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

// Hide elements that are not selected
function removeClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current button (highlighting it)
let buttonContainer = document.getElementById('filtering');
let buttons = buttonContainer.getElementsByClassName('btn');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    let current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}
// ------- Filtering end ------- //

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

// OPEN/CLOSE LOGIN + SIGN UP FORMS
function openLoginForm() {
  document.body.classList.add('showLoginForm');
}
function closeLoginForm() {
  document.body.classList.remove('showLoginForm');
}

function openSignupForm() {
  document.body.classList.add('showSignupForm');
}
function closeSignupForm() {
  document.body.classList.remove('showSignupForm');
}
