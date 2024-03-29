// Generated by CoffeeScript 1.6.3
(function() {
  window.ourApp.controller('GamesCtrl', [
    '$scope', 'sharedServices', function($scope, sharedServices) {
      $scope.show_mini_game = false;
      $scope.current_mini_game = {};
      $scope.$on('show-mini-game', function() {
        $scope.show_mini_game = sharedServices.show_mini_game;
        return $scope.current_mini_game = sharedServices.current_mini_game;
      });
      return $scope.$on('hide-mini-game', function() {
        $scope.show_mini_game = sharedServices.show_mini_game;
        return $scope.current_mini_game = sharedServices.current_mini_game;
      });
    }
  ]);

  window.ourApp.controller('globalCtrl', [
    '$scope', function($scope) {
      $scope.is_first_screen = true;
      return $scope.nextScreen = function() {
        return $scope.is_first_screen = false;
      };
    }
  ]);

  window.ourApp.controller('ScrollGameCtrl', [
    '$scope', 'Pledges', 'sharedServices', '$q', 'Stats', function($scope, Pledges, sharedServices, $q, Stats) {
      var distance, i, initCounter, timer, _i, _ref;
      $scope.nb_player = 2;
      $scope.actual_player = 1;
      $scope.previous_player = 1;
      $scope.score_are_equal = false;
      $scope.win_player = false;
      $scope.score = {};
      $scope.is_playing = false;
      $scope.level_jauge = 6;
      $scope.count_down = 3;
      $scope.counter = [];
      $scope.real_distance = 0;
      distance = 0;
      $scope.step = 1;
      timer = 5000;
      $scope.timer_show = timer / 1000;
      for (i = _i = 1, _ref = $scope.nb_player; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        $scope.score[i] = 0;
      }
      $scope.initVar = function() {
        var _j, _ref1, _results;
        $scope.nb_player = 2;
        $scope.actual_player = 1;
        $scope.previous_player = 1;
        $scope.score_are_equal = false;
        $scope.win_player = false;
        $scope.score = {};
        $scope.is_playing = false;
        $scope.level_jauge = 6;
        $scope.count_down = 3;
        $scope.step = 1;
        timer = 5000;
        $scope.timer_show = timer / 1000;
        initCounter();
        _results = [];
        for (i = _j = 1, _ref1 = $scope.nb_player; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          _results.push($scope.score[i] = 0);
        }
        return _results;
      };
      $scope.checkStep = function(right_step) {
        return right_step === $scope.step;
      };
      $scope.playTapTap = function() {
        var interval_;
        $scope.score_are_equal = false;
        $scope.step = 2;
        $scope.is_playing = true;
        return interval_ = setInterval(function() {
          var timer_intval;
          $scope.$apply($scope.count_down--);
          if ($scope.count_down === 0) {
            $scope.$apply($scope.step = 3);
            timer_intval = setInterval(function() {
              $scope.$apply($scope.timer_show = Math.round(($scope.timer_show - 0.1) * 100) / 100);
              if ($scope.timer_show === 0) {
                clearInterval(timer_intval);
                $scope.count_down = 3;
                $scope.$apply($scope.step = 0);
                if ($scope.actual_player === $scope.nb_player) {
                  return setTimeout(function() {
                    console.log('end');
                    return $scope.$apply($scope.endGame());
                  }, 200);
                } else {
                  return setTimeout(function() {
                    return $scope.$apply($scope.showScore());
                  }, 300);
                }
              }
            }, 100);
            return clearInterval(interval_);
          }
        }, 1000);
      };
      initCounter = function() {
        var _j, _results;
        distance = 0;
        $scope.counter = [];
        _results = [];
        for (i = _j = 0; _j <= 15; i = ++_j) {
          $scope.counter.push({
            distance: distance
          });
          _results.push(distance += 100);
        }
        return _results;
      };
      $scope.saveProgress = function() {
        var _j, _results;
        if ($scope.is_playing && $scope.count_down === 0) {
          _results = [];
          for (i = _j = 0; _j <= 5; i = ++_j) {
            $scope.counter.push({
              distance: distance
            });
            _results.push(distance += 100);
          }
          return _results;
        }
      };
      $scope.showScore = function() {
        var actual_player_next, _j, _ref1, _ref2;
        $scope.score[$scope.actual_player] = $scope.real_distance;
        sharedServices.sharedScrollToZero();
        initCounter();
        $scope.timer_show = timer / 1000;
        $scope.step = 1;
        $scope.is_playing = false;
        $scope.previous_player = $scope.actual_player;
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
      $scope.endGame = function() {
        var higher_score, local_win_player, player, score, score_equal_tab, _ref1, _ref2;
        $scope.score[$scope.actual_player] = $scope.real_distance;
        sharedServices.sharedScrollToZero();
        initCounter();
        $scope.timer_show = timer / 1000;
        $scope.is_playing = false;
        higher_score = 0;
        $scope.score_are_equal = false;
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
            $scope.score_are_equal = true;
            score_equal_tab[player] = higher_score;
            if (local_win_player > player) {
              $scope.actual_player = player;
            }
            break;
          }
        }
        if ($scope.score_are_equal) {
          return $scope.score = score_equal_tab;
        } else {
          $scope.step = 4;
          return $scope.win_player = local_win_player;
        }
      };
      $scope.gameOver = function() {
        sharedServices.hideMiniGame();
        return $scope.initVar();
      };
      $scope.checkForScreen = function(screen) {
        if (screen === 'intro') {
          return $scope.actual_player === 1 && !$scope.score_are_equal;
        } else if (screen === 'intermediate') {
          return $scope.actual_player !== 1 || $scope.score_are_equal;
        }
      };
      $scope.jauge = function(interval_clic) {
        var intval_test, nb_clic;
        nb_clic = $scope.score[$scope.actual_player];
        if (interval_clic > 1000) {
          $scope.level_jauge = 6;
        } else if (interval_clic < 999 && interval_clic > 800) {
          $scope.level_jauge = 5;
        } else if (interval_clic < 799 && interval_clic > 500) {
          $scope.level_jauge = 4;
        } else if (interval_clic < 499 && interval_clic > 250) {
          $scope.level_jauge = 3;
        } else if (interval_clic < 249 && interval_clic > 100) {
          $scope.level_jauge = 2;
        } else if (interval_clic < 99) {
          $scope.level_jauge = 1;
        }
        return intval_test = setInterval(function() {
          if (nb_clic === $scope.score[$scope.actual_player] && $scope.level_jauge < 6) {
            return $scope.$apply($scope.level_jauge++);
          } else {
            return clearInterval(intval_test);
          }
        }, interval_clic);
      };
      return initCounter();
    }
  ]);

  window.ourApp.controller('TapTapCtrl', [
    '$scope', 'Pledges', 'sharedServices', '$q', function($scope, Pledges, sharedServices, $q) {
      var date_before, date_now, i, timer, _i, _ref;
      $scope.nb_player = 2;
      $scope.actual_player = 1;
      $scope.previous_player = 1;
      $scope.score_are_equal = false;
      $scope.win_player = false;
      $scope.score = {};
      $scope.is_playing = false;
      $scope.level_jauge = 6;
      $scope.count_down = 3;
      $scope.step = 1;
      timer = 5000;
      $scope.timer_show = timer / 1000;
      for (i = _i = 1, _ref = $scope.nb_player; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        $scope.score[i] = 0;
      }
      $scope.initVar = function() {
        var _j, _ref1, _results;
        $scope.nb_player = 2;
        $scope.actual_player = 1;
        $scope.previous_player = 1;
        $scope.score_are_equal = false;
        $scope.win_player = false;
        $scope.score = {};
        $scope.is_playing = false;
        $scope.level_jauge = 6;
        $scope.count_down = 3;
        $scope.step = 1;
        timer = 5000;
        $scope.timer_show = timer / 1000;
        _results = [];
        for (i = _j = 1, _ref1 = $scope.nb_player; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          _results.push($scope.score[i] = 0);
        }
        return _results;
      };
      $scope.checkStep = function(right_step) {
        return right_step === $scope.step;
      };
      $scope.playTapTap = function() {
        var interval_;
        $scope.score_are_equal = false;
        $scope.step = 2;
        $scope.is_playing = true;
        return interval_ = setInterval(function() {
          var timer_intval;
          $scope.$apply($scope.count_down--);
          if ($scope.count_down === 0) {
            $scope.$apply($scope.step = 3);
            timer_intval = setInterval(function() {
              $scope.$apply($scope.timer_show = Math.round(($scope.timer_show - 0.1) * 100) / 100);
              if ($scope.timer_show === 0) {
                clearInterval(timer_intval);
                $scope.count_down = 3;
                $scope.$apply($scope.step = 0);
                if ($scope.actual_player === $scope.nb_player) {
                  return setTimeout(function() {
                    console.log('end');
                    return $scope.$apply($scope.endGame());
                  }, 200);
                } else {
                  return setTimeout(function() {
                    return $scope.$apply($scope.showScore());
                  }, 300);
                }
              }
            }, 100);
            return clearInterval(interval_);
          }
        }, 1000);
      };
      date_now = new Date();
      date_before = new Date();
      $scope.addTapTap = function() {
        var interval_clic;
        date_now = new Date();
        if ($scope.is_playing && $scope.count_down === 0) {
          $scope.score[$scope.actual_player]++;
          interval_clic = date_now - date_before;
          $scope.jauge(interval_clic);
          return date_before = date_now;
        }
      };
      $scope.showScore = function() {
        var actual_player_next, _j, _ref1, _ref2;
        $scope.timer_show = timer / 1000;
        $scope.step = 1;
        $scope.is_playing = false;
        $scope.previous_player = $scope.actual_player;
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
      };
      $scope.endGame = function() {
        var higher_score, local_win_player, player, score, score_equal_tab, _ref1, _ref2;
        $scope.timer_show = timer / 1000;
        $scope.is_playing = false;
        higher_score = 0;
        $scope.score_are_equal = false;
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
            $scope.score_are_equal = true;
            score_equal_tab[player] = higher_score;
            if (local_win_player > player) {
              $scope.actual_player = player;
            }
            break;
          }
        }
        if ($scope.score_are_equal) {
          $scope.step = 1;
          return $scope.score = score_equal_tab;
        } else {
          $scope.step = 4;
          return $scope.win_player = local_win_player;
        }
      };
      $scope.gameOver = function() {
        sharedServices.hideMiniGame();
        return $scope.initVar();
      };
      $scope.checkForScreen = function(screen) {
        if (screen === 'intro') {
          return $scope.actual_player === 1 && !$scope.score_are_equal;
        } else if (screen === 'intermediate') {
          return $scope.actual_player !== 1 || $scope.score_are_equal;
        }
      };
      return $scope.jauge = function(interval_clic) {
        var intval_test, nb_clic;
        nb_clic = $scope.score[$scope.actual_player];
        if (interval_clic > 1000) {
          $scope.level_jauge = 6;
        } else if (interval_clic < 999 && interval_clic > 700) {
          $scope.level_jauge = 5;
        } else if (interval_clic < 699 && interval_clic > 400) {
          $scope.level_jauge = 4;
        } else if (interval_clic < 399 && interval_clic > 200) {
          $scope.level_jauge = 3;
        } else if (interval_clic < 199 && interval_clic > 50) {
          $scope.level_jauge = 2;
        } else if (interval_clic < 49) {
          $scope.level_jauge = 1;
        }
        return intval_test = setInterval(function() {
          if (nb_clic === $scope.score[$scope.actual_player] && $scope.level_jauge < 6) {
            return $scope.$apply($scope.level_jauge++);
          } else {
            return clearInterval(intval_test);
          }
        }, interval_clic);
      };
    }
  ]);

  window.ourApp.controller('PledgesCtrl', [
    '$scope', 'Pledges', 'sharedServices', 'statsServices', function($scope, Pledges, sharedServices, statsServices) {
      var generateRandomPledges, nb_card, played_card, shot_played;
      shot_played = 0;
      played_card = [];
      nb_card = 4;
      $scope.pledges = Pledges.getAll(function() {
        $scope.pledges = $scope.pledges.data;
        $scope.getPledge();
        return true;
      });
      $scope.current_pledges = [];
      $scope.current_categories = [];
      $scope.show_new_turn = false;
      $scope.first_shot = false;
      $scope.display_pledge = {
        title: "",
        description: ""
      };
      $scope.nb_play = 0;
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
          statsServices.saveStats();
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
