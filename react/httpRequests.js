/*
A non-executable example file with code snippets demonstrating different ways for fetching data with HTTP requests:
- Traditional way:
    - fetching data with either the "Fetch API" (browser built-in) or "axios"
    - using either "Promise.then()" or "async/await" to handle the asynchronous nature of HTTP requests
    - handling the HTTP request related states, as well as errors
- Using "react-query":
    - providing a custom query ID and the desired fetcher function to "useQuery"
    - optionally, "useQuery" has additional configuration parameters
    - it automatically handles all the HTTP request related states and errors, and returns an object with all the information and data we may need
    - benefits:
        - it significantly simplifies HTTP request handling, resulting in much shorter, simpler and more declarative code (it hides away all the state handling and error handling)
        - it also provides easy solutions/configuration possibilities for otherwise complex topics (e.g. caching, automatic retries, background refetch, pagination, infinite scroll, optimistic updates)
        - it helps us separate server state and client state (can significantly simplify state handling so that the remaining client state doesn't really justify using a library like Redux)

Useful links:
- Fetch API:
    - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- axios:
    - https://axios-http.com/docs/intro
    - https://axios-http.com/docs/example
- react-query:
    - React Query in 100 Seconds (https://www.youtube.com/watch?v=novnyCaa7To)
    - Intro (by the creator Tanner Linsley) --> React Query: It’s Time to Break up with your "Global State”! –Tanner Linsley (https://www.youtube.com/watch?v=seU46c6Jz7E)
    - https://react-query-v3.tanstack.com/videos
    - https://tanstack.com/query/v4/docs/overview
    - React Query Tutorial - 3 - Fetching Data with useQuery (https://www.youtube.com/watch?v=Ev60HKYFM0s)
    - React Query Tutorial - 6 - Query Cache (https://www.youtube.com/watch?v=2TX8ojaSwF0&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=8)
    - ReactJS Course [10] - React-Query Tutorial | How to Properly Fetch Data in React (https://www.youtube.com/watch?v=SYXvHXOJzwc)
*/

//====================================
// Traditional way:
//====================================
import { useState, useEffect } from 'react';
import axios from 'axios';

const httpRequestTraditional = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        //=============================================
        // Option 1/A) Fetch API and Promise.then():
        //=============================================
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setData(data)) // in case of the Fetch API, resp.json() also returns a Promise, which needs to be awaited before the data is accessible
            .catch((err) => console.error(err)) // alternatively, just "console.error" (without the arrow function) could also be used, but the err object can be used for further error handling if desired
            .then(() => setIsLoading(false)); // the final .then() is always executed (both for success and failure)

        //=============================================
        // Option 1/B) Axios and Promise.then():
        //=============================================
        axios
            .get(url) // optional 2nd argument, e.g.  { params: { ID: 12345 } }
            .then((resp) => setData(resp.data)) // in case of axios, a single .then() is enough because the Promise returned by axios.get() will already resolve to the response object (instead of returning another Promise)
            .catch(console.error)
            .then(() => setIsLoading(false));

        //=============================================
        // Option 2/A) Fetch API and async/await:
        //=============================================
        const fetchData = async () => {
            try {
                const resp = await fetch(url);
                const data = await resp.data;
                setData(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchData();

        //=============================================
        // Option 2/B) Axios and async/await:
        //=============================================
        const fetchData = async () => {
            try {
                const resp = await axios.get(url);
                setData(resp.data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);
};

//====================================
// With useQuery (from 'react-query'):
//====================================
import { useQuery } from 'react-query';
import axios from 'axios';

const httpRequestWithUseQuery = (url, queryId) => {
    // NOTE: "useQuery" not only makes querying much simpler, but it also has additional option arguments for configuration, as well as more values to destructure
    const { isLoading, isError, error, data } = useQuery(queryId, () => axios.get(url));
};
