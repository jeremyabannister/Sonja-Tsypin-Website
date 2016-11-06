class MainSector extends JABView {

	constructor (customId, projectDataBundles) {
		super(customId)


		// State
		this.state = {
			currentlyActive: false,
			shouldStartLoading: false,
			pageIndex: 0,
			projectOpen: false,
			closingProject: false,
			
			selectedProjectGroup: 0,
			selectedProjectIndex: 0,
			
			mailFormOpen: false,
			closingMailForm: false,
			mailFormOpacity: 0.5,
			
			scrollable: false,
		}
		
		this.projectDataBundles = projectDataBundles
		this.projectGroups = [[]]
		
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			if (!this.projectDataBundles[i].hidden) {
				this.projectGroups[0].push(this.projectDataBundles[i])
			} else {
				this.projectGroups.push([this.projectDataBundles[i]])
			}
		}

		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
		}

		// UI
		this.aboutPage = new AboutPage('AboutPage')
		this.projectsPage = new ProjectsPage('ProjectsPage', this.projectGroups[0])
		this.reelPage = new ReelPage('ReelPage')
		this.mailFormPage = new MailFormPage('MailFormPage')
		this.projectPage = new ProjectPage('ProjectPage', this.projectGroups)
		
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
		return [this.reelPage, this.projectsPage, this.aboutPage, this.mailFormPage, this.projectPage]
	}
	
	
	get readyToClose () {
		return (this.currentlyActivePage.state.readyToClose && !this.state.projectOpen && !this.state.mailFormOpen)
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addAboutPage()
		this.addProjectsPage()
		this.addReelPage()
		this.addMailFormPage()
		this.addProjectPage()
		
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
	
	addMailFormPage () {
		this.addSubview(this.mailFormPage)
	}
	
	addProjectPage () {
		this.addSubview(this.projectPage)
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
		
		this.configureMailFormPage()
		this.positionMailFormPage()
		
		this.configureProjectPage()
		this.positionProjectPage()

	}
	
	
	
	
	
	
	// About Page
	configureAboutPage () {
		
		var view = this.aboutPage
		
		view.backgroundColor = 'black'
		if (!this.state.currentlyActive) {
			view.overflow = 'hidden'
		} else {
			view.overflow = 'scroll'
		}
		
		view.reservedTopBuffer = this.parameters.reservedTopBuffer
		
		if (this.currentlyActivePage == view) {
			
			if (!this.state.closingProject && !this.state.closingMailForm) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			view.scrollable = this.state.scrollable
			
			if (this.state.projectOpen || this.state.mailFormOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}
			
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
		view.overflowX = 'hidden'
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		if (this.state.projectOpen || !this.state.currentlyActive) {
			view.overflowY = 'hidden'
		} else {
			view.overflowY = 'scroll'
		}
		
		view.parameters = {
			reservedTopBuffer: this.parameters.reservedTopBuffer,
			heightOfHeader: this.parameters.heightOfHeader,
		}
		view.projectDataBundles = this.projectDataBundles
		
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject && !this.state.closingMailForm) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			view.state.scrollable = this.state.scrollable
			
			if (this.state.projectOpen || this.state.mailFormOpen) {
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
		
		
		
		$(view.selector).css({
			'scroll-behavior': 'smooth'
		})
		
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
		view.overflow = 'scroll'
		view.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject && !this.state.closingMailForm) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			if (!this.state.projectOpen) {
				view.currentlyActive = this.state.currentlyActive
				view.scrollable = this.state.scrollable
			} else {
				view.currentlyActive = false
			}
			
			if (this.state.projectOpen || this.state.mailFormOpen) {
				view.blur = 20
			} else {
				view.blur = 0
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
	
	
	
	
	// Mail Form Page
	configureMailFormPage () {
		
		var view = this.mailFormPage
		
		view.backgroundColor = 'rgba(0, 0, 0, ' + this.state.mailFormOpacity + ')'
		
		view.parameters = {reservedTopBuffer: this.parameters.reservedTopBuffer}
		view.clickable = true
		
		if (this.state.mailFormOpen) {
			view.opacity = 1
			view.state = {subdued: false}
			this.bringPageToFront(view)
		} else {
			view.opacity = 0
			view.state = {subdued: true}
		}
		
		
		view.updateAllUI()
		
	}
	
	positionMailFormPage () {
		
		var view = this.mailFormPage
		var newFrame = this.bounds
		
		
		view.frame = newFrame
		
	}
	
	
	
	
	// Project Page
	configureProjectPage () {
		
		var view = this.projectPage
		
		view.clickable = true
		view.parameters.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		view.configureDuration = 200
		view.backgroundColor = 'rgba(0,0,0, 0.6)'
		
		if (this.state.projectOpen) {
			this.bringPageToFront(view)
			view.opacity = 1
			view.configureDelay = 0
			
			view.instantUpdate = true
			view.updateAllUI()
			view.instantUpdate = false
			
		} else {
			view.opacity = 0
			view.configureDelay = 200
		}
		
		this.projectPage.updateAllUI()
		
		
	}
	
	positionProjectPage () {
		
		var view = this.projectPage
		var newFrame = this.bounds
		
		if (!this.state.currentlyActive) {
			newFrame.origin.y += 100
		}
		
		view.frame = newFrame
	}
	
	
	

	





	//
	// Actions
	//
	
	// Navigation
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
	
	
	closeCurrentlyOpenProject () {
		this.parent.mainSectorWantsToRelinquishFullScreen(this)
		this.state = {
			projectOpen: false,
			closingProject: true
		}
		this.projectPage.pause()
		var mainSector = this
		this.animatedUpdate(null, function() {
			mainSector.state = {closingProject: false}
			mainSector.animatedUpdate()
		})
	}
	
	
	openMailFormPage (opacity) {
		
		/*
		if (opacity == null) {
			opacity = 0.6
		}
		
		this.parent.mainSectorWantsToUseFullScreen(this)
		this.state = {mailFormOpen: true, mailFormOpacity: opacity}
		this.animatedUpdate(250)
		*/
	}
	
	
	closeMailFormPage () {
		this.parent.mainSectorWantsToRelinquishFullScreen(this)
		this.state = {
			mailFormOpen: false,
			closingMailForm: true,
		}
		var mainSector = this
		this.animatedUpdate(250, function() {
			mainSector.state = {closingMailForm: false}
			mainSector.animatedUpdate()
		})
	}
	
	
	
	
	// Swipe
	leftSwipeDetected () {
		if (this.state.projectOpen) {
			this.projectPage.leftSwipeDetected()
		}
	}
	
	rightSwipeDetected () {
		if (this.state.projectOpen) {
			this.projectPage.rightSwipeDetected()
		}
	}
	
	
	
	// Keys
	spaceBarWasPressed () {
		if (this.state.projectOpen) {
			var mainSector = this
			this.projectPage.paused.then(function(paused) {
				if (paused) {
					mainSector.projectPage.play()
				} else {
					mainSector.projectPage.pause()
				}
			})
		} else {
			if (this.state.pageIndex == 0) {
				this.reelPage.spaceBarWasPressed()
			} else if (this.state.pageIndex == 1) {
				this.projectsPage.spaceBarWasPressed()
			}
		}
	}
	
	
	leftArrowWasPressed () {
		if (!this.state.projectOpen) {
			if (this.state.pageIndex == 1) {
				this.projectsPage.leftArrowWasPressed()
			}
		} else {
			this.projectPage.leftArrowWasPressed()
		}
	}
	
	upArrowWasPressed () {
		if (!this.state.projectOpen) {
			if (this.state.pageIndex == 1) {
				this.projectsPage.upArrowWasPressed()
			}
		}
	}
	
	rightArrowWasPressed () {
		if (!this.state.projectOpen) {
			if (this.state.pageIndex == 1) {
				this.projectsPage.rightArrowWasPressed()
			}
		} else {
			this.projectPage.rightArrowWasPressed()
		}
	}
	
	downArrowWasPressed () {
		if (!this.state.projectOpen) {
			if (this.state.pageIndex == 1) {
				this.projectsPage.downArrowWasPressed()
			}
		}
	}


	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.projectPage) {
			if (this.projectPage.state.handlingClick) {
				this.projectPage.state = {handlingClick: false}
			} else {
				this.closeCurrentlyOpenProject()
			}
		} else if (view == this.mailFormPage) {
			if (this.mailFormPage.state.handlingClick) {
				this.mailFormPage.state = {handlingClick: false}
			} else {
				this.closeMailFormPage()
			}
		}
	}
	
	// About Page
	aboutPageWantsToDisplayProject (aboutPage, projectIdentifier, startPlaying) {
		for (var i = 0; i < this.projectGroups.length; i++) {
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				if (this.projectGroups[i][j].id == projectIdentifier) {
					if (projectIdentifier != 'angels') { // Angels has no trailer right now so ignore it if clicked
						this.state = {
							projectOpen: true,
						}
						
						this.projectPage.loadProjectIdentifier(projectIdentifier)
						if (startPlaying) {
							this.projectPage.play()
						}
						this.parent.mainSectorWantsToUseFullScreen(this)
					}
				}
			}
		}
	}
	
	
	aboutPageWantsToOpenMailForm (aboutPage) {
		this.openMailFormPage(0)
	}
	
	
	
	// Projects Page
	projectsPageWantsToDisplayProject (projectsPage, projectIdentifier, startPlaying) {
		for (var i = 0; i < this.projectGroups.length; i++) {
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				if (this.projectGroups[i][j].id == projectIdentifier) {
					this.state = {
						projectOpen: true,
					}
				}
			}
		}
		
		this.projectPage.loadProjectIdentifier(projectIdentifier)
		if (startPlaying) {
			this.projectPage.play()
		}
		this.parent.mainSectorWantsToUseFullScreen(this)
		this.animatedUpdate()
	}
	
	projectsPageWantsToOpenMailForm (projectsPage) {
		// this.openMailFormPage(0.8)
		this.parent.mainSectorWantsToOpenAboutPage(this)
	}
	
	
	// Reel Page
	reelPageWantsToOpenMailForm (reelPage) {
		// this.openMailFormPage(0.5)
		this.parent.mainSectorWantsToOpenAboutPage(this)
	}
	
	// Project Page
	projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
		this.state = {selectedProjectIndex: projectIndex}
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