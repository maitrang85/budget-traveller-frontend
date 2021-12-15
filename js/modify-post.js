'use strict';
const url = 'http://localhost:3000';

const postId = getQParam('id');

const modForm = document.querySelector('#modPostForm');

// Add existing camping post data to form
const parsingPost = async (postId) => {
  const response = await getPost(postId);
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
    console.group('inputs', inputs);
  }
};
parsingPost(postId);

// Submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
    const response = await updatePost(modForm, postId);
    if (response && response.ok) {
      const json = await response.json();
      alert('You have updated successfully your post!');
      location.href = `camping-post-detail.html?id=${postId}`;
    }
  } catch (error) {
    console.log('error', error);
  }
});
