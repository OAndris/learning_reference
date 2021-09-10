# Redux

## About:

-   Redux is a **state management library** for JavaScript apps
-   It works with vanilla JS, or any library/framework like React, Angular, Vue
-   It is based on functional programming concepts such as higher order functions, composition, currying, immutability (and Redux is inspired by Facebook's state management solution called "Flux")
-   Redux provides a lot of benefits, but at a cost of extra complexity (whether it's worth it or not should be evaluated based on the project/application at hand)
-   It is very popular, more than half of React projects use Redux
-   Middlewares can also be added (e.g. redux-thunk, which allows performing asynchronous actions)
-   Pros:
    -   **Centralized state:**
        -   Instead of scattering the application state in various parts of the UI, all the application state is stored inside a central repository: a "store" (a single JS object, the "single source of truth")
        -   Synchronizing data across different parts of the UI becomes easy, because if a piece of data needs to be updated, there is just a single place to update it (no matter how many parts/components of the UI display/use it)
        -   The infamous anti-pattern of "prop drilling" can be avoided
    -   **Predictable, transparent state changes and easy debugging:**
        -   Redux makes it easy to traceback how/why/when/where the data changes. The "Redux devtools" Chrome extension allows jumping back to any previous version of the state ("time travel debugging")
        -   The application's state can also be saved to a single file, and reloaded later when needed
        -   "Log Rocket" is essentially a Redux devtools in production for every user, that enables reloading the application in the same state where the user has encountered some problem (without clicking through)
    -   **Preserve page state:**
        -   Enables us to preserve the state when the user navigates away from a page and then back to the same page
        -   Enables quick page reloads (after a page close) without having to needlessly re-request data from the server
    -   **Undo/redo features** and **logging** are relatively easy to add
-   Cons:
    -   Added complexity
    -   Verbosity (plenty of boilerplate code needs to be written)
-   Using Redux is useful in many cases, but might be an unncessary overhead in case of:
    -   Small to medium-size apps
    -   Simple UI and data flow
    -   Static data

## Fundamentals of Redux:

The basic ideas (and constraints) of Redux:

-   Describe application state as plain objects and arrays (**"store"**: centralized/globalized state)
-   Describe changes in the system as plain objects (**"action"**: what happened, i.e. what you want to do)
-   Describe the logic for handling changes as pure functions (**"reducer"**: how things change, i.e. how the actions transform the state into the next state)

The building blocks of Redux:

-   **Action creators** (e.g. users clicking on a UI component)
-   **Actions** (events)
    -   actions are simple functions with the sole purpose of returning a plain JavaScript object (with just two properties: "type" string and "payload" object)
    -   the action object represents an event that has happened (e.g. a user logged in, logged out, or added an item to the shopping cart)
-   **Store**
    -   the store is a JavaScript object that includes the application's entire state (it is the "single source of truth")
    -   it is immutable
    -   it includes the following methods:
        -   **dispatch** (state can only be updated by dispatching actions and forwarding them to reducers, that handle them)
        -   **subscribe** (UI components should subscribe to the store, so they get notified when the state changes)
        -   **getState**
        -   (replaceReducer)
-   **Dispatch**
    -   the "store" object has a "dispatch" method, that takes an "action" and forwards it to the "reducers"
    -   dispatching actions is the only way in Redux to update the state (the store doesn't have a setState method)
    -   "dispatch" is an entry point to the store, and every action is sent through it, thus here we can control what should happen to all action objects (e.g. logging and undo/redo features can be implemented here)
-   **Reducers** (event handlers)
    -   reducers are pure functions, responsible for updating a slice of the store ("pure" function means without touching global state, mutating arguments, or making any side effect)
    -   reducers are the functions that get executed when an action is dispatched (they are called by the store)
    -   they take two inputs:
        -   the "store" object, that represents the current state
        -   the "action" object that describes the event that has happened
    -   based on these inputs, they update the (immutable) state and return it (a new version/reference of it)

The process of Redux:

1. **Action Creator (UI) --> Action**:

    An action creator creates an action object (e.g. a user logs in, or adds an item to the shopping cart).

2. **Action --> Store --> Reducer**:

    The store dispatches the action and forwards it to the reducer.

3. **Reducer --> Store**:

    The reducer computes the new state and returns it.

4. **Store --> UI**:

    The store sets the updated state internally, and notifies the UI components (that are subscribed to the store) about the update. The UI components then update themselves (re-render) with the new data.

## Steps for building the Redux part of an application:

1. **Design the store**
    - What data do we need to keep in the store?
    - How do we want to structure the store object (property names, nesting, data types)?
2. **Define the actions**
    - What are the action types that users can perform on the UI? Give them a descriptive name!
    - What parameters do we need for each action? (e.g. if the "type" of the action is "REMOVE_ITEM", then the "payload" should include the ID of the item that needs to be deleted)
3. **Create the reducer(s)**
    - Reducers take an action and return the updated state
    - Typically, one reducer is created for each slice (highest level property) of the state, and they are combined together with the "combineReducers" function
4. **Set up the store** based on the reducer(s)
    - Combine all reducers together and create the store object, using the functions from the Redux library
    - Code: `const store = createStore(combineReducers({reducer1, reducer2, reducer3}));`
5. If React is used, **connect React with Redux**
    - Inside `index.js` in `src`:
        - `import {Provider} from 'react-redux';`
        - `ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));`
        - This gives access to everything (to the whole store) inside our React application
    - Inside our stateful components:
        - `import {useSelector} from 'react-redux';` (the function `useSelector` is used for acccessing the state)
        - `const counter = useSelector(state => state.counter);` (the entire state is accessible from within `useSelector`)
    - Inside our components that also need to modify state:
        - `import {useDispatch} from 'react-redux';`
        - `import {increment} from './actions';` (import the desired custom made action. Typing out './actions/index' is not necessary, because Webpack automatically looks for index.js)
        - `const dispatch = useDispatch();`
        - `<button onClick={() => dispatch(increment())}>Increment</button>`
    - (Alernatively, the old and somewhat more complicated way of `import {connect} from 'react-redux';` and the custom made `mapStateToProps` and `mapDispatchToProps` functions can be used)
6. Done.

## Example for structuring the project folder of a React-Redux application:

-   The store can be part of `index.js` in `src`
-   Actions, action types and reducers can all be put into a custom named folder inside `src`, such as `store`
-   The reducers and actions can each have their own folders, containing multiple files for each if deemed necessary
-   The `reducers` folder can include a custom made `index.js` file, which imports all separate reducer files, bundles them together (with `combineReducers`) and exports this combined reducer
-   The action types should be listed in a separate object, thus the exact action type string is defined in a single source (easy to modify), and not in both reducers and actions

## Important notes:

**Redux Toolkit** makes it a lot easier to setup and use Redux.

-   It saves us from a lot of boilerplate code (traditional Redux is really heavy on boilerplate code) by abstracting away the unnecessary parts. Thus, it is easier to use, but harder to fully understand what happens in the background.
-   It uses Immer in the background, allowing us to write code that looks like as if we mutated the state (but nonetheless ensures immutability).
-   It comes pre-configured with Redux Thunk, allowing asynchronous operations.

## Sources:

-   [Redux - The Best Explanation of How it Works](https://www.youtube.com/watch?v=3sjMRS1gJys) by Stephen Grider (Youtube)
-   [Redux Tutorial - Learn Redux from Scratch](https://www.youtube.com/watch?v=poQXNp9ItL4) by Mosh (Youtube)
-   [Redux For Beginners | React Redux Tutorial](https://www.youtube.com/watch?v=CVpUuw9XSjY) by Dev Ed (Youtube)
-   [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) by Dan Abramov (Medium)
-   [React Context vs Redux - Who wins?](https://www.youtube.com/watch?v=OvM4hIxrqAw) by Academind (Youtube)
-   [Redux is this easy now? (with redux-toolkit)](https://www.youtube.com/watch?v=IUTu2pzz_Gg) by Classed (Youtube)
