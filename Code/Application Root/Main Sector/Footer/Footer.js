class Footer extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 50
		
		// Parameters
		this.leftBufferForCopyrightLabel = 5
		
		this.sizeOfButtons = 14
		
		this.buttonWidthToHeights = [1, 1, 1.32941176]
		this.buttonHeightAdjustments = [0, 1, -2]
		this.buttonSeparationAdjustments = [3, 2]
		this.buttonYAdjustments = [0, 1, -2]
		
		this.rightBufferForRightButton = this.leftBufferForCopyrightLabel
		this.betweenBufferForButtons = 10
		
		this.buttonImages = ['./Resources/Images/Buttons/Instagram Button.png', './Resources/Images/Buttons/Art Button.png', './Resources/Images/Buttons/Email Button.png']
		
		// UI
		this.copyrightLabel = new UILabel('CopyrightLabel')
		
		this.buttons = []
		for (var i = 0; i < this.buttonImages.length; i++) {
			this.buttons.push(new JABImageView())
		}
		
		
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
		
		this.addCopyrightLabel()
		
		this.addButtons()
	}
	
	
	addCopyrightLabel () {
		this.addSubview(this.copyrightLabel)
	}
	
	
	
	addButtons () {
		for (var i = 0; i < this.buttons.length; i++) {
			this.addSubview(this.buttons[i])
		}
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureCopyrightLabel()
		this.positionCopyrightLabel()
		
		
		this.configureButtons()
		this.positionButtons()
		
	}
	
	
	// Copyright Label
	configureCopyrightLabel () {
		
		var view = this.copyrightLabel
		
	    view.text = "SONJA TSYPIN <span style='color:ffff00'>\u00a9</span> 2016"
	    view.textColor = 'white'
		view.fontFamily = 'siteFont'
		view.fontWeight = 'bold'
	    view.fontSize = 10
	    view.fontWeight = 300
	    view.letterSpacing = 1.5
		
	}
	
	positionCopyrightLabel () {
		
		var view = this.copyrightLabel
		var newFrame = new CGRect()
		var size = this.copyrightLabel.font.sizeOfString(this.copyrightLabel.text)
		
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2 + this.leftBufferForCopyrightLabel
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	// Buttons
	configureButtons () {
		
		for (var i = 0; i < this.buttons.length; i++) {
			var view = this.buttons[i]
			
			view.clickable = true
			view.src = this.buttonImages[i]
			view.cursor = 'pointer'
		}
		
	}
	
	positionButtons () {
		
		for (var i = 0; i < this.buttons.length; i++) {
			
			var buttonIndex = this.buttons.length - 1 - i
			var view = this.buttons[buttonIndex]
			var newFrame = new CGRect()
			
			newFrame.size.height = this.sizeOfButtons + this.buttonHeightAdjustments[buttonIndex]
			newFrame.size.width = newFrame.size.height * this.buttonWidthToHeights[buttonIndex]
			
			var separationAdjustment = 0
			if (buttonIndex != 2) {
				separationAdjustment = this.buttonSeparationAdjustments[buttonIndex]
			}
			
			newFrame.origin.x = (this.width - (this.width - applicationRoot.contentWidth)/2 - newFrame.size.width - this.rightBufferForRightButton) - (i * (this.sizeOfButtons + this.betweenBufferForButtons)) - separationAdjustment
			newFrame.origin.y = (this.height - newFrame.size.height)/2 + this.buttonYAdjustments[buttonIndex]
								
			view.frame = newFrame
		}
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
		if (view == this.buttons[0]) {
			window.open('http://www.instagram.com/sonjatsypin')
		} else if (view == this.buttons[1]) {
			window.open('http://www.sonjatsypin.weebly.com')
		} else if (view == this.buttons[2]) {
			this.parent.footerMailButtonWasClicked(this)
		}
	}
	
}