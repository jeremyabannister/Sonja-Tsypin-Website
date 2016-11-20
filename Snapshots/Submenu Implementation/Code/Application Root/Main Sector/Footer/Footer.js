class Footer extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 50
		
		// Parameters
		this.leftBufferForCopyrightLabel = 10
		
		this.sizeOfButtons = 20
		this.rightBufferForRightButton = this.leftBufferForCopyrightLabel
		this.betweenBufferForButtons = 20
		
		this.buttonImages = ['./Resources/Images/Buttons/Instagram Button.png', './Resources/Images/Buttons/Email Button.png']
		
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
		
	    view.text = 'SONJA TSYPIN \u00a9 2016'
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

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2
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
			
			var view = this.buttons[i]
			var newFrame = new CGRect()
								
			newFrame.size.width = this.sizeOfButtons
			newFrame.size.height = newFrame.size.width

			newFrame.origin.x = (this.width - (this.width - applicationRoot.contentWidth)/2 - newFrame.size.width - this.rightBufferForRightButton) - (i * (this.sizeOfButtons + this.betweenBufferForButtons))
			newFrame.origin.y = 0
								
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
	
}