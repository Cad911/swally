describe('Launch the taptap Game', ()->
	it('should lauch a game',()->
		browser().navigateTo('/')
		sleep(5)
		element('.card-area>form>button').click();
	)
	it('should show the layout taptap game', ()->

	)
)