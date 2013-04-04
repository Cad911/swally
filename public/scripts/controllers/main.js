'use strict';

swallyApp.controller('MainCtrl', function ($scope, Pledges) {
  $scope.pledges = Pledges.getAll(function () {
    $scope.pledges = $scope.pledges.data;
  });

  $scope.history_pledges_play = [];
  $scope.current_pledges = [];
  $scope.current_categories = [];

  $scope.nb_play = 0;

  $scope.getPledge = function () {
    var nb_play = $scope.nb_play;

    if(nb_play !== 0){
      $scope.history_pledges_play.unshift({
        'turn': nb_play,
      });
    }

    generateRandomPledges(4);

    $scope.nb_play += 1;
  };

  var generateRandomPledges = function(number) {
    var all_pledges = $scope.pledges,
        pledges_length = all_pledges.length,
        categories = [],
        pledges = [];

    // Generate random pledeges.
    for(var i = 1;  i <= number; i++) {
      var pledge = all_pledges[Math.floor(Math.random() * pledges_length)],
          index  = Math.floor(Math.random() * number);

      // Get index category.
      while(categories[index] != undefined) {
        index  = Math.floor(Math.random() * number);
      }
      
      // Push datas.
      categories[index] = pledge.category;
      pledges.push(pledge);
    }

    // Set in scope.
    $scope.current_pledges = pledges;
    $scope.current_categories = categories;
  };
});