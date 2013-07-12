window.ourApp.directive('ngTapTap',()->
  (scope, element,attrs)->

    $(element).hammer().on('tap',(e)->
      scope.$apply(attrs.ngTapTap)
    )

    true
)

window.ourApp.directive('ngTouch',()->
  (scope, element,attrs)->

    $(element).hammer().on('touch',(e)->
      scope.$apply(attrs.ngTouch)
    )

    true
)


window.ourApp.directive('noScrollMobile',()->
  (scope, element,attrs)->
    document.ontouchstart = (e)->
      e.preventDefault()

    scope.$on('show-mini-game', ()->
        $('.table-main-content').css('position','fixed')
    )
    
    scope.$on('hide-mini-game', ()->
        $('.table-main-content').css('position','relative')
    )

    true
)