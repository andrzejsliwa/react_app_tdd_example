This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Project is just example of using:

* react.js
* redux
* router v4 (declarative) 
* tdd

Status: WIP

## Running:

yarn install
yarn test
yarn start 

For development yarn have configured proxy to localhost:5000
its only forwarding /api/* calls

## important files:


* src/App.js - example with declarative routing, simple redux function
* src/App.test.js - example test of component, changing routing, mocking axios, etc.
* src/index.js - setup of redux, router, thunk etc.
* package.json - proxy, scripts tasks - scss compilation, handling debug logger, handling custom setup.js in tests
* test/setup.js - customized jsdom environment
* test/helpers.js - helper for mouting components with router, store and state


```json
  "proxy": "http://localhost:5000",
```

## Test / Development dependencies: 

```json
  "devDependencies": {
    "chai": "^3.5.0",
    "chai-enzyme": "^0.6.1",
    "debug": "^2.6.1",
    "enzyme": "^2.7.1",
    "faker": "^3.1.0",
    "jsdom": "^9.11.0",
    "mock-local-storage": "^1.0.2",
    "moxios": "^0.3.0",
    "npm-run-all": "^4.0.1",
    "react-addons-test-utils": "^15.4.2",
    "react-scripts": "0.9.0",
    "redux-mock-store": "^1.2.2",
    "sinon": "^1.17.7",
    "sinon-as-promised": "^4.0.2",
    "sinon-chai": "^2.8.0"
  },
```  
sinon - mocking/spying/stubbing 
jsdom - "fake" browser environment for your tests
enzyme - lets you test components with mount/shallow 
mock-local-storage - its adding local storage implementation for tests
debug - nice logger configured by env variable DEBUG=scope_name
chai - expect / assertions
...

## dependencises:

```json
  "dependencies": {
    "axios": "^0.15.3",
    "connected-react-router": "4.0.0-beta.3",
    "lodash": "^4.17.4",
    "node-sass": "^4.5.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-redux": "^5.0.2",
    "react-router-dom": "next",
    "redux": "^3.6.0",
    "redux-thunk": "^2.2.0"
  },
```
* axios - ajax calls, with buildin handling of xsrf-tokens, support for interceptors etc
* lodash - functional toolbox
* node-sass - compilation of scss
...

## scripts:

```json
  "scripts": {
    "build-css": "node-sass src/ -o src/",
    "watch-css": "yarn build-css && node-sass src/ -o src/ --watch",
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build": "yarn build-css && react-scripts build",
    "test": "DEBUG_SHOW_HIDDEN=true DEBUG=test react-scripts test --setupTestFrameworkScriptFile ./test/setup.js",
    "eject": "react-scripts eject"
  }
```
* its handling compilation of scss in dev, test and production by simple "pipeping" ;)