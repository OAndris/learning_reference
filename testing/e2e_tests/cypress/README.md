# e2e_tests_cypress

**About:**

This example covers **end-to-end testing** (UI testing) in JavaScript, using **Cypress.io**.

**Usage:**

- `npm install` in both the app folder and cypress folder
- `npm start` in the app folder
- `npx cypress open` (to open the Cypress test runner. Alternatively, run `npx cypress run` for headless mode, or optionally with the `--record` and/or `--parallel` flags)
- Inside Cypress, click on any/all of the test files and watch them execute

**Source:**

Example taken from the LinkedIn Learning course named "End-to-End JavaScript Testing with Cypress.io" by Shaun Wassell. Link: https://www.linkedin.com/learning/end-to-end-javascript-testing-with-cypress-io/

**A few examples:**

`cy.get('button').click().should('have.class', 'active')`

`cy.request('/users/1').its('body').should('deep.eql', { name: 'Amir' })`

    it('send email with contact form', () => {
        cy.get('#name-input').type('Amir')
        cy.get('#email-input').type('amir@cypress.io')
        cy.get('form').submit()
        cy.get('#success-message').should('be.visible')
    })

    it('signup and login user', () => {
        cy.visit('http://localhost:8080/signup')
        cy.get('input[name="email"]').type('amir@cypress.io')
        cy.get('input[name="password"]').type('1234')
        cy.get('input[name="confirm-password"]').type('1234')
        cy.get('#signup-button').click()

        cy.location('pathname').should('eq', '/login')

        cy.get('input[name="email"]').type('amir@cypress.io')
        cy.get('input[name="password"]').type('1234')
        cy.get('#login-button').click()

        cy.location('pathname').should('eq', '/board')
    })

**A few useful tricks:**

- Since both HTML and CSS are subject to change, it is recommended to use the `data-cy` tags on the elements required for testing. This enables using selectors that are dedicated to testing and thus are less likely to change. Example: `cy.get("[data-cy=box-1-items-list] > :nth-child(2)").dblclick();`
- Use the `beforeEach` hook function (inside a test suite (`describe(...)`)) to execute certain steps before each test (such as `cy.visit("/example-4");`)
- The base URL of the target application can be outsourced to `cypress.json` as the following example key-value pair: `"baseUrl": "http://localhost:3000"`
- Aliasing can be used to reduce repetition of selectors. Example: `cy.get("[data-cy='input-last-name']").as("charInput");`. Then use it as `cy.get("@charInput").type("hello");`.
- Debugging the tests is possible by adding the `.debug()` method (example: `cy.get("[data-cy=box-4-items-list] > :nth-child(2)").trigger("mouseover").debug();`) and then executing the test and opening the DevTools inside the browser. Once the debug breakpoint is reached, the `subject` variable is also available for inspection.

**Cypress.io also wraps around Sinon.js:**

It allows us to create stubs (to replace methods) and spies (to watch methods and provide us with information for making assertions e.g. about how many times it was called, or what arguments it was called with), such as:

    import { api } from './my-api';

    cy.stub(api, 'getUser').returns({ name: 'Bill' });
    cy.stub(api, 'getUser').resolves({ name: 'Bill' });
    cy.stub(api, 'getUser').reject();

    const mySpy = cy.spy(api, 'getUser');
    expect(mySpy).to.be.called;

**Environmental variables:**

- can be defined in `cypress.json`, such as `{"env": {"MY_ENV_VARIAbLE": "This is my environmental variable."}}` and then obtained by `Cypress.env('MY_ENV_VARIABLE')`
- alternatively, they can also be defined in a separate `cypress.env.json` file

**Additional useful methods:**

- **wrap** (to allow using the Cypress 'should' assertions instead of the Mocha 'expect' assertions, such as `cy.get('h1').then($element => cy.wrap($element).should(...);});`)
- **and** (to chain multiple assertions so that the first assertion uses the 'should' method, then the second assertion can use either 'should' or 'and')
- **filter** and **not** (chained after the **get** method, it can be used to further refine the selection)

**Typing special characters is possible via the name of the special character in curly braces:**

- `cy.get('input').type('{Enter}');`
- `cy.get('input').type('This is a test {Enter}');`

**Code completion can be activated:**

- for a single file by starting it with `/// <reference types="Cypress" />`
- for a whole project by creating a `jsconfig.json` file containing `{"include": ["./node_modules/cypress", "cypress/**/*.js"]}`

**Useful links:**

- https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell
- [Painless Testing for React Applications with Cypress](https://www.youtube.com/watch?v=lgurVvQsOTY) by Boston React (Youtube)
