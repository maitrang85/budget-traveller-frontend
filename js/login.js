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
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    return true;
  }
  return false;
};

/* FORM VALIDATION for SIGN UP*/
/* Validation for email */
const email = document.getElementById('email');

email.addEventListener('input', function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Please put a real email with an @ character');
  } else {
    email.setCustomValidity('');
  }
});

/* Validation for password */
const password = document.getElementById('password');
password.addEventListener('input', function (event) {
  if (password.validity.patternMismatch) {
    password.setCustomValidity(
      'Please put a password with at least a capital letter with minimum length of 8 characters!'
    );
  } else {
    password.setCustomValidity('');
  }
});
