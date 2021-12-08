'use strict';

// LOGOUT
logout_btn.addEventListener('click', () => {
    logout();
});
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