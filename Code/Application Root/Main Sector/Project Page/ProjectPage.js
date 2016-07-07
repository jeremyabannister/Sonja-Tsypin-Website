class ProjectPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: null,
		}
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			vimeoViewMinimumDistanceFromHeader: 40,
			vimeoViewVerticalAdjustment: -4,
		}
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
		
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
		this.addVimeoView()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
	}
	
	
	
	
	// Vimeo View
	configureVimeoView () {
		
		var view = this.vimeoView
		
		if (this.state.projectDataBundle != null) {
			view.vimeoId = this.state.projectDataBundle.vimeoId
		} else {
			view.vimeoId = null
		}
		
	}
	
	positionVimeoView () {
		
		var aspectRatio = (9.0/16.0)
		if (this.state.projectDataBundle != null) {
			aspectRatio = this.state.projectDataBundle.vimeoHeightToWidth
		}
		
		var view = this.vimeoView
		var newFrame = new CGRect()

		newFrame.size.width = applicationRoot.contentWidth * 0.9
		newFrame.size.height = newFrame.size.width * aspectRatio

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height)/2 + this.parameters.vimeoViewVerticalAdjustment
		
		if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader) {
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader
		}


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