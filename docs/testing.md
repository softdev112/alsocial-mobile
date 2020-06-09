# Testing (with Jest and Detox)

## Linting (with eslint)

To check if code is formatted consistently + pick up on any syntax errors:

```
./node_modules/.bin/eslint "src/**/*.js"
```

## Writing and Running Tests

This project will be set up to use [jest](https://jestjs.io) for unit tests and [detox](https://github.com/wix/Detox) for e2e tests. For jest, create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/facebook/jest/blob/master/examples/react-native/__tests__/intro.test.js) for an example test. The [jest documentation](https://jestjs.io/docs/en/getting-started) is also a wonderful resource, as is the [React Native testing tutorial](https://jestjs.io/docs/en/tutorial-react-native). For detox, create tests in the `e2e` root folder with `.spec.js` extensions. The [detox documentation](https://github.com/wix/Detox/blob/master/docs/README.md) walks through mostly all situations.

#### `yarn test`

Runs the [jest](https://jestjs.io) test runner on your tests.

## Jest Snapshots

Run `yarn test-watch` to run a test in developer watch mode.

To run an individual Jest test:

-   Run `jest path/to/test.js` if you have Jest installed globally
-   Run `node_modules/.bin/jest path/to/test.js` to use the projects Jest installation

Unit tests should be placed in their related parents folder to keep consistency, i.e **components/\_\_tests\_\_** or **containers/\_\_tests\_\_**

-   (Snapshot testing) https://jestjs.io/docs/en/snapshot-testing#snapshot-testing-with-jest
-   (DOM testing WIP) https://jestjs.io/docs/en/tutorial-react#dom-testing

#### `yarn e2e:{platform-configuration}`

Runs [detox](ttps://github.com/wix/Detox) using the [jest](https://jestjs.io) test runner on your e2e tests based on the configuration setup in `package.json`.

### [Go Back To Home Page](./../README.md)
