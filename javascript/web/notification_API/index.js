// Example based on [How To Send Push Notifications With JavaScript](https://www.youtube.com/watch?v=Bm0JjR4kP8w) by Web Dev Simplified on YouTube

const button = document.querySelector('button');

button.addEventListener('click', async () => {
    const permission = await Notification.requestPermission(); // permission for send notifications needs to be requested
    // alert(permission);
    if (permission === 'granted') {
        const notification = new Notification('Title of notification', {
            body: 'Body of notification with more text text text text text text text.',
            data: { hello: 'World' }, // any custom data addedd here will be accessible in "event.currentTarget.data" on the Event object that's returned when one of notification's events is triggered ("show", "click", "close", "error")
            icon: 'icon.png',
            tag: 'notification-id', // if used, it prevents adding the same notification multiple times (instead, it just overwrites the existing one)
        });
        notification.addEventListener('click', (e) => {
            console.log(e);
        });
    }
});

let interval;
let notification;
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const leaveDate = new Date();
        interval = setInterval(() => {
            notification = new Notification('Come back please!', {
                body: `You have been gone for ${Math.round((new Date() - leaveDate) / 1000)} seconds...`,
                tag: 'come-back',
            });
        }, 1000);
    } else {
        if (interval) clearInterval(interval);
        if (notification) notification.close();
    }
});
