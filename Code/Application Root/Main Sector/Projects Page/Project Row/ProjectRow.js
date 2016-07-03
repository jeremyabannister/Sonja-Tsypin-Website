class ProjectRow extends JABView {

	constructor (customId, projectDataBundle) {
		super(customId)

		// State
		this.projectDataBundle = projectDataBundle

		this.possibleStates = ['stills', 'video']
		this.state = this.possibleStates[0]
		
		this.widthToHeightRatio = (16.0/9.0) * (5.0/4.0)

		// UI
		this.stillsView = new ProjectStillsView('ProjectStillsView', this.projectDataBundle)
		this.videoView = new ProjectVideoView('ProjectVideoView')
		
		
		// Initialize
	}
	



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addStillsView()
		this.addVideoView()
		
	}
	
	
	
	addStillsView () {
		this.addSubview(this.stillsView)
	}
	
	addVideoView () {
		this.addSubview(this.videoView)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureStillsView()
		this.positionStillsView()


		this.configureVideoView()
		this.positionVideoView()

	}




	// Stills View
	configureStillsView () {

		this.stillsView.overflow = 'hidden'

	}

	positionStillsView () {

		var widthOfStillsView = this.height * (16.0/9.0) * (5.0/4.0)

		var newFrame = new CGRect()

		newFrame.size.height = this.height
		newFrame.size.width = widthOfStillsView

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2

		this.stillsView.frame = newFrame


	}




	// Video View
	configureVideoView () {

	}

	positionVideoView () {

	}



	//
	// Actions
	//

}
