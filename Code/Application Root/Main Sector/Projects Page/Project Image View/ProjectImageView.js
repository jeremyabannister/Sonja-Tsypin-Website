class ProjectImageView extends JABView {
	
	constructor (customId, projectDataBundle) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: projectDataBundle,
			covered: false,
		}
		
		// UI
		this.imageView = new JABImageView('ImageView')
		this.cover = new JABView('Cover')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	//
	// Getters and Setters
	//
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addImageView()
		this.addCover()
		
	}
	
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	addCover () {
		this.addSubview(this.cover)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureImageView()
		this.positionImageView()
		
		
		this.configureCover()
		this.positionCover()
		
	}
	
	
	// Center Image View
	configureImageView () {
		
		var view = this.imageView
		
		view.src = this.state.projectDataBundle.stills[this.state.projectDataBundle.mainStillIndex]
		view.configureDuration = 150
		view.positionDuration = 150
		
		if (this.state.covered) {
			view.blur = 5
		} else {
			view.blur = 0
		}
		
		
	}
	
	positionImageView () {
		
		var view = this.imageView
		var newFrame = new CGRect()
		
		if (this.state.covered) {
			newFrame.size.width = this.width * 1.01
			newFrame.size.height = this.height * 1.01
		} else {
			newFrame.size.width = this.width
			newFrame.size.height = this.height
		}

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	// Cover
	configureCover () {
		
		var view = this.cover
		
		view.configureDuration = 300
		view.backgroundColor = 'black'
		
		if (this.state.covered) {
			// view.opacity = 0.8
		} else {
			view.opacity = 0
		}
		
	}
	
	positionCover () {
		
		var view = this.cover
		var newFrame = this.bounds
							
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