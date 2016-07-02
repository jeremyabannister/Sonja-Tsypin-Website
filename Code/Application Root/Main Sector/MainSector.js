class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.websiteClosed = true
		this.websiteClosedLocked = false
		
		this.possibleStates = ['WorkPage', 'MorePage', 'AboutPage', 'ContactPage']
		this.state = this.possibleStates[0]
		this.comingSoon = true

		this.totalScrollDistanceSinceLastTrigger = 0
		this.heightOfHeader = 100

		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.aboutPage = new AboutPage('AboutPage')
		this.morePage = new MorePage('MorePage')
		this.workPage = new WorkPage('WorkPage')
		
		this.comingSoonView = new UILabel('ComingSoonView')
		
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
		this.addComingSoonView()
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
	
	addComingSoonView () {
		this.addSubview(this.comingSoonView)
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
		
		
		this.configureComingSoonView()
		this.positionComingSoonView()
		
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
			
			setComingSoon(this.contactPage.comingSoon)
		}
		
	}
	
	positionContactPage () {
		
		this.contactPage.frame = this.bounds
		
	}
	
	
	
	// About Page
	configureAboutPage () {
		
		this.aboutPage.backgroundColor = 'black'
		this.aboutPage.reservedTopBuffer = this.heightOfHeader
		
		if (this.websiteClosed) {
			this.aboutPage.subdued = true
		} else {
			this.aboutPage.subdued = false
		}
		
		if (this.state == this.possibleStates[2]) {
			if (!this.subviewIsAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage])) {
				this.insertSubviewAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage])
			}
			
			setComingSoon(this.aboutPage.comingSoon)
			
		}
		
		this.aboutPage.updateAllUI()
		
	}
	
	positionAboutPage () {
		
		var newFrame = this.bounds
		
		this.aboutPage.frame = newFrame
	}




	// More Page
	configureMorePage() {
		
		this.morePage.backgroundColor = 'black'
		
		if (this.state == this.possibleStates[1]) {
			if (!this.subviewIsAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage])) {
				this.insertSubviewAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage])
			}
			
			setComingSoon(this.morePage.comingSoon)
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
			
			setComingSoon(this.workPage.comingSoon)
			
			this.workPage.updateAllUI()
			
			if (!this.websiteClosed) {
				this.workPage.currentlyActive = true
			} else {
				this.workPage.currentlyActive = false
			}
			
		} else {
			this.workPage.currentlyActive = false
		}
		
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
	
	
	
	
	
	
	// Coming Soon View
	configureComingSoonView () {
		
		this.comingSoonView.text = 'COMING SOON...'
		
		this.comingSoonView.textColor = 'white'
		this.comingSoonView.fontSize = 30
		this.comingSoonView.fontFamily = 'siteFont'
		this.comingSoonView.fontWeight = 'bold'
		this.comingSoonView.letterSpacing = 1.5
		
		this.comingSoonView.configureDuration = 0
		
		if (this.comingSoon) {
			this.comingSoonView.opacity = 1
		} else {
			this.comingSoonView.opacity = 0
		}
	}
	
	positionComingSoonView () {
		
		var size = this.comingSoonView.font.sizeOfString(this.comingSoonView.text)
		var newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
					
		this.comingSoonView.frame = newFrame
		
	}
	
	
	
	


	// Home Page
	configureHomePage () {
		
		this.homePage.overflow = 'hidden'
		this.homePage.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		
		if (this.websiteClosed) {
			this.homePage.currentlyActive = true
		} else {
			this.homePage.currentlyActive = false
		}
		
		this.homePage.updateAllUI()
		
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
			this.workPage.state = this.workPage.possibleStates[0]
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


function setComingSoon (newComingSoon) {
	
	if (newComingSoon != null) {
		var changed = (applicationRoot.mainSector.comingSoon != newComingSoon)
		applicationRoot.mainSector.comingSoon = newComingSoon
		
		if (changed) {
			applicationRoot.mainSector.updateAllUI()
		}
	}
	
}