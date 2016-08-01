class ProjectPage extends JABView {
	
	constructor (customId, projectGroups) {
		super(customId)
		
		// State
		this.state = {
			projectGroupIndex: 0,
			projectIndex: 0,
			
			switchingProject: false,
			handlingClick: false,
		}
		
		this.projectGroups = projectGroups
		this.instantUpdate = false
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			vimeoViewMinimumDistanceFromHeader: 40,
			vimeoViewVerticalAdjustment: -4,
			
			projectVideoUIGroupMinimumDistanceFromHeader: 40,
			projectVideoUIGroupVerticalAdjustment: -4,
			
			leftBufferForTitleLabel: 5,
			topBufferForTitleLabel: 10,
			
			heightOfNavigationButtons: 20,
			topBufferForNavigationButtons: 10,
			rightBufferForNavigationButtons: 0,
			
			standardVimeoViewFrame: null,
		}
		
		// UI
		
		this.vimeoViews = []
		for (var i = 0; i < this.projectGroups.length; i++) {
			this.vimeoViews.push([])
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				this.vimeoViews[i].push(new JABVimeoView())
			}
		}
		
		this.titleLabel = new UILabel('TitleLabel')
		this.navigationButtons = new VideoNavigationButtons('NavigationButtons')
		
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
	
	get projectDataBundle () {
		return this.projectGroups[this.state.projectGroupIndex][this.state.projectIndex]
	}
	
	get currentVimeoView () {
		return this.vimeoViews[this.state.projectGroupIndex][this.state.projectIndex]
	}
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addVimeoViews()
		this.addTitleLabel()
		this.addNavigationButtons()
	}
	
	
	
	addVimeoViews () {
		for (var i = 0; i < this.vimeoViews.length; i++) {
			for (var j = 0; j < this.vimeoViews[i].length; j++) {
				this.addSubview(this.vimeoViews[i][j])
			}
		}
	}
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addNavigationButtons() {
		this.addSubview(this.navigationButtons)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureVimeoViews()
		this.positionVimeoViews()
		
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		this.configureNavigationButtons()
		this.positionNavigationButtons()
	}
	
	
	
	
	
	// Project Video UI Groups
	
	configureVimeoViews () {
		
		for (var i = 0; i < this.vimeoViews.length; i++) {
			for (var j = 0; j < this.vimeoViews[i].length; j++) {
				
				var view = this.vimeoViews[i][j]
				var projectDataBundle = this.projectGroups[i][j]
				
				view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
				if (this.instantUpdate) {
					view.positionDuration = 0
				} else {
					view.positionDuration = 500
				}
				
				view.vimeoId = projectDataBundle.vimeoId
				
				if (view.loadingGif == null) {
					view.loadingGif = new LoadingGif()
				}
				
				if (projectDataBundle.noVideoMessage != null) {
					view.opacity = 0
				} else {
					view.opacity = 1
				}
				
				view.updateAllUI()
				
				view.blue()
			}
		}
		
	}
	
	positionVimeoViews () {
		for (var i = 0; i < this.vimeoViews.length; i++) {
			for (var j = 0; j < this.vimeoViews[i].length; j++) {
				
				var view = this.vimeoViews[i][j]
				var projectDataBundle = this.projectGroups[i][j]
				
				var aspectRatio = (9.0)/(16.0)
				if (projectDataBundle != null) {
					if (typeof projectDataBundle.vimeoHeightToWidth == 'number') {
						aspectRatio = projectDataBundle.vimeoHeightToWidth
					}
				}
				
				var newFrame = new CGRect()
									
				newFrame.size.width = applicationRoot.contentWidth * 0.9
				newFrame.size.height = newFrame.size.width * aspectRatio

				newFrame.origin.x = (this.width - newFrame.size.width)/2
				
				if (this.state.projectGroupIndex == i) {
					if (j < this.state.projectIndex) {
						newFrame.origin.x -= this.width
					} else if (j > this.state.projectIndex) {
						newFrame.origin.x += this.width
					}
				} else {
					newFrame.origin.x += this.width
				}
				
				newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height)/2 + this.parameters.vimeoViewVerticalAdjustment
				
				if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader) {
					newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader
				}
									
				view.frame = newFrame
				
				
				if (aspectRatio == (9.0)/(16.0)) {
					var standardFrame = newFrame.copy()
					this.parameters = {standardVimeoViewFrame: standardFrame}
				}
			}
		}
	}
	
	
	
	
	
	// Title Label
	configureTitleLabel () {
		var view = this.titleLabel
		var dataBundle = this.projectDataBundle
		
		view.positionDuration = 0
		
		if (this.state.switchingProject) {
			view.configureDuration = this.currentVimeoView.positionDuration/4 // Fade out duration
			view.opacity = 0
		} else {
			view.configureDuration = this.currentVimeoView.positionDuration/4 // Fade in duration
			view.opacity = 1
			if (dataBundle != null) {
				view.text = dataBundle.title
				view.fontFamily = 'siteFont'
				view.fontSize = 18
				view.textColor = 'white'
				view.letterSpacing = 2
			}
		}
	}
	
	positionTitleLabel () {
		var view = this.titleLabel
		var newFrame = new CGRect()
		var size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.currentVimeoView.x + this.parameters.leftBufferForTitleLabel
		newFrame.origin.y = this.parameters.standardVimeoViewFrame.bottom + this.parameters.topBufferForTitleLabel
							
		view.frame = newFrame
	}
	
	
	
	// Navigation Buttons
	configureNavigationButtons () {
		var view = this.navigationButtons
		
		view.state = {
			prevEnabled: (this.state.projectIndex != 0),
			nextEnabled: (this.state.projectIndex != this.vimeoViews[this.state.projectGroupIndex].length - 1),
		}
		
		view.positionDuration = 0
		
		view.updateAllUI()
	}
	
	positionNavigationButtons () {
		var view = this.navigationButtons
		var newFrame = new CGRect()
							
		newFrame.size.width = view.requiredWidth
		newFrame.size.height = this.parameters.heightOfNavigationButtons

		newFrame.origin.x = this.currentVimeoView.right - newFrame.size.width - this.parameters.rightBufferForNavigationButtons
		newFrame.origin.y = this.titleLabel.top + (this.titleLabel.height - newFrame.size.height)/4
							
		view.frame = newFrame
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	// Load
	loadProjectIdentifier (projectIdentifier) {
		for (var i = 0; i < this.projectGroups.length; i++) {
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				if (this.projectGroups[i][j].id == projectIdentifier) {
					this.state = {
						projectGroupIndex: i,
						projectIndex: j,
					}
					this.instantUpdate = true
					this.updateAllUI()
					this.instantUpdate = false
				}
			}
		}
	}
	
	// Playback
	pause () {
		this.vimeoViews[this.state.projectGroupIndex][this.state.projectIndex].pause()
	}
	
	
	//
	// Delegate
	//
	
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		
	}
	
	
	// Video Navigation Buttons
	videoNavigationButtonsPrevButtonWasClicked (videoNavigationButtons) {
		this.state.handlingClick = true
		if (this.state.projectIndex != 0) {
			this.state.projectIndex -= 1
			if (this.state.projectIndex == 2) {
				this.state.projectIndex = 1
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			
			var projectPage = this
			projectPage.state = {switchingProject: true}
			this.animatedUpdate()
			setTimeout(function() {
				projectPage.state = {switchingProject: false}
				projectPage.animatedUpdate()
			}, projectPage.currentVimeoView.positionDuration/2)
		}
	}
	
	videoNavigationButtonsNextButtonWasClicked (videoNavigationButtons) {
		this.state.handlingClick = true
		if (this.state.projectIndex != this.projectGroups[this.state.projectGroupIndex].length - 1) {
			this.state.projectIndex += 1
			if (this.state.projectIndex == 2) {
				this.state.projectIndex = 3
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			
			var projectPage = this
			projectPage.state = {switchingProject: true}
			this.animatedUpdate()
			setTimeout(function() {
				projectPage.state = {switchingProject: false}
				projectPage.animatedUpdate()
			}, projectPage.currentVimeoView.positionDuration/2)
		}
	}
	
	
}