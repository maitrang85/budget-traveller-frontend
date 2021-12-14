'use strict';

const apiCall = async (path, body, method, contentType) => {
    const fetchOptions = {
        headers: {
            'Content-Type': contentType,
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body,
        method,
    };
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
    const data = serializeJson(modUserForm);
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
