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
