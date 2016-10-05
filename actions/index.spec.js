const ACTION   = require('constants/action')
const LANGUAGE = require('constants/language')
const SCOPE    = require('constants/scope')

let actions    = require('actions')



describe('/actions', () => {


  //////////////
  // TEMPLATE //
  //////////////



  // describe('#format', () => {

  //   it('returns an actions that sets the template to use to format a value', () => {
  //     let template = 'YYYY-MM-DD'
  //     actions.format(template).should.eql({
  //       type    : ACTION.TYPE.FORMAT,
  //       payload : { template },
  //     })
  //   })

  // })





  /////////////
  // CONFIRM //
  /////////////



  describe('#confirm', () => {

    it('returns an action that confirms the selected value', () => {
      actions.confirm().should.eql({
        type : ACTION.TYPE.CONFIRM,
      })
    })

  })





  ////////////
  // SELECT //
  ////////////



  describe('#select', () => {

    it('returns an action that selects a value', () => {

      let language = LANGUAGE.ENGLISH
      let scope    = SCOPE.DAYS
      let template = 'D MMMM, YYYY'
      let value    = '20 April, 2016'

      actions.select({ language, scope, template }, value).should.eql({
        type    : ACTION.TYPE.SELECT,
        payload : { language, scope, template, value },
      })

    })


    it('returns an action that selects a value with a custom template', () => {

      let language      = LANGUAGE.ENGLISH
      let scope         = SCOPE.DAYS
      let template      = 'D MMMM, YYYY'
      let value         = '2016/20/04'
      let valueTemplate = 'YYYY/MM/DD'

      actions.select({ language, scope, template }, value, valueTemplate).should.eql({
        type    : ACTION.TYPE.SELECT,
        payload : {
          language,
          scope,
          template: valueTemplate,
          value,
        },
      })

    })

  })



  describe('#clear', () => {

    it('returns an action that clears the value', () => {
      actions.clear().should.eql({
        type    : ACTION.TYPE.SELECT,
        payload : {
          language : undefined,
          scope    : undefined,
          template : undefined,
          value    : null,
        },
      })
    })

  })





  //////////
  // SHOW //
  //////////



  describe('#show', () => {

    it('returns an action that shows a scoped value', () => {

      let language = LANGUAGE.ENGLISH
      let scope    = SCOPE.MONTHS
      let template = 'D MMMM, YYYY'
      let value    = '20 April, 2016'

      actions.show({ language, scope, template }, value).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : { language, scope, template, value },
      })

    })


    it('returns an action that show a scoped value with a custom template', () => {

      let language      = LANGUAGE.ENGLISH
      let scope         = SCOPE.MONTHS
      let template      = 'D MMMM, YYYY'
      let value         = '2016/20/04'
      let valueTemplate = 'YYYY/MM/DD'

      actions.show({ language, scope, template }, value, valueTemplate).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language,
          scope,
          template: valueTemplate,
          value,
        },
      })

    })

  })



  describe('#showPrevious', () => {

    it('returns an action that shows a scoped value from the previous view', () => {

      let scope    = SCOPE.MONTHS
      let selected = null
      let view     = new Date(2013, 3, 1)
      let value    = new Date(2012, 3, 1)

      actions.showPrevious({ scope, selected, view }).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language: undefined,
          scope,
          template: undefined,
          value,
        },
      })

    })


    it('returns an action that selects a scoped value from the previous view', () => {

      let scope    = SCOPE.MONTHS
      let selected = new Date(2013, 3, 20)
      let view     = new Date(2013, 3, 1)
      let value    = new Date(2012, 3, 20)

      actions.showPrevious({ scope, selected, view }).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language: undefined,
          scope,
          template: undefined,
          value,
        },
      })

    })

  })



  describe('#showNext', () => {

    it('returns an action that shows a scoped value from the next view', () => {

      let scope    = SCOPE.MONTHS
      let selected = null
      let view     = new Date(2013, 3, 1)
      let value    = new Date(2014, 3, 1)

      actions.showNext({ scope, selected, view }).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language: undefined,
          scope,
          template: undefined,
          value,
        },
      })

    })


    it('returns an action that selects a scoped value from the next view', () => {

      let scope    = SCOPE.MONTHS
      let selected = new Date(2013, 3, 20)
      let view     = new Date(2013, 3, 1)
      let value    = new Date(2014, 3, 20)

      actions.showNext({ scope, selected, view }).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language: undefined,
          scope,
          template: undefined,
          value,
        },
      })

    })

  })



  describe('#showToday', () => {

    it('returns an action that selects "today"', () => {

      let scope = SCOPE.MONTHS
      let today = new Date(2013, 3, 20)
      let value = new Date(2013, 3, 20)

      actions.showToday({ scope, today }).should.eql({
        type    : ACTION.TYPE.SHOW,
        payload : {
          language: undefined,
          scope,
          template: undefined,
          value,
        },
      })

    })

  })





  ///////////
  // SCOPE //
  ///////////



  describe('#cycleScope', () => {

    it('returns an action that cycles to the next scope', () => {
      actions.cycleScope().should.eql({
        type: ACTION.TYPE.CYCLE_SCOPE,
      })
    })

  })





  /////////////
  // DISABLE //
  /////////////



  describe('#disable', () => {

    it('returns an action that disables dates and days', () => {
      actions.disable({}, 1, 2, new Date(2014, 3, 20)).should.eql({
        type    : ACTION.TYPE.DISABLE,
        payload : { values: [1, 2, new Date(2014, 3, 20)] },
      })
    })

  })



  describe('#enable', () => {

    it('returns an action that enables dates and days', () => {
      actions.enable({}, 1, 2, new Date(2014, 3, 20)).should.eql({
        type    : ACTION.TYPE.ENABLE,
        payload : { values: [1, 2, new Date(2014, 3, 20)] },
      })
    })

  })





  //////////////
  // LANGUAGE //
  //////////////



  describe('#setLanguage', () => {

    it('returns an action that sets the language', () => {
      actions.setLanguage({}, LANGUAGE.FRENCH).should.eql({
        type    : ACTION.TYPE.SET_LANGUAGE,
        payload : { value: LANGUAGE.FRENCH },
      })
    })

  })


})