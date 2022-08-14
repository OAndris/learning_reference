/*
Code based on "Learn Debounce And Throttle In 16 Minutes" by Web Dev Simplified (https://www.youtube.com/watch?v=cjIswDCKgu0)
*/

function debounce(callback, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

function throttle(callback, delay = 1000) {
    let shouldWait = false;
    let waitingArgs = null;
    const timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false;
        } else {
            callback(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        callback(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
    };
}

//==========================================================
// Input field example
//==========================================================
const input = document.querySelector('#input');
const defaultText = document.querySelector('#default');
const debounceText = document.querySelector('#debounce');
const throttleText = document.querySelector('#throttle');

const updateDebounceText = debounce((text) => {
    debounceText.textContent = text;
});
const updateThrottleText = throttle((text) => {
    throttleText.textContent = text;
});

input.addEventListener('input', (e) => {
    const text = e.target.value;
    defaultText.textContent = text;
    updateDebounceText(text);
    updateThrottleText(text);
});

//==========================================================
// Mouse movement example
//==========================================================
const defaultTextMouse = document.querySelector('#defaultMouse');
const debounceTextMouse = document.querySelector('#debounceMouse');
const throttleTextMouse = document.querySelector('#throttleMouse');

const updateDebounceTextMouse = debounce(() => incrementCount(debounceTextMouse));
const updateThrottleTextMouse = throttle(() => incrementCount(throttleTextMouse), 200);
function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1;
}

document.addEventListener('mousemove', () => {
    incrementCount(defaultTextMouse);
    updateDebounceTextMouse();
    updateThrottleTextMouse();
});
