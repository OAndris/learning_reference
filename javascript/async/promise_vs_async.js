/*
This file contains examples for using Async Await versus Promises.

Source of examples: https://www.udemy.com/course/advanced-javascript-concepts/
*/

const fetch = require('node-fetch');

// ==============================================================================
// EXAMPLE 1
// ==============================================================================
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
// fetchUsersChainedThen(url);
// fetchUsersAsyncAwait(url);
// ==============================================================================

// ==============================================================================
// EXAMPLE 2
// ==============================================================================
const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums',
];

// Asynchronous function using Promise:
const getDataWithPromise = () => {
    Promise.all(
        urls.map((url) => {
            return fetch(url).then((resp) => resp.json());
        })
    )
        .then((results) => {
            return results.map((result) => {
                console.log(result);
            });
        })
        .catch((err) => console.log('error', err))
        .finally(() => console.log('this executes anyways'));
};

// Asynchronous function using Async/Await (ES8) and "Promise.all":
const getDataAsync = async function () {
    try {
        const [users, posts, albums] = await Promise.all(
            urls.map((url) => {
                return fetch(url).then((resp) => resp.json());
            })
        );
        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
    } catch (err) {
        console.log('error', err);
    }
};

// Asynchronous function using Async/Await (ES8) and "for await of":
const getDataAsyncWithForAwaitOf = async function () {
    const arrayOfPromises = urls.map((url) => fetch(url));
    for await (let request of arrayOfPromises) {
        const data = await request.json();
        console.log(data);
    }
};

// getDataWithPromise();
// getDataAsync();
// getDataAsyncWithForAwaitOf();
// ==============================================================================
