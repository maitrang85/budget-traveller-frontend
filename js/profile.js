'use strict';
const url = 'https://10.114.32.115/app';

// CHECK IF USER IS LOGGED IN, ELSE REDIRECT TO MAIN PAGE
if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) location.href = 'main-page.html'

const modUserForm = document.querySelector('#modUserForm');

// SUBMIT MODIFY USER FORM
modUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const response = await updateUserProfile(modUserForm);
    const json = await response.json();
    if (json.error) {
        alert(json.error.message);
    } else {
        alert("Profile was updated.");
    }
    location.href = 'main-page.html';
});

// ADD EXISTING DATA TO THE FORM
const parsingProfile = async () => {
    try {
        const response = await getUserProfile();
        if (response.ok) {
            const profile = await response.json();
            const inputs = modUserForm.querySelectorAll('input');
            inputs[0].value = profile.username;
            inputs[1].value = profile.email;
        }
    } catch (e) {
        console.log(e.message);
    }
};
parsingProfile();
