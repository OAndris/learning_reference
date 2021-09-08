/*
Redux is used for managing complex state. It helps in avoiding the antipattern of prop drilling, and in maintaining readability and modularity. It works well with React, but not only with React.

How Redux works, explained in the context of an insurance company:
1) "Action creators" (representing a person submitting a policy/claim, i.e. a form to an insurance company)
2) "Action" (representing the form being submitted)
3) "dispatch" (the public-facing department of the company, that receives the form and forwards it to all internal departments)
4) "Reducers" (the internal departments, each receiving the form itself and the previous version of the state, then returning a part of the new state - reducers can be combined)
5) "State" (the compiled department data, i.e. all the new state parts are collected and combined)
6) "Store" (the company itself, involving all the action creators, reducers and state, plus the "dispatch" method and additional methods, e.g. "getState")

SOURCE: "[Redux] - The Best Explanation of How it Works" by Stephen Grider on Youtube (https://www.youtube.com/watch?v=3sjMRS1gJys)
NOTE: The following code snippet requires Redux, but it can be easily tested for example at https://stackblitz.com/
*/

console.clear();

import { createStore, combineReducers } from 'redux';

// Action types:
const actionTypes = {
    CREATE_CLAIM: 'CREATE_CLAIM',
    CREATE_POLICY: 'CREATE_POLICY',
    DELETE_POLICY: 'DELETE_POLICY',
};

// ==============================
// ACTION CREATORS
// Functions returning an "action object", which is data (with two fields: "type" string and "payload" object) that represents how we want to change the state when a specific action occurs.
// ==============================
const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: actionTypes.CREATE_CLAIM,
        payload: {
            name,
            amountOfMoneyToCollect,
        },
    };
};

const createPolicy = (name) => {
    return {
        type: actionTypes.CREATE_POLICY,
        payload: {
            name,
            amount: 20,
        },
    };
};

const deletePolicy = (name) => {
    return {
        type: actionTypes.DELETE_POLICY,
        payload: {
            name,
        },
    };
};

// ==============================
// REDUCERS
// Functions taking a part of the initial state and the actions (each reducer receives all the actions, combined together), and returning the modified part of the state.
// ==============================
const claimsHistory = (oldListOfClaims = [], action) => {
    if (action.type === actionTypes.CREATE_CLAIM) {
        return [...oldListOfClaims, action.payload];
    }
    return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
    if (action.type === actionTypes.CREATE_CLAIM) {
        return bagOfMoney - action.payload.amountOfMoneyToCollect;
    } else if (action.type === actionTypes.CREATE_POLICY) {
        return bagOfMoney + action.payload.amount;
    }
    return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
    if (action.type === actionTypes.CREATE_POLICY) {
        return [...listOfPolicies, action.payload.name];
    } else if (action.type === actionTypes.DELETE_POLICY) {
        return listOfPolicies.filter((policy) => policy !== action.payload.name);
    }
    return listOfPolicies;
};

// ==============================
// SETUP
// Combine all the reducers together and create a store.
// ==============================
const store = createStore(
    combineReducers({
        claimsHistory,
        accounting,
        policies,
    })
);

// ==============================
// USAGE
// Our state, the action creators and the reducers are all part of the store.
// The store can dispatch actions to reducers (sending the action object to all reducers).
// The reducers know whether they use and if so, how they use the actions, to modify a part of the state.
// All the parts of the state are combined together.
// ==============================

console.log('Initial state: ', store.getState());

store.dispatch(createPolicy('Alex'));
console.log('After "createPolicy": ', store.getState());

store.dispatch(createClaim('Alex', 50));
console.log('After "createClaim": ', store.getState());

store.dispatch(deletePolicy('Alex'));
console.log('After "deletePolicy": ', store.getState());
