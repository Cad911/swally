'use strict';

swallyApp.controller('MainCtrl', function ($scope, Pledges) {
  var shot_played = 0;

  $scope.pledges = Pledges.getAll(function () {
    $scope.pledges = $scope.pledges.data;
  });

  $scope.history_pledges_play = [];
  $scope.current_pledges = [];
  $scope.current_categories = [];
  $scope.show_new_turn = true;
  $scope.carte = 0;
  $scope.display_pledge = {
    title: "",
    description: ""
  };

  $scope.nb_play = 0;

  $scope.getPledge = function () {
    var nb_play = $scope.nb_play;

    /*if(nb_play !== 0){
      $scope.history_pledges_play.unshift({
        'turn': nb_play
      });
    }*/

    generateRandomPledges(4);

    $scope.show_new_turn = false;
    /* $scope.nb_play += 1;*/
  };

  $scope.reveal = function (index) {
    shot_played++;
    $scope.current_pledges[index].reveal = ' show';
    $scope.display_pledge = $scope.current_pledges[index].data;
    $scope.actual_class = (' is-card-[number]').replace('[number]', index + 1);

    if(shot_played >= 4){
      $scope.show_new_turn = true;
      shot_played = 0;
    }
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
      pledges.push({
        data: pledge,
        reveal : ''
      });
    }

    // Set in scope.
    $scope.current_pledges = pledges;
    $scope.current_categories = categories;
  };
});