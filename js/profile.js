'use strict';
const url = 'http://localhost:3000';

const profile = document.getElementById('profile');
const logout = document.getElementById('logout');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
profile.style.display = 'none'; // For logged in users:
logout.style.display = 'none'; // profile, logout -> display: inline-block
login.style.display = 'inline-block'; // login, signup -> display: none
signup.style.display = 'inline-block';

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