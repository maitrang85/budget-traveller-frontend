'use strict';
const url = 'https://10.114.32.115/app';

const addForm = document.querySelector('#addPostForm');

// FORM TO CREATE AND SUBMIT A CAMPING SITE
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);

  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    alert('You need to log in before posting!');
    openLoginForm();
  }

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();

  if(!response.ok) {
    alert(json.message);
    return;
  }

  alert("Your post was created.");
  location.href = `camping-post-detail.html?id=${json.post_id}`;
});

