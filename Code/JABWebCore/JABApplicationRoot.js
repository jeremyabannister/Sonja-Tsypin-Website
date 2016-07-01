class JABApplicationRoot extends JABView {

	constructor (customId) {

		super(customId)
		
		this.updateViewString()
		$('body').append(this.view)
		$(this.selector).css({
			'position':'absolute',
		})

		this.laboratoryEnabled = false


		// UI
		this.laboratory
	}


	updateAllUI () {
		super.updateAllUI()

		updateSizeClassForWidth(this.width)
		// temporarilyEnableAnimations()

	}



}
