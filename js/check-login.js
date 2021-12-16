'use strict';

// GET HEADER BUTTON ELEMENTS FOR PROFILE/SIGNUP/LOGIN
const profile_btn = document.getElementById('profile');
const profile_btn_a = document.getElementById('profile-btn');
const logout_btn = document.getElementById('logout');
const login_btn = document.getElementById('login');
const signup_btn = document.getElementById('signup');

// SHOW / HIDE LOGIN/SIGNUP/PROFILE/LOGOUT DEPENDING ON LOGIN STATUS
const log_in_status = (status) => {
  if (status) {
    profile_btn.style.display = 'inline-block';
    logout_btn.style.display = 'inline-block';
    login_btn.style.display = 'none';
    signup_btn.style.display = 'none';
  } else {
    profile_btn.style.display = 'none';
    logout_btn.style.display = 'none';
    login_btn.style.display = 'inline-block';
    signup_btn.style.display = 'inline-block';
  }
};

// CHECK LOGIN
let logged_in = false;
let checkLoginUserId;
const checkLogin = async () => {
  const url = 'https://10.114.32.115/app';

  // CHECK SESSION STORAGE
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    logged_in = false;
    log_in_status(logged_in);
    return;
  }
  // CHECK IF THE TOKEN IS VALID
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/token', fetchOptions);
    if (!response.ok) {
      await logout();
      location.href = 'main-page.html';
    } else {
      logged_in = true;
      log_in_status(logged_in);
      const json = await response.json();
      checkLoginUserId = json.user.user_id;
      sessionStorage.setItem('user', JSON.stringify(json.user));

      const profileResponse = await getUserProfile();
      const profile = await profileResponse.json();
      profile_btn_a.innerHTML = `<i class="fa fa-user-circle"></i>  ${profile.username}`;
      profile_btn_a.href = 'user-profile.html';
    }
  } catch (e) {
    console.log(e.message);
  }
};

checkLogin();
