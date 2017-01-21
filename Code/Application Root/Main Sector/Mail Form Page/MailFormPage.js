class MailFormPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			handlingClick: false,
			subdued: true,
		}
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			
			widthOfMailForm: 400,
		}
		
		// UI
		this.mailForm = new MailForm('MailForm')
		
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
		this.addMailForm()
	}
	
	addMailForm () {
		this.addSubview(this.mailForm)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		this.configureMailForm()
		this.positionMailForm()
	}
	
	
	
	// Parameters
	updateParameters () {
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			this.parameters = {widthOfMailForm: 300}
		}
	}
	
	
	
	
	// Mail Form
	configureMailForm () {
		
		var view = this.mailForm
		
		view.clickable = true
	}
	
	positionMailForm () {
		
		var view = this.mailForm
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.widthOfMailForm
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height)/2) * 0.85
		
		if (this.state.subdued) {
			newFrame.origin.y += 80
		}
							
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
		if (view == this.mailForm) {
			this.state = {handlingClick: true}
		}
	}
	
}