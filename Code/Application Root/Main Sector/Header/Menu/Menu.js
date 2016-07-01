class Menu extends JABView {

	constructor (customId, buttonInfo) {
		super(customId)

		// State
		this.buttonInfo = buttonInfo
		this.showUnderline = true
		this.underlinePositionDuration = 0
		this.selectedIndex = -1
		this.fadeUnselectedButtons = false

		this.requiredWidth = 400
		this.requiredHeight = 400
		
		
		this.textColor = null
		this.fontSize = null
		this.fontFamily = null
		this.fontWeight = null
		this.fontStyle = null
		this.fontVariant = null
		this.letterSpacing = null
		this.textAlign = null

		
		// UI
		this.buttons = []
		for (var i = 0; i < this.buttonInfo.length; i++) {
			this.buttons.push(new UILabel())
		}
		this.underline = new JABView('Underline')

		
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
	
	// Selected Index
	get selectedIndex () {
		return this._selectedIndex
	}
	
	set selectedIndex (newSelectedIndex) {
		
		var difference = Math.abs(this.selectedIndex - newSelectedIndex)
		this.underlinePositionDuration = lesserOfTwo(200 * difference, 400)
		
		this._selectedIndex = newSelectedIndex
	}


	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addButtons()
		this.addUnderline()
		
	}
	
	
	
	addButtons () {
		for (var i = 0; i < this.buttons.length; i++) {
			this.addSubview(this.buttons[i])
		}
	}
	
	addUnderline () {
		this.addSubview(this.underline)
	}
	



	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureButtons()
		this.positionButtons()


		this.configureUnderline()
		this.positionUnderline()

	}




	configureButtons () {

		for (var i = 0; i < this.buttonInfo.length; i++) {
			
			this.buttons[i].clickable = true

			this.buttons[i].text = this.buttonInfo[i][0]
			
			this.buttons[i].textColor = this.textColor
			this.buttons[i].fontSize = this.fontSize
			this.buttons[i].fontFamily = this.fontFamily
			this.buttons[i].fontWeight = this.fontWeight
			this.buttons[i].fontStyle = this.fontStyle
			this.buttons[i].fontVariant = this.fontVariant
			this.buttons[i].letterSpacing = this.letterSpacing
			
			this.buttons[i].textAlign = this.textAlign
			
			if (this.fadeUnselectedButtons) {
				if (i != this.selectedIndex) {
					this.buttons[i].opacity = 0.6
				} else {
					this.buttons[i].opacity = 1
				}
			}
			
			this.buttons[i].cursor = 'pointer'
		}

	}

	positionButtons () {

		var tallestHeight = 0
		var betweenBufferForButtons = 40

		for (var i = 0; i < this.buttons.length; i++) {

			var newFrame = new CGRect()
			var size = this.buttons[i].font.sizeOfString(this.buttons[i].text)

			newFrame.size.width = size.width
			newFrame.size.height = size.height

			if (newFrame.size.height > tallestHeight) {
				tallestHeight = newFrame.size.height
			}

			if (i == 0) {
				newFrame.origin.x = 0
			} else {
				newFrame.origin.x = this.buttons[i - 1].right + betweenBufferForButtons
			}

			newFrame.origin.y = (this.height - newFrame.size.height)/2

			this.buttons[i].frame = newFrame

		}

		this.requiredWidth = this.buttons[i - 1].right
		this.requiredHeight = tallestHeight
	}




	configureUnderline () {

		this.underline.backgroundColor = 'white'
		this.underline.positionDuration = this.underlinePositionDuration

		if (this.showUnderline) {
			this.underline.opacity = 1
		} else {
			this.underline.opacity = 0
		}

	}

	positionUnderline () {

		var bufferBetweenUnderlinedButtonAndUnderline = 5
		var positionIndex = this.selectedIndex
		if (positionIndex == -1) {
			positionIndex = 0
		}
		var underlinedButton = this.buttons[positionIndex]

		var newFrame = new CGRect()

		newFrame.size.width = underlinedButton.width - 2
		newFrame.size.height = 0.5

		newFrame.origin.x = underlinedButton.x + (underlinedButton.width - newFrame.size.width)/2 - 1
		newFrame.origin.y = underlinedButton.bottom + bufferBetweenUnderlinedButtonAndUnderline

		this.underline.frame = newFrame

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
		
		for (var i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i] == view) {
				if (this.buttonInfo.length > i) {
					this.parent.menuButtonWasPressed(this.buttonInfo[i][1])
				}
			}
		}
	}

}
