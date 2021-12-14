'use strict';
const url = 'http://localhost:3000';

// GET QUERY PARAMETER
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
const postId = getQParam('id');

// CREATE A DETAILED VIEW OF POST
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
    if (post.free_or_not === 'free') {
      region.innerHTML = `${post.region_id} | ${post.address} | Free `;
    } else {
      region.innerHTML = `${post.region_id} | ${post.address} | Paid | ${post.price}`;
    }

    const author = document.createElement('p');
    author.className = 'author';
    author.innerHTML = `By ${post.username}`;

    const modBtn = document.createElement('a');
    modBtn.href = `modify-post.html?id=${post.post_id}`; // Will change this later
    modBtn.className = 'modify-btn';

    const mod_span = document.createElement('span');
    mod_span.innerHTML = "modify";
    const mod_icon = document.createElement('div');
    mod_icon.className = "icon";
    mod_icon.innerHTML = `<i class='fa fa-edit'></i>`
    if(post.user_id !== checkLoginUserId) {
      modBtn.style.display = "none";
    }

    const delBtn = document.createElement('a');
    delBtn.className = 'delete-btn';
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

    const del_span = document.createElement('span');
    del_span.innerHTML = "delete";
    const del_icon = document.createElement('div');
    del_icon.className = "icon";
    del_icon.innerHTML = `<i class='fa fa-trash'></i>`
    if(post.user_id !== checkLoginUserId) {
      delBtn.style.display = "none";
    }
    const like_container = document.createElement('span');
    const dislike_container = document.createElement('span');

    const like_btn = document.createElement('a');
    const dislike_btn = document.createElement('a');
    like_btn.className = "like-btn";
    dislike_btn.className = "dislike-btn";
    like_btn.addEventListener('click', async () => {
      reaction(postId, 1);
    });
    dislike_btn.addEventListener('click', async () => {
      reaction(postId, 0);
    });

    like_btn.innerHTML = `<i class='fa fa-thumbs-up' style="color: #004a03; cursor: pointer"></i> ${likes}   `
    dislike_btn.innerHTML = `<i class='fa fa-thumbs-down' style="color: #bc0000; cursor: pointer"></i> ${dislikes}`

    const comments = document.createElement('div');
    comments.id = "comments";
    const comment_form = document.createElement('div');
    comment_form.className = "comment-form";
    const form = document.createElement('form');
    form.id = "addCommentForm";
    form.method = "post";
    form.noValidate;
    const comment_input = document.createElement('input');
    comment_input.type = "text";
    comment_input.required = true;
    comment_input.name = "content";
    comment_input.placeholder = "Write a comment";
    const comment_button = document.createElement('button');
    comment_button.id = "addCommentBtn";
    comment_button.type = "submit";
    comment_button.innerHTML = "Submit";

    // COMMENT FORM
    form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd);
      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url + '/post/' + postId + '/comment', fetchOptions);
      console.log(response);
      const json = await response.json();
      const user = JSON.parse(sessionStorage.user);
      const commentsElement = document.querySelector('#comments');

      const comment_container = document.createElement('div');
      comment_container.className = "comment";
      const comment_body = document.createElement('div');
      comment_body.className = "comment-body";
      comment_body.innerHTML += `<i class='fa fa-user-circle'></i> ${user.username}`;
      const message = document.createElement('div');
      message.className = "message";
      const message_text = document.createElement('span');
      message_text.className = "comment-text";
      message_text.innerHTML = data.content;

      const comment_delete = document.createElement('a');
      comment_delete.className = "comment-delete-btn";
      comment_delete.innerHTML = `<i class='fa fa-trash' style="color: #c0392b"></i>`

      commentsElement.appendChild(comment_container);
      comment_container.appendChild(comment_body);
      comment_body.appendChild(message);
      message.appendChild(message_text);
      comment_body.appendChild(comment_delete);

    });

    container.appendChild(detailed_post);
    detailed_post.appendChild(post_img);
    post_img.appendChild(img);
    detailed_post.appendChild(post_info);
    post_info.appendChild(content);
    content.appendChild(title);
    content.appendChild(modBtn);
    content.appendChild(delBtn);
    delBtn.appendChild(del_span);
    delBtn.appendChild(del_icon);
    modBtn.appendChild(mod_span);
    modBtn.appendChild(mod_icon);
    content.appendChild(region);
    content.appendChild(author);
    content.appendChild(like_container);
    content.appendChild(dislike_container);
    like_container.appendChild(like_btn);
    dislike_container.appendChild(dislike_btn);
    content.appendChild(description);
    content.appendChild(comments);
    content.appendChild(comment_form);
    comment_form.appendChild(form);
    form.appendChild(comment_input);
    form.appendChild(comment_button);
    initMap(post);
  }
}

// GET LIKE & DISLIKE COUNT
const getReactions = async (postId, type) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/post/' + postId + '/reaction/' + type, fetchOptions);
    const json = await response.json();
    console.log(json);
    return json;
  } catch(e) {
    console.log(e.message);
  }
};

let dislikes = 0;
getReactions(postId, 0).then(function(r) {
  dislikes = r.count_reaction;
});
let likes = 0;
getReactions(postId, 1).then(function(r) {
  likes = r.count_reaction;
});

// REACTION
const reaction = async (postId, type) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    if (window.confirm('Unauthorized. Sign in first.')) {
      openLoginForm();
    }
    return;
  }

  alert(`Reaction on ${postId} type ${type}`);
};

// GET POST DATA
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
    console.log('error', e);
    console.log(e.message);
  }
};
getPost(postId);

// GET COMMENTS
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

// DISPLAY COMMENTS
const createCommentCards = (comments) => {
  const commentsElement = document.querySelector('#comments');

  comments.forEach((comment) => {
    const comment_container = document.createElement('div');
    comment_container.className = "comment";
    const comment_body = document.createElement('div');
    comment_body.className = "comment-body";
    comment_body.innerHTML += `<i class='fa fa-user-circle'></i> ${comment.username}`;
    const message = document.createElement('div');
    message.className = "message";
    const message_text = document.createElement('span');
    message_text.className = "comment-text";
    message_text.innerHTML = comment.content;

    const comment_delete = document.createElement('a');
    comment_delete.className = "comment-delete-btn";
    comment_delete.innerHTML = `<i class='fa fa-trash' style="color: #c0392b"></i>`
    console.log("comment user: " + comment.user_id + "checklogin: " + checkLoginUserId);
    if(comment.user_id !== checkLoginUserId) {
      comment_delete.style.display = "none";
    }

    comment_delete.addEventListener('click', async () => {
      try {
        const fetchOptions = {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          method: 'DELETE',
        };

        const response = await fetch(
            url + '/post/' + postId + '/comment/' + comment.comment_id,
            fetchOptions
        );

        if (window.confirm('Are you sure you want to delete your comment?')) {
          const json = await response.json();
          console.log('delete response', json);
          alert('Your comment was deleted successfully.');
          location.reload();
        }

      } catch (e) {
        console.log(e.message);
      }
    });

    commentsElement.appendChild(comment_container);
    comment_container.appendChild(comment_body);
    comment_body.appendChild(message);
    message.appendChild(message_text);
    comment_body.appendChild(comment_delete);

  });
};

// DISPLAY MAP
function initMap(post) {
  if (post) {
    const campLocation = { lat: post.coords[0], lng: post.coords[1] };
    // The map, centered at location of camping site
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: campLocation,
    });
    // The marker, positioned at the camping 's location
    const marker = new google.maps.Marker({
      position: campLocation,
      map: map,
    });
  }
}
