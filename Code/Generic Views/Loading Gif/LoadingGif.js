class LoadingGif extends JABView {
	
	constructor (customId) {
		super(customId)
		
		
		// UI
		this.spokes = []
		for (var i = 0; i < this.numberOfSpokes; i++) {
			this.spokes.push(new JABView())
		}
		
		
		// State
		this.numberOfSpokes = 10
		this.highlightedSpokeIndex = 0
		
		this.gifDuration = 1200
		this.advanceHighlightTimers = []
		this.cycleCompletedTimer = setTimeout(function() {}, 0)
		
		// Parameters
		this.parameters = {
			innerRadius: 0,
			lengthOfSpokes: 10,
			widthOfSpokes: 4,
		}
		
		
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
	
	get numberOfSpokes () {
		return this._numberOfSpokes
	}
	
	set numberOfSpokes (newNumberOfSpokes) {
		var changed = (this.numberOfSpokes != newNumberOfSpokes)
		
		if (changed) {
			this._numberOfSpokes = newNumberOfSpokes
			
			for (var i = 0; i < this.spokes.length; i++) {
				this.removeSubview(this.spokes[i])
			}
			this.spokes = []
			
			
			for (var i = 0; i < this.numberOfSpokes; i++) {
				this.spokes.push(new JABView())
			}
			this.addSpokes()
			this.updateAllUI()
		}
		
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addSpokes()
	}
	
	
	addSpokes () {
		for (var i = 0; i < this.spokes.length; i++) {
			this.addSubview(this.spokes[i])
		}
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		this.configureSpokes()
		this.positionSpokes()
	}
	
	
	
	// Parameters
	updateParameters () {
		
		this.parameters.innerRadius = (this.width - (this.parameters.lengthOfSpokes))/2
	}
	
	
	
	
	// Spokes
	configureSpokes () {
		
		for (var i = 0; i < this.spokes.length; i++) {
			var view = this.spokes[i]
			
			view.borderRadius = view.width/2
			view.angle = (360.0/this.numberOfSpokes) * i
			view.configureDuration = this.gifDuration/this.numberOfSpokes
			
			
			var lowestOpacity = 0.2
			var highlightSpan = 1
			var distanceToHighlightedSpoke = Math.abs(this.highlightedSpokeIndex - i)
			if (distanceToHighlightedSpoke > this.numberOfSpokes/2) {
				distanceToHighlightedSpoke = Math.abs(distanceToHighlightedSpoke - this.numberOfSpokes)
			}
			
			var spokeOpacity = lowestOpacity
			if (distanceToHighlightedSpoke <= highlightSpan) {
				
				spokeOpacity = (1 - (((1 - lowestOpacity)/(highlightSpan + 1)) * distanceToHighlightedSpoke))
			}
			
			view.backgroundColor = 'rgba(255, 255, 255, ' + spokeOpacity + ')'
			
		}
	}
	
	positionSpokes () {
		
		for (var i = 0; i < this.spokes.length; i++) {
			
			var angle = (360.0/this.numberOfSpokes) * i
			
			var view = this.spokes[i]
			var newFrame = new CGRect()
								
			newFrame.size.width = this.parameters.widthOfSpokes
			newFrame.size.height = this.parameters.lengthOfSpokes

			newFrame.origin.x = (Math.sin(angle * (2 * Math.PI/360.0)) * this.parameters.innerRadius) + this.width/2 - newFrame.size.width/2
			newFrame.origin.y = (-Math.cos(angle * (2 * Math.PI/360.0)) * this.parameters.innerRadius) + this.height/2 - newFrame.size.height/2
			
			view.frame = newFrame
		}
		
		this.configureSpokes() // Do this to update the borderRadius of the spokes based on new frame
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	cycle (delegate) {
		
		for (var i = 0; i < this.numberOfSpokes; i++) {
			
			
			var loadingGif = this
			this.advanceHighlightTimers.push(setTimeout(function() {
				
				loadingGif.advanceHighlight()
				
			}, ((i + 1) * (this.gifDuration/this.numberOfSpokes))))
			
		}
		
		
		this.cycleCompletedTimer = setTimeout(function() {
			delegate.cycleCompleted()
		}, this.gifDuration - (this.gifDuration/this.numberOfSpokes))
		
		
	}
	
	
	stop () {
		
		for (var i = 0; i < this.advanceHighlightTimers.length; i++) {
			clearTimeout(this.advanceHighlightTimers[i])
		}
		
		clearTimeout(this.cycleCompletedTimer)
		
	}
	
	
	advanceHighlight () {
		
		this.highlightedSpokeIndex += 1
		if (this.highlightedSpokeIndex > this.spokes.length) {
			this.highlightedSpokeIndex = 0
		}
		
		this.updateAllUI()
		
	}
	
	//
	// Delegate
	//
	
}