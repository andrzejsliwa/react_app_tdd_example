import chai from 'chai'
import {jsdom} from 'jsdom'
import debug from 'debug'
require('sinon-as-promised');
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import faker from 'faker'

chai.use(sinonChai)

global.document = jsdom('<!doctype html><html><body></body></html>', {
   url: 'http://localhost'
});
global.window = document.defaultView
global.navigator = window.navigator
global.expect = chai.expect

// Basic imports
global.react = require('react');
global.TestUtils = require('react-addons-test-utils');
global.debug = { log: debug('test') }

// this is imported to avoid problems with:
//    Invariant Violation: dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread.
//    Make sure `window` and `document` are available globally before requiring React when unit testing or use
//    ReactDOMServer.renderToString() for server rendering.
// using import messing up with order of loading
const enzyme = require('enzyme')
global.mount = enzyme.mount
global.shallow = enzyme.shallow

// Testing helpers
global.sinon = sinon
global.faker = faker

// this has to happen after the globals are set up because `chai-enzyme`
// will require `enzyme`, which requires `react`, which ultimately
// requires `fbjs/lib/ExecutionEnvironment` which (at require time) will
// attempt to determine the current environment (this is where it checks
// for whether the globals are present). Hence, the globals need to be
// initialized before requiring `chai-enzyme`.
chai.use(require('chai-enzyme')())
