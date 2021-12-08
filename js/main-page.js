'use strict';
const url = 'http://localhost:3000';

const profile_btn = document.getElementById('profile');
const logout_btn = document.getElementById('logout');
const login_btn = document.getElementById('login');
const signup_btn = document.getElementById('signup');


// CHECK LOGIN
let logged_in = false;
const checkLogin = async () => {
  'use strict';
  const url = 'http://localhost:3000'; // change url when uploading to server

  // check sessionStorage
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    // location.href = 'login.html';
    console.log('check sessionStorage: ', sessionStorage.getItem('token'))
    logged_in = false;
    return;
  }
  // check if token valid
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    console.log(response);
    if (!response.ok) {
      console.log('response not ok, logging out');
      await logout();
      location.href = 'main-page.html';
    } else {
      logged_in = true;
      const json = await response.json();
      sessionStorage.setItem('user', JSON.stringify(json.user));
    }
  } catch (e) {
    console.log(e.message);
  }
};
checkLogin();

// LOGOUT
/*
const logout = async () => {
  try {
    // const response = await fetch(url + '/auth/logout');
    // const json = await response.json();
    // console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    alert('You have logged out');
    location.href = 'main-page.html';
  } catch (e) {
    console.log(e.message);
  }
};
*/
if(logged_in) {
  profile_btn.style.display = 'inline-block'; // For logged in users:
  logout_btn.style.display = 'inline-block'; // profile, logout -> display: inline-block
  login_btn.style.display = 'none'; // login, signup -> display: none
  signup_btn.style.display = 'none';
} else {
  profile_btn.style.display = 'none'; // For logged in users:
  logout_btn.style.display = 'none'; // profile, logout -> display: inline-block
  login_btn.style.display = 'inline-block'; // login, signup -> display: none
  signup_btn.style.display = 'inline-block';
}

/*
    Script to create the cards for camping spots
*/
const cards = document.querySelector('#grid');
const createCards = (posts) => {
  console.log(posts);
  renderCards(posts);

  const free = document.querySelector("#free_btn");
  const paid = document.querySelector("#paid_btn");
  const most_recent = document.querySelector("#most_recent_btn");
  const show_all = document.querySelector("#show_all_btn");
  const region = document.querySelector("#region_select");

  free.addEventListener('click', () => {
    const posts_free = posts.filter((post) => {
      return post.free_or_not === "free"
    });
    renderCards(posts_free);
  });

  paid.addEventListener('click', () => {
    const posts_paid = posts.filter((post) => {
      return post.free_or_not === "paid"
    });
    renderCards(posts_paid);
  })

  most_recent.addEventListener('click', () => {
    const posts_most_recent = posts.filter((post) => {

    });
    renderCards(posts_most_recent);
  })

  show_all.addEventListener('click', () => {
    renderCards(posts);
  })

  region.addEventListener('change', () => {
    const posts_region = posts.filter((post) => {
      return post.region_id === region.value
    });
    renderCards(posts_region);
  })


};
function renderCards(posts) {
  cards.innerHTML = '';
  posts.forEach((post) => {
    const card_item = document.createElement('div');
    card_item.className = `grid_item`

    const card = document.createElement('div');
    card.className = 'card';

    const thumbnail = document.createElement('div');
    thumbnail.className = 'card-thumbnail';

    const img = document.createElement('img');
    img.className = 'card_img';
    img.src = 'https://picsum.photos/1000/500';

    const info = document.createElement('div');
    info.className = 'card_info';

    const s1 = document.createElement('span');
    const s2 = document.createElement('span');
    s1.innerHTML += `<i class='fa fa-thumbs-up'></i> 47`;
    s2.innerHTML += `<i class='fa fa-thumbs-down'></i> 3`;

    const card_content = document.createElement('div');
    card_content.className = 'card_content';

    const h1 = document.createElement('h1');
    h1.className = 'card_header';
    h1.innerHTML = post.title;

    const p = document.createElement('p');
    p.className = 'card_text';
    p.innerHTML = post.content;

    const btn = document.createElement('button');
    btn.className = 'card_btn';
    btn.innerHTML = 'Read more';
    console.log('post_id', post.post_id);
    btn.addEventListener('click', () => {
      location.href = `camping-post-detail.html#${post.post_id}`;
    });

    const span = document.createElement('span');
    span.innerHTML = '→'

    card_item.appendChild(card);
    card.appendChild(thumbnail);
    thumbnail.appendChild(img);
    thumbnail.appendChild(info);
    info.appendChild(s1);
    info.appendChild(s2);
    card.appendChild(card_content);
    card_content.appendChild(h1);
    card_content.appendChild(p);
    card_content.appendChild(btn);
    btn.appendChild(span);
    cards.appendChild(card_item);
  })
}

// GET POST
const getPost = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post', fetchOptions);
    const posts = await response.json();
    createCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();

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

// NAVIGATION MENU
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
const navLink = document.querySelectorAll('.nav-link');
navLink.forEach((n) => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }));

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

const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');


// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const login = new FormData(loginForm);
  const data = Object.fromEntries(login);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    alert(json.message);
    location.href = 'main-page.html';
  }
});

// submit register form
signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const signup = new FormData(signupForm);
  const data = Object.fromEntries(signup);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/user', fetchOptions);
  const json = await response.json();
  alert(json.message);
});

