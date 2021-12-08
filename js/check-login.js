'use strict';

const profile_btn = document.getElementById('profile');
const profile_btn_a = document.getElementById('profile-btn');
const logout_btn = document.getElementById('logout');
const login_btn = document.getElementById('login');
const signup_btn = document.getElementById('signup');

// SHOW / HIDE LOGIN/SIGNUP/PROFILE/LOGOUT
const log_in_status = (status) => {
    if(status) {
        profile_btn.style.display = 'inline-block';
        logout_btn.style.display = 'inline-block';
        login_btn.style.display = 'none';
        signup_btn.style.display = 'none';
    }
    else {
        profile_btn.style.display = 'none';
        logout_btn.style.display = 'none';
        login_btn.style.display = 'inline-block';
        signup_btn.style.display = 'inline-block';
    }
}

// CHECK LOGIN
let logged_in = false;
const checkLogin = async () => {
    'use strict';
    const url = 'http://localhost:3000'; // change url when uploading to server

    // check sessionStorage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        // location.href = 'login.html';
        // console.log('check sessionStorage: ', sessionStorage.getItem('token'))
        logged_in = false;
        log_in_status(logged_in);
        // console.log('logged in: ', logged_in)
        return;
    }
    // check if token valid
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        // console.log(sessionStorage.getItem('token'))
        const response = await fetch(url + '/user/token', fetchOptions);
        // console.log(response);
        if (!response.ok) {
            // console.log('response not ok, logging out');
            await logout();
            location.href = 'main-page.html';
        } else {
            logged_in = true;
            log_in_status(logged_in);
            // console.log('logged in: ', logged_in)
            const json = await response.json();
            profile_btn_a.innerHTML = `<i class="fa fa-user-circle"></i>  ${json.user.username}`
            console.log(json.user);
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        console.log(e.message);
    }

};
checkLogin();