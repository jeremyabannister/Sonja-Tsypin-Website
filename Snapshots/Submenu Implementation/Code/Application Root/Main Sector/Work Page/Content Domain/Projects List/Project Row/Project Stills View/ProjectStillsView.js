class ProjectStillsView extends JABView {

	constructor (customId, projectDataBundle) {
		super(customId)

		// State
		this.projectDataBundle = projectDataBundle
		this.largeStillIndex = 0
		this.secondaryStillsIndicies = []


		// UI
		this.largeStillView = new InteractiveImageView('LargeStillView')
		this.secondaryStillsView = new ProjectSecondaryStillsView('SecondaryStillsView', this.projectDataBundle)
		
		
		// Initialize
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.installNewDataBundle()
	}
	


	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addLargeStillView()
		this.addSecondaryStillsView()
		
	}
	
	
	
	addLargeStillView () {
		this.addSubview(this.largeStillView)
	}
	
	addSecondaryStillsView () {
		this.addSubview(this.secondaryStillsView)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureLargeStillView()
		this.positionLargeStillView()


		this.configureSecondaryStillsView()
		this.positionSecondaryStillsView()

	}



	// Large Still View
	configureLargeStillView () {
		
		this.largeStillView.src = this.projectDataBundle.stills[this.largeStillIndex]

		var imageData = new ImageData()
		imageData.title = this.projectDataBundle.metaDataBundle.title
		imageData.subtitle = this.projectDataBundle.metaDataBundle.subtitle
		imageData.year = this.projectDataBundle.metaDataBundle.year
		
		this.largeStillView.imageData = imageData

	}

	positionLargeStillView () {

		var widthToHeightRatio = (16.0/9.0)

		var newFrame = new CGRect()

		newFrame.size.height = this.height
		newFrame.size.width = newFrame.size.height * widthToHeightRatio

		newFrame.origin.x = 0
		newFrame.origin.y = 0

		this.largeStillView.frame = newFrame

	}




	// Secondary Stills View
	configureSecondaryStillsView () {
		
		this.secondaryStillsView.stillsIndicies = this.secondaryStillsIndicies
		this.secondaryStillsView.updateAllUI()

	}

	positionSecondaryStillsView () {

		var newFrame = new CGRect()

		newFrame.size.width = this.width - this.largeStillView.width
		newFrame.size.height = this.height

		newFrame.origin.x = this.largeStillView.right
		newFrame.origin.y = 0

		this.secondaryStillsView.frame = newFrame

	}
	
	


	//
	// Actions
	//
	
	
	// Stills
	installNewDataBundle () {
		if (this.projectDataBundle != null) {
			
			this.largeStillIndex = this.projectDataBundle.mainStillIndex
			this.secondaryStillsIndicies = []
			
			for (var i = 0; i < this.projectDataBundle.stills.length; i++) {
				if (i != this.largeStillIndex) {
					this.secondaryStillsIndicies.push(i)
				}
			}
			
			this.updateAllUI()
		}
	}
	
	
	swapLargeStillWithSecondaryStill (indexOfSecondaryStill) {
		var operationShouldProcede = true
		if (operationShouldProcede) {
			
			var holder = this.largeStillIndex
			this.largeStillIndex = this.secondaryStillsIndicies[indexOfSecondaryStill]
			this.secondaryStillsIndicies[indexOfSecondaryStill] = holder
			
			this.updateAllUI()
		}
	}



	//
	// Delegate
	//


	// Interactive ImageView
	interactiveImageViewWasHovered (interactiveImageView) {
		var darkenDuration = 300
		
		interactiveImageView.covered = true
		interactiveImageView.animatedUpdate(darkenDuration)
		
		this.secondaryStillsView.allCovered = true
		this.secondaryStillsView.animatedUpdate(darkenDuration)
	}

	interactiveImageViewWasUnhovered (interactiveImageView) {
		var undarkenDuration = 300
		
		interactiveImageView.covered = false
		interactiveImageView.animatedUpdate(undarkenDuration)
		
		this.secondaryStillsView.allCovered = false
		this.secondaryStillsView.animatedUpdate(undarkenDuration)
	}
	
	
	
	interactiveImageViewWasClicked (interactiveImageView) {
		this.parent.projectStillsViewLargeStillWasClicked(this)
	}
	
	
	
	
	// Secondary Stills View
	secondaryStillWasClicked (stillIndex) {
		this.swapLargeStillWithSecondaryStill(stillIndex)
	}

}
