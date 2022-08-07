/**
 * ----------------------
 * "Facade" pattern:
 * ----------------------
 * The idea is to create a "facade" between your complex code (e.g. an API) and your actual business logic code, making it easier to use the complex code without having to worry about its implementation details.
 *
 * Benefits:
 * - it leads to a much cleaner codebase (by providing elegant, clean, simple interfaces even if the underlying logic is potentially complex and maybe even ugly)
 * - it allows us to use complex code easily (hides away the complexities that are unrelated to the actual business logic)
 * - and most importantly, it also makes it a lot easier to change the implementation, i.e. replace any part of that complex code (because the actual implementation detail is in just a single location, not all over the codebase). For example, if "fetch" is never used directly in our code, only a facade that implements "fetch", then it becomes a lot easier to switch to using "axios" inside that single part of the codebase, where it is implemented.
 *
 * Based on: "Facade Pattern - Design Patterns" by Web Dev Simplified (https://www.youtube.com/watch?v=fHPa5xzbpaA&list=PLZlA0Gpn_vH_CthENcPCM0Dww6a5XYC7f&index=5)
 */

function getUsers() {
    return getAxios('https://jsonplaceholder.typicode.com/users'); // also works with getAxios
}

function getUserPosts(userId) {
    return getFetch('https://jsonplaceholder.typicode.com/posts', { userId }); // also works with getAxios
}

function getFetch(url, params = {}) {
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

function getAxios(url, params = {}) {
    // This function demonstrates how easy it is, thanks to the Facade pattern, to refactor the implementation, e.g. switch from fetch API to axios.
    // Notice how the interface of the original function doesn't change so the usage isn't affected and the rest of the codebase require no change.
    const queryString = Object.entries(params)
        .map(([paramKey, paramValue]) => `${paramKey}=${paramValue}`)
        .join('&');
    const finalUrl = url + (queryString ? `?${queryString}` : '');
    console.log(finalUrl);
    return axios({ url, method: 'GET', params }).then((res) => res.data);
}

getUsers().then((users) => {
    users.forEach((user) => {
        getUserPosts(user.id).then((posts) => {
            console.log(user.name);
            console.log(posts.length);
        });
    });
});
