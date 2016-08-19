class MobileMenuButton extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			crossed: false,
		}
		
		// Parameters
		this.parameters = {
			animationSpeed: 0,
			
			sideBufferForLines: 10,
			heightOfLines: 2,
			betweenBufferForLines: 10,
		}
		
		// UI
		this.topLine = new JABView('TopLine')
		this.middleLine = new JABView('MiddleLine')
		this.bottomLine = new JABView('BottomLine')
		
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
		this.addTopLine()
		this.addMiddleLine()
		this.addBottomLine()
	}
	
	addTopLine () {
		this.addSubview(this.topLine)
	}
	
	addMiddleLine () {
		this.addSubview(this.middleLine)
	}
	
	addBottomLine () {
		this.addSubview(this.bottomLine)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureTopLine()
		this.positionTopLine()
		
		this.configureMiddleLine()
		this.positionMiddleLine()
		
		this.configureBottomLine()
		this.positionBottomLine()
	}
	
	
	
	// Top Line
	configureTopLine () {
		var view = this.topLine
		
		view.backgroundColor = 'white'
		view.borderRadius = view.height/2
		view.positionDuration = this.parameters.animationSpeed
		
		
		if (this.state.crossed) {
			view.angle = 45
		} else {
			view.angle = 0
		}
		
	}
	
	positionTopLine () {
		var view = this.topLine
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - (2 * this.parameters.sideBufferForLines)
		newFrame.size.height = this.parameters.heightOfLines

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		
		if (this.state.crossed) {
			newFrame.origin.y = (this.height - newFrame.size.height)/2
		} else {
			newFrame.origin.y = (this.height - ((3 * this.parameters.heightOfLines) + (2 * this.parameters.betweenBufferForLines)))/2
		}
							
		view.frame = newFrame
		
		this.configureTopLine() // This is because the corner radius of the lines is dependent on the positioning
	}
	
	
	
	
	// Middle Line
	configureMiddleLine () {
		var view = this.middleLine
		
		view.backgroundColor = 'white'
		view.borderRadius = view.height/2
		view.positionDuration = this.parameters.animationSpeed
		
		
		if (this.state.crossed) {
			view.opacity = 0
			view.angle = 45
		} else {
			view.opacity = 1
			view.angle = 0
		}
		
	}
	
	positionMiddleLine () {
		var view = this.middleLine
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - (2 * this.parameters.sideBufferForLines)
		newFrame.size.height = this.parameters.heightOfLines

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		
		if (this.state.crossed) {
			newFrame.origin.y = (this.height - newFrame.size.height)/2
		} else {
			newFrame.origin.y = this.topLine.bottom + this.parameters.betweenBufferForLines
		}
		
							
		view.frame = newFrame
		
		this.configureTopLine() // This is because the corner radius of the lines is dependent on the positioning
	}
	
	
	
	// Bottom Line
	configureBottomLine () {
		var view = this.bottomLine
		
		view.backgroundColor = 'white'
		view.borderRadius = view.height/2
		view.positionDuration = this.parameters.animationSpeed
		
		if (this.state.crossed) {
			view.angle = -45
		} else {
			view.angle = 0
		}
	}
	
	positionBottomLine () {
		var view = this.bottomLine
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width - (2 * this.parameters.sideBufferForLines)
		newFrame.size.height = this.parameters.heightOfLines

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		
		if (this.state.crossed) {
			newFrame.origin.y = (this.height - newFrame.size.height)/2
		} else {
			newFrame.origin.y = this.middleLine.bottom + this.parameters.betweenBufferForLines
		}
							
		view.frame = newFrame
		
		
		this.configureBottomLine() // This is because the corner radius of the lines is dependent on the positioning
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