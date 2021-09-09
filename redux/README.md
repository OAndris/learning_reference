# Redux

## About:

-   Redux is a **state management library** for JavaScript apps
-   It works with vanilla JS, or any library/framework like React, Angular, Vue
-   It is based on functional programming concepts such as higher order functions, composition, currying, immutability (and Redux is inspired by Facebook's state management solution called "Flux")
-   Redux provides a lot of benefits, but at a cost of extra complexity (whether it's worth it or not should be evaluated based on the project/application at hand)
-   It is very popular, more than half of React projects use Redux
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
-   Therefore, using Redux might be an unncessary overhead in case of:
    -   Small to medium-size apps
    -   Simple UI and data flow
    -   Static data

## Fundamentals of Redux:

The building blocks of Redux:

-   **Action creators** (e.g. users clicking on a UI component)
-   **Actions** (events)
    -   actions are plain JavaScript objects, representing an event that has happened (e.g. a user logged in, logged out, or added an item to the shopping cart)
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
    -   they take two inputs:
        -   the "store" object, that represents the current state
        -   the "action" object that describes the event that has happened
    -   based on these inputs, they update the (immutable) state and return it (a new version/reference of it)
    -   reducers are never called directly (the "store" is in charge of calling the reducers)

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
    - What data do we need for each action? (e.g. if the "type" of the action is "REMOVE_ITEM", then the "payload" should include the ID of the item that needs to be deleted)
3. **Create the reducer(s)**
    - Reducers take an action and return the updated state
    - Typically, one reducer is created for each slice (highest level property) of the state, and they are combined together with the "combineReducers" function
4. **Set up the store** based on the reducer(s)
    - Combine all reducers together and create the store object, using the functions from the Redux library
    - Code: `const store = createStore(combineReducers({reducer1, reducer2, reducer3}));`
5. Done. **Start using it** from the UI layer by dispatching the appropriate actions in the appropriate components

## Sources:

-   [Redux Tutorial - Learn Redux from Scratch](https://www.youtube.com/watch?v=poQXNp9ItL4) by Mosh (Youtube)
-   [Redux - The Best Explanation of How it Works](https://www.youtube.com/watch?v=3sjMRS1gJys) by Stephen Grider (Youtube)
