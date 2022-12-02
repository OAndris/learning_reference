# Tips for writing clean(er) code in React

TODO
TODO
TODO

## Topics

-   **Folder structure**

    -   components (for all leaf components, i.e. small, general, reusable components)
        -   Component1
            -   Component1.tsx
            -   Component1.scss
    -   pages
        -   routes.ts
        -   Page1
            -   Page1.tsx
            -   Page1.scss
            -   components (for any highly specialized component that relates to a single, specific page only and is not meant to be reused)
    -   hooks
        -   useCustomHook1.ts
        -   useCustomHook2.ts
    -   contexts
        -   Context1.tsx
        -   Context2.tsx

-   **Decoupling**

    -   Centralize API calls in one place (making it easy to swap APIs - also use the facade pattern)
    -   Decouple logic from components (by outsourcing it to custom hooks - thus making both the component and the logic itself more reusable)
    -   Extract all connected useState and useEffect hooks into a custom hook

-   **React Context**

    -   Single file exporting both the provider component and the custom useContext hook

-   **Speed**

    -   React.memo and React.useCallback
    -   Split and lazy-load routes (but also prefetch before actual page visit)

-   **Accessibility**

    -   TODO

-   **Animations**

    -   React Transition Group

-   **Security**

    -   Authorization managed at the route component

-   **Best practices**
    -   don't use useEffect directly in components, create custom hooks instead --> significantly improves readability of component code, plus it also enables code reuse
    -   don't use useState if re-rendering on every value change is not required, use useRef instead (and access ref.current.value when needed) --> improves performance
    -   use the function version of useState if the next value depends on the previous --> avoid bugs caused by React batching and performing multiple useStates together
    -   use useEffect for monitoring changes to state values (since useState doesn't update immediately)
    -   don't forget about referential equality; e.g. an object created within the component will be a brand new object on every re-render --> use useMemo if needed
    -   always abort fetch requests in the cleanup function of useEffect (with AbortContoller) --> avoid inconsistent data in case an already outdated response arrives later then the most recent one OR in case the component is unmounted by the time the response is received

## Useful links

-   [Junior Vs Senior Code - How To Write Better Code As A Web Developer - React](https://www.youtube.com/watch?v=0yzoAbrjV6k) by Web Dev Simplified on YouTube
-   [Junior Vs Senior Code - How To Write Better Code](https://www.youtube.com/watch?v=g2nMKzhkvxw) by Web Dev Simplified on YouTube
-   [Junior Vs Senior Code - How To Write Better Code - Part 2](https://www.youtube.com/watch?v=5B587bQ-TNg) by Web Dev Simplified on YouTube
-   [Top 6 React Hook Mistakes Beginners Make](https://www.youtube.com/watch?v=GGo3MVBFr1A) by Web Dev Simplified on YouTube
-   https://nesbtesh.medium.com/how-i-write-react-after-8-years-12cbf82c351
-   [Learn to write good code with a senior developer](https://www.youtube.com/watch?v=NX7JZj2HrR4) by Scrimba on YouTube
-   https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377
