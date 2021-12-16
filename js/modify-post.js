'use strict';
const url = 'http://10.114.32.115/app';

const postId = getQParam('id');
const modForm = document.querySelector('#modPostForm');

// ADD EXISTING DATA TO THE FORM
const parsingPost = async (postId) => {
  const response = await getPost(postId);
  const post = await response.json();
  const inputs = modForm.querySelectorAll('input');
  if (post) {
    inputs[0].value = post.title;
    inputs[1].value = post.address;
    inputs[2].value = post.content;
    inputs[3].value = post.price;
    inputs[4].filename = post.filename;
    document.querySelector('#region-select').value = post.region_id;
    document.querySelector('#price-select').value = post.free_or_not;
    document.querySelector('#region-select').value = post.region_id;
  }
};
parsingPost(postId);

// SUBMIT MODIFY POST FORM
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
    const response = await updatePost(modForm, postId);
    const json = await response.json();
    if (response && response.ok) {
      alert('Your post was updated.');
      location.href = `camping-post-detail.html?id=${postId}`;
      return;
    }
    alert(json.message);
  } catch (error) {
    console.log('error', error);
  }
});
