import { useEffect, useState } from 'react';

/**
 * Take any input value and return it when the specified delay has passed without receiving a new input value.
 * Useful e.g. for delaying an action (like an API request or validation) up until the user has stopped typing.
 * @param {*} value Any value that you want to be debounced.
 * @param {Number} delay Number of milliseconds to wait for newer value before returning it.
 * @returns
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
};
