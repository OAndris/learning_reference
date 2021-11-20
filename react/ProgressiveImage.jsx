import React, { useState } from 'react';
import './ProgressiveImage.scss';

/*
Custom built React Component for progressive loading of images.

Usage:
<ProgressiveImage
    src={"photo.jpg"}
    miniSrc={"smallPhoto.jpg"}
    className={"cover"}
    alt={"woman"}
/>

Based on (and useful links):
- https://codeburst.io/how-to-do-simple-progressive-image-loading-in-react-like-medium-dfad4c181b53
- https://codesandbox.io/s/agitated-hellman-y77b6?fontsize=14&file=/src/ProgressiveImage.js:843-893

For comparison; the two most promising libraries for progressive loading, lazy loading, and more:
-   **react-lazy-load-image-component:** (https://www.npmjs.com/package/react-lazy-load-image-component)

    -   Progressive loading (allows showing a placeholder image until the original image is loaded), in addition to placeholder components and texts
    -   **Adjustable** lazy loading (enables specifying the threshold at which images should start loading already if they are not yet visible but close)
    -   Built-in effects (e.g. blur) for the placeholder images
    -   Compatible with **SSR**
    -   Can be used for lazy loading any Component (**not just images**)
    -   Usage: <div><LazyLoadImage src="big.jpg" placeholderSrc="small.jpg" effect="blur" threshold={100} height={height} width={width} alt={alt}/><span>{image.caption}</span></div>

-   **react-progressive-graceful-image:** (https://www.npmjs.com/package/react-progressive-graceful-image, https://medium.com/@sanishkr/react-progressive-graceful-image-c7a45b577f5f)

    -   Progressive loading (allows showing a placeholder image until the original image is loaded), in addition to placeholder components and texts
    -   Lazy loading (loads the image only if it get into the visible viewport)
    -   **Graceful** loading (retries on failure, e.g. when user switched network)
    -   Usage: <ProgressiveImage src="big.jpg" placeholder="small.jpg">{(src, loading) => (<img STYLE={loading ? "filter: blur(0.5em);" : ""} src={src} alt="alt text"/>)}</ProgressiveImage>
*/

const omitKeyFromObj = (obj, omitKey) =>
    Object.keys(obj).reduce((result, key) => {
        if (key !== omitKey) {
            result[key] = obj[key];
        }
        return result;
    }, {});

const overlayStyles = {
    position: 'absolute',
    filter: 'blur(1px)',
    transition: 'opacity ease-in 1000ms',
    clipPath: 'inset(0)', // solves the problem of bleeding image pixels due to CSS blur
};

const ProgressiveImage = (props) => {
    [isHighResImageLoaded, setIsHighResImageLoaded] = useState(false);

    const filteredProps = omitKeyFromObj(props, 'miniSrc');
    return (
        <span>
            <img
                src={props.src}
                {...filteredProps}
                onLoad={() => setIsHighResImageLoaded(true)}
                // ref={(img) => {  highResImage = img }}
            />
            <img
                src={props.miniSrc}
                {...filteredProps}
                className={`${props.className} ${overlayStyles}`}
                {...(isHighResImageLoaded && { style: { opacity: '0' } })}
            />
        </span>
    );
};

export default ProgressiveImage;
