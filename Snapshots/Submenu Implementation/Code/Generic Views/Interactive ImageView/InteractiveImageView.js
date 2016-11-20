class InteractiveImageView extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.covered = false
		this.coverColor = 'rgba(0, 0, 0, 0.6)'
		this.imageData = new ImageData()

		// UI
		this.imageView = new JABImageView('ImageView')
		this.cover = new InteractiveCover('Cover')

		this.cursor = 'pointer'

	}


	//
	// Init
	//
	
	init () {
		super.init()
		this.startEventListeners()
	}


	// Custom Getters and Setters
	get src () {
		return this.imageView.src
	}

	set src (newSrc) {
		this.imageView.src = newSrc
	}



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


	// Image View
	configureImageView () {



	}

	positionImageView () {
		this.imageView.frame = this.bounds
	}



	// Cover
	configureCover () {

		this.cover.imageData = this.imageData

		this.cover.backgroundColor = this.coverColor
		if (this.covered) {
			this.cover.visible = true
			this.cover.opacity = 1
		} else {
			this.cover.visible = false
			this.cover.opacity = 0
		}
		
		this.cover.updateAllUI()
	}

	positionCover () {
		this.cover.frame = this.bounds
	}


	//
	// Event Listeners
	//

	startEventListeners () {

		var thisImageView = this
		$(this.selector).hover(function() {
			thisImageView.parent.interactiveImageViewWasHovered(thisImageView)
		}, function() {
			thisImageView.parent.interactiveImageViewWasUnhovered(thisImageView)
		})
		
		
		$(this.selector).click(function() {
			thisImageView.parent.interactiveImageViewWasClicked(thisImageView)
		})

	}


	//
	// Actions
	//

}
