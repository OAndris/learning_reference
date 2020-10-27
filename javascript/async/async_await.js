/*
"Async await" was introduced in ES7, as the new way to handle asynchronous code (instead of directly using Promises and '.then()', '.catch()' chaining).
In the background, it still uses Promises, but it allows us to write asynchronous code that looks and feels like synchronous, which is a huge improvement.
By declaring a function as asynchronous with the 'async' keyword, the 'await' keyword becomes available inside the function body.
The 'await' keyword (before an async call) pauses the function execution until the awaited thing completes and comes back with a value.

Source of example code: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15046496#overview
*/

// The old way:
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
        const firstUser = users[0];
        console.log(firstUser);
        return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
    })
    .then((response) => response.json())
    .then((posts) => console.log(posts))
    .catch((error) => console.log(error));

//================================================

// The new way:
const myAsyncFunction = async () => {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        const firstUser = users[0];
        console.log(firstUser);
        const postsResponse = await fetch(
            'https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id
        );
        const posts = await postsResponse.json();
        console.log(posts);
    } catch (err) {
        console.log(err);
    }
};
myAsyncFunction();
