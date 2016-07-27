class ProjectPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: null,
			
			handlingClick: false,
		}
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			projectUIGroupMinimumDistanceFromHeader: 40,
			projectUIGroupVerticalAdjustment: -4,
			
			
		}
		
		// UI
		this.projectUIGroup = new ProjectUIGroup('ProjectUIGroup')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.parameters.rightBufferForNavigationButtons = this.parameters.leftBufferForTitleLabel
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addProjectUIGroup()
		
	}
	
	
	addProjectUIGroup () {
		this.addSubview(this.projectUIGroup)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureProjectUIGroup()
		this.positionProjectUIGroup()
		
		
	}
	
	
	
	
	// Project UI Group
	configureProjectUIGroup () {
		
		var view = this.projectUIGroup
		
		view.state = {
			projectDataBundle: this.state.projectDataBundle
		}
		
		view.updateAllUI()
		
	}
	
	positionProjectUIGroup () {
		
		
		var view = this.projectUIGroup
		var newFrame = new CGRect()

		newFrame.size.width = applicationRoot.contentWidth * 0.9
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height)/2 + this.parameters.projectUIGroupVerticalAdjustment
		
		if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.projectUIGroupMinimumDistanceFromHeader) {
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.projectUIGroupMinimumDistanceFromHeader
		}
		


		view.frame = newFrame
		
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	// Playback
	pause () {
		this.projectUIGroup.pause()
	}
	
	
	//
	// Delegate
	//
	
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		
	}
	
	
	// Video Navigation Buttons
	videoNavigationButtonsPrevButtonWasClicked (videoNavigationButtons) {
		this.state.handlingClick = true
	}
	
	videoNavigationButtonsNextButtonWasClicked (videoNavigationButtons) {
		this.state.handlingClick = true
	}
	
}