/**
 * Example usage of the Intersection Observer API to detect when an element enters (or is about to enter) the viewport, for the following purposes:
 * - animating the appearance of the elements when they enter the viewport
 * - lazy-loading new elements (just before they are about to enter the viewport)
 * - implementing infinite scrolling (by dynamically loading even more new elements as soon as the last element would have been reached)
 *
 * Links:
 * - this example is based on the video "Learn Intersection Observer In 15 Minutes": https://www.youtube.com/watch?v=2IbRtjez6ag
 * - official docs of the Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

/* ==================================================================
ANIMATING APPEARANCE OF ELEMENTS:
================================================================== */
const onScreenObserver = new IntersectionObserver(
    // The intersection oberserver takes 2 arguments: a callback function and an options object.
    (entries) => {
        // The callback function automatically receives an array containing all the elements that we are observing that has changed its observation (whether it intersects or not) in that period of time.
        entries.forEach(({ target, isIntersecting }) => {
            /* Each entry has the following properties (plus a few more, less important properties):
            target --- the element that we are observing
            isIntersecting --- boolean indicating whether or not the element is intersecting (by default, whether or not it is on the screen, i.e. visible to the user)
            intersectionRatio --- the percentage of the element's visible part on the screen
            boundingClientRect --- the rectangle that defines the size and position of the observed element (i.e. "target")
            intersectionRect --- the rectangle that defines the observed element's position and size that is visible on the screen (if the entire element is on screen, it is equal to "boundingClientRect")
            rootBound --- the bounds (rectangle defining the size and position) of the root (container) element (by default and in most cases, the root element is the screen)
            */
            target.classList.toggle('show', isIntersecting); // toggle the "show" class when the element enters or leaves the viewport
            if (isIntersecting) onScreenObserver.unobserve(target); // stop observing the element as soon as it first enters the viewport
        });
    },
    // The options object has three, optional properties:
    {
        threshold: 1, // execute the callback when this proportion of the element is on screen (1 means 100% of the element, 0.5 means 50%, 0 means as soon as the first pixel is becomes visible). Defaults to 0
        // rootMargin: '100px', // margin around the root, enabling us to offset the triggering of the callback (e.g. a value of '100px' will cause the callback to fire while the target is still 100px away from entering the viewport - useful for lay-loading images). Default to all zeros
        // root: document.querySelector('.scrollable-parent-container'), // the element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target and must scrollable. Defaults to the browser viewport if not specified or if null
    }
);
document.querySelectorAll('.card').forEach((card) => {
    onScreenObserver.observe(card);
});

/* ==================================================================
LAZY-LOADING & INFINITE SCROLLING:
================================================================== */
const lastCardOberserver = new IntersectionObserver((entries) => {
    const lastCard = entries[0]; // in this case, we are observing a single element but still receive it as an array, so just take the first element of the array
    if (!lastCard.isIntersecting) {
        return; // do nothing until the last element enters the screen
    } else {
        loadNewCards();
        lastCardOberserver.unobserve(lastCard.target); // stop observing the element that used to be the last card until we loaded new cards
        lastCardOberserver.observe(document.querySelector('.card:last-child')); // start observing the new last card
    }
}, {});
lastCardOberserver.observe(document.querySelector('.card:last-child'));

const cardContainer = document.querySelector('#card-container');
function loadNewCards() {
    for (let i = 0; i < 5; i++) {
        const card = document.createElement('div');
        card.textContent = 'Lazy-loaded card';
        card.classList.add('card');
        card.classList.add('lazy');
        onScreenObserver.observe(card);
        cardContainer.append(card);
    }
}

/* ==================================================================
Other stuff, unrelated to the Intersection Observer API itself:
================================================================== */
document.querySelector('#toggle-layout-button').addEventListener('click', () => {
    cardContainer.className = cardContainer.className === 'column' ? 'grid' : 'column';
});
