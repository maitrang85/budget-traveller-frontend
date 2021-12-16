'use strict';
const url = 'http://localhost:3000';

// SCRIPT TO CREATE CARDS FROM POSTS
const cards = document.querySelector('#grid');

// CHECK IF VIEWER IS NOT LOGGIN YET, CAN NOT SEE POST A NEW SITE button

const addPostButton = document.getElementById('addPost');
const token = sessionStorage.getItem('token');
console.log(document.getElementById('addPost'));
if (!token) {
  addPostButton.style.display = 'none';
} else {
  addPostButton.style.display = 'inline-block';
}

let pageNumber;
let maxPageNumber;
const createFiltering = (posts) => {
  console.log(posts);
  pageNumber = 1;

  const paginationContainer = document.getElementById('pagination')
  const free = document.querySelector('#free_btn');
  const paid = document.querySelector('#paid_btn');
  const show_all = document.querySelector('#show_all_btn');
  const region = document.querySelector('#region_select');
  const prev = document.querySelector('#btn_prev');
  const next = document.querySelector('#btn_next');
  const page_display = document.querySelector('#current_page');

  page_display.innerHTML = `${pageNumber} / ${maxPageNumber}`;
  free.addEventListener('click', () => {
    console.log("free click");
    paginationContainer.style.display = 'none';
    getAllPosts().then(function(posts) {
      console.log(posts);
      if(!region[0].selected) {
        console.log("free and region")
        let posts_free_region = posts.filter((post) => {
          return post.free_or_not === 'free' && post.region_id === region.value;
        });
        renderCards(posts_free_region);
      } else {
        console.log("just free");
        let posts_free = posts.filter((post) => {
          return post.free_or_not === 'free';
        });
        console.log("posts free");
        renderCards(posts_free);
      }
    });
  });

  paid.addEventListener('click', () => {
    paginationContainer.style.display = 'none';
    getAllPosts().then(function(posts) {
      console.log(posts);
      if(!region[0].selected) {
        console.log("paid and region")
        let posts_paid_region = posts.filter((post) => {
          return post.free_or_not === 'paid' && post.region_id === region.value;
        });
        renderCards(posts_paid_region);
      } else {
        console.log("just paid");
        let posts_paid = posts.filter((post) => {
          return post.free_or_not === 'paid';
        });
        console.log("posts paid: ");
        renderCards(posts_paid);
      }
    });
  });

  show_all.addEventListener('click', () => {
    console.log("show all click");
    region[0].selected = true;
    paginationContainer.style.display = 'flex';
    getPosts(pageNumber)
  });

  region.addEventListener('change', () => {
    console.log("region change", region.value);
    paginationContainer.style.display = 'none';
    getAllPosts().then(function(posts) {
      console.log(posts);
      let posts_region = posts.filter((post) => {
          return post.region_id === region.value;
      });
      renderCards(posts_region);
    });
  });

  prev.addEventListener('click', () => {
    if(pageNumber-1 > 0) {
      pageNumber-= 1;
      page_display.innerHTML = `${pageNumber} / ${maxPageNumber}`;
      console.log("pagenumber:" + pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      getPosts(pageNumber);
    }
  });

  next.addEventListener('click', () => {
    if(pageNumber+1 <= maxPageNumber) {
      pageNumber+= 1;
      page_display.innerHTML = `${pageNumber} / ${maxPageNumber}`;
      console.log("pagenumber:" + pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      getPosts(pageNumber);
    }
  })
  if(maxPageNumber === 1) {
    next.disabled = true;
    prev.disabled = true;
  }
};

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
  } catch (e) {
    console.log(e.message);
  }
};

async function renderCards(posts) {
  cards.innerHTML = '';
  for (const post of posts) {

    // GET AMOUNT OF LIKES & DISLIKES
    let dislikes;
    await getReactions(post.post_id, 0).then(r => {
      dislikes = r.count_reaction;
    });
    let likes;
    await getReactions(post.post_id, 1).then(r => {
      likes = r.count_reaction;
    });

    const card_item = document.createElement('div');
    card_item.className = `grid_item`;

    const card = document.createElement('div');
    card.className = 'card';

    const thumbnail = document.createElement('div');
    thumbnail.className = 'card-thumbnail';

    const img = document.createElement('img');
    img.className = 'card_img';
    img.src = url + '/' + post.filename;

    const info = document.createElement('div');
    info.className = 'card_info';

    const s1 = document.createElement('span');
    const s2 = document.createElement('span');
    s1.innerHTML += `<i class='fa fa-thumbs-up' style="color: #DADADA;"></i> ${likes}`;
    s2.innerHTML += `<i class='fa fa-thumbs-down' style="color: #DADADA;"></i> ${dislikes}`;

    const card_content = document.createElement('div');
    card_content.className = 'card_content';

    const h1 = document.createElement('h1');
    h1.className = 'card_header';
    h1.innerHTML = post.title;

    const p = document.createElement('p');
    p.className = 'card_text';
    p.innerHTML = post.content;

    const btn = document.createElement('button');
    btn.className = 'card_btn';
    btn.innerHTML = 'Read more';
    console.log('post_id', post.post_id);
    btn.addEventListener('click', () => {
      location.href = `camping-post-detail.html?id=${post.post_id}`;
    });

    card_item.addEventListener('click', () => {
      location.href = `camping-post-detail.html?id=${post.post_id}`;
    });

    const span = document.createElement('span');
    span.innerHTML = '→';

    card_item.appendChild(card);
    card.appendChild(thumbnail);
    thumbnail.appendChild(img);
    thumbnail.appendChild(info);
    info.appendChild(s1);
    info.appendChild(s2);
    card.appendChild(card_content);
    card_content.appendChild(h1);
    card_content.appendChild(p);
    card_content.appendChild(btn);
    btn.appendChild(span);
    cards.appendChild(card_item);
  }
}

// GET POSTS FOR FILTERING
const getPostsFiltering = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response_filtering = await fetch(url + `/post?page=`, fetchOptions);
    const posts_filtering = await response_filtering.json();
    maxPageNumber = Math.ceil(posts_filtering.total_posts_count / 9);

    console.log("total pages: " + maxPageNumber);
    createFiltering(posts_filtering.posts);

  } catch (e) {
    console.log(e.message);
  }
};

// GET ALL POSTS
const getAllPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response_all = await fetch(url + `/post?page=`, fetchOptions);
    const posts_all = await response_all.json();
    return posts_all.posts;

  } catch (e) {
    console.log(e.message);
  }
}

// GET POST PAGINATION
const getPosts = async (pageNumber) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    console.log(`/post?page=${pageNumber}`);
    const response = await fetch(url + `/post?page=${pageNumber}`, fetchOptions);
    const posts = await response.json();
    renderCards(posts.posts)
  } catch (e) {
    console.log(e.message);
  }
};

getPostsFiltering();
getPosts(1);

// ADDING ACTIVE CLASS TO THE CURRENT BUTTON (HIGHLIGHTING IT)
let buttonContainer = document.getElementById('filtering');
let buttonContainer2 = document.getElementById('pagination')
let buttons = buttonContainer.getElementsByClassName('btn');
let buttons2 = buttonContainer2.getElementsByClassName('btn');
const setButtons = (buttonContainer, buttons) => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      let current = buttonContainer.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
      this.className += ' active';
    });
  }
}
setButtons(buttonContainer, buttons);
setButtons(buttonContainer2, buttons2);




