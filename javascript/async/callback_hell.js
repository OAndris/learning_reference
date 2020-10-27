/*
In this (non-executable!) example, each function call depends on the previous call.
We need to make a function call, wait for its result value, then do something with it, multiple times.
When many functions are nested insided each other like this,
it becomes hard to read the code, thus the saying "callback hell".

Source of example code: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15037608#overview
*/

getUser('facebook/yihuazhang', (user, error) => {
    if (error) {
        throw error;
    }

    const userId = user.id;

    getFriends(userId, (friends, error) => {
        if (error) {
            throw error;
        }

        const john = friends.find();

        getPosts(john, (posts, error) => {
            if (error) {
                throw error;
            }

            const recentPost = posts[0];

            getCommentsForPost(recentPost, (comments, error) => {
                if (error) {
                    throw error;
                }

                displayComments(comments);
            });
        });
    });
});
