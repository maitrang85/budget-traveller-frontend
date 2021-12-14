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
  const response = await updateUserProfile(modUserForm);
  const json = await response.json();
  if (json.error) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = 'main-page.html';
});

const parsingProfile = async () => {
  try {
    const response = await getUserProfile();
    if (response.ok) {
      const profile = await response.json();
      const inputs = modUserForm.querySelectorAll('input');
      inputs[0].value = profile.username;
      inputs[1].value = profile.email;
      console.log('user', user);
    }
  } catch (e) {
    console.log(e.message);
  }
};
parsingProfile();
