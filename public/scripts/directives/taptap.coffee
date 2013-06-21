window.ourApp.directive('clickEffect',()->
  (scope, element)->
      $(element).on('click',(e)->
        if scope.is_playing && scope.count_down == 0
          positionX = e.clientX - 3
          positionY = e.clientY - 3

          div = $(document.createElement('div'))
          div.addClass('effect-click')
          div.css('top', positionY+'px')
          div.css('left', positionX+'px')

          div.animate({
            top: (positionY - 9)+'px'
            left : (positionX - 9)+'px'
            width: '24px'
            height: '24px'
            opacity: 0
          },{
            duration:500
            complete: ()->
              $(this).remove()
          })
          $(element).append(div)
      )
)



window.ourApp.directive('ngShowClass',($timeout)->
  (scope, element, attrs)->
    show = ()->
      element.css('display', 'block')
      $timeout(()->
        element.addClass('interface-is-displayed')
      ,10)

    hide = ()->
      element.removeClass('interface-is-displayed')
      $timeout(()->
        element.css('display', 'none')
      ,400)

    value_attr = scope.$eval(attrs.ngShowClass)

    if value_attr
      show()
    else
      hide()

    scope.$watch(attrs.ngShowClass, (value)->
      if value
        show()
      else
        hide()
    )

)