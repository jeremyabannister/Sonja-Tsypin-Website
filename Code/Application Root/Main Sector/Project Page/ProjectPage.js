class ProjectPage extends JABView {
	
	constructor (customId, projectGroups) {
		super(customId)
		
		// State
		this.state = {
			shouldStartLoading: false,
			
			projectGroupIndex: 0,
			projectIndex: 0,
			
			switchingProject: false, // This indicates whether or not the switching-project-animation is in progress
			advancingToNextProject: false, // This indicates which direction the switching-project-animation is going which is necessary to tune the animation parameters
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
			
			heightOfNavigationButtons: 50,
			positioningHeightOfNavigationButtons: 20,
			widthAdditionForNavigationButtons: 20,
			topBufferForNavigationButtons: 10,
			rightBufferForNavigationButtons: 0,
			
			standardVimeoViewFrame: null,
			wideVimeoViewFrame: null,
		}
		
		// UI
		
		this.vimeoViews = []
		var counter = 0
		for (var i = 0; i < this.projectGroups.length; i++) {
			this.vimeoViews.push([])
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				this.vimeoViews[i].push(new JABVimeoView('VimeoView' + counter))
				counter++
			}
		}
		
		this.titleLabels = []
		counter = 0
		for (var i = 0; i < this.projectGroups.length; i++) {
			this.titleLabels.push([])
			for (var j = 0; j < this.projectGroups[i].length; j++) {
				this.titleLabels[i].push(new UILabel('TitleLabel' + counter))
				counter++
			}
		}
		
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
	
	get currentTitleLabel () {
		return this.titleLabels[this.state.projectGroupIndex][this.state.projectIndex]
	}
	
	
	get paused () {
		return this.currentVimeoView.paused
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addNavigationButtons() // Navigation buttons are taller than the buffer but should not block the clickability of the vimeo view, and so must be underneath it
		
		this.addVimeoViews()
		this.addTitleLabels()
	}
	
	
	
	addVimeoViews () {
		for (var i = 0; i < this.vimeoViews.length; i++) {
			for (var j = 0; j < this.vimeoViews[i].length; j++) {
				this.addSubview(this.vimeoViews[i][j])
			}
		}
	}
	
	
	addTitleLabels () {
		for (var i = 0; i < this.titleLabels.length; i++) {
			for (var j = 0; j < this.titleLabels[i].length; j++) {
				this.addSubview(this.titleLabels[i][j])
			}
		}
	}
	
	addNavigationButtons() {
		this.addSubview(this.navigationButtons)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureVimeoViews()
		this.positionVimeoViews()
		
		this.configureTitleLabels()
		this.positionTitleLabels()
		
		this.configureNavigationButtons()
		this.positionNavigationButtons()
	}
	
	
	
	
	
	// Vimeo Views
	
	configureVimeoViews () {
		
		for (var i = 0; i < this.vimeoViews.length; i++) {
			for (var j = 0; j < this.vimeoViews[i].length; j++) {
				
				var view = this.vimeoViews[i][j]
				var projectDataBundle = this.projectGroups[i][j]
				
				view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
				if (this.instantUpdate) {
					view.positionDuration = 0
				} else {
					view.positionDuration = 800
				}
				
				if (view.vimeoId != projectDataBundle.vimeoId && this.state.shouldStartLoading) {
					view.vimeoId = projectDataBundle.vimeoId
				}
				
				if (view.loadingGif == null) {
					view.loadingGif = new LoadingGif()
				}
				
				if (projectDataBundle.noVideoMessage != null) {
					view.opacity = 0
				} else {
					view.opacity = 1
				}
				
				view.updateAllUI()
				
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
				if (sizeClass == 'xxs' || sizeClass == 'xs') {
					newFrame.size.width = applicationRoot.contentWidth
				}
				
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
				} else if (aspectRatio == (1.0)/(2.35)) {
					var wideFrame = newFrame.copy()
					this.parameters = {wideVimeoViewFrame: wideFrame}
				}
			}
		}
	}
	
	
	
	
	// Title Labels
	configureTitleLabels () {
		for (var i = 0; i < this.titleLabels.length; i++) {
			for (var j = 0; j < this.titleLabels[i].length; j++) {
				
				var view = this.titleLabels[i][j]
				var dataBundle = this.projectGroups[i][j]
				var fontSizes = {'xxs': 18, 'xs': 18, 's': 18, 'm': 18, 'l': 18, 'xl': 18}
				
				if (dataBundle != null) {
					view.text = dataBundle.title
					view.fontFamily = 'siteFont'
					view.fontSize = fontSizes[sizeClass]
					view.textColor = 'white'
					view.letterSpacing = 2
				}
				
				
				view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
				if (this.instantUpdate) {
					view.configureDuration = 0
					view.positionDuration = 0
				} else {
					view.configureDuration = 225
					view.configureEasingFunction = 'ease-in'
					view.positionDuration = 800
					if (i == this.state.projectGroupIndex) {
						if (j == this.state.projectIndex) {
							if (this.state.advancingToNextProject) {
								view.configureDuration = 600
								view.configureEasingFunction = 'ease-in-out'
								view.configureDelay = view.positionDuration - view.configureDuration
							} else {
								view.configureDuration = 0
								view.configureEasingFunction = 'ease-out'
								view.configureDelay = 0
								
								if (sizeClass == 'xxs' || sizeClass == 'xs') {
									view.configureDuration = 600
									view.configureEasingFunction = 'ease-in-out'
									view.configureDelay = view.positionDuration - view.configureDuration
								}
							}
							
						} else {
							view.configureDelay = 0
						}
					} else {
						view.configureDelay = 0
					}
				}
				
				
				if (!(i == this.state.projectGroupIndex && j == this.state.projectIndex)) {
					view.opacity = 0
				} else {
					view.opacity = 1
				}
			}
		}
	}
	
	positionTitleLabels () {
		for (var i = 0; i < this.titleLabels.length; i++) {
			for (var j = 0; j < this.titleLabels[i].length; j++) {
				
				var view = this.titleLabels[i][j]
				var newFrame = new CGRect()
				var size = view.font.sizeOfString(view.text)
									
				newFrame.size.width = size.width
				newFrame.size.height = size.height
				
				var offset = this.width
				newFrame.origin.x = this.currentVimeoView.x + this.parameters.leftBufferForTitleLabel
				newFrame.origin.y = this.parameters.standardVimeoViewFrame.bottom + this.parameters.topBufferForTitleLabel
				
				
				if (sizeClass == 'xxs' || sizeClass == 'xs') {
					newFrame.origin.y = this.parameters.standardVimeoViewFrame.top - newFrame.size.height - this.parameters.topBufferForTitleLabel
					newFrame.origin.x = (this.width - newFrame.size.width)/2
				}
				
				
				if (i == this.state.projectGroupIndex) {
					if (j < this.state.projectIndex) {
						newFrame.origin.x -= offset
					} else if (j > this.state.projectIndex) {
						newFrame.origin.x += offset
					}
				} else {
					newFrame.origin.x += offset
				}
				
				
				view.frame = newFrame
			}
		}
	}
	
	
	
	
	
	// Navigation Buttons
	configureNavigationButtons () {
		var view = this.navigationButtons
		
		view.state = {
			prevEnabled: (this.state.projectIndex != 0),
			nextEnabled: (this.state.projectIndex != this.vimeoViews[this.state.projectGroupIndex].length - 1),
		}
		
		view.positionDuration = 0
		view.parameters.widthAddition = this.parameters.widthAdditionForNavigationButtons
		
		if (this.vimeoViews[this.state.projectGroupIndex].length == 1) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
	}
	
	positionNavigationButtons () {
		var view = this.navigationButtons
		var newFrame = new CGRect()
							
		newFrame.size.width = view.requiredWidth + this.parameters.widthAdditionForNavigationButtons
		newFrame.size.height = this.parameters.heightOfNavigationButtons

		newFrame.origin.x = this.currentVimeoView.right - newFrame.size.width - this.parameters.rightBufferForNavigationButtons + this.parameters.widthAdditionForNavigationButtons/2
		newFrame.origin.y = this.currentTitleLabel.top + (this.currentTitleLabel.height - this.parameters.positioningHeightOfNavigationButtons)/4 - (this.parameters.heightOfNavigationButtons - this.parameters.positioningHeightOfNavigationButtons)/2
		
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			newFrame.origin.y = this.parameters.wideVimeoViewFrame.bottom + (this.height - this.parameters.standardVimeoViewFrame.bottom - newFrame.size.height)/2
			newFrame.origin.x = (this.width - newFrame.size.width)/2
		}
							
		view.frame = newFrame
	}
	
	
	
	
	//
	// Event Listeners
	//

	
	//
	// Actions
	//
	
	// Navigation
	goToPreviousProject () {
		this.pause()
		if (this.state.projectIndex != 0) {
			this.state.projectIndex -= 1
			if (this.state.projectIndex == 1) { // To account for Audrey's missing film Angels
				this.state.projectIndex = 0
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			
			var projectPage = this
			projectPage.state = {advancingToNextProject: false}
			this.animatedUpdate()
		}
	}
	
	goToNextProject () {
		this.pause()
		if (this.state.projectIndex != this.projectGroups[this.state.projectGroupIndex].length - 1) {
			this.state.projectIndex += 1
			if (this.state.projectIndex == 1) { // To account for Audrey's missing film Angels
				this.state.projectIndex = 2
			}
			this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex)
			
			var projectPage = this
			projectPage.state = {advancingToNextProject: true}
			this.animatedUpdate()
		}
	}
	
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
	play () {
		this.currentVimeoView.play()
	}
	
	pause () {
		this.currentVimeoView.pause()
	}
	
	
	
	// Swipe
	leftSwipeDetected () {
		this.goToNextProject()
	}
	
	rightSwipeDetected () {
		this.goToPreviousProject()
	}
	
	
	// Keys
	leftArrowWasPressed () {
		this.goToPreviousProject()
	}
	
	rightArrowWasPressed () {
		this.goToNextProject()
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
		this.goToPreviousProject()
	}
	
	videoNavigationButtonsNextButtonWasClicked (videoNavigationButtons) {
		this.state.handlingClick = true
		this.goToNextProject()
	}
	
	
}