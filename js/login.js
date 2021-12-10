'use strict';

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

// SUBMIT LOGIN FORM
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  const loginSuccess = await login(data);
  if (loginSuccess) {
    location.href = 'main-page.html';
  }
});

// SUBMIT SIGNUP FORM
signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = Object.fromEntries(new FormData(signupForm));
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  if (json && json.user_id) {
    const loginSuccess = await login(data);
    if (loginSuccess) {
      location.href = 'main-page.html';
    }
  }
  alert(json.message);
  location.href = 'main-page.html';
});

const login = async (jsonData) => {
  if (jsonData.email) jsonData.username = jsonData.email;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  };
  const loginResponse = await fetch(url + '/auth/login', fetchOptions);
  const json = await loginResponse.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    console.log('successful here');
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    alert('Logged in successfully');
    return true;
  }
  return false;
};
