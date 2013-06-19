window.ourApp.controller('globalCtrl', ['$scope', ($scope)->
  $scope.is_first_screen = true
  $scope.nextScreen = ()->
    $scope.is_first_screen = false
])