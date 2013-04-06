'use strict';

swallyApp.controller('MainCtrl', function ($scope, Pledges) {
  var shot_played = 0,
      played_card = [],
      nb_card     = 4;

  $scope.pledges = Pledges.getAll(function () {
    $scope.pledges = $scope.pledges.data;
  });

  $scope.current_pledges = [];
  $scope.current_categories = [];
  $scope.show_new_turn = true;
  $scope.display_pledge = {
    title: "",
    description: ""
  };

  $scope.nb_play = 0;

  $scope.getPledge = function () {
    generateRandomPledges(nb_card);

    played_card = [];
    $scope.show_new_turn = false;
  };

  $scope.reveal = function (index_card) {
    console.log(index_card);
    if(played_card[index_card] == undefined) {
      shot_played++;

      var pledge = $scope.current_pledges[index_card];
      $scope.current_pledges[index_card].reveal = ' show';
      $scope.display_pledge = pledge.data;
      $scope.actual_class = (' is-card-[number]').replace('[number]', index_card + 1);

      played_card[index_card] = pledge;
      for(var i = 0; i < nb_card; i++) {
        console.log($scope.current_categories[i]);
        console.log(index_card);
        if($scope.current_categories[i].index == index_card) {
          $scope.current_categories[i].played = true;
        }
      }
      if(shot_played >= 4){
        $scope.show_new_turn = true;
        shot_played = 0;
      }
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
      categories[index] = {
        data: pledge.category,
        index : i - 1,
        played: false
      };
      pledges.push({
        data: pledge,
        reveal : ''
      });
    }

    console.log(categories);
    // Set in scope.
    $scope.current_pledges = pledges;
    $scope.current_categories = categories;
  };
});