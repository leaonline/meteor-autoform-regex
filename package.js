Package.describe({
  name: 'jkuester:autoform-regexp',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use([
    'ecmascript',
    'templating',
    'tracker',
    'ejson',
    'reactive-dict',
    'aldeed:autoform',
    'jkuester:ejson-regexp'
  ], 'client')
  api.mainModule('autoform-regex.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('jkuester:autoform-regex')
  api.mainModule('autoform-regex-tests.js')
})