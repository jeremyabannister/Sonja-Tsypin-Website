class HomeSector extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.currentlyActive = true
		
		// UI
		this.homePage = new HomePage('HomePage')
		
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
		
		this.addHomePage()
		
	}
	
	addHomePage () {
		this.addSubview(this.homePage)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureHomePage()
		this.positionHomePage()
	}
	
	
	// Home Page
	configureHomePage () {
		
		this.homePage.overflow = 'hidden'
		this.homePage.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		
		this.homePage.currentlyActive = this.currentlyActive
		
		/*
		if (this.homePageHidden) {
			this.homePage.opacity = 0
		} else {
			this.homePage.opacity = 1
		}
		*/
		
		this.homePage.updateAllUI()
		
	}


	positionHomePage () {
		
		var newFrame = this.bounds
					
		this.homePage.frame = newFrame
	}


	// Header
	configureHeader () {
		
		this.header.websiteClosed = this.websiteClosed
		this.header.selectedMenuIndex = $.inArray(this.state, this.possibleStates)
		this.header.updateAllUI()
		
	}

	positionHeader () {
		this.header.frame = new CGRect(0, 0, this.width, this.heightOfHeader)
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
	
	// Home Page
	homePageDownArrowWasClicked () {
		this.parent.homeSectorEnterButtonWasClicked()
	}
	
}