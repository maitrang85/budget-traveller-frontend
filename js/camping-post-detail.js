'use strict';
const url = 'https://10.114.32.115/app';

// GET QUERY PARAMETER
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
const postId = getQParam('id');

// CREATE A DETAILED VIEW OF POST
const createDetailPost = async () => {
  const response = await getPost(postId);
  let post;
  if (response && response.ok)
    post = await response.json();

  if (post) {
    // CREATE ELEMENTS TO DISPLAY THE POST
    const container = document.querySelector('#detailed-post-container');
    container.innerHTML = '';

    const detailed_post = document.createElement('div');
    detailed_post.className = 'detailed-post';

    // IMAGE
    const post_img = document.createElement('div');
    post_img.className = 'post-img';
    const img = document.createElement('img');
    img.src = url + '/' + post.filename;

    // CONTENT CONTAINER
    const post_info = document.createElement('div');
    post_info.className = 'post-info';
    const content = document.createElement('div');
    content.className = 'content';

    // HEADER
    const title = document.createElement('h1');
    title.className = 'title';
    title.innerHTML = `${post.title}`;

    // DESCRIPTION
    const description = document.createElement('p');
    description.className = 'description';
    description.innerHTML = `${post.content}`;

    // DETAILS - ADDRESS, REGION, PRICING
    const region = document.createElement('p');
    region.className = 'region';
    if (post.free_or_not === 'free') {
      region.innerHTML = `${post.region_id} | ${post.address} | Free `;
    } else {
      region.innerHTML = `${post.region_id} | ${post.address} | Paid | ${post.price}`;
    }

    // AUTHOR OF THE POST
    const author = document.createElement('p');
    author.className = 'author';
    author.innerHTML = `By ${post.username}`;

    // MODIFY BUTTON
    const modBtn = document.createElement('a');
    modBtn.href = `modify-post.html?id=${post.post_id}`;
    modBtn.className = 'modify-btn';
    const mod_span = document.createElement('span');
    mod_span.innerHTML = "modify";
    const mod_icon = document.createElement('div');
    mod_icon.className = "icon";
    mod_icon.innerHTML = `<i class='fa fa-edit'></i>`;
    if(post.user_id !== checkLoginUserId) modBtn.style.display = "none";

    // DELETE BUTTON
    const delBtn = document.createElement('a');
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', async () => {
      if (window.confirm('Are you sure you want to delete this post?')) {} else return;
      try {
        const fetchOptions = {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
          method: 'DELETE',
        };
        const response = await fetch(url + '/post/' + post.post_id, fetchOptions);
        const json = await response.json();

        alert('Your post was deleted.');
        location.href = `main-page.html`;
      } catch (e) {
        console.log(e.message);
      }
    });

    const del_span = document.createElement('span');
    del_span.innerHTML = "delete";
    const del_icon = document.createElement('div');
    del_icon.className = "icon";
    del_icon.innerHTML = `<i class='fa fa-trash'></i>`;
    if(post.user_id !== checkLoginUserId && checkLoginUserRole !== 0) delBtn.style.display = "none";

    // LIKES & DISLIKES
    const like_container = document.createElement('span');
    const dislike_container = document.createElement('span');

    const like_btn = document.createElement('a');
    const dislike_btn = document.createElement('a');
    like_btn.className = "like-btn";
    dislike_btn.className = "dislike-btn";

    // LIKE & DISLIKE ON CLICK EVENT
    like_btn.addEventListener('click', async () => {
      await deleteOldReaction(postId);
      await reaction(postId, 1);
    });

    if(!reaction_status) {
      like_btn.style.filter = "grayscale(1)";
      dislike_btn.style.filter = "grayscale(1)";
    }
    if(reaction_status === 1) {
      like_btn.style.pointerEvents = "none";
      like_btn.style.filter = "";
      dislike_btn.style.pointerEvents = "";
      dislike_btn.style.filter = "grayscale(1)";
    }
    if(reaction_status === 0) {
      dislike_btn.style.pointerEvents = "none";
      dislike_btn.style.filter = "";
      like_btn.style.pointerEvents = "";
      like_btn.style.filter = "grayscale(1)";
    }

    dislike_btn.addEventListener('click', async () => {
      await deleteOldReaction(postId);
      await reaction(postId, 0);
    });

    like_btn.innerHTML = `<i class='fa fa-thumbs-up' style="color: #004a03; cursor: pointer; font-size: 2rem; margin-right: 5px;"></i>Like`
    dislike_btn.innerHTML = `<i class='fa fa-thumbs-down' style="color: #bc0000; cursor: pointer; font-size: 2rem; margin-right: 5px;"></i>Dislike`

    // DISPLAY COMMENTS
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
      const token = sessionStorage.getItem('token');
      if (!token) {
        if (window.confirm('Unauthorized. Sign in first.')) {
          openLoginForm();
        }
        return;
      }
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

      const json = await response.json();
      const user = JSON.parse(sessionStorage.user);
      createComment(data, user, json);
      form.reset();
    });

    // BUTTON TO OPEN THE MAP MODAL
    const map_btn = document.createElement('a');
    map_btn.innerHTML = `<i class="fa fa-external-link"></i> Show on map`;
    map_btn.className = "map-btn";
    map_btn.addEventListener('click', () => {
      openMap();
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
    content.appendChild(map_btn);
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

    // RENDER MAP
    await initMap(post);
  }
};

// GET LIKE/DISLIKE COUNT ON THE POST
const getReactions = async (postId, type) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/post/' + postId + '/reaction/' + type, fetchOptions);
    const json = await response.json();

    return json;
  } catch(e) {
    console.log(e.message);
  }
};

// CHECK FOR PREVIOUS LIKES/DISLIKES FROM THIS USER
const checkReaction = async (postId) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/' + postId + '/reaction', fetchOptions);
    const json = await response.json();

    return json;
  } catch (e) {
    console.log(e);
  }
};

let reaction_status;
checkReaction(postId).then(r => {
  if(!r) {
    reaction_status = null;

    return;
  }
  reaction_status = r[0].isLiked;

});

// UPDATE LIKE/DISLIKE ON THE POST
const deleteOldReaction = async (postId) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/' + postId + '/reaction', fetchOptions);
    const json = await response.json();
  } catch (e) {
      console.log(e);
  }
};
const reaction = async (postId, type) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    if (window.confirm('Unauthorized. Sign in first.')) {
      openLoginForm();
    }
    return;
  }
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/' + postId + '/reaction/' + type, fetchOptions);
    const json = await response.json();

    let like_btn = document.querySelector('.like-btn');
    let dislike_btn = document.querySelector('.dislike-btn');

    if(type===1) {
      like_btn.style.pointerEvents = "none";
      like_btn.style.filter = "";
      dislike_btn.style.pointerEvents = "";
      dislike_btn.style.filter = "grayscale(1)";
    }

    else if(type===0) {
      dislike_btn.style.pointerEvents = "none";
      dislike_btn.style.filter = "";
      like_btn.style.pointerEvents = "";
      like_btn.style.filter = "grayscale(1)";
    }


  } catch (e) {
    console.log(e.message);
  }

};

// GET ALL COMMENTS
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
    await createCommentCards(comments);
  } catch (e) {
    console.log(e.message);
  }
};

// CREATE A COMMENT CARD
const createComment = (comment, user, json) => {
  const commentsElement = document.querySelector('#comments');

  const comment_container = document.createElement('div');
  comment_container.className = "comment";

  const comment_body = document.createElement('div');
  comment_body.className = "comment-body";
  if(!user) comment_body.innerHTML += `<i class='fa fa-user-circle'></i> ${comment.username}`;
  else comment_body.innerHTML += `<i class='fa fa-user-circle'></i> ${user.username}`;

  const message = document.createElement('div');
  message.className = "message";

  const message_text = document.createElement('span');
  message_text.className = "comment-text";
  message_text.innerHTML = comment.content;

  // DELETE BUTTON
  const comment_delete = document.createElement('a');
  comment_delete.className = "comment-delete-btn";
  comment_delete.innerHTML = `<i class='fa fa-trash' style="color: #c0392b"></i>`;

  if(!user && comment.user_id !== checkLoginUserId && checkLoginUserRole !== 0) comment_delete.style.display = "none";
  comment_delete.addEventListener('click', async () => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        method: 'DELETE',
      };
      let id;
      if(!user) id = comment.comment_id;
      else id = json.comment_id;
      const response = await fetch(
          url + '/post/' + postId + '/comment/' + id,
          fetchOptions
      );

      if (window.confirm('Are you sure you want to delete your comment?')) {
        const json = await response.json();

        alert('Your comment was deleted successfully.');
        location.reload();
        return false;
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
};

// DISPLAY ALL COMMENTS
const createCommentCards = (comments) => comments.forEach((comment) => createComment(comment));

// OPEN/CLOSE MAP MODAL
function openMap() {
  document.body.classList.add('showMap');
}
function closeMap() {
  document.body.classList.remove('showMap');
}

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

// CREATE POST AND GET COMMENTS ON WINDOW LOAD
window.addEventListener('load', function () {
  createDetailPost().then(r => {
    getComments(postId);
  })
})


