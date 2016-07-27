class VideoNavigationButtons extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		
		// Parameters
		this.requiredWidth = 110
		this.requiredHeight = 13
		
		
		this.parameters = {
			fontSizeForButtons: 13,
			innerBufferForButtons: 5,
		}
		
		// UI
		this.divider = new JABView('Divider')
		this.prevButton = new UILabel('PrevButton')
		this.nextButton = new UILabel('NextButton')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addDivider()
		this.addPrevButton()
		this.addNextButton()
		
	}
	
	addDivider () {
		this.addSubview(this.divider)
	}
	
	addPrevButton () {
		this.addSubview(this.prevButton)
	}
	
	addNextButton () {
		this.addSubview(this.nextButton)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureDivider()
		this.positionDivider()
		
		this.configurePrevButton()
		this.positionPrevButton()
		
		this.configureNextButton()
		this.positionNextButton()
		
	}
	
	
	
	
	
	// Divider
	configureDivider () {
		
		var view = this.divider
		
		view.backgroundColor = 'white'
	}
	
	positionDivider () {
		
		var view = this.divider
		var newFrame = new CGRect()
							
		newFrame.size.width = 1
		newFrame.size.height = this.parameters.fontSizeForButtons + 8

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	// Prev Button
	configurePrevButton () {
		
		var view = this.prevButton
		
		view.text = 'PREV'
		view.fontSize = this.parameters.fontSizeForButtons
		view.textColor = 'white'
		view.textAlign = 'center'
		view.letterSpacing = 1.5
		
		
		view.clickable = true
		view.cursor = 'pointer'
		
	}
	
	positionPrevButton () {
		
		var view = this.prevButton
		var newFrame = new CGRect()
		var size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.divider.x - newFrame.size.width - this.parameters.innerBufferForButtons
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	// Next Button
	configureNextButton () {
		
		var view = this.nextButton
		
		view.text = 'NEXT'
		view.fontSize = this.parameters.fontSizeForButtons
		view.textColor = 'white'
		view.textAlign = 'center'
		view.letterSpacing = 1.5
		
		view.clickable = true
		view.cursor = 'pointer'
		
	}
	
	positionNextButton () {
		
		var view = this.nextButton
		var newFrame = new CGRect()
		var size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.divider.right + this.parameters.innerBufferForButtons
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
		this.requiredWidth = this.nextButton.right - this.prevButton.left
		this.requiredHeight = this.nextButton.height
	}
	
	
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
	
	// JABView
	viewWasClicked (view) {
		if (view == this.prevButton) {
			this.parent.videoNavigationButtonsPrevButtonWasClicked(this)
		} else if (view == this.nextButton) {
			this.parent.videoNavigationButtonsNextButtonWasClicked(this)
		}
	}
	
}