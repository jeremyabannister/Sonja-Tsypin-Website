class ProjectSecondaryStillsView extends JABView {

	constructor (customId, projectDataBundle) {
		super(customId)

		// State
		this.projectDataBundle = projectDataBundle
		this.stillsIndicies = []
		this.allCovered = false


		// UI
		this.stills = []
		if (this.projectDataBundle.stillsBundle.mainStillIndex > -1 && this.projectDataBundle.stillsBundle.mainStillIndex < this.projectDataBundle.stillsBundle.stills.length) {
			for (var i = 0; i < this.projectDataBundle.stillsBundle.stills.length - 1; i++) {
				this.stills.push(new InteractiveImageView())
			}
		}
		
		
		// Initialize
	}



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addStills()
		
	}
	
	
	
	addStills () {
		for (var i = 0; i < this.stills.length; i++) {
			this.addSubview(this.stills[i])
		}
	}


	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureStills()
		this.positionStills()
	}




	// Stills
	configureStills () {
		
		for (var i = 0; i < this.stills.length; i++) {
			var still = this.stills[i]
			still.src = this.projectDataBundle.stills[this.stillsIndicies[i]]
			still.coverColor = 'rgba(0, 0, 0, 0.7)'
			
			if (this.allCovered) {
				still.covered = true
			} else {
				still.covered = false
			}
			
			still.updateAllUI()
		}

	}

	positionStills () {

		for (var i = 0; i < this.stills.length; i++) {
			var still = this.stills[i]

			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = newFrame.size.width / (16.0/9.0)

			newFrame.origin.x = 0
			newFrame.origin.y = i * newFrame.size.height

			still.frame = newFrame
		}

	}



	//
	// Actions
	//



	//
	// Delegate
	//


	// Interactive ImageView
	interactiveImageViewWasHovered (interactiveImageView) {
		for (var i = 0; i < this.stills.length; i++) {
			if (this.stills[i] == interactiveImageView) {
				
			} else {
				this.stills[i].covered = true
			}
			this.stills[i].animatedUpdate(300)
		}
	}

	interactiveImageViewWasUnhovered (interactiveImageView) {
		for (var i = 0; i < this.stills.length; i++) {
			if (this.stills[i] == interactiveImageView) {

			} else {
				this.stills[i].covered = false
			}
			this.stills[i].animatedUpdate(300)
		}
	}
	
	
	interactiveImageViewWasClicked (interactiveImageView) {
		
		for (var i = 0; i < this.stills.length; i++) {
			if (this.stills[i] == interactiveImageView) {
				this.parent.secondaryStillWasClicked(i)
			}
		}
	}

}
