/* global AutoForm */
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { ReactiveDict } from 'meteor/reactive-dict'
import { EJSON } from 'meteor/ejson'
import SimpleSchema from 'simpl-schema'
import './autoform-regex.html'

AutoForm.addInputType('regexp', {
  template: 'afRegExp',
  valueOut () {
    const value = this.val()
    return typeof value === 'string' && EJSON.parse(value)
  },
  valueIn (initialValue) {
    debugger
    const val = initialValue && EJSON.stringify(initialValue)
    return val
  }
})

const createSchema = (obj) => new SimpleSchema(obj, { tracker: Tracker })

Template.afRegExp.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  instance.autorun(() => {
    const data = Template.currentData()
    const { atts } = data

    instance.state.set('invalid', atts.class && atts.class.indexOf('invalid') > -1)
    instance.state.set('disabled', Object.prototype.hasOwnProperty.call(atts, 'disabled'))
    instance.state.set('dataSchemaKey', atts['data-schema-key'])
  })
})

Template.afRegExp.onRendered(function () {
  const instance = this
  const { value } = instance.data
debugger
  instance.$('.afRegExp-pattern-input').val(value)
  updateValue(new RegExp(value), instance)
})

Template.afRegExp.helpers({
  dataSchemaKey () {
    return Template.instance().state.get('dataSchemaKey')
  },
  invalid () {
    return Template.instance().state.get('invalid')
  }
})

Template.afRegExp.events({
  'input .afRegExp-pattern-input' (event, templateInstance) {
    const pattern = templateInstance.$(event.currentTarget).val()
    const regExp = new RegExp(pattern)
    updateValue(regExp, templateInstance)
  }
})

function updateValue (regExp, templateInstance) {
  const str = EJSON.stringify(regExp)
  templateInstance.$('.afRegExpHiddenInput').val(str)
}

export const AutoFormRegexp = {
  name: 'regexp'
}
