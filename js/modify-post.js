'use strict';
const url = 'http://localhost:3000';

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const postId = window.location.hash.substr(1);

const modForm = document.querySelector('#modPostForm');

// Add existing camping post data to form
const getPost = async (postId) => {
  const response = await fetch(url + '/post/' + postId);
  const posts = await response.json();
  const post = posts[0];
  const inputs = modForm.querySelectorAll('input');
  console.log('post data here: ', post);
  inputs[0].value = post.title;
  inputs[1].value = post.address;
  inputs[2].value = post.content;
  inputs[3].value = post.regionId;
  inputs[4].value = post.freeOrNot;
  inputs[5].value = post.price;
  inputs[6].value = post.userId;
  inputs[7].value = post.filename;
  inputs[8].value = post.postId;
};

getPost(postId);
// Submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  //const data = serializeJson(modForm);
  const data = new FormData(modForm);
  /*const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };*/

  const fetchOptions = {
    method: 'PUT',
    body: data,
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'camping-post-detail.html'; //change later when we have created profile page
});
