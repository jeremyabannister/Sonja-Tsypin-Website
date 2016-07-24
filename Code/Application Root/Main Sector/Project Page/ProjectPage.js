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
			
			
			bufferBetweenVimeoViewAndTitleLabel: 10,
		}
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
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
		this.addVimeoView()
		this.addTitleLabel()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
	}
	
	
	
	
	// Vimeo View
	configureVimeoView () {
		
		var view = this.vimeoView
		
		if (this.state.projectDataBundle != null) {
			view.vimeoId = this.state.projectDataBundle.vimeoId
		} else {
			view.vimeoId = null
		}
		
		view.loadingGif = new LoadingGif()
		
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
	
	
	
	
	
	// Title Label
	configureTitleLabel () {
		
		var view = this.titleLabel
		var dataBundle = this.state.projectDataBundle
		
		view.positionDuration = 0
		
		if (dataBundle != null) {
			
			view.text = dataBundle.title
			view.fontFamily = 'siteFont'
			view.fontSize = 20
			view.textColor = 'white'
			view.letterSpacing = 2
		}
	}
	
	positionTitleLabel () {
		
		var view = this.titleLabel
		var newFrame = new CGRect()
		var size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.vimeoView.x
		newFrame.origin.y = this.vimeoView.bottom + this.parameters.bufferBetweenVimeoViewAndTitleLabel
							
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
	
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		console.log('project finished loading!')
	}
	
}