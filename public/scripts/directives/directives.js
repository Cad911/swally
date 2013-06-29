// Generated by CoffeeScript 1.6.3
(function() {
  window.ourApp.directive('clickEffect', function() {
    return function(scope, element) {
      return $(element).on('click', function(e) {
        var div, positionX, positionY;
        if (scope.is_playing && scope.count_down === 0) {
          positionX = e.clientX - 3;
          positionY = e.clientY - 3;
          div = $(document.createElement('div'));
          div.addClass('effect-click');
          div.css('top', positionY + 'px');
          div.css('left', positionX + 'px');
          div.animate({
            top: (positionY - 9) + 'px',
            left: (positionX - 9) + 'px',
            width: '24px',
            height: '24px',
            opacity: 0
          }, {
            duration: 500,
            complete: function() {
              return $(this).remove();
            }
          });
          return $(element).append(div);
        }
      });
    };
  });

  window.ourApp.directive('ngShowClass', function($timeout) {
    return function(scope, element, attrs) {
      var hide, show, value_attr;
      show = function() {
        element.css('display', 'block');
        return $timeout(function() {
          return element.addClass('interface-is-displayed');
        }, 10);
      };
      hide = function() {
        element.removeClass('interface-is-displayed');
        return $timeout(function() {
          return element.css('display', 'none');
        }, 400);
      };
      value_attr = scope.$eval(attrs.ngShowClass);
      if (value_attr) {
        show();
      } else {
        hide();
      }
      return scope.$watch(attrs.ngShowClass, function(value) {
        if (value) {
          return show();
        } else {
          return hide();
        }
      });
    };
  });

}).call(this);
