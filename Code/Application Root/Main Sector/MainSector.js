class MainSector extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.state = {
			currentlyActive: false,
			pageIndex: 2,
			projectOpen: false,
			closingProject: false,
			projectDataBundle: null,
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
		this.reelPage = new ReelPage('ReelPage')
		this.projectPage = new ProjectPage('ProjectPage')
		
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
		return [this.reelPage, this.projectsPage, this.aboutPage, this.projectPage]
	}
	
	
	get readyToClose () {
		return (this.currentlyActivePage.state.readyToClose && !this.state.projectOpen)
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addAboutPage()
		this.addProjectsPage()
		this.addReelPage()
		this.addProjectPage()
		
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
	
	addProjectPage () {
		this.addSubview(this.projectPage)
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
		
		this.configureProjectPage()
		this.positionProjectPage()
		
		
		
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
			
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			view.scrollable = this.state.scrollable
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
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			view.state.scrollable = this.state.scrollable
			if (view.state.comingSoon) {
				view.state.scrollable = false
			}
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}

			
			
			
			setComingSoon(view.state.comingSoon)
			
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
	
	positionProjectsPage () {
		
		var view = this.projectsPage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	
	
	
	// Reel Page
	configureReelPage () {
		
		var view = this.reelPage
		
		view.backgroundColor = 'black'
		view.overflow = 'auto'
		view.reservedTopBuffer = this.parameters.heightOfHeader
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			if (!this.state.projectOpen) {
				view.currentlyActive = this.state.currentlyActive
				view.scrollable = this.state.scrollable
			} else {
				view.currentlyActive = false
			}
			
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
	
	
	
	
	// Project Page
	configureProjectPage () {
		
		var view = this.projectPage
		
		view.clickable = true
		view.parameters.reservedTopBuffer = this.parameters.heightOfHeader
		view.overflow = 'auto'
		view.configureDuration = 200
		view.backgroundColor = 'rgba(0,0,0, 0.6)'
		
		if (this.state.projectOpen) {
			this.bringPageToFront(view)
			view.opacity = 1
			view.configureDelay = 0
			
			view.state.projectDataBundle = this.state.projectDataBundle
		} else {
			view.opacity = 0
			view.configureDelay = 200
		}
		
		this.projectPage.updateAllUI()
		
	}
	
	positionProjectPage () {
		
		var view = this.projectPage
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
	
	bringPageToFront (page) {
		
		var otherPages = []
		for (var i = 0; i < this.pages.length; i++) {
			if (this.pages[i] != page) {
				otherPages.push(this.pages[i])
			}
		}
		
		if (!this.subviewIsAboveSubviews(page, otherPages)) {
			this.insertSubviewAboveSubviews(page, otherPages)
		}
	}
	
	



	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.projectPage) {
			this.state = {
				projectOpen: false,
				closingProject: true
			}
			var mainSector = this
			this.animatedUpdate(null, function() {
				mainSector.state = {closingProject: false}
				mainSector.animatedUpdate()
			})
		}
	}
	
	// Projects Page
	projectsPageWantsToDisplayProject (projectsPage, project) {
		this.state = {
			projectOpen: true,
			projectDataBundle: project,
		}
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