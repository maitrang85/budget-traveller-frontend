'use strict';

const url = 'http://localhost:3000';
const addForm = document.querySelector('#addPostForm');

/* Submit and post camping site form */
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const data = Object.fromEntries(fd);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/post', fetchOptions);
  console.log(response);
  const json = await response.json();
  alert(json.message);
  location.href = 'main-page.html';
});
