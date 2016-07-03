class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.websiteClosed = true
		this.websiteClosedLocked = false
		this.scrollable = false
		
		this.stateIndex = 0
		
		// Scrolling
		this.scrollPosition = 0
		this.scrollSensitivity = 0.5
		this.bottomScrollBuffer = 0
		
		// Other
		this.comingSoon = true

		// Parameters
		this.heightOfHeader = 0
		this.heightOfFooter = 30

		// UI
		this.aboutPage = new AboutPage('AboutPage')
		this.projectsPage = new ProjectsPage('ProjectsPage')
		this.reelPage = new ReelPage('ReelPage')
		
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
		return [this.reelPage, this.projectsPage, this.aboutPage]
	}
	
	
	get readyToClose () {
		return this.currentlyActivePage.readyToClose
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addAboutPage()
		this.addProjectsPage()
		this.addReelPage()
		
		this.addComingSoonView()
		
	}
	
	
	
	
	
	addAboutPage () {
		this.addSubview(this.aboutPage)
	}
	
	addProjectsPage () {
		this.addSubview(this.projectsPage)
	}
	
	addReelPage () {
		this.addSubview(this.reelPage)
	}
	
	
	
	
	
	
	addComingSoonView () {
		this.addSubview(this.comingSoonView)
	}
	




	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureAboutPage()
		this.positionAboutPage()
		
		this.configureProjectsPage()
		this.positionProjectsPage()
		
		this.configureReelPage()
		this.positionReelPage()
		
		
		
		
		this.configureComingSoonView()
		this.positionComingSoonView()

	}
	
	
	
	
	
	
	// About Page
	configureAboutPage () {
		
		var view = this.aboutPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.reservedTopBuffer = this.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.reelPage, this.projectsPage])) {
				this.insertSubviewAboveSubviews(view, [this.reelPage, this.projectsPage])
				this.bringSubviewToFront(this.headerBackdrop)
			}
			
			view.scrollable = this.scrollable
			
			setComingSoon(view.comingSoon)
			if (this.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
		}
		
		
		
		view.updateAllUI()
		
	}
	
	positionAboutPage () {
		
		var view = this.aboutPage
		var newFrame = this.bounds
		
		if (!this.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
	}



	// Projects Page
	configureProjectsPage () {
		
		var view = this.projectsPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.reservedTopBuffer = this.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.reelPage, this.aboutPage])) {
				this.insertSubviewAboveSubviews(view, [this.reelPage, this.aboutPage])
				this.bringSubviewToFront(this.headerBackdrop)
			}
			
			view.scrollable = this.scrollable
			
			setComingSoon(view.comingSoon)
			
			if (this.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
		}
		
		
		
		view.updateAllUI()
		
	}
	
	positionProjectsPage () {
		
		var view = this.projectsPage
		var newFrame = this.bounds
		
		if (!this.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
		
	}
	
	
	
	// Reel Page
	configureReelPage () {
		
		var view = this.reelPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.reservedTopBuffer = this.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.subviewIsAboveSubviews(view, [this.projectsPage, this.aboutPage])) {
				this.insertSubviewAboveSubviews(view, [this.projectsPage, this.aboutPage])
				this.bringSubviewToFront(this.headerBackdrop)
			}
			
			if (this.currentlyActive) {
				view.currentlyActive = true
			} else {
				view.currentlyActive = false
			}
			setComingSoon(view.comingSoon)
			
			view.scrollable = this.scrollable
			
			if (this.currentlyActive) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
			view.currentlyActive = false
		}
		
		view.updateAllUI()
		
	}
	
	positionReelPage () {
		
		
		var view = this.reelPage
		var newFrame = this.bounds
		
		if (!this.currentlyActive) {
			newFrame.origin.y += 100
		}
		
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