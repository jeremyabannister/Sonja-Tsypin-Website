class MailForm extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.requiredHeight = 300
		
		// Parameters
		this.parameters = {
			betweenBufferForInputs: 10,
			
			widthFractionOfSingleLineInputs: 0.66,
			heightOfSingleLineInputs: 30,
			heightOfMultilineInputs: 200,
			fontSizeOfInputLabels: 12,
			
			leftBufferForSendButton: 20,
			topBufferForSendButton: 20,
		}
		
		// UI
		this.fromInput = new LabeledInput('FromInput')
		this.subjectInput = new LabeledInput('SubjectInput')
		this.bodyInput = new LabeledTextArea('BodyInput')
		
		this.sendButton = new UILabel('SendButton')
		
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
		this.addFromInput()
		this.addSubjectInput()
		this.addBodyInput()
		
		this.addSendButton()
	}
	
	
	addFromInput () {
		this.addSubview(this.fromInput)
	}
	
	addSubjectInput () {
		this.addSubview(this.subjectInput)
	}
	
	addBodyInput () {
		this.addSubview(this.bodyInput)
	}
	
	
	addSendButton () {
		this.addSubview(this.sendButton)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureFromInput()
		this.positionFromInput()
		
		this.configureSubjectInput()
		this.positionSubjectInput()
		
		this.configureBodyInput()
		this.positionBodyInput()
		
		
		
		this.configureSendButton()
		this.positionSendButton()
	}
	
	
	// From Input
	configureFromInput () {
		
		var view = this.fromInput
		
		view.parameters = {heightOfInput: this.parameters.heightOfSingleLineInputs}
		
		view.label.text = 'FROM:'
		view.label.textColor = 'white'
		view.label.fontFamily = 'siteFont'
		view.label.fontSize = this.parameters.fontSizeOfInputLabels
		
		
	}
	
	positionFromInput () {
		
		var view = this.fromInput
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width * this.parameters.widthFractionOfSingleLineInputs
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	// Subject Input
	configureSubjectInput () {
		
		var view = this.subjectInput
		
		view.parameters = {heightOfInput: this.parameters.heightOfSingleLineInputs}
		
		view.label.text = 'SUBJECT:'
		view.label.textColor = 'white'
		view.label.fontFamily = 'siteFont'
		view.label.fontSize = this.parameters.fontSizeOfInputLabels
		
	}
	
	positionSubjectInput () {
		
		var view = this.subjectInput
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width * this.parameters.widthFractionOfSingleLineInputs
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = this.fromInput.x
		newFrame.origin.y = this.fromInput.bottom + this.parameters.betweenBufferForInputs
							
		view.frame = newFrame
	}
	
	
	
	
	// Body Input
	configureBodyInput () {
		
		var view = this.bodyInput
		
		view.parameters = {heightOfTextArea: this.parameters.heightOfMultilineInputs}
		
		
		view.label.text = 'MESSAGE:'
		view.label.textColor = 'white'
		view.label.fontFamily = 'siteFont'
		view.label.fontSize = this.parameters.fontSizeOfInputLabels
		
	}
	
	positionBodyInput () {
		
		var view = this.bodyInput
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = this.fromInput.x
		newFrame.origin.y = this.subjectInput.bottom + this.parameters.betweenBufferForInputs
							
		view.frame = newFrame
		
		
		this.requiredHeight = this.bodyInput.bottom - this.fromInput.top
	}
	
	
	
	
	// Send Button
	configureSendButton () {
		var view = this.sendButton
		
		view.text = 'SEND'
		view.textColor = 'white'
		view.fontFamily = 'siteFont'
		view.fontSize = 16
		view.textAlign = 'center'
		view.lineHeightUnit = 'px'
		view.lineHeight = this.parameters.heightOfSingleLineInputs
		
		view.borderColor = 'white'
		view.borderStyle = 'solid'
		view.borderWidth = 1
		view.borderRadius = 6
		
		
		view.clickable = true
		view.hoverable = true
		view.cursor = 'pointer'
		
		view.configureDuration = 250
		
	}
	
	positionSendButton () {
		var view = this.sendButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - this.subjectInput.right - this.parameters.leftBufferForSendButton
		newFrame.size.height = this.parameters.heightOfSingleLineInputs

		newFrame.origin.x = this.width - newFrame.size.width
		newFrame.origin.y = this.bodyInput.bottom + this.parameters.topBufferForSendButton
							
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
	
	
	// JABView
	viewWasClicked (view) {
		
	}
	
	viewWasHovered (view) {
		this.sendButton.backgroundColor = 'rgba(150, 150, 150, 0.5)'
	}
	
	viewWasUnhovered (view) {
		this.sendButton.backgroundColor = 'rgba(0, 0, 0, 0)'
	}
	
}