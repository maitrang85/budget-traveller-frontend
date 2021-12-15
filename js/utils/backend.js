'use strict';

const apiCall = async (path, body, method, contentType) => {
    const fetchOptions = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body,
        method,
    };
    if (contentType) {
        fetchOptions.headers['Content-Type'] = contentType;
    }
    return await fetch(url + path, fetchOptions);
};

const getUserProfile = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const response = await apiCall('/user/' + user.user_id);
        return response;
    }
    return null;
};

const updateUserProfile = async (userDataFrom) => {
    const data = serializeJson(userDataFrom);
    //  Remove empty properties
    for (const [prop, value] of Object.entries(data)) {
        if (value === '') {
            delete data[prop];
        }
    }
    return await apiCall(
        '/user',
        JSON.stringify(data),
        'PUT',
        'application/json'
    );
};

const updatePost = async (postDataFrom, postId) => {
    const body = new FormData(postDataFrom);
    return await apiCall('/post/' + postId, body, 'PUT');
};

const getPost = async (postId) => {
    return await apiCall('/post/' + postId);
};
