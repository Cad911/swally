window.ourApp.controller('TapTapCtrl', ['$scope','Pledges', 'sharedServices' ,'$q', ($scope, Pledges, sharedServices, $q)->
  
  $scope.nb_player = 2
  $scope.actual_player = 1

  $scope.win_player = false
  $scope.score = {}
  $scope.is_playing = false

  $scope.display_winner = 'none'
  $scope.display_tap_tap = 'none';
  $scope.count_down = 3


  for i in [1..$scope.nb_player]
    $scope.score[i] = 1

  # FUNCTION WHICH INIT THE VAR FOR THE BEGINNING
  $scope.initVar = ()->
    $scope.nb_player = 4
    $scope.actual_player = 1

    $scope.score = {}
    $scope.is_playing = false

    $scope.display_winner = 'none'
    $scope.display_tap_tap = 'none';

    for i in [1..$scope.nb_player]
      $scope.score[i] = 1

  # $scope.initTapTap = ()->
  #   $scope.display_tap_tap = 'block';


  # FUNCTION WHICH DETERMINE THE BEGINNING OF THE GAME OF ONE PLAYER
  $scope.playTapTap = ()->
    $scope.is_playing = true
    interval_ = setInterval(()->
      $scope.$apply($scope.count_down--)
      if $scope.count_down == 0
        setTimeout(()->
          $scope.count_down = 3
          $scope.$apply($scope.showScore())
        , 2000)
        clearInterval(interval_)
    ,1000)

    


  # ADD SCORE WHEN PLAYER CLICK AND WHEN CAN PLAYING
  $scope.addTapTap = ()->
    if $scope.is_playing && $scope.count_down == 0
      $scope.score[$scope.actual_player]++


  # FUNCTION WHICH SHOW THE SCORE AND DEFINE IF THE GAME IS OVER OR NOT IF ALL PLAYER PLAYED
  $scope.showScore = ()->
    $scope.is_playing = false
    
    if $scope.actual_player == $scope.nb_player
      $scope.endGame()
    else
      actual_player_next = $scope.actual_player
      
      # CONTINUE HERE FOR PLAYER WHEN SCORE IS EQUAL
      for i in [(parseInt($scope.actual_player) + 1)..$scope.nb_player]
        if $scope.score[i]?
          actual_player_next = i
          break
        else
          if $scope.nb_player == i
            $scope.endGame()
            return true

      $scope.actual_player  = actual_player_next


  # FUNCTION WHICH CALCULATE THE WINNER AND DEFINE IF SOME PLAYER ARE THE SAME SCORE
  $scope.endGame = ()->
    higher_score = 0
    score_equal = false
    local_win_player = 1
    for player, score of $scope.score
      if score > higher_score
        local_win_player = parseInt(player)
        higher_score = parseInt(score)

    score_equal_tab = {}
    score_equal_tab[local_win_player] = higher_score
    $scope.actual_player = local_win_player
    # VERIFY IF SCORE EQUAL
    for player, score of $scope.score
      player = parseInt(player)
      score = parseInt(score)
      if score == higher_score && local_win_player != player
        score_equal_tab[player] = higher_score
        score_equal = true
        $scope.actual_player = player if local_win_player > player
        break



    
    if score_equal
      $scope.score = score_equal_tab
    else
      $scope.win_player = local_win_player
      $scope.display_winner = 'block'
      
      setTimeout(()->
        sharedServices.hideMiniGame()
        $scope.$apply($scope.initVar())
      , 2000)


])