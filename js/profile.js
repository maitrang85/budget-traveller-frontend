'use strict';
const url = '10.114.32.115/app';

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