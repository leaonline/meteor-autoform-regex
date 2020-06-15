# Meteor AutoForm RegExp

Allows to edit `RegExp` as `AutoForm` input.

## Installation and usage

Install this package via

```bash
$ meteor add jkuester:autoform-regexp
```

### Install theme (optional)

This package uses a Bootstrap 4 theme, which is supported by the following packages:

- for AutoForm <=6.3.0 use `imajus:autoform-bootstrap4`
- for AutoForm >=7.0.0 use `jkuester:autoform-bootstrap4`

However, the theme **is optional** and the package will work also without a BS4 theme.

### Import required

This package needs to be imported manually before being used! 
It is not added to the client automatically in order to reduce initial bundle size.

```javascript
import { AutoFormRegexp } from 'meteor/jkuester:autoform-regexp'
```

The `AutoFormRegexp` Object reveals some internals and allows you to make some global
configurations here:

```javascript
// AutoFormRegexp
{
  name: 'regexp' // to be used as type for the field
}
```


