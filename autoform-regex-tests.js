// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest'

// Import and rename a variable exported by autoform-regex.js.
import { name as packageName } from 'meteor/jkuester:autoform-regex'

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-regex - example', function (test) {
  test.equal(packageName, 'autoform-regex')
})
