class JABGifWrapper extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			currentIteration: 0,
			totalIterations: 0,
			playing: false,
			paused: false,
		}
		
		// UI
		this.gif = new JABGif('Gif')
		
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
	
	get gif () {
		return this._gif
	}
	
	set gif (newGif) {
		if (newGif != this.gif) {
			if (this.gif != null) {
				this.removeSubview(this.gif)
			}
			
			this._gif = newGif
			this.addSubview(this.gif)
			this.updateAllUI()
			
		}
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addGif()
	}
	
	addGif () {
		this.addSubview(this.gif)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureGif()
		this.positionGif()
	}
	
	
	
	// Gif
	configureGif () {
		
	}
	
	positionGif () {
		this.gif.frame = this.bounds
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	
	// Public
	play () {
		this.loop()
	}
	
	
	loop (iterations) {
		
		if (iterations == null) { // Loop infinitely
			this.state = {totalIterations: null}
		} else {
			if (typeof iterations == 'number') { // Loop that many iterations
				this.state = {totalIterations: iterations}
			}
		}
		
		this.gif.advance(this)
		
	}
	
	stop () {
		
		this.gif.stop()
		
	}
	
	
	
	
	// Internal
	cycleCompleted () {
		
		this.state.currentIteration += 1
		if (this.state.totalIterations == null) {
			this.gif.cycle(this)
		} else {
			if (this.state.currentIteration < this.state.totalIterations) {
				this.gif.cycle(this)
			} else {
				this.state = {
					currentIteration: 0,
					totalIterations: 0,
					playing: false,
					paused: false,
				}
			}
		}
	}
	
	
	advanceCompleted (cycleCompleted) {
		
		if (cycleCompleted) {
			this.state.totalIterations += 1
		}
		
		if (this.state.totalIterations == null) {
			this.gif.advance(this)
		} else {
			if (this.state.currentIteration < this.state.totalIterations) {
				this.gif.advance(this)
			} else {
				this.state = {
					currentIteration: 0,
					totalIterations: 0,
					playing: false,
					paused: false,
				}
			}
		}
		
	}
	
	
	//
	// Delegate
	//
	
}