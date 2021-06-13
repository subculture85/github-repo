const nock = require('nock')
require('jest-fetch-mock')

// Prevent any external calls in tests
nock.disableNetConnect()

