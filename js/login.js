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
    // console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
        // save token
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        alert('Logged in successfully');
        location.href = 'main-page.html';
    }
});

// SUBMIT SIGNUP FORM
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
    location.href = 'main-page.html';
});

