/*
There are 3 ways for the timing of validations:
- Normal: check it whenever the input value changes (always up to date, but inefficient and slow, especially if the validation is performed on the backend)
- "Debounce": check it when the input value have not changed for a certain amount of time (when the user has presumably finished typing)
- "Throttle": check it in regular intervals (don't wait for the user to finish, e.g. when it is a long text)

Further reading:
- https://stackoverflow.com/questions/25991367/difference-between-throttling-and-debouncing-a-function
- https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript

Visualizations:
- http://demo.nimius.net/debounce_throttle/
- https://codepen.io/chriscoyier/pen/vOZNQV

NOTE: The following code snippet requires React, but it can be easily tested for example at https://stackblitz.com/
*/

/* =========================
DEBOUNCE
========================= */
import React, { useState } from 'react';

const Editor = ({ ...props }) => <input {...props} />;

const App = () => {
    const [value, setValue] = useState('');
    const [timerId, setTimerId] = useState(null);

    const onChange = (event) => {
        setValue(event.target.value);
        if (timerId) {
            clearTimeout(timerId);
        }
        setTimerId(
            setTimeout(() => {
                console.log('Value is now sent to backend for validation...');
            }, 1500)
        );
    };

    return (
        <div>
            <h1>Hello StackBlitz!</h1>
            <p>Start editing to see some magic happen :)</p>
            <Editor value={value} onChange={onChange} />
        </div>
    );
};

export default App;
