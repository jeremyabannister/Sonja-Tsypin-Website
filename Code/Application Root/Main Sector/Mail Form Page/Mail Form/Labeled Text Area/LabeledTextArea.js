class LabeledTextArea extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 50
		
		// Parameters
		this.parameters = {
			bufferBetweenLabelAndTextArea: 5,
			
			heightOfTextArea: 200,
		}
		
		// UI
		this.label = new UILabel('Label')
		this.textArea = new JABTextArea('TextArea')
		
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
		this.addTextArea()
	}
	
	addLabel () {
		this.addSubview(this.label)
	}
	
	addTextArea () {
		this.addSubview(this.textArea)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureLabel()
		this.positionLabel()
		
		this.configureTextArea()
		this.positionTextArea()
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
	configureTextArea () {
		var view = this.textArea
		
		view.borderColor = 'white'
		view.borderStyle = 'solid'
		view.borderWidth = 1
		view.borderRadius = 6
		
		view.textColor = 'white'
		view.fontFamily = 'siteFont'
		view.fontSize = 12
		
		view.paddingLeft = 7
		view.paddingTop = 7
	}
	
	positionTextArea () {
		var view = this.textArea
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.heightOfTextArea

		newFrame.origin.x = 0
		newFrame.origin.y = this.label.bottom + this.parameters.bufferBetweenLabelAndTextArea
							
		view.frame = newFrame
		
		this.requiredHeight = this.textArea.bottom - this.label.top
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