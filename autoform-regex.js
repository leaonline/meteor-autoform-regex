/* global AutoForm RegExp */
import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { fromRegExp } from './lib/fromRegExp'
import { updateValue } from './lib/updateValue'
import { valueOut } from './lib/valueOut'
import './autoform-regex.html'

const input = instance => instance.$('.afRegExp-pattern-input')
const hidden = instance => instance.$('.afRegExpHiddenInput')

AutoForm.addInputType('regexp', {
  template: 'afRegExp',
  valueOut () {
    return valueOut(this.val())
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

  if (instance.data.value instanceof RegExp) {
    try {
      const { ignoreCase, isExactMatch, value } = fromRegExp(instance.data.value)
      updateValue({
        value: value,
        input: input(instance),
        hidden: hidden(instance),
        ignoreCase,
        isExactMatch
      })

      if (ignoreCase) {
        instance.$('.afRegExpIgnoreCase').prop('checked', 'checked')
      }
      if (isExactMatch) {
        instance.$('.afRegExpIsExactMatch').prop('checked', 'checked')
      }

      instance.state.set({ isExactMatch, ignoreCase })
    } catch (e) {
      console.error(e)
    }
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
  selected (type) {
    return Template.instance().state.get(type)
  }
})

Template.afRegExp.events({
  'input .afRegExp-pattern-input' (event, templateInstance) {
    const dataSchemaKey = templateInstance.state.get('dataSchemaKey')
    const formId = AutoForm.getFormId()

    try {
      updateValue({
        value: templateInstance.$(event.currentTarget).val(),
        isExactMatch: templateInstance.state.get('isExactMatch'),
        ignoreCase: templateInstance.state.get('ignoreCase'),
        input: input(templateInstance),
        hidden: hidden(templateInstance)
      })
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

    const $input = templateInstance.$('.afRegExp-pattern-input')
    updateValue({
      value: $input.val(),
      isExactMatch: templateInstance.state.get('isExactMatch'),
      ignoreCase: templateInstance.state.get('ignoreCase'),
      input: input(templateInstance),
      hidden: hidden(templateInstance)
    })
  }
})

export const AutoFormRegexp = {
  name: 'regexp'
}
