class JABButton extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		// UI
	}
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.startEventListeners()
	}
	
	
	
	updateAllUI () {
		super.updateAllUI()
	}
	
	
	
	//
	// UI
	//
	
	//
	// Event Listeners
	//
	
	startEventListeners () {
		$(this.selector).click(function() {
			this.parent.buttonWasClicked(this)
		})
	}
	
	//
	// Actions
	//
	
}