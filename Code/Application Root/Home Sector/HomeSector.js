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
		this.homePage.currentlyActive = this.currentlyActive
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
	homePageDownArrowWasClicked (homePage) {
		this.parent.homeSectorEnterButtonWasClicked(this)
	}
	
}