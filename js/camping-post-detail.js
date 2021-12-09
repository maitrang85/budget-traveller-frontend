'use strict';
const url = 'http://localhost:3000';

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
const postId = getQParam('id');

console.log('postId here', postId);
/* MOCK DATA for testing
  const post = {
    title: 'My camping trip',
    photo:
      'https://oma.metropolia.fi/oma-extras/mp-logo-favicon-transparent.png',
    content: 'I like this place',
    address: 'Veistotie',
    regionId: 'Uusimaa',
    freeOrNot: 'free',
  };
*/

function createDetailPost(post) {
  console.log('post', post);
  if (post) {
    const container = document.querySelector('#detailed-post-container');
    container.innerHTML = '';

    const detailed_post = document.createElement('div');
    detailed_post.className = 'detailed-post';

    const post_img = document.createElement('div');
    post_img.className = 'post-img';

    const img = document.createElement('img');
    img.src = url + '/' + post.filename;

    const post_info = document.createElement('div');
    post_info.className = 'post-info';

    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('h1');
    title.className = 'title';
    title.innerHTML = `${post.title}`;

    const description = document.createElement('p');
    description.className = 'description';
    description.innerHTML = `${post.content}`;

    const region = document.createElement('p');
    region.className = 'region';
    region.innerHTML = `Region: ${post.region_id}`;

    const address = document.createElement('p');
    address.className = 'address';
    address.innerHTML = `Location: ${post.address}`;

    const author = document.createElement('p');
    author.className = 'author';
    author.innerHTML = `Author: ${post.username}`;

    const price = document.createElement('p');
    price.className = 'price';
    if (post.free_or_not === 'free') {
      price.innerHTML = `Free`;
    } else {
      price.innerHTML = `Price: ${post.price}`;
    }

    container.appendChild(detailed_post);
    detailed_post.appendChild(post_img);
    post_img.appendChild(img);
    detailed_post.appendChild(post_info);
    post_info.appendChild(content);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(region);
    content.appendChild(address);
    content.appendChild(price);
    content.appendChild(author);
    initMap(post);
  }
}

function _createDetailPost(post) {
  console.log('post', post);
  if (post) {
    const detail = document.querySelector('#detail');
    detail.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.innerHTML = post.title;

    const img = document.createElement('img');
    img.src = url + '/' + post.filename;
    img.alt = post.title;

    const figure = document.createElement('figure').appendChild(img);

    const p1 = document.createElement('p');
    p1.innerHTML = `Content: ${post.content}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Location: ${post.address}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Region: ${post.region_id}`;

    const p4 = document.createElement('p');
    p4.innerHTML = `${post.free_or_not}`;

    const p5 = document.createElement('p');
    p5.innerHTML = `Price: ${post.price}`;

    const p6 = document.createElement('p');
    p6.innerHTML = `Author: ${post.username}`;

    const modBtn = document.createElement('a');
    modBtn.innerHTML = 'Modify your post';
    modBtn.href = `modify-post.html?id=${post.post_id}`; // Will change this later

    const delBtn = document.createElement('#delBtn');
    delBtn.innerHTML = 'Delete your post';
    delBtn.addEventListener('click', async () => {
      try {
        const fetchOptions = {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          method: 'DELETE',
        };

        const response = await fetch(
          url + '/post/' + post.post_id,
          fetchOptions
        );
        const json = await response.json();
        console.log('delete response', json);
        alert('Your post was deleted successfully.');
        location.href = `main-page.html`;
      } catch (e) {
        console.log(e.message);
      }
    });

    detail.appendChild(h2);
    detail.appendChild(figure);
    detail.appendChild(p1);
    detail.appendChild(p2);
    detail.appendChild(p3);
    detail.appendChild(p4);
    detail.appendChild(p5);
    detail.appendChild(p6);
    detail.appendChild(modBtn);
    detail.appendChild(delBtn);
  }
}

const getPost = async (postId) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/' + postId, fetchOptions);
    const post = await response.json();
    console.log('post', post);
    createDetailPost(post);
  } catch (e) {
    console.log('************error', e);
    console.log(e.message);
  }
};

getPost(postId);

// COMMENT PART //

const createCommentCards = (comments) => {
  const commentsElement = document.querySelector('#comments');

  comments.forEach((comment) => {
    const contentComment = document.createElement('p');
    contentComment.innerHTML = comment.content;

    const authorComment = document.createElement('p');
    authorComment.innerHTML = `User: ${comment.user_id}`;
    commentsElement.appendChild(contentComment);
    commentsElement.appendChild(authorComment);
  });
};

const getComments = async (postId) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(
      url + '/post/' + postId + '/comment',
      fetchOptions
    );

    const comments = await response.json();
    console.log('comments', comments);
    createCommentCards(comments);
  } catch (e) {
    console.log(e.message);
  }
};
getComments(postId);

/* Will bring back when we have comment from
const addForm = document.querySelector('#addCommentForm');
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
  const response = await fetch(
    url + '/post/' + postId + '/comment',
    fetchOptions
  );
  console.log(response);
  const json = await response.json();
  alert(json.message);
  location.reload();
});
*/

function initMap(post) {
  if (post) {
    // The location of Uluru
    console.log('coor', post.coords);
    console.log('coor', post.coords[0], post.coords[1]);
    console.log('coor', post.coords[1]);
    // TODO parsing cooors here
    const uluru = { lat: 60.293611, lng: 24.555893 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
}
