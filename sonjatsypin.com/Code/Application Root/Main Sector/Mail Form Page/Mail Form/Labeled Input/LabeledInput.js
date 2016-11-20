class LabeledInput extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 50
		
		// Parameters
		this.parameters = {
			heightOfInput: 30,
			bufferBetweenLabelAndInput: 5,
		}
		
		// UI
		this.label = new UILabel('Label')
		this.input = new JABInput('Input')
		
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
		this.addLabel()
		this.addInput()
	}
	
	addLabel () {
		this.addSubview(this.label)
	}
	
	addInput () {
		this.addSubview(this.input)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureLabel()
		this.positionLabel()
		
		this.configureInput()
		this.positionInput()
	}
	
	
	
	// Label
	configureLabel () {
		var view = this.label
		
		
	}
	
	positionLabel () {
		var view = this.label
		var newFrame = new CGRect()
		var size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	// Input
	configureInput () {
		var view = this.input
		
		view.borderColor = 'white'
		view.borderStyle = 'solid'
		view.borderWidth = 1
		view.borderRadius = 6
		
		view.textColor = 'white'
		view.fontFamily = 'siteFont'
		view.fontSize = 14
		
		view.paddingLeft = 7
	}
	
	positionInput () {
		var view = this.input
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.heightOfInput

		newFrame.origin.x = 0
		newFrame.origin.y = this.label.bottom + this.parameters.bufferBetweenLabelAndInput
							
		view.frame = newFrame
		
		this.requiredHeight = this.input.bottom - this.label.top
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