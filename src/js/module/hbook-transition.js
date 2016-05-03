/**
 * 
 * @authors H君
 * @date    2016-04-28 18:48:03
 * @version 1.02
 */

!function ($) {

  "use strict"; 

  $.support.transition = (function () {

    var transitionEnd = (function () {

      var el = document.createElement('hbook'), 
          transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name
      for (name in transEndEventNames){
        if (el.style[name] !== undefined) {
          return transEndEventNames[name]
        }
      }

    }())

    return transitionEnd && {
      end: transitionEnd
    }

  })()

  

}(window.jQuery);