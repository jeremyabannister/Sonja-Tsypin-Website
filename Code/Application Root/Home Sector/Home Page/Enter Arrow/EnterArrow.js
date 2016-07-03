class EnterArrow extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		
		//
		// Animation Parameters
		//
		
		// General
		this.updatingForBounce = false
		this.updatingForFade = true
		
		// Fade Pulse
		this.fadeInDuration = 825
		this.fadedInPause = 0
		this.fadeOutDuration = this.fadeInDuration
		this.fadedOutPause = 2000
		
		this.fadedOut = true
		this.fadePaused = true
		this.giveInstructions = true
		
		// Bounce
		this.maximumBounceHeight = 40
		this.numberOfBounces = 3
		this.bounceInitialTimeBuffer = 100 // The bounce begins this number of miliseconds after the label begins fading in
		this.bouncePostTimeBuffer = 250 // The bounce finishes this number of miliseconds before the label finishes fading out
		
		
		this.bounceGoingUp = false
		this.currentBounceNumber = this.numberOfBounces // When the current bounce is equal to the number of bounces the animation is not running
		
		
		
		// UI
		this.label = new UILabel('Label')
		this.imageView = new JABImageView('ImageView')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.willingToInheritAnimationOptions = false
		
		this.label.opacity = 0
		this.imageView.opacity = 0
		
		var enterArrow = this
		setTimeout(function () {
			enterArrow.advanceTextOpacityPulse()
		}, 200)
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addLabel()
		this.addImageView()
	}
	
	addLabel () {
		this.addSubview(this.label)
	}
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureLabel()
		this.positionLabel()
		
		this.configureImageView()
		this.positionImageView()
		
	}
	
	
	
	// Label
	configureLabel () {
		
		this.label.text = 'SCROLL DOWN'
		this.label.textColor = 'white'
		this.label.fontFamily = 'siteFont'
		this.label.fontSize = 10
		this.label.fontWeight = 'bold'
		
		if (this.updatingForFade) {
			if (this.fadedOut) {
				this.label.opacity = 0
			} else {
				if (this.giveInstructions) {
					this.label.opacity = 0.4
				} else {
					this.label.opacity = 0.4
				}
				
			}
			
			
			if (!this.fadePaused) {
				if (this.fadedOut) {
					this.label.configureDuration = this.fadeInDuration
				} else {
					this.label.configureDuration = this.fadeOutDuration
				}
			}
		}
		
		
		if (this.updatingForBounce) {
			if (this.currentBounceNumber < this.numberOfBounces) {
				
				var totalBounceTime = ((this.fadeInDuration + this.fadedInPause + this.fadeOutDuration) - (this.bounceInitialTimeBuffer + this.bouncePostTimeBuffer))
				var timingFractionsByBounce = [0.4, 0.35, 0.25]
				
				this.label.positionDuration = totalBounceTime * timingFractionsByBounce[this.currentBounceNumber]/2
				
				if (this.bounceGoingUp) {
					this.label.positionEasingFunction = 'ease-out'
				} else {
					this.label.positionEasingFunction = 'ease-in'
				}
			} else {
				this.label.positionDuration = 0
			}
		}
		
	}
	
	positionLabel () {
		
		var newFrame = new CGRect()
		var size = this.label.font.sizeOfString(this.label.text)
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
		
		
		if (this.updatingForBounce) {
			if (this.currentBounceNumber < this.numberOfBounces) {
				if (this.bounceGoingUp) {
					newFrame.origin.y -= (this.maximumBounceHeight) * Math.pow(0.5, (this.currentBounceNumber))
				}
			}
		}
		
					
		this.label.frame = newFrame
		
	}
	
	
	
	// Image View
	configureImageView () {
		this.imageView.src = './Resources/Images/Buttons/Enter Arrow.png'
		
		
		if (this.updatingForFade) {
			if (this.fadedOut) {
				this.imageView.opacity = 0.4
			} else {
				this.imageView.opacity = 0.4
			}
			
			
			if (!this.fadePaused) {
				if (this.fadedOut) {
					this.imageView.configureDuration = this.fadeInDuration
				} else {
					this.imageView.configureDuration = this.fadeOutDuration
				}
			}
		}
		
		
		if (this.updatingForBounce) {
			if (this.currentBounceNumber < this.numberOfBounces) {				
				
				var totalBounceTime = ((this.fadeInDuration + this.fadedInPause + this.fadeOutDuration) - (this.bounceInitialTimeBuffer + this.bouncePostTimeBuffer))
				var timingFractionsByBounce = [0.4, 0.35, 0.25]
				
				this.imageView.positionDuration = totalBounceTime * timingFractionsByBounce[this.currentBounceNumber]/2
				
				if (this.bounceGoingUp) {
					this.imageView.positionEasingFunction = 'ease-out'
				} else {
					this.imageView.positionEasingFunction = 'ease-in'
				}
			} else {
				this.imageView.positionDuration = 0
			}
		}
	}
	
	positionImageView () {
		
		var bufferBetweenLabelAndImageView = 3
		var newFrame = new CGRect()
					
		newFrame.size.width = this.width
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.label.bottom + bufferBetweenLabelAndImageView
		
					
		this.imageView.frame = newFrame
		
	}
	
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	
	// Animations
	advanceTextOpacityPulse () {
		
		if (this.fadedOut) {
			if (this.fadePaused) {
				this.fadePaused = false
				this.fadedOut = false
			} else {
				this.fadePaused = true
			}
		} else {
			if (this.fadePaused) {
				this.fadePaused = false
				this.fadedOut = true
				this.giveInstructions = !this.giveInstructions
			} else {
				this.fadePaused = true
			}
		}
		
		
		var enterArrow = this
		
		
		if (!this.fadedOut && !this.fadePaused) {
			setTimeout(function() {
				enterArrow.runLabelBounceAnimation()
			}, this.bounceInitialTimeBuffer)
		}
		
		
		if (this.fadePaused) {
			var pauseTime = this.fadedInPause
			if (this.fadedOut) {
				pauseTime = this.fadedOutPause
			}
			
			setTimeout(function() {
				enterArrow.advanceTextOpacityPulse()
			}, pauseTime)
		} else {
			this.updatingForFade = true
			
			this.animatedUpdate(0, function() { // The fade duration is assigned directly to the label in configureLabel, so we use 0 here so as not to unnecessarily cascade an arbitrary animationDuration down to inheriting subviews
				enterArrow.updatingForFade = false
				enterArrow.advanceTextOpacityPulse()
			}, function() {})
		}
	}
	
	
	runLabelBounceAnimation () {
		
		this.currentBounceNumber = 0
		this.advanceLabelBounceAnimation()
		
	}
	
	advanceLabelBounceAnimation () {
		
		var enterArrow = this
		
		if (this.currentBounceNumber < this.numberOfBounces) {
			this.bounceGoingUp = !this.bounceGoingUp
			this.updatingForBounce = true
			
			this.animatedUpdate(0, null, function() {
				enterArrow.updatingForBounce = false
				if (!enterArrow.bounceGoingUp) {
					enterArrow.currentBounceNumber += 1 // If the label has just come down then move on to the next bounce
				}
				enterArrow.advanceLabelBounceAnimation()
			})
		}
	}
	
	//
	// Delegate
	//
	
}