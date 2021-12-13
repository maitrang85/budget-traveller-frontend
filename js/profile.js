'use strict';
const url = 'http://localhost:3000';

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

// SELECT EXISTING MODIFY USER FORM
const modUserForm = document.querySelector('#modUserForm');
// Submit modify user form
modUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modUserForm);
  //  Remove empty properties
  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }
  const response = await apiCall(
    '/user',
    JSON.stringify(data),
    'PUT',
    'application/json'
  );
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = 'main-page.html';
});

const getProfile = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const response = await apiCall('/user/' + user.user_id);
      if (response.ok) {
        const profile = await response.json();
        parsingProfile(profile);
        console.log('user', user);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
getProfile();

const parsingProfile = (profile) => {
  const inputs = modUserForm.querySelectorAll('input');
  console.log('profile data: ', profile);
  if (profile) {
    inputs[0].value = profile.username;
    inputs[1].value = profile.email;
  }
};
