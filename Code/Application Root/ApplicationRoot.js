class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xs': 700, 's': 780, 'm': 1000, 'l': 1000}
		
		
		this.websiteClosed = false
		this.websiteClosedLocked = false

		// Parameters
		this.heightOfHeader = 110

		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			
			// UI
			this.mainSector = new MainSector('MainSector')
			this.headerBackdrop = new JABView('HeaderBackdrop')
			this.homeSector = new HomeSector('HomeSector')
			this.header = new Header('Header')
		}
		
		
		// Initialize
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
		this.mainSector.heightOfHeader = this.heightOfHeader
		this.mainSector.currentlyActive = !this.websiteClosed
		
		this.mainSector.updateAllUI()
	}

	positionMainSector () {
		this.mainSector.frame = new CGRect(0, 0, this.width, this.height)
	}
	
	
	
	// Header Backdrop
	configureHeaderBackdrop () {
		
		if (isPropertySupported('-webkit-backdrop-filter')) {
			this.headerBackdrop.backgroundColor = 'rgba(0, 0, 0, 0.6)'
			this.headerBackdrop.backdropBlur = 10
		} else {
			this.headerBackdrop.backgroundColor = 'black'
		}
		
		
	}
	
	positionHeaderBackdrop () {
		
		var headerBackdropExtension = 0
		var view = this.headerBackdrop
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.heightOfHeader + headerBackdropExtension

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = -headerBackdropExtension
							
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
		this.header.selectedMenuIndex = this.mainSector.stateIndex
		this.header.configureDuration = 0
		this.header.updateAllUI()
		
	}

	positionHeader () {
		this.header.frame = new CGRect(0, 0, this.width, this.heightOfHeader)
	}




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
					applicationRoot.mainSector.scrollable = true
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
					applicationRoot.mainSector.scrollable = false
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
				this.openWebsite(800)
			}
		} else {
			if (amount > 0) {
				if (this.mainSector.readyToClose) {
					this.closeWebsite(800)
				}
			}
		}
		
	}
	
	
	//
	// Delegate
	//
	
	// Home Sector
	homeSectorEnterButtonWasClicked () {
		this.openWebsite()
	}

	// Header
	headerLogoWasClicked () {
		this.closeWebsite()
	}

	headerDidSelectPage (pageIndex) {
		
		this.mainSector.stateIndex = pageIndex
		
		if (this.websiteClosed) {
			this.openWebsite()
		} else {
			this.updateAllUI() // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
		}
		
	}

}
