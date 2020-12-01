const fetch = require('node-fetch');

// Asynchronous function using Promise:
const fetchUsersChainedThen = (url) => {
    fetch(url)
        .then((resp) => resp.json())
        .then(console.log);
};

// Asynchronous function using Async/Await (ES8):
const fetchUsersAsyncAwait = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
};

const url = 'https://jsonplaceholder.typicode.com/posts';
fetchUsersChainedThen(url);
fetchUsersAsyncAwait(url);
