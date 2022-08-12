import { useEffect, useState } from 'react';

/**
 * Take any input value and return it when the specified delay has passed without receiving a new input value.
 * Useful e.g. for delaying an action (like an API request or validation) up until the user has stopped typing.
 * @param {*} value Any value that you want to be debounced.
 * @param {Number} delay Number of milliseconds to wait for newer value before returning it.
 * @returns debouncedValue
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer); // this cleanup function runs first (before the effect), whenever anything in the dependency array changes (and also when the component unmounts)
    }, [value, delay]);
    return debouncedValue;
};

/**
 * Similar to useState, but it saves the state to localStorage whenever it changes. For that, it takes a key as input, in addition to the initial value.
 * @param {String} key
 * @param {*} initialValue
 * @returns [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
    const getSavedValue = (key, initialValue) => {
        const savedValue = JSON.parse(localStorage.getItem(key));
        if (savedValue) return savedValue;
        return initialValue instanceof Function ? initialValue() : initialValue;
    };
    const [value, setValue] = useState(() => getSavedValue(key, initialValue)); // callback inside useState so that it only gets called the first time useLocalStorage is called
    useEffect(() => {
        return localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
    return [value, setValue];
};
