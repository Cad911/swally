window.ourApp.controller('ScrollGameCtrl', ['$scope','Pledges', 'sharedServices' ,'$q', ($scope, Pledges, sharedServices, $q)->
  
  $scope.nb_player = 2
  $scope.actual_player = 1
  $scope.previous_player = 1

  $scope.score_are_equal = false

  $scope.win_player = false
  $scope.score = {}
  $scope.is_playing = false

  # FOR THE JAUGE VIEW
  $scope.level_jauge = 6


  $scope.count_down = 1

  $scope.counter = []
  $scope.real_distance = 0
  distance = 0
  


  $scope.step = 1
  timer = 5000
  $scope.timer_show = timer / 1000

  # INIT THE SCORE TO O
  for i in [1..$scope.nb_player]
    $scope.score[i] = 0

  # FUNCTION WHICH INIT THE VAR FOR THE BEGINNING
  $scope.initVar = ()->
    $scope.nb_player = 4
    $scope.actual_player = 1

    $scope.score = {}
    $scope.is_playing = false

    $scope.display_winner = 'none'

    $scope.score_are_equal = false

    initCounter()

    # INIT THE SCORE TO O
    for i in [1..$scope.nb_player]
      $scope.score[i] = 0


  $scope.checkStep =(right_step)->
    return right_step == $scope.step

  # FUNCTION WHICH DETERMINE THE BEGINNING OF THE GAME OF ONE PLAYER
  $scope.playTapTap = ()->
    $scope.step = 2

    $scope.is_playing = true
    interval_ = setInterval(()->
      $scope.$apply($scope.count_down--)
      if $scope.count_down == 0
        $scope.$apply($scope.step = 3)
        
        # TIMER SHOW ON THE PAGE
        timer_intval = setInterval(()->
          $scope.$apply($scope.timer_show = Math.round(($scope.timer_show - 0.1)*100)/100)
        ,100)


        setTimeout(()->
          clearInterval(timer_intval)

          $scope.count_down = 3
          $scope.$apply($scope.showScore())
        , timer)
        clearInterval(interval_)
    ,1000)

    
  initCounter = ()->
    distance = 0
    $scope.counter = []
    for i in [0..15]
        $scope.counter.push({distance:distance})
        distance += 100

  # ADD SCORE WHEN PLAYER CLICK AND WHEN CAN PLAYING
  $scope.saveProgress = ()->
    if $scope.is_playing && $scope.count_down == 0
      for i in [0..5]
        $scope.counter.push({distance:distance})
        distance += 100
    


  # FUNCTION WHICH SHOW THE SCORE AND DEFINE IF THE GAME IS OVER OR NOT IF ALL PLAYER PLAYED
  $scope.showScore = ()->
    # SAVE THE DISTANCE WHICH WAS DONE
    $scope.score[$scope.actual_player] = $scope.real_distance

    # PUT THE SCROLL BAR TO ZERO
    sharedServices.sharedScrollToZero()

    initCounter()
    $scope.timer_show = timer / 1000
    $scope.step = 1
    $scope.is_playing = false

    $scope.previous_player = $scope.actual_player
    
    if $scope.actual_player == $scope.nb_player
      $scope.endGame()
    else
      actual_player_next = $scope.actual_player
      
      # CONTINUE HERE FOR PLAYER WHEN SCORE IS EQUAL
      for i in [(parseInt($scope.actual_player) + 1)..$scope.nb_player]
        # SI PLAYER IN THE GAME
        if $scope.score[i]?
          actual_player_next = i
          break
        else
          # IF NO PLAYER IN THE GAME AND LOOP IS OVER
          if $scope.nb_player == i
            $scope.endGame()
            return true

      $scope.actual_player  = actual_player_next


  # FUNCTION WHICH CALCULATE THE WINNER AND DEFINE IF SOME PLAYER ARE THE SAME SCORE
  $scope.endGame = ()->
    higher_score = 0
    $scope.score_are_equal = false
    local_win_player = 1

    # RECORD HIGHER SCORE
    # RECORD PLAYER WITH HIGHER SCORE
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
        $scope.score_are_equal = true
        score_equal_tab[player] = higher_score
        $scope.actual_player = player if local_win_player > player
        break



    # IF SCORE IS EQUAL, WE INIT VAR score WITH THE PLAYER WHO HAVE THE SAME HIGHEST SCORE
    # ELSE THE GAME IS OVER
    if $scope.score_are_equal
      $scope.score = score_equal_tab
    else
      $scope.step = 4
      $scope.win_player = local_win_player
      
      # setTimeout(()->
      #   sharedServices.hideMiniGame()
      #   $scope.$apply($scope.initVar())
      # , 2000)

  $scope.gameOver = ()->
    sharedServices.hideMiniGame()
    $scope.initVar()

  $scope.checkForScreen = (screen)->
    if screen == 'intro'
      return $scope.actual_player == 1 && !$scope.score_are_equal
    else if screen == 'intermediate'
      return $scope.actual_player != 1 || $scope.score_are_equal


  # CALCUL WHICH IS THE LEVEL OF THE JAUGE TO SHOW IN FUNCTION OF THE INTERVAL BETWEEN THE CLIC
  $scope.jauge = (interval_clic)->
    nb_clic = $scope.score[$scope.actual_player]
    if (interval_clic>1000)
        $scope.level_jauge = 6
    else if (interval_clic<999 && interval_clic>800)
        $scope.level_jauge = 5
    else if (interval_clic<799 && interval_clic>500)
        $scope.level_jauge = 4
    else if (interval_clic<499 && interval_clic>250)
        $scope.level_jauge = 3
    else if (interval_clic<249 && interval_clic>100)
        $scope.level_jauge = 2
    else if (interval_clic<99)
        $scope.level_jauge = 1
    

    intval_test = setInterval(()->
        if nb_clic == $scope.score[$scope.actual_player] && $scope.level_jauge < 6
          $scope.$apply($scope.level_jauge++)
        else
          clearInterval(intval_test)
    ,interval_clic)



  # INIT THE COUNTER WHEN THE APP IS OPEN
  initCounter()

])