class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.websiteClosed = true
		this.websiteClosedLocked = false
		
		this.possibleStates = ['WorkPage', 'MorePage', 'AboutPage', 'ContactPage']
		this.state = this.possibleStates[0]
		

		this.totalScrollDistanceSinceLastTrigger = 0
		this.heightOfHeader = 100

		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.aboutPage = new AboutPage('AboutPage')
		this.morePage = new MorePage('MorePage')
		this.workPage = new WorkPage('WorkPage')
		this.homePage = new HomePage('HomePage')
		this.header = new Header('Header')
		
		
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
	
	get websiteClosed () {
		return this._websiteClosed
	}
	
	set websiteClosed (newWebsiteClosed) {
		if (!this.websiteClosedLocked) {
			this._websiteClosed = newWebsiteClosed
		}
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addContactPage()
		this.addAboutPage()
		this.addMorePage()
		this.addWorkPage()
		this.addHomePage()
		this.addHeader()
		
	}
	
	
	
	
	addContactPage () {
		this.addSubview(this.contactPage)
	}
	
	addAboutPage () {
		this.addSubview(this.aboutPage)
	}
	
	addMorePage () {
		this.addSubview(this.morePage)
	}
	
	addWorkPage () {
		this.addSubview(this.workPage)
	}
	
	addHomePage () {
		this.addSubview(this.homePage)
	}
	
	addHeader () {
		this.addSubview(this.header)
	}




	
	// Update
	updateAllUI () {
		super.updateAllUI()


		
		this.configureContactPage()
		this.positionContactPage()

		this.configureAboutPage()
		this.positionAboutPage()
		
		this.configureMorePage()
		this.positionMorePage()

		this.configureWorkPage()
		this.positionWorkPage()

		this.configureHomePage()
		this.positionHomePage()


		this.configureHeader()
		this.positionHeader()

	}
	
	
	
	
	// Contact Page
	configureContactPage () {
		
		this.contactPage.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[3]) {
			if (!this.subviewIsAboveSubviews(this.contactPage, [this.workPage, this.morePage, this.aboutPage])) {
				this.insertSubviewAboveSubviews(this.contactPage, [this.workPage, this.morePage, this.aboutPage])
			}
		}
		
	}
	
	positionContactPage () {
		
		this.contactPage.frame = this.bounds
		
	}
	
	
	
	// About Page
	configureAboutPage () {
		
		this.aboutPage.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[2]) {
			if (!this.subviewIsAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage])) {
				this.insertSubviewAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage])
			}
		}
		
	}
	
	positionAboutPage () {
		
		this.aboutPage.frame = this.bounds
	}




	// More Page
	configureMorePage() {
		
		this.morePage.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[1]) {
			if (!this.subviewIsAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage])) {
				this.insertSubviewAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage])
			}
		}
		
	}
	
	positionMorePage () {
		
		this.morePage.frame = this.bounds
		
	}



	// Work Page
	configureWorkPage () {

		this.workPage.backgroundColor = 'black'
		this.workPage.reservedTopBuffer = this.heightOfHeader


		if (this.websiteClosed) {
			this.workPage.subdued = true
		} else {
			this.workPage.subdued = false
		}
		
		
		if (this.state == this.possibleStates[0]) {
			if (!this.subviewIsAboveSubviews(this.workPage, [this.morePage, this.aboutPage, this.contactPage])) {
				this.insertSubviewAboveSubviews(this.workPage, [this.morePage, this.aboutPage, this.contactPage])
			}
		}
		
		
		this.workPage.updateAllUI()
	}

	positionWorkPage () {

		var newFrame = new CGRect()

		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2

		if (this.state == this.possibleStates[0]) {
			newFrame.origin.y = 0
		} else {
			newFrame.origin.y = 0
		}


		this.workPage.frame = newFrame

	}


	// Home Page
	configureHomePage () {
		
		this.homePage.overflow = 'hidden'
		this.homePage.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		
	}


	positionHomePage () {

		if (this.websiteClosed) {
			this.homePage.frame = new CGRect(0, 0, this.width, this.height)
		} else {
			this.homePage.frame = new CGRect(0, -this.height, this.width, this.height)
		}
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
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
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
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
				})
			}
		}
	}
	
	
	setWebsiteClosedLockedForTimeout (timeoutDuration) {
		this.websiteClosedLocked = true
		var mainSector = this
		setTimeout(function() {
			mainSector.websiteClosedLocked = false
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
				this.closeWebsite(800)
			}
		}

	}

	userDidStopScrolling () {


	}



	//
	// Delegate
	//

	// Home Page
	homePageDownArrowWasClicked () {
		this.openWebsite()
	}

	// Header
	headerLogoWasClicked () {
		this.closeWebsite()
	}

	headerDidSelectPage (pageIdentifier) {
		
		if (pageIdentifier == 'work') {
			this.state = this.possibleStates[0]
		} else if (pageIdentifier == 'more') {
			this.state = this.possibleStates[1]
		} else if (pageIdentifier == 'about') {
			this.state = this.possibleStates[2]
		} else if (pageIdentifier == 'contact') {
			this.state = this.possibleStates[3]
		}
		
		if (this.websiteClosed) {
			this.openWebsite()
		} else {
			this.animatedUpdate()
		}
		
	}

}
