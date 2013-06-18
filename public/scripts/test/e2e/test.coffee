'use strict';

describe('Launch the taptap Game', ()->
	beforeEach(()->
		browser().navigateTo('/mobile/')

		expect(browser().location().path()).toBe('/');
	)

	it('should lauch a game',(done)->
		element('.card-area>form>button').click();
		expect(repeater('.card-area div.card').count()).toBeGreaterThan(0)
	)

	it('should upturn the card', ()->
		element('.card-area>form>button').click();
		expect(repeater('.card-area>div.span3.show').count()).toEqual(0)
		element('.card-area>div.span3:first>div.card').click()
		expect(repeater('.card-area>div.span3.show').count()).toEqual(1)
	)


	it('should show the tap tap game layout', ()->
		element('.card-area>form>button').click();
		element('.card-area div.card:first').click()
		element('.card-area>div.span3:first>div.card').click()

		sleep(2)
	)
)