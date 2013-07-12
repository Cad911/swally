window.ourApp.factory('sharedServices', ['$rootScope', ($rootScope)->
	sharedVar = {}

	sharedVar.show_mini_game = false
	sharedVar.current_mini_game = []

	sharedVar.showMiniGame = (current_mini_game)->
		this.show_mini_game = true
		this.current_mini_game = current_mini_game
		$rootScope.$broadcast('show-mini-game')

	sharedVar.hideMiniGame = ()->
		this.show_mini_game = false
		this.current_mini_game = {}
		$rootScope.$broadcast('hide-mini-game')
		

	sharedVar.sharedScrollToZero = ()->
		$rootScope.$broadcast('scroll-to-zero')
		
	sharedVar
])