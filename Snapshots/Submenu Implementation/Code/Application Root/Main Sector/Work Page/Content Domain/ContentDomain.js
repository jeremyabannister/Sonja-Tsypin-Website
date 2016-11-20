class ContentDomain extends JABView {
	
	constructor (customId) {
		super(customId)
		
		
		// UI
		this.projectsList = new ProjectsList('ProjectsList')
		this.reelView = new ReelView('ReelView')
		this.footer = new Footer('Footer')
		
		// State
		this.stateIndex = 0
		this.currentlyActive = null
		this.subdued = true
		this.readyToClose = true
		this.scrollable = false
		
		this.scrollFinishTimer
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.startEventListeners()
	}
	
	
	//
	// Getters and Setters
	//
	
	get pages () {
		return [this.reelView, this.projectsList]
	}
	
	get currentlyActivePage () {
		return this.pages[this.stateIndex]
	}
	
	
	//
	// Getters and Setters
	//
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			
			this.configureReelView()
		}
	}
	
	
	requiredHeightForWidth (width) {
		if (this.stateIndex == 0) {
			return (this.reelView.requiredHeightForWidth(width))
		}
	}
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addProjectsList()
		this.addReelView()
		this.addFooter()
		
	}
	
	
	addProjectsList () {
		this.addSubview(this.projectsList)
	}
	
	addReelView () {
		this.addSubview(this.reelView)
	}
	
	addFooter () {
		this.addSubview(this.footer)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureProjectsList()
		this.positionProjectsList()
		
		this.configureReelView()
		this.positionReelView()
		
		this.configureFooter()
		this.positionFooter()
		
		
		console.log(this.projectsList.bottom + ' ' + this.reelView.bottom + ' ' + this.footer.bottom)
	}
	
	
	
	
	
	// Projects List
	configureProjectsList () {
		
		this.projectsList.backgroundColor = 'black'
		
		if (this.stateIndex == 1) {
			if (!this.subviewIsAboveSubviews(this.projectsList, [this.reelView])) {
				this.insertSubviewAboveSubviews(this.projectsList, [this.reelView])
			}
			
			setComingSoon(this.projectsList.comingSoon)
		}
		
		
		if (this.stateIndex == 1 && !this.subdued) {
			this.projectsList.opacity = 1
		} else {
			this.projectsList.opacity = 0
		}
		
	}
	
	positionProjectsList () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = this.width
		
		if (this.currentlyActivePage == this.projectsList) {
			newFrame.size.height = this.projectsList.requiredHeightForWidth(newFrame.size.width)
		} else {
			newFrame.size.height = this.height
		}
		

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}
					
		this.projectsList.frame = newFrame
		
	}
	
	
	
	// Reel Page
	configureReelView () {
		
		this.reelView.backgroundColor = 'black'
		this.reelView.overflow = 'auto'
		
		if (this.stateIndex == 0) {
			if (!this.subviewIsAboveSubviews(this.reelView, [this.projectsList])) {
				this.insertSubviewAboveSubviews(this.reelView, [this.projectsList])
			}
			
			setComingSoon(this.reelView.comingSoon)
			
			if (this.currentlyActive) {
				this.reelView.currentlyActive = true
			} else {
				this.reelView.currentlyActive = false
			}
		} else {
			this.reelView.currentlyActive = false
		}
		
		if (this.stateIndex == 0 && !this.subdued) {
			this.reelView.opacity = 1
		} else {
			this.reelView.opacity = 0
		}
		
	}
	
	positionReelView () {
		
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		
		if (this.currentlyActivePage == this.reelView) {
			newFrame.size.height = this.reelView.requiredHeightForWidth(newFrame.size.width)
		} else {
			newFrame.size.height = this.height
		}
		

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}
					
		this.reelView.frame = newFrame
		
	}
	
	
	// Footer
	configureFooter () {
		
		
		
	}
	
	positionFooter () {
		
		var view = this.footer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.footer.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.currentlyActivePage.bottom
							
		view.frame = newFrame
		
		console.log(this.currentlyActivePage)
		console.log(this.currentlyActivePage.frame)
	}
	
	
	
	//
	// Event Listeners
	//
	
	startEventListeners () {
		var contentDomain = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!contentDomain.scrollable) {
				evt.preventDefault()
			}
			
			clearTimeout(contentDomain.scrollFinishTimer)
			if (contentDomain.scrollTop <= 0) {
				contentDomain.scrollFinishTimer = setTimeout(function () {
					contentDomain.readyToClose = true
				}, 50)
			} else {
				contentDomain.readyToClose = false
			}
		})
	}
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
}