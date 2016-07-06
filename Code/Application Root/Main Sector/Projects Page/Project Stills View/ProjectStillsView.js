class ProjectStillsView extends JABView {

	constructor (customId, projectDataBundle) {
		super(customId)

		// State
		this.projectDataBundle = projectDataBundle
		this.currentStillIndex = 0

		// Parameters
		this.incomingSlideDistance = 160
		this.stillAnimationDelay = 3000

		// UI
		this.stillViews = []
		for (var i = 0; i < this.projectDataBundle.stills.length; i++) {
			this.stillViews.push(new JABImageView())
		}
		
		
		// Initialize
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.overflow = 'hidden'
		
	}
	
	
	//
	// Getters and Setters
	//
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		
		var changed = newCurrentlyActive != this.currentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			this.animationsDisabled = !newCurrentlyActive
			
			if (this.currentlyActive) {
				// this.startTimerForNextStill()
			}
		}
		
	}

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addStills()
		
	}
	
	
	addStills () {
		for (var i = 0; i < this.stillViews.length; i++) {
			this.addSubview(this.stillViews[this.stillViews.length - 1 - i])
		}
	}


	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureStillsViews()
		this.positionStillsViews()

	}



	// Stills Views
	configureStillsViews () {
		
		for (var i = 0; i < this.stillViews.length; i++) {
			var view = this.stillViews[i]
			
			
			view.positionDuration = 800
			view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
			
			view.configureDelay = 400
			view.configureDuration = view.positionDuration - view.configureDelay
			
			
			view.src = this.projectDataBundle.stills[i]
			
			if (i == this.currentStillIndex - 1 || (i == this.stillViews.length - 1 && this.currentStillIndex == 0)) {
				view.opacity = 0
			} else {
				view.opacity = 1
			}
		}
	}

	positionStillsViews () {
		
		for (var i = 0; i < this.stillViews.length; i++) {
			
			if (i == this.currentStillIndex || i == this.currentStillIndex - 1 || (i == this.stillViews.length - 1 && this.currentStillIndex == 0) || i == this.currentStillIndex + 1 || (i == 0 && this.currentStillIndex == this.stillViews.length - 1)) {
					var view = this.stillViews[i]
					var departedView
					var upComingView
					
					if (i == 0) {
						departedView = this.stillViews[this.stillViews.length - 1]
					} else {
						departedView = this.stillViews[i - 1]
					}
					
					if (i == this.stillViews.length - 1) {
						upComingView = this.stillViews[0]
					} else {
						upComingView = this.stillViews[i + 1]
					}
					
					
					var newFrame = new CGRect()
										
					newFrame.size.width = this.width
					newFrame.size.height = this.height
					

					if (i == this.currentStillIndex) {
						newFrame.origin.x = 0
					} else if (i == this.currentStillIndex - 1 || (i == this.stillViews.length - 1 && this.currentStillIndex == 0)) {
						newFrame.origin.x = -newFrame.size.width
					} else {
						newFrame.origin.x = this.incomingSlideDistance
					}
					
					newFrame.origin.y = (this.height - newFrame.size.height)/2
										
					view.frame = newFrame
				}
			}
	}


	//
	// Actions
	//
	
	
	
	// Stills
	startTimerForNextStill () {
		
		if (!this.animationsDisabled) {
			var projectStillsView = this
			setTimeout(function() {
				projectStillsView.currentStillIndex += 1
				if (projectStillsView.currentStillIndex == projectStillsView.stillViews.length) {
					projectStillsView.currentStillIndex = 0
				}
				
				projectStillsView.animatedUpdate(0, function() {}, function() {
					projectStillsView.restackStills()
					projectStillsView.startTimerForNextStill()
				})
			}, this.stillAnimationDelay)
		}
		
	}
	
	
	
	restackStills () {
		
		for (var i = 0; i < this.stillViews.length; i++) {
			var view = this.stillViews[i]
			
			if (i == this.currentStillIndex - 1 || (i == this.stillViews.length - 1 && this.currentStillIndex == 0)) {
				this.pushSubviewToBack(view)
			}
		}
		
	}
	
	
	
	
	installNewDataBundle () {
		if (this.projectDataBundle != null) {
			
			this.largeStillIndex = this.projectDataBundle.mainStillIndex
			this.secondaryStillsIndicies = []
			
			for (var i = 0; i < this.projectDataBundle.stills.length; i++) {
				if (i != this.largeStillIndex) {
					this.secondaryStillsIndicies.push(i)
				}
			}
			
			this.updateAllUI()
		}
	}
	
	
	swapLargeStillWithSecondaryStill (indexOfSecondaryStill) {
		var operationShouldProcede = true
		if (operationShouldProcede) {
			
			var holder = this.largeStillIndex
			this.largeStillIndex = this.secondaryStillsIndicies[indexOfSecondaryStill]
			this.secondaryStillsIndicies[indexOfSecondaryStill] = holder
			
			this.updateAllUI()
		}
	}



	//
	// Delegate
	//


	// Interactive ImageView
	interactiveImageViewWasHovered (interactiveImageView) {
		var darkenDuration = 300
		
		interactiveImageView.covered = true
		interactiveImageView.animatedUpdate(darkenDuration)
		
		this.secondaryStillsView.allCovered = true
		this.secondaryStillsView.animatedUpdate(darkenDuration)
	}

	interactiveImageViewWasUnhovered (interactiveImageView) {
		var undarkenDuration = 300
		
		interactiveImageView.covered = false
		interactiveImageView.animatedUpdate(undarkenDuration)
		
		this.secondaryStillsView.allCovered = false
		this.secondaryStillsView.animatedUpdate(undarkenDuration)
	}
	
	
	
	interactiveImageViewWasClicked (interactiveImageView) {
		this.parent.projectStillsViewLargeStillWasClicked(this)
	}
	
	
	
	
	// Secondary Stills View
	secondaryStillWasClicked (stillIndex) {
		this.swapLargeStillWithSecondaryStill(stillIndex)
	}

}
