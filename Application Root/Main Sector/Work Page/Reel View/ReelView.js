class ReelView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
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
		this.vimeoView.vimeoId = '153864846'
		
	}
	
	positionVimeoView () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (9.0/16.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 20
					
		this.vimeoView.frame = newFrame
		
	}
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
}