class ProjectInfoTab extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.title = 'POWDER ROOM'
		
		// UI
		this.titleLabel = new UILabel('TitleLabel')
		
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
		
		this.addTitleLabel()
		
	}
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureTitleLabel()
		this.positionTitleLabel()
	}
	
	
	
	// Title Label
	configureTitleLabel () {
		
		var view = this.titleLabel
		
		view.text = this.title
		view.fontFamily = 'siteFont'
		view.fontSize = 20
		view.textColor = 'white'
		
	}
	
	positionTitleLabel () {
		var view = this.titleLabel
		var newFrame = new CGRect()
		var size = this.titleLabel.font.sizeOfString(this.titleLabel.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = 40
		newFrame.origin.y = 0
							
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