/* eslint-env meteor */
Package.describe({
  name: 'leaonline:autoform-regexp',
  version: '1.1.0',
  // Brief, one-line summary of the package.
  summary: 'Allows RegExp as AutoForm input.',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:jankapunkt/meteor-autoform-regex.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use([
    'ecmascript',
    'templating@1.3.2',
    'tracker',
    'ejson',
    'reactive-dict',
    'aldeed:autoform@7.0.0',
    'leaonline:ejson-regexp@1.1.0'
  ], 'client')
  api.mainModule('autoform-regex.js', 'client')
})

Package.onTest(function (api) {
  Npm.depends({
    chai: '4.2.0'
  })

  api.use('ecmascript')
  api.use('mongo')
  api.use('random')
  api.use('meteortesting:mocha')
  api.use('leaonline:autoform-regexp')
  api.mainModule('autoform-regex-tests.js')
})
