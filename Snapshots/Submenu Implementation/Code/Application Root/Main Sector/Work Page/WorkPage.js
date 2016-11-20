class WorkPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		
		// UI
		this.contentDomain = new ContentDomain('ContentDomain')
		this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS', 'projects']])
		
		
		// State
		this.stateIndex = 0
		this.currentlyActive = null
		this.subdued = true
		
		this.reservedTopBuffer = 0
		this.heightOfMenuSection = 50
		this.scrollable = false
		
		this.comingSoon = null
		
		
		// Initialize
	}
	
	
	
	//
	// Getters and Setters
	//
	
	get state () {
		return this._state
	}
	
	set state (newState) {
		this._state = newState
		
		if (this.state == this.possibleStates[0]) {
			this.reelView.configureDuration = null
			this.projectsList.configureDuration = 0
		} else if (this.state == this.possibleStates[1]) {
			this.reelView.configureDuration = 0
			this.projectsList.configureDuration = null
		}
	}
	
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
		}
	}
	
	
	requiredHeightForWidth (width) {
		if (this.stateIndex == 0) {
			return (this.reservedTopBuffer + this.heightOfMenuSection + this.contentDomain.requiredHeightForWidth(width))
		}
	}
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addContentDomain()
		this.addMenu()
		
	}
	
	
	addContentDomain () {
		this.addSubview(this.contentDomain)
	}
	
	addMenu () {
		this.addSubview(this.menu)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureContentDomain()
		this.positionContentDomain()
		
		this.configureMenu()
		this.positionMenu()
	}
	
	
	
	
	// Content Domain
	configureContentDomain () {
		
		this.contentDomain.stateIndex = this.stateIndex
		this.contentDomain.currentlyActive = this.currentlyActive
		this.contentDomain.subdued = this.subdued
		this.contentDomain.scrollable = this.scrollable
		this.contentDomain.overflow = 'auto'
		
		this.contentDomain.reservedTopBuffer = this.reservedTopBuffer
		this.contentDomain.heightOfMenuSection = this.heightOfMenuSection
		
		this.contentDomain.updateAllUI()
	}
	
	positionContentDomain () {
		
		var view = this.contentDomain
		var newFrame = this.bounds
							
		view.frame = newFrame
		
	}
	
	
	
	// Menu
	configureMenu () {
		
		this.menu.selectedIndex = this.stateIndex
		this.menu.showUnderline = true
		this.menu.fadeUnselectedButtons = true
		
		this.menu.textColor = 'white'
		this.menu.fontSize = 10
		this.menu.letterSpacing = 1.5
		this.menu.configureDuration = 550
		this.menu.configureDelay = 100
		
		if (this.subdued) {
			this.menu.opacity = 0
		} else {
			this.menu.opacity = 1
			this.menu.configureEasingFunction = 'cubic-bezier(0.45, 0.03, 0.88, 0.79)'
		}
		
		this.menu.updateAllUI()
		
	}
	
	positionMenu () {
		
		var widthOfMenu = this.width/2
		var heightOfMenu = this.height

		var topBufferForMenu = 120
		var rightBufferForMenu = (this.width - applicationRoot.contentWidth)/2


		var newFrame = new CGRect()

		newFrame.size.width = this.menu.requiredWidth
		newFrame.size.height = this.menu.requiredHeight

		newFrame.origin.x = this.width - newFrame.size.width - rightBufferForMenu
		newFrame.origin.y = topBufferForMenu

		this.menu.frame = newFrame
	}
	
	
	
	
	//
	// Actions
	//
	
	
	//
	// Delegate
	//


	menuButtonWasPressed (buttonIndex) {
		
		this.stateIndex = buttonIndex
		this.updateAllUI()
	}
	
}