class ProjectImageView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.src = ''
		
		// UI
		this.centerImageView = new JABImageView('CenterImageView')
		this.leftImageView = new JABImageView('LeftImageView')
		this.rightImageView = new JABImageView('RightImageView')
		
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
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addCenterImageView()
		this.addLeftImageView()
		this.addRightImageView()
		
	}
	
	
	addCenterImageView () {
		this.addSubview(this.centerImageView)
	}
	
	addLeftImageView () {
		this.addSubview(this.leftImageView)
	}
	
	addRightImageView () {
		this.addSubview(this.rightImageView)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureCenterImageView()
		this.positionCenterImageView()
		
		this.configureLeftImageView()
		this.positionLeftImageView()
		
		this.configureRightImageView()
		this.positionRightImageView()
	}
	
	
	// Center Image View
	configureCenterImageView () {
		
		var view = this.centerImageView
		
	}
	
	positionCenterImageView () {
		
	}
	
	
	
	// Left Image View
	configureLeftImageView () {
		
	}
	
	positionLeftImageView () {
		
	}
	
	
	
	// Right Image View
	configureRightImageView () {
		
	}
	
	positionRightImageView () {
		
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