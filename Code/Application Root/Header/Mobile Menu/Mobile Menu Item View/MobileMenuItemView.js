class MobileMenuItemView extends JABView {
	
	constructor (customId, menuItem) {
		super(customId)
		
		// State
		this.menuItem = menuItem
		
		// Parameters
		this.parameters = {
			sideBufferForContent: 27,
		}
		
		// UI
		this.label = new UILabel('Label')
		this.underline = new JABView('Underline')
		
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
		this.addLabel()
		this.addUnderline()
	}
	
	
	addLabel () {
		this.addSubview(this.label)
	}
	
	addUnderline () {
		this.addSubview(this.underline)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureLabel()
		this.positionLabel()
		
		
		this.configureUnderline()
		this.positionUnderline()
	}
	
	
	
	
	
	
	// Label
	configureLabel () {
		var view = this.label
		
		view.text = this.menuItem.displayTitle
		view.fontFamily = 'siteFont'
		view.fontSize = 16
		view.textColor = 'white'
		view.letterSpacing = 3
		view.lineHeight = this.height
		view.lineHeightUnit = 'px'
		
		view.updateAllUI()
		
	}
	
	positionLabel () {
		var view = this.label
		var newFrame = new CGRect()
		
		if (view.text != null) {
			var size = view.font.sizeOfString(view.text)
								
			newFrame.size.width = size.width
			newFrame.size.height = this.height

			newFrame.origin.x = this.width - newFrame.size.width - this.parameters.sideBufferForContent
			newFrame.origin.y = 0
		}
							
		view.frame = newFrame
	}
	
	
	
	// Underline
	configureUnderline () {
		var view = this.underline
		
		view.backgroundColor = '#888888'
		view.opacity = 0
	}
	
	positionUnderline () {
		var view = this.underline
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - (2 * this.parameters.sideBufferForContent)
		newFrame.size.height = 1

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.height - newFrame.size.height
							
		view.frame = newFrame
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