// Generated by CoffeeScript 1.6.3
(function() {
  window.ourApp.controller('GamesCtrl', [
    '$scope', 'sharedServices', function($scope, sharedServices) {
      $scope.show_mini_game = false;
      $scope.current_mini_game = {};
      return $scope.$on('show-mini-game', function() {
        $scope.show_mini_game = sharedServices.show_mini_game;
        return $scope.current_mini_game = sharedServices.current_mini_game;
      });
    }
  ]);

  window.ourApp.controller('TapTapCtrl', [
    '$scope', 'Pleges', 'sharedServices', '$q', function($scope, Pledges, sharedServices, $q) {
      var i, _i, _ref;
      $scope.nb_player = 2;
      $scope.actual_player = 1;
      $scope.win_player = false;
      $scope.score = {};
      $scope.is_playing = false;
      $scope.display_winner = 'none';
      $scope.display_tap_tap = 'none';
      $scope.count_down = 3;
      for (i = _i = 1, _ref = $scope.nb_player; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        $scope.score[i] = 1;
      }
      $scope.initVar = function() {
        var _j, _ref1, _results;
        $scope.nb_player = 4;
        $scope.actual_player = 1;
        $scope.score = {};
        $scope.is_playing = false;
        $scope.display_winner = 'none';
        $scope.display_tap_tap = 'none';
        _results = [];
        for (i = _j = 1, _ref1 = $scope.nb_player; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          _results.push($scope.score[i] = 1);
        }
        return _results;
      };
      $scope.playTapTap = function() {
        var interval_;
        $scope.is_playing = true;
        return interval_ = setInterval(function() {
          $scope.$apply($scope.count_down--);
          if ($scope.count_down === 0) {
            setTimeout(function() {
              $scope.count_down = 3;
              return $scope.$apply($scope.showScore());
            }, 2000);
            return clearInterval(interval_);
          }
        }, 1000);
      };
      $scope.addTapTap = function() {
        if ($scope.is_playing && $scope.count_down === 0) {
          return $scope.score[$scope.actual_player]++;
        }
      };
      $scope.showScore = function() {
        var actual_player_next, _j, _ref1, _ref2;
        $scope.is_playing = false;
        if ($scope.actual_player === $scope.nb_player) {
          return $scope.endGame();
        } else {
          actual_player_next = $scope.actual_player;
          for (i = _j = _ref1 = parseInt($scope.actual_player) + 1, _ref2 = $scope.nb_player; _ref1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = _ref1 <= _ref2 ? ++_j : --_j) {
            if ($scope.score[i] != null) {
              actual_player_next = i;
              break;
            } else {
              if ($scope.nb_player === i) {
                $scope.endGame();
                return true;
              }
            }
          }
          return $scope.actual_player = actual_player_next;
        }
      };
      return $scope.endGame = function() {
        var higher_score, local_win_player, player, score, score_equal, score_equal_tab, _ref1, _ref2;
        higher_score = 0;
        score_equal = false;
        local_win_player = 1;
        _ref1 = $scope.score;
        for (player in _ref1) {
          score = _ref1[player];
          if (score > higher_score) {
            local_win_player = parseInt(player);
            higher_score = parseInt(score);
          }
        }
        score_equal_tab = {};
        score_equal_tab[local_win_player] = higher_score;
        $scope.actual_player = local_win_player;
        _ref2 = $scope.score;
        for (player in _ref2) {
          score = _ref2[player];
          player = parseInt(player);
          score = parseInt(score);
          if (score === higher_score && local_win_player !== player) {
            score_equal_tab[player] = higher_score;
            score_equal = true;
            if (local_win_player > player) {
              $scope.actual_player = player;
            }
            break;
          }
        }
        if (score_equal) {
          return $scope.score = score_equal_tab;
        } else {
          $scope.win_player = local_win_player;
          $scope.display_winner = 'block';
          return setTimeout(function() {
            sharedServices.hideMiniGame();
            return $scope.$apply($scope.initVar());
          }, 2000);
        }
      };
    }
  ]);

  window.ourApp.controller('PledgesCtrl', [
    '$scope', 'Pledges', 'sharedServices', '$q', '$http', function($scope, Pledges, sharedServices, $q, $http) {
      var generateRandomPledges, nb_card, played_card, shot_played;
      shot_played = 0;
      played_card = [];
      nb_card = 4;
      $scope.pledges = Pledges.getAll(function() {
        $scope.pledges = $scope.pledges.data;
        return console.log($scope.pledges);
      });
      $scope.pledges = Pledges.query();
      $scope.current_pledges = [];
      $scope.current_categories = [];
      $scope.show_new_turn = true;
      $scope.first_shot = true;
      $scope.display_pledge = {
        title: "",
        description: ""
      };
      $scope.nb_play = 0;
      $scope.current_mini_game = [];
      $scope.show_mini_game = false;
      $scope.$on('show-mini-game', function() {
        $scope.show_mini_game = sharedServices.show_mini_game;
        return $scope.current_mini_game = sharedServices.current_mini_game;
      });
      $scope.getPledge = function() {
        generateRandomPledges(nb_card);
        played_card = [];
        $scope.show_new_turn = false;
        return $scope.first_shot = false;
      };
      $scope.reveal = function(index_card) {
        var i, pledge, _i, _ref;
        if (played_card[index_card] === void 0) {
          shot_played++;
          pledge = $scope.current_pledges[index_card];
          $scope.current_pledges[index_card].reveal = ' show';
          $scope.display_pledge = pledge.data;
          $scope.actual_class = ' is-card-[number]'.replace('[number]', index_card + 1);
          played_card[index_card] = pledge;
          for (i = _i = 0, _ref = nb_card - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if ($scope.current_categories[i].index === index_card) {
              $scope.current_categories[i].played = true;
            }
          }
          if (shot_played >= nb_card) {
            $scope.show_new_turn = true;
            shot_played = 0;
          }
          if ($scope.current_pledges[index_card].data.category.title === 'Mini-jeu') {
            return sharedServices.showMiniGame({
              url: './views/_game.html'
            });
          }
        }
      };
      return generateRandomPledges = function(number) {
        var all_pledges, categories, i, index, pledge, pledges, pledges_length, _i;
        all_pledges = $scope.pledges;
        pledges_length = all_pledges.length;
        categories = [];
        pledges = [];
        for (i = _i = 1; 1 <= number ? _i <= number : _i >= number; i = 1 <= number ? ++_i : --_i) {
          pledge = all_pledges[Math.floor(Math.random() * pledges_length)];
          index = Math.floor(Math.random() * number);
          while ((categories[index] != null) && categories[index] !== void 0) {
            index = Math.floor(Math.random() * number);
          }
          categories[index] = {
            data: pledge.category,
            index: i - 1,
            played: false
          };
          pledges.push({
            data: pledge,
            reveal: ''
          });
        }
        $scope.current_pledges = pledges;
        return $scope.current_categories = categories;
      };
    }
  ]);

}).call(this);
