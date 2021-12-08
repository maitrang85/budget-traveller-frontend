'use strict';
const url = 'http://localhost:3000';

const postId = window.location.hash.substr(1);
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
        title.innerHTML = `${post.title}`

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
        if(post.free_or_not === "free") {
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


        /*MODIFY THIS POST - For signed-in and userId = post.userId*/
        /*
        const modBtn = document.createElement('a');
        modBtn.innerHTML = 'Modify your post';
        modBtn.href = `modify-post.html?id=${post.post_id}`; // Will change this later
        */

        /*DELETE THIS POST - For signed-in and userId = post.userId*/
        /*
        const delBtn = document.createElement('button');
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
        */

        detail.appendChild(h2);
        detail.appendChild(figure);
        detail.appendChild(p1);
        detail.appendChild(p2);
        detail.appendChild(p3);
        detail.appendChild(p4);
        detail.appendChild(p5);
        detail.appendChild(p6);
        //detail.appendChild(modBtn);
        //detail.appendChild(delBtn);
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
        console.log('post response.json(): ', post);
        createDetailPost(post);
    } catch (e) {
        console.log(e.message);
    }
};

getPost(postId);
