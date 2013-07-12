window.ourApp.controller('GamesCtrl', ['$scope', 'sharedServices' , ($scope, sharedServices)->

  $scope.show_mini_game = false
  $scope.current_mini_game = {}

  $scope.$on('show-mini-game', ()->
    $scope.show_mini_game = sharedServices.show_mini_game
    $scope.current_mini_game = sharedServices.current_mini_game
  )

  $scope.$on('hide-mini-game', ()->
    $scope.show_mini_game = sharedServices.show_mini_game
    $scope.current_mini_game = sharedServices.current_mini_game
  )
])