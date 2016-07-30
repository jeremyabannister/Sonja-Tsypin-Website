class ProjectVideoUIGroup extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 1000
		this.state = {
			projectDataBundle: null,
			firstGroup: false,
			lastGroup: false,
		}
		
		// Parameters
		this.parameters = {
			leftBufferForTitleLabel: 5,
			topBufferForTitleLabel: 10,
			
			
			heightOfNavigationButtons: 20,
			topBufferForNavigationButtons: 10,
			rightBufferForNavigationButtons: 0,
		}
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
		this.titleLabel = new UILabel('TitleLabel')
		this.navigationButtons = new VideoNavigationButtons('NavigationButtons')
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
		this.addNavigationButtons()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addNavigationButtons () {
		this.addSubview(this.navigationButtons)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		
		this.configureNavigationButtons()
		this.positionNavigationButtons()
	}
	
	
	
	
	// Vimeo View
	configureVimeoView () {
		
		var view = this.vimeoView
		
		
		if (this.state.projectDataBundle != null) {
			view.vimeoId = this.state.projectDataBundle.vimeoId
		} else {
			view.vimeoId = null
		}
		
		if (view.loadingGif == null) {
			view.loadingGif = new LoadingGif()
		}
		
	}
	
	positionVimeoView () {
		
		var aspectRatio = (9.0/16.0)
		if (this.state.projectDataBundle != null) {
			aspectRatio = this.state.projectDataBundle.vimeoHeightToWidth
		}
		
		var view = this.vimeoView
		var newFrame = new CGRect()

		newFrame.size.width = this.width
		newFrame.size.height = newFrame.size.width * aspectRatio

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0

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
			view.fontSize = 18
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

		newFrame.origin.x = this.vimeoView.x + this.parameters.leftBufferForTitleLabel
		newFrame.origin.y = this.vimeoView.bottom + this.parameters.topBufferForTitleLabel
							
		view.frame = newFrame
	}
	
	
	
	
	// Navigation Buttons
	configureNavigationButtons () {
		var view = this.navigationButtons
		
		view.state.firstGroup = this.state.firstGroup
		view.state.lastGroup = this.state.lastGroup
		
		view.positionDuration = 0
	}
	
	positionNavigationButtons () {
		
		var view = this.navigationButtons
		var newFrame = new CGRect()
							
		newFrame.size.width = view.requiredWidth
		newFrame.size.height = this.parameters.heightOfNavigationButtons

		newFrame.origin.x = this.vimeoView.right - newFrame.size.width - this.parameters.rightBufferForNavigationButtons
		newFrame.origin.y = this.titleLabel.top + (this.titleLabel.height - newFrame.size.height)/4
							
		view.frame = newFrame
		
		
		this.requiredHeight = this.titleLabel.bottom - this.vimeoView.top
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	
	// Playback
	pause () {
		this.vimeoView.pause()
	}
	
	//
	// Delegate
	//
	
	// Video Navigation Buttons
	videoNavigationButtonsPrevButtonWasClicked (videoNavigationButtons) {
		this.parent.projectVideoUIGroupPrevButtonWasClicked(this)
	}
	
	videoNavigationButtonsNextButtonWasClicked (videoNavigationButtons) {
		this.parent.projectVideoUIGroupNextButtonWasClicked(this)
	}
	
	
}