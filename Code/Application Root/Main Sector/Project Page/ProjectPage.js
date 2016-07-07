class ProjectPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: null,
		}
		
		// Parameters
		this.parameters = {}
		
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
		
		var view = this.vimeoView
		
		if (this.state.projectDataBundle != null) {
			if (this.state.projectDataBundle.vimeoId != null) {
				view.vimeoId = this.state.projectDataBundle.vimeoId
			}
		}
		
	}
	
	positionVimeoView () {
		
		var view = this.vimeoView
		var newFrame = new CGRect()

		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (9.0/16.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2


		view.frame = newFrame
		
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