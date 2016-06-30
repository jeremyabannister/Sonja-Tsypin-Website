class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xs': 700, 's': 780, 'm': 1000, 'l': 1000}


		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			
			// UI
			this.mainSector = new MainSector('MainSector')
			
		}
		
		
		// Initialize
	}

	
	
	//
	// Getters and Setters
	//
	
	get contentWidth () {
		return this._contentWidth[sizeClass]
	}
	
	set contentWidth (newContentWidth) {
		this._contentWidth = newContentWidth
	}
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		if (this.laboratoryEnabled) {
			this.addLaboratory()
		} else {
			
			this.addMainSector()
			
		}
		
	}
	
	
	addMainSector () {
		this.addSubview(this.mainSector)
	}
	
	addLaboratory () {
		this.addSubview(this.laboratory)
	}
	
	
	


	// Update

	updateAllUI () {
		super.updateAllUI()


		if (this.laboratoryEnabled) {
			this.configureLaboratory()
			this.positionLaboratory()
		} else {
			
			
			
			this.configureMainSector()
			this.positionMainSector()
			
			
			
		}

	}




	// Main Sector
	configureMainSector () {
		this.mainSector.backgroundColor = '#000000'
	}

	positionMainSector () {
		this.mainSector.frame = new CGRect(0, 0, this.width, this.height)
	}





	configureLaboratory () {

		this.laboratory.backgroundColor = 'white'
	}

	positionLaboratory () {
		if (this.laboratoryEnabled) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = this.height

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame

		} else {
			var newFrame = new CGRect()

			newFrame.size.width = 0
			newFrame.size.height = 0

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame
		}
	}


	//
	// Actions
	//

	userDidScrollByAmount (amount) {
		this.mainSector.userDidScrollByAmount(amount)
	}

	userDidStopScrolling () {
		this.mainSector.userDidStopScrolling()
	}


}
