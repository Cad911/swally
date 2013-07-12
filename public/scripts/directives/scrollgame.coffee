window.ourApp.directive('ngScrollAction', ($window)->
  (scope, elm, attrs)->
      $('body').css('overflow', 'hidden')
      elm.css('height', $(window).innerHeight() - 100)
      elm.css('overflow', 'auto')
      elm.on("scroll", (e)->
        scope.$apply(attrs.ngScrollAction);
        scope.real_distance = elm.scrollTop()
        console.log scope.real_distance
      )


      # USEFULL TO PUT THE SCROLL BAR TO ZERO
      scope.$on('scroll-to-zero',()->
          elm.css('overflow', 'hidden')
          elm.scrollTop(0)
          setTimeout(()->
              elm.css('overflow', 'auto')
          ,1000)
          true
      )

      true
)