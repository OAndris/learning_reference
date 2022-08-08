/**
 * ----------------------
 * "Facade" pattern:
 * ----------------------
 * The idea is to create a "facade" between your complex code that includes implementation details (e.g. the use of a specific API) and your actual business logic code.
 *
 * Benefits:
 * - use complex code easily, by hiding away the complexities and implementation details that are unrelated to the actual business logic
 * - much cleaner codebase, by providing elegant, clean, simple interfaces even if the underlying logic is potentially complex and maybe even ugly
 * - and most importantly, it becomes significantly easier to change the implementation (e.g. switch from fetch API to axios), because the actual implementation detail is in just a single location, not all over the codebase
 *
 * Example:
 * If a facade is created that implements "fetch" and is used throughout the codebase, then it becomes a lot easier to switch to using "axios" inside that single part of the codebase, where it is implemented.
 *
 * Based on: "Facade Pattern - Design Patterns" by Web Dev Simplified (https://www.youtube.com/watch?v=fHPa5xzbpaA&list=PLZlA0Gpn_vH_CthENcPCM0Dww6a5XYC7f&index=5)
 */

// ====================================================================================================================
// High-level code, containing business logic. Easy to use, all the complexities and implementation details are hidden:
// ====================================================================================================================
function getUsers() {
    return getWithAxios('https://jsonplaceholder.typicode.com/users'); // also works with getWithFetch
}

function getUserPosts(userId) {
    return getWithFetch('https://jsonplaceholder.typicode.com/posts', { userId }); // also works with getWithAxios
}

getUsers().then((users) => {
    users.forEach((user) => {
        getUserPosts(user.id).then((posts) => {
            console.log(user.name);
            console.log(posts.length);
        });
    });
});

// ==============================================================================================================
// Low-level code, "facade" containing implementation details that aren't directly related to the business logic:
// ==============================================================================================================
function getWithFetch(url, params = {}) {
    // This function is the "facade", that provides an implementation of the fetch function, and hides away any unnecessary/unrelated complexities from the rest of our codebase.
    // It makes an otherwise potentially complex logic easy to use, helps to avoid repetitions, and allows us to easily change the implementation (e.g. replace a used library) in just a single location.
    const queryString = Object.entries(params)
        .map(([paramKey, paramValue]) => `${paramKey}=${paramValue}`)
        .join('&');
    const finalUrl = url + (queryString ? `?${queryString}` : '');
    console.log(finalUrl);
    return fetch(finalUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
}

function getWithAxios(url, params = {}) {
    // This function demonstrates how easy it is, thanks to the Facade pattern, to refactor the implementation, e.g. switch from fetch API to axios.
    // Notice how the interface of the original function (getWithFetch) doesn't change, so the usage isn't affected and the rest of the codebase requires no change.
    const queryString = Object.entries(params)
        .map(([paramKey, paramValue]) => `${paramKey}=${paramValue}`)
        .join('&');
    const finalUrl = url + (queryString ? `?${queryString}` : '');
    console.log(finalUrl);
    return axios({ url, method: 'GET', params }).then((res) => res.data);
}
