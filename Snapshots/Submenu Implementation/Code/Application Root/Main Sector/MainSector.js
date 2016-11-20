class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.websiteClosed = true
		this.websiteClosedLocked = false
		this.homePageHidden = false
		this.scrollable = false
		
		this.stateIndex = 0
		
		// Scrolling
		this.scrollPosition = 0
		this.scrollSensitivity = 0.5
		this.bottomScrollBuffer = 0
		this.comingSoon = true
		this.scrollReboundTimer

		// Parameters
		this.heightOfHeader = 0

		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.aboutPage = new AboutPage('AboutPage')
		this.morePage = new MorePage('MorePage')
		this.workPage = new WorkPage('WorkPage')
		
		this.comingSoonView = new UILabel('ComingSoonView')

		
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
	
	
	get currentlyActivePage () {
		return this.pages[this.stateIndex]
	}
	
	get pages () {
		return [this.workPage, this.morePage, this.aboutPage, this.contactPage]
	}
	
	
	
	get readyToClose () {
		
		return this.workPage.contentDomain.readyToClose
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

	}
	
	
	
	
	// Contact Page
	configureContactPage () {
		var view = this.contactPage
		
		view.backgroundColor = 'black'
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.workPage, this.morePage, this.aboutPage])) {
				this.insertSubviewAboveSubviews(view, [this.workPage, this.morePage, this.aboutPage])
			}
			
			setComingSoon(view.comingSoon)
		}
		
	}
	
	positionContactPage () {
		var view = this.contactPage
		
		var newFrame = this.bounds
		
		// newFrame.origin.y = this.scrollPosition
		
		view.frame = newFrame
		
	}
	
	
	
	// About Page
	configureAboutPage () {
		
		var view = this.aboutPage
		
		view.backgroundColor = 'black'
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.workPage, this.morePage, this.contactPage])) {
				this.insertSubviewAboveSubviews(view, [this.workPage, this.morePage, this.contactPage])
			}
			
			setComingSoon(view.comingSoon)
		}
		
		
		view.reservedTopBuffer = this.heightOfHeader
		
		if (this.websiteClosed) {
			view.subdued = true
		} else {
			view.subdued = false
		}
		
		
		view.updateAllUI()
		
	}
	
	positionAboutPage () {
		
		var newFrame = this.bounds
		
		// newFrame.origin.y = this.scrollPosition
		
		this.aboutPage.frame = newFrame
	}




	// More Page
	configureMorePage() {
		
		var view = this.morePage
		
		view.backgroundColor = 'black'
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.workPage, this.aboutPage, this.contactPage])) {
				this.insertSubviewAboveSubviews(view, [this.workPage, this.aboutPage, this.contactPage])
			}
			
			setComingSoon(view.comingSoon)
		}
		
	}
	
	positionMorePage () {
		
		var newFrame = this.bounds
		
		// newFrame.origin.y = this.scrollPosition
		
		this.morePage.frame = newFrame
		
	}



	// Work Page
	configureWorkPage () {
		
		var view = this.workPage
		
		view.backgroundColor = 'black'
		view.reservedTopBuffer = this.heightOfHeader
		view.scrollable = this.scrollable
		
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.morePage, this.aboutPage, this.contactPage])) {
				this.insertSubviewAboveSubviews(view, [this.morePage, this.aboutPage, this.contactPage])
			}
			
			setComingSoon(view.comingSoon)
			
			if (!this.websiteClosed) {
				view.currentlyActive = true
			} else {
				view.currentlyActive = false
			}
		} else {
			this.workPage.currentlyActive = false
		}
		
		
		if (this.websiteClosed) {
			view.subdued = true
		} else {
			view.subdued = false
		}
		
		view.updateAllUI()
		
	}

	positionWorkPage () {

		var view = this.workPage
		var newFrame = this.bounds
		view.frame = newFrame

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
	
	
	






	//
	// Actions
	//
	
	

	



	//
	// Delegate
	//


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