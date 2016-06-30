class WorkPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		
		// UI
		this.projectsList = new ProjectsList('ProjectsList')
		this.reelView = new ReelView('ReelView')
		this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS', 'projects']])
		
		
		// State
		this.possibleStates = ['Reel', 'Projects']
		this.state = this.possibleStates[0]
		this.subdued = true
		
		this.reservedTopBuffer = 0
		this.heightOfMenuSection = 50
		
		
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
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addProjectsList()
		this.addReelView()
		this.addMenu()
		
	}
	
	
	addProjectsList () {
		this.addSubview(this.projectsList)
	}
	
	addReelView () {
		this.addSubview(this.reelView)
	}
	
	addMenu () {
		this.addSubview(this.menu)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureProjectsList()
		this.positionProjectsList()
		
		this.configureReelView()
		this.positionReelView()
		
		this.configureMenu()
		this.positionMenu()
	}
	
	
	
	
	// Projects List
	configureProjectsList () {
		
		this.projectsList.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[1]) {
			if (!this.subviewIsAboveSubviews(this.projectsList, [this.reelView])) {
				this.insertSubviewAboveSubviews(this.projectsList, [this.reelView])
			}
			
			setComingSoon(this.projectsList.comingSoon)
		}
		
		
		if (this.state == this.possibleStates[1] && !this.subdued) {
			this.projectsList.opacity = 1
		} else {
			this.projectsList.opacity = 0
		}
		
	}
	
	positionProjectsList () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = this.width
		newFrame.size.height = this.height - (this.reservedTopBuffer + this.heightOfMenuSection)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}
					
		this.projectsList.frame = newFrame
		
	}
	
	
	
	// Reel Page
	configureReelView () {
		
		this.reelView.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[0]) {
			if (!this.subviewIsAboveSubviews(this.reelView, [this.projectsList])) {
				this.insertSubviewAboveSubviews(this.reelView, [this.projectsList])
			}
			
			setComingSoon(this.reelView.comingSoon)
		}
		
		
		if (this.state == this.possibleStates[0] && !this.subdued) {
			this.reelView.opacity = 1
		} else {
			this.reelView.opacity = 0
		}
		
	}
	
	positionReelView () {
		
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height - (this.reservedTopBuffer + this.heightOfMenuSection)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}
					
		this.reelView.frame = newFrame
		
	}
	
	
	
	// Menu
	configureMenu () {
		
		this.menu.showUnderline = true
		
		for (var i = 0; i < this.possibleStates.length; i++) {
			if (this.possibleStates[i] == this.state) {
				this.menu.selectedIndex = i
			}
		}
		
		
		this.menu.fadeUnselectedButtons = true
		
		this.menu.textColor = 'white'
		this.menu.fontSize = 10
		this.menu.letterSpacing = 1.5
		
		if (this.subdued) {
			this.menu.opacity = 0
		} else {
			this.menu.opacity = 1
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
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}

		this.menu.frame = newFrame
		
	}
	
	
	
	
	//
	// Actions
	//
	
	
	//
	// Delegate
	//


	menuButtonWasPressed (buttonIdentifier) {
		
		if (buttonIdentifier == 'reel') {
			this.state = this.possibleStates[0]
		} else {
			this.state = this.possibleStates[1]
		}
		
		this.animatedUpdate()
	}
	
}