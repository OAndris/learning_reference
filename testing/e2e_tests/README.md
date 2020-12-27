# Cypress.io

## Useful links:

Docs:

- [Install](https://docs.cypress.io/guides/getting-started/installing-cypress.html)
- [Run](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)
- [Network Requests](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies)

Videos:

- [Complete Code Coverage with Cypress](https://www.youtube.com/watch?v=C8g5X4vCZJA)
- [Testing The Way It Should Be (aka Intro Into Cypress)](https://www.youtube.com/watch?v=pJ349YntoIs)

## Useful commands:

Install with npm or yarn:

`npm install cypress --save-dev`

`yarn add cypress --dev`

Open Cypress GUI or run it directly from terminal:

`npx cypress open`

`npx cypress run`

Run in headless mode or in headed mode:

`npx cypress run --headed`

`npx cypress run --headless`

Specify the test files to run:

`npx cypress run --spec "cypress/integration/dynamic_elements.test.js"`

Specify the browser to use:

`npx cypress run --browser chrome`

`npx cypress run --browser chromium`

`npx cypress run --browser firefox`

`npx cypress run --browser edge`

`npx cypress run --browser electron`

Full example:

`npx cypress run --headed --spec "cypress/integration/dynamic_elements.test.js" --browser edge`
