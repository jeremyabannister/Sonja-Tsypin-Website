class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.state = {
			currentlyActive: false,
			pageIndex: 0,
			projectOpen: false,
			scrollable: false,
			
			comingSoon: true,
		}
		

		// Parameters
		this.parameters = {
			heightOfHeader: 0,
		}

		// UI
		this.aboutPage = new AboutPage('AboutPage')
		this.projectsPage = new ProjectsPage('ProjectsPage')
		this.projectPage = new ProjectPage('ProjectPage')
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
		return this.pages[this.state.pageIndex]
	}
	
	get pages () {
		return [this.reelPage, this.projectsPage, this.aboutPage]
	}
	
	
	get readyToClose () {
		return this.currentlyActivePage.state.readyToClose
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addAboutPage()
		this.addProjectsPage()
		this.addProjectPage()
		this.addReelPage()
		
		this.addComingSoonView()
		
	}
	
	
	
	
	
	addAboutPage () {
		this.addSubview(this.aboutPage)
	}
	
	addProjectsPage () {
		this.addSubview(this.projectsPage)
	}
	
	addProjectPage () {
		this.addSubview(this.projectPage)
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
		
		this.configureProjectPage()
		this.positionProjectPage()
		
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
		view.reservedTopBuffer = this.parameters.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.state.projectOpen) {
				if (!this.subviewIsAboveSubviews(view, [this.reelPage, this.projectsPage])) {
					this.insertSubviewAboveSubviews(view, [this.reelPage, this.projectsPage])
					this.retainPermanentFrontViews()
				}
				
				view.scrollable = this.state.scrollable
			}
			
			setComingSoon(view.comingSoon)
			if (this.state.currentlyActive) {
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
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
	}



	// Projects Page
	configureProjectsPage () {
		
		var view = this.projectsPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.parameters = {reservedTopBuffer: this.parameters.heightOfHeader}
		if (this.state.projectOpen) {
			view.blur = 20
		} else {
			view.blur = 0
		}
		
		if (this.currentlyActivePage == view) {
			if (!this.state.projectOpen) {
				if (!this.subviewIsAboveSubviews(view, [this.reelPage, this.aboutPage])) {
					this.insertSubviewAboveSubviews(view, [this.reelPage, this.aboutPage])
					this.retainPermanentFrontViews()
				}
				
				view.state.scrollable = this.state.scrollable
				if (view.state.comingSoon) {
					view.state.scrollable = false
				}
			}
			
			
			
			setComingSoon(view.state.comingSoon)
			
			if (this.state.currentlyActive) {
				view.opacity = 1
				view.currentlyActive = true
			} else {
				view.opacity = 0
				view.currentlyActive = false
			}
		} else {
			view.opacity = 0
			view.currentlyActive = false
		}
		
		
		
		view.updateAllUI()
		
	}
	
	positionProjectsPage () {
		
		var view = this.projectsPage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
		
	}
	
	
	
	
	// Project Page
	configureProjectPage () {
		
		var view = this.projectPage
		
		if (this.state.projectOpen) {
			if (!this.subviewIsAboveSubviews(view, this.pages)) {
				this.insertSubviewAboveSubviews(view, this.pages)
				this.retainPermanentFrontViews()
			}
			view.opacity = 1
		} else {
			view.opacity = 0
			this.pushSubviewToBack(view)
		}
		
		view.clickable = true
	}
	
	positionProjectPage () {
		
		var view = this.projectPage
		var newFrame = this.bounds
		
		view.frame = newFrame
	}
	
	
	
	
	
	
	// Reel Page
	configureReelPage () {
		
		var view = this.reelPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.reservedTopBuffer = this.parameters.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.state.projectOpen) {
				if (!this.subviewIsAboveSubviews(view, [this.projectsPage, this.aboutPage])) {
					this.insertSubviewAboveSubviews(view, [this.projectsPage, this.aboutPage])
					this.retainPermanentFrontViews()
				}
			}
			
			if (this.state.currentlyActive) {
				view.currentlyActive = true
			} else {
				view.currentlyActive = false
			}
			setComingSoon(view.comingSoon)
			
			view.scrollable = this.state.scrollable
			
			if (this.state.currentlyActive) {
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
		
		if (!this.state.currentlyActive) {
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
		
		if (this.comingSoon && this.state.currentlyActive) {
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
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		if (!this.state.comingSoon) {
			newFrame.origin.x = this.width
		}
					
		this.comingSoonView.frame = newFrame
		
	}
	
	
	





	//
	// Actions
	//
	
	
	retainPermanentFrontViews () {
		
		this.bringSubviewToFront(this.headerBackdrop)
		
	}
	



	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.projectPage) {
			this.state = {projectOpen: false}
			this.animatedUpdate()
		}
	}
	
	// Projects Page
	projectsPageWantsToDisplayProject (projectsPage, project) {
		this.state = {projectOpen: true}
		this.animatedUpdate()
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