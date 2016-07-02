class ReelView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.currentlyActive = null
		this.comingSoon = false
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
		
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
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			
			if (!this.currentlyActive) {
				this.pauseReel()
			}
		}
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addVimeoView()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
	}
	
	
	// Vimeo View
	
	configureVimeoView () {
		
		var vimeoId = '153864846'
		
		if (this.vimeoView.vimeoId != vimeoId) {
			this.vimeoView.vimeoId = vimeoId
		}
		
		
	}
	
	positionVimeoView () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (9.0/16.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
					
		this.vimeoView.frame = newFrame
		
	}
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	
	// Video
	playReel () {
		if (this.vimeoView != null) {
			this.vimeoView.play()
		}
	}
	
	pauseReel () {
		if (this.vimeoView != null) {
			this.vimeoView.pause()
		}
	}
	
	//
	// Delegate
	//
	
}