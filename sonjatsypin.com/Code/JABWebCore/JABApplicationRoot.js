class JABApplicationRoot extends JABView {

	constructor (customId) {

		super(customId)
		
		this.updateViewString()
		$(this.selector).css({
			'position':'absolute',
		})

		this.laboratoryEnabled = false


		// UI
		this.laboratory
		
		// Image Bank
		
	}


	updateAllUI () {
		super.updateAllUI()

		updateSizeClassForWidth(this.width)
		// temporarilyEnableAnimations()

	}



}
