class JABEmbeddedImageView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.src = ''
		this.state = {
			
			horizontalInset: 0,
			verticalInset: 0,
			
		}
		
		// Parameters
		this.parameters = {
			
		}
		
		// UI
		this.imageView = new JABImageView('ImageView')
		
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
		this.addImageView()
	}
	
	
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureImageView()
		this.positionImageView()
	}
	
	
	
	configureImageView () {
		var view = this.imageView
		
		view.src = this.src
	}
	
	positionImageView () {
		var view = this.imageView
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - (2 * this.state.horizontalInset)
		newFrame.size.height = this.height - (2 * this.state.verticalInset)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
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