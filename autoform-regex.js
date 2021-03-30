/* global AutoForm RegExp */
import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { EJSON } from 'meteor/ejson'
import './autoform-regex.html'

AutoForm.addInputType('regexp', {
  template: 'afRegExp',
  valueOut () {
    const value = this.val()
    console.info(value)
    return typeof value === 'string' && value.length > 0 && EJSON.parse(value)
  }
})

Template.afRegExp.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  instance.autorun(() => {
    const data = Template.currentData()
    const { atts } = data

    instance.state.set('invalid', atts.class && atts.class.indexOf('invalid') > -1)
    instance.state.set('disabled', Object.prototype.hasOwnProperty.call(atts, 'disabled'))
    instance.state.set('dataSchemaKey', atts['data-schema-key'])
    instance.state.set('fullPatternLabel', atts.fullPatternLabel || 'Exact Match')
    instance.state.set('ignoreCaseLabel', atts.ignoreCaseLabel || 'Case-insensitive')
  })
})

Template.afRegExp.onRendered(function () {
  const instance = this
  const { value } = instance.data
  const source = value?.source

  let cleanedValue = source
  let isExactMatch = false
  let ignoreCase = false

  if (source && source.startsWith('^') && source.endsWith('$')) {
    cleanedValue = source.substring(1, source.length - 1)
    isExactMatch = true
  }

  if (value?.flags && value.flags.includes('i')) {
    ignoreCase = true
  }

  instance.state.set({ isExactMatch, ignoreCase })

  if (cleanedValue) {
    instance.$('.afRegExp-pattern-input').val(cleanedValue)
    updateValue(value, instance)
  }
})

Template.afRegExp.helpers({
  dataSchemaKey () {
    return Template.instance().state.get('dataSchemaKey')
  },
  invalid () {
    return Template.instance().state.get('invalid')
  },
  fullPatternLabel () {
    return Template.instance().state.get('fullPatternLabel')
  },
  ignoreCaseLabel () {
    return Template.instance().state.get('ignoreCaseLabel')
  },
  isExactMatch () {
    return Template.instance().state.get('isExactMatch')
  },
  ignoreCase () {
    return Template.instance().state.get('ignoreCase')
  }
})

Template.afRegExp.events({
  'input .afRegExp-pattern-input' (event, templateInstance) {
    const dataSchemaKey = templateInstance.state.get('dataSchemaKey')
    const formId = AutoForm.getFormId()
    try {
      const pattern = templateInstance.$(event.currentTarget).val()
      const regExp = new RegExp(pattern)
      updateValue(regExp, templateInstance)
      AutoForm.removeStickyValidationError(formId, dataSchemaKey)
    } catch (e) {
      console.error(e)
      templateInstance.state.set('invalid', e)
      AutoForm.addStickyValidationError(formId, dataSchemaKey, 'error', 'invalid expression')
    }
  },
  'click .custom-check' (event, templateInstance) {
    const target = templateInstance.$(event.currentTarget).data('target')
    const flag = templateInstance.state.get(target)
    templateInstance.state.set(target, !flag)

    const currentValue = new RegExp(templateInstance.$('.afRegExp-pattern-input').val())
    updateValue(currentValue, templateInstance)
  }
})

function updateValue (regExp, templateInstance) {
  const ignoreCase = templateInstance.state.get('ignoreCase')
  const isExactMatch = templateInstance.state.get('isExactMatch')

  if (ignoreCase) {
    regExp = new RegExp(regExp.source, regExp.flags + 'i')
  } else {
    regExp = new RegExp(regExp.source, '')
  }

  if (isExactMatch) {
    regExp = new RegExp(`^${regExp.source}$`, regExp.flags)
  }

  if (regExp.source.length > 0 && regExp.source !== '(?:)') {
    console.info(regExp.source)
    const str = EJSON.stringify(regExp)
    templateInstance.$('.afRegExpHiddenInput').val(str)
  } else {
    templateInstance.$('.afRegExpHiddenInput').val(null)
  }
}

export const AutoFormRegexp = {
  name: 'regexp'
}
