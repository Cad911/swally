'use strict';

swallyApp.controller('MainCtrl', function ($scope, Pledges) {
  $scope.pledges = Pledges.getAll(function () {
    $scope.pledges = $scope.pledges.data;
  });

  $scope.history_pledges_play = [];
  $scope.current_pledge = {
    'pledge': 'A toi de jouer!',
    'description': ''
  };

  $scope.nb_play = 0;

  $scope.getPledge = function () {
    var pledges = $scope.pledges,
        pledges_length = pledges.length,
        pledge = pledges[Math.floor(Math.random() * pledges_length)],
        nb_play = $scope.nb_play;

    if(nb_play !== 0){
      $scope.history_pledges_play.unshift({
        'turn': nb_play,
        'pledge': $scope.current_pledge
      });
    }
    $scope.current_pledge = pledge;
    $scope.nb_play += 1;
  };
});