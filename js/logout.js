'use strict';

// LOGOUT
logout_btn.addEventListener('click', () => {
    logout();
});
const logout = async () => {
    try {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        location.href = 'main-page.html';
    } catch (e) {
        console.log(e.message);
    }
};