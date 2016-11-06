class JABGif extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		// UI
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	
	
	
	
	// Internal
	
	cycle (delegate) {
		
		// This is defined by each gif. The gif is responsible for caling cycleCompleted on the passed delegate at the end of its cycle
	}
	
	advance (delegate) {
		
		// This is distinct from the cycle method in that advance does not necessarily return the gif to its original state. For example, a gif which consists of three images will need to advance three times before it is back to where it started. cycle, by contrast, is defined as one full loop returning to where it started. The gif is responsible for calling advancedCompleted at the end of the advancement
		
	}
	
	
	//
	// Delegate
	//
	
}