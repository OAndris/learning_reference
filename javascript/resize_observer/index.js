/*
This example is based on the video tutorial "Learn Resize Observer In 5 Minutes" by Web Dev Simplified: https://www.youtube.com/watch?v=M2c37drnnOA
*/

const box = document.querySelector('.box');

const observer = new ResizeObserver((entries) => {
    const boxElement = entries[0];
    const isSmall = boxElement.contentRect.width < 180;
    boxElement.target.style.backgroundColor = isSmall ? 'blue' : 'red';
});

observer.observe(box);
