class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xs': 700, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450}
		this.state = {
			headerBackdropHidden: false,
		}
		
		this.websiteClosed = true
		this.websiteClosedLocked = false

		// Parameters
		this.parameters = {
			heightOfHeader: 110,
		}

		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			
			// UI
			this.mainSector = new MainSector('MainSector')
			this.headerBackdrop = new JABView('HeaderBackdrop')
			this.homeSector = new HomeSector('HomeSector')
			this.header = new Header('Header')
		}
		
		
		
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
	
	get contentWidth () {
		return this._contentWidth[sizeClass]
	}
	
	set contentWidth (newContentWidth) {
		this._contentWidth = newContentWidth
	}
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		if (this.laboratoryEnabled) {
			this.addLaboratory()
		} else {
			
			this.addMainSector()
			this.addHeaderBackdrop()
			this.addHomeSector()
			this.addHeader()
		}
		
	}
	
	
	addMainSector () {
		this.addSubview(this.mainSector)
	}
	
	addHeaderBackdrop () {
		this.addSubview(this.headerBackdrop)
	}
	
	addHomeSector () {
		this.addSubview(this.homeSector)
	}
	
	addHeader () {
		this.addSubview(this.header)
	}
	
	
	
	
	
	addLaboratory () {
		this.addSubview(this.laboratory)
	}
	
	
	


	// Update

	updateAllUI () {
		super.updateAllUI()


		if (this.laboratoryEnabled) {
			this.configureLaboratory()
			this.positionLaboratory()
		} else {
			
			
			
			this.configureMainSector()
			this.positionMainSector()
			
			this.configureHeaderBackdrop()
			this.positionHeaderBackdrop()
			
			this.configureHomeSector()
			this.positionHomeSector()
			
			this.configureHeader()
			this.positionHeader()
			
		}

	}




	// Main Sector
	configureMainSector () {
		this.mainSector.backgroundColor = 'black'
		this.mainSector.parameters.heightOfHeader = this.header.logo.bottom
		this.mainSector.state.currentlyActive = !this.websiteClosed
		
		this.mainSector.updateAllUI()
	}

	positionMainSector () {
		this.mainSector.frame = new CGRect(0, 0, this.width, this.height)
	}
	
	
	
	// Header Backdrop
	configureHeaderBackdrop () {
		
		var view = this.headerBackdrop
		view.backgroundColor = 'black'
		
		if (this.state.headerBackdropHidden) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
	}
	
	positionHeaderBackdrop () {
		
		var view = this.headerBackdrop
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.heightOfHeader

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
	}
	


	
	// Home Sector
	configureHomeSector () {
		this.homeSector.backgroundColor = 'black'
		
		this.homeSector.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		this.homeSector.currentlyActive = this.websiteClosed
		this.homeSector.updateAllUI()
	}
	
	positionHomeSector () {
		var newFrame = this.bounds
		
		if (!this.websiteClosed) {
			newFrame.origin.y = -this.height
		}
					
		this.homeSector.frame = newFrame
	}
	
	
	// Header
	configureHeader () {
		
		this.header.websiteClosed = this.websiteClosed
		this.header.selectedMenuIndex = this.mainSector.state.pageIndex
		this.header.configureDuration = 0
		this.header.updateAllUI()
		
	}

	positionHeader () {
		this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader)
		
		this.configureMainSector() // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
	}
	
	
	
	
	
	
	
	
	
	
	
	
	



	// Laboratory
	configureLaboratory () {

		this.laboratory.backgroundColor = 'white'
	}

	positionLaboratory () {
		if (this.laboratoryEnabled) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = this.height

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame

		} else {
			var newFrame = new CGRect()

			newFrame.size.width = 0
			newFrame.size.height = 0

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame
		}
	}


	//
	// Actions
	//
	
	// Navigation
	openWebsite (duration) {
		if (this.websiteClosed) {
			if (!this.websiteClosedLocked) {
				this.websiteClosed = false
				
				this.setWebsiteClosedLockedForTimeout(duration)
				
				if (duration == null) {
					duration = 800
				}
				
				var applicationRoot = this
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
				}, function() {
					applicationRoot.homePageHidden = true
					applicationRoot.mainSector.state.scrollable = true
					applicationRoot.updateAllUI()
				})
			}
		}
	}
	
	
	closeWebsite (duration) {
		if (!this.websiteClosed) {
			if (!this.websiteClosedLocked) {
				this.websiteClosed = true
				
				this.setWebsiteClosedLockedForTimeout(duration)
				
				if (duration == null) {
					duration = 800
				}
				
				
				this.homePageHidden = false
				this.configureHomeSector()
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
				}, function() {
					applicationRoot.mainSector.state.scrollable = false
					applicationRoot.updateAllUI()
				})
			}
		}
	}
	
	
	setWebsiteClosedLockedForTimeout (timeoutDuration) {
		this.websiteClosedLocked = true
		var applicationRoot = this
		setTimeout(function() {
			applicationRoot.websiteClosedLocked = false
		}, timeoutDuration)
	}

	// Scrolling
	userDidScrollByAmount (amount) {

		if (this.websiteClosed) {
			if (amount < 0) {
				this.openWebsite()
			}
		} else {
			if (amount > 0) {
				if (this.mainSector.readyToClose) {
					this.closeWebsite()
				}
			}
		}
		
	}
	
	
	//
	// Delegate
	//
	
	
	// Main Sector
	mainSectorWantsToDisplayProject (mainSector) {
		
		this.state = {
			headerBackdropHidden: true
		}
		
		this.animatedUpdate()
		
	}
	
	
	mainSectorWantsToCloseProject (mainSector) {
		this.state = {headerBackdropHidden: false}
		
		this.animatedUpdate()
	}
	
	
	// Home Sector
	homeSectorEnterButtonWasClicked () {
		this.openWebsite()
	}

	// Header
	headerLogoWasClicked () {
		this.closeWebsite()
	}

	headerDidSelectPage (pageIndex) {
		
		this.mainSector.state = {
			pageIndex: pageIndex,
			projectOpen: false
		}
		
		if (this.websiteClosed) {
			this.openWebsite()
		} else {
			this.updateAllUI() // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
		}
		
	}

}
