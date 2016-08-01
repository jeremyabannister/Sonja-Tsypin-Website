class ProjectPage extends JABView {
	
	constructor (customId, projectDataBundles) {
		super(customId)
		
		// State
		this.state = {
			projectIndex: 0,
			
			handlingClick: false,
		}
		
		this.projectDataBundles = projectDataBundles
		this.instantUpdate = false
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			projectVideoUIGroupMinimumDistanceFromHeader: 40,
			projectVideoUIGroupVerticalAdjustment: -4,
		}
		
		// UI
		
		this.projectVideoUIGroups = []
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			if (!this.projectDataBundles[i].hidden) {
				this.projectVideoUIGroups.push(new ProjectVideoUIGroup('ProjectVideoUIGroup' + i, this.projectDataBundles[i]))
			}
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
		
		this.addProjectVideoUIGroups()
	}
	
	
	addProjectVideoUIGroups () {
		for (var i = 0; i < this.projectVideoUIGroups.length; i++) {
			this.addSubview(this.projectVideoUIGroups[i])
		}
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureProjectVideoUIGroups()
		this.positionProjectVideoUIGroups()
		
	}
	
	
	
	
	
	// Project Video UI Groups
	
	configureProjectVideoUIGroups () {
		
		for (var i = 0; i < this.projectVideoUIGroups.length; i++) {
			var view = this.projectVideoUIGroups[i]
			
			
			if (i == 0) {
				view.state = {firstGroup: true}
			}
			
			if (i == this.projectVideoUIGroups.length - 1) {
				view.state = {lastGroup: true}
			}
			
			if (this.instantUpdate) {
				view.positionDuration = 0
			} else {
				view.positionDuration = 400
			}
			
			view.updateAllUI()
		}
		
	}
	
	positionProjectVideoUIGroups () {
		for (var i = 0; i < this.projectVideoUIGroups.length; i++) {
			var view = this.projectVideoUIGroups[i]
			var newFrame = new CGRect()
								
			newFrame.size.width = applicationRoot.contentWidth * 0.9
			newFrame.size.height = view.requiredHeight

			newFrame.origin.x = (this.width - newFrame.size.width)/2
			
			if (i < this.state.projectIndex) {
				newFrame.origin.x -= this.width
			} else if (i > this.state.projectIndex) {
				newFrame.origin.x += this.width
			}
			
			newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height)/2 + this.parameters.projectVideoUIGroupVerticalAdjustment
			
			if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.projectVideoUIGroupMinimumDistanceFromHeader) {
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.projectVideoUIGroupMinimumDistanceFromHeader
			}
								
			view.frame = newFrame
		}
	}
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	// Playback
	pause () {
		this.projectVideoUIGroups[this.state.projectIndex].pause()
	}
	
	
	//
	// Delegate
	//
	
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		
	}
	
	
	// Project UI Group
	projectVideoUIGroupPrevButtonWasClicked (projectVideoUIGroup) {
		this.state.handlingClick = true
		if (this.state.projectIndex != 0) {
			this.state.projectIndex -= 1
			if (this.state.projectIndex == 2) {
				this.state.projectIndex = 1
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			this.animatedUpdate()
		}
	}
	
	projectVideoUIGroupNextButtonWasClicked (projectVideoUIGroup) {
		this.state.handlingClick = true
		if (this.state.projectIndex != this.projectVideoUIGroups.length - 1) {
			this.state.projectIndex += 1
			if (this.state.projectIndex == 2) {
				this.state.projectIndex = 3
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			this.animatedUpdate()
		}
	}
	
}