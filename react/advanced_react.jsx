/*
This file demonstrates some advanced React concepts/practices that can greatly improve both the maintainability and performance of a React application:
- Custom Hooks
- Context
- Portals
- Higher Order Components
- Suspense

It is not a working code, but a collection of code snippets, serving as an example only.
It is based entirely on an excellent article: "5 Concepts That Will Make You a Better React Developer" (https://levelup.gitconnected.com/5-concepts-that-will-make-you-a-better-react-developer-4d0b56e031e7)
*/

/*
=============================
Custom Hooks
=============================
Hooks are a new addition in React 16.8 that will let you use state and other React features without writing a class or component.
Building your own custom hooks are a great way of extracting component logic into functions that can be reused and tested independently.
*/
// Example, showing how asynchronous data fetching logic can be reused for different API calls in your application.
import { useEffect, useState } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json)
            .then(setData)
            .catch(setError)
            .then(() => setLoading(false));
    }, [url]);

    return [data, isLoading, error];
};

function Profile() {
    const [data: profile, isLoading, error] = useFetch('/profile');
    return (
        <>
            {loading && <Spinner />}
            {data && <Profile data={data} />}
            {error && <Toast error={error} />}
        </>
    );
}

/*
=============================
Context
=============================
React Context is a feature that lets you pass data through the component hierarchy without having to pass props down to individual components manually.
Context is particularly useful for sharing data that is considered 'global' across the entire application, such as user credentials, theming, language, and so on.
*/
// Example, showing how you can easily change the theme between to 'light' or 'dark' using the useTheme hook (the change will propagate to all components in the hierarchy since the value is provided by the context).
import { useState, useContext, createContext } from 'react';

const themeContext = createContext();

const useTheme = () => useContext(themeContext);

const ThemeProvider = ({ theme, ...rest }) => {
    const [theme, setTheme] = useState(theme);
    return <ThemeContext.Provider value={[theme, setTheme]} />;
};

const Toolbar = () => {
    const [theme, setTheme] = useTheme();
    return (
        <>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </>
    );
};

const App = () => (
    <ThemeProvider theme="light">
        <Toolbar />
        <Routes />
    </ThemeProvider>
);

/*
=============================
Portals
=============================
React Portals are a way to insert child components into a DOM node that exists outside the hierarchy of the parent components.
Even though a portals can be mounted anywhere in the DOM tree, they behave like normal React children in every other way.
Contexts will also work with portals as with any other React components.
Typical use cases for portals includes modals, popup-menus, toasts and similar where you need to mount the components at a higher level in the DOM three.
*/
const Modal = ({ title }) => {
    const containerDiv = document.getElementById('containerDiv');
    return ReactDOM.createPortal(<h1>{title}</h1>, containerDiv);
};

const App = () => {
    const [loggedIn] = useUser();
    return (
        <>
            <Article />
            {!loggedIn && <Modal title="login">...</Modal>}
        </>
    );
};

/*
=============================
Higher Order Components
=============================
React Higher order component (HOC) is a pattern for reusing component logic. HOCs are functions that take a component as an argument and returns a new component.
Where typical components transform props into nodes in the DOM, a higher-order component transforms a component into another component.
*/
const withSearch =
    (Component) =>
    ({ list, ...rest }) => {
        const [search, setSearch] = useState('');
        const matches = useMemo(() => (list.filter((item) => item.indexOf(search) > -1), [search]));
        return (
            <>
                <SearchInput onChange={setSearch} />
                <Component list={matches} {...rest} />
            </>
        );
    };

const SearchableMyList = withSearch(MyList); // assume a simple list component MyList can be turned into a searchable list component using the withSearch HOC

/*
=============================
Suspense
=============================
Suspense is a feature that lets your component declaratively wait for something to load before it can be rendered.
It can be used to wait for some code to load using React.Lazy in combination with React.Suspense.
Since React 18.0.0, it can also be used to wait for some asynchronous data to load.

1) Lazy Loading Code
Code-splitting is a technique where a web-application is 'split' into pieces to improve performance and load time.
The idea is that initially you only load scripts and assets that are immediately required to display some page. The rest of the scripts and assets are loaded lazily whenever needed.

2) Data Fetching with Suspense (new in React 18.0.0, albeit released as an experimental feature in earlier versions)
Typical approach for data-fetching with React:
- start rendering components
- then using the useEffect hook, each of these components may trigger some data fetching logic eg. calling an API, eventually updating state and rendering
- this approach often leads to ineffective 'waterfalls' where nested components initiate fetching only when parent components are ready (e.g. an ArticlePage component fetches data then renders Article components which themselves need to fetch additional data).
- often a lot of these operations could be parallelized
Better approach, with Suspense:
- don’t wait for responses to come in, just kick off the asynchronous requests and immediately start rendering
- React will then try to render the component hierarchy
- if something fails because of missing data, it will just fallback to whatever fallback is defined in the Suspense wrapper
*/
// Lazy loading code with Suspense (fallback to a skeleton while the ArticlePage is loading):
const ArticlePage = React.lazy(() => import('./ArticlePage'));
<Suspense fallback={<ArticleSkeleton />}>
    <ArticlePage />
</Suspense>;

// Typical, ineffective ('waterfall') approach for data fetching:
const Article = ({ data }) => {
    const [suggestions, setSuggestions] = useState(null);
    useEffect(() => fetch(`/suggestions/${article.title}`).then(setSuggestions), []);
    return suggestions && <Suggestions data={suggestions} />;
};
const ArticlePage = ({ id }) => {
    const [article, setArticle] = useState(null);
    useEffect(() => fetch(`/article/${id}`).then(setArticle), []);
    return article && <Article data={article} />;
};

// Better, more effective ('parallelized') approach for data fetching, using Suspense:
const initialArticle = fetchArticle(0); // this is not a Promise. It's a special object from our Suspense integration.
function Articles() {
    const [article, setArticle] = useState(initialArticle);
    return (
        <>
            <button
                onClick={() => {
                    setArticle(fetchArticle(article.id + 1));
                }}
            >
                Next
            </button>
            <ArticlePage article={article} />
        </>
    );
}

function Article({ article }) {
    return (
        <Suspense fallback={<Spinner />}>
            <ArticleContent article={article} />
            <Suspense fallback={<h1>Loading similar...</h1>}>
                <Similar similar={article} />
            </Suspense>
        </Suspense>
    );
}

function ArticleContent({ article }) {
    const article = article.content.read();
    return (
        <>
            <h1>{article.title}</h1>
        </>
    );
}
