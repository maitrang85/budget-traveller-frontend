'use strict';
const url = '10.114.32.115:3000';

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const postId = getQParam('id');

console.log('postId', postId);

const modForm = document.querySelector('#modPostForm');

// Add existing camping post data to form
const getPost = async (postId) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/post/' + postId);
  const post = await response.json();
  const inputs = modForm.querySelectorAll('input');
  console.log('post data here: ', post);
  if (post) {
    inputs[0].value = post.title;
    inputs[1].value = post.address;
    inputs[2].value = post.content;
    inputs[3].value = post.price;
    inputs[4].filename = post.filename;
    document.querySelector('#region-select').value = post.region_id;
    document.querySelector('#price-select').value = post.free_or_not;
    document.querySelector('#region-select').value = post.region_id;
    console.log('price', post.price);
    console.group('inputs', inputs);
  }
};

getPost(postId);
// Submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = new FormData(modForm);
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    method: 'PUT',
    body: data,
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/post/' + postId, fetchOptions);
  const json = await response.json();
  alert(json.message);
  console.log('result edit post', json);

  // location.href = 'camping-post-detail.html'; //change later when we have created profile page
});
