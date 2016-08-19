class Logo extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.faded = true
		this.requiredHeight = 400
		this.requiredWidth = 400

		// UI
		this.sonjaTsypinLabel = new UILabel('SonjaTsypinLabel')
		this.cinematographerLabel = new UILabel('CinematographerLabel')
		
		
		// Initialize
	}



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addSonjaTsypinLabel()
		this.addCinematographerLabel()
		
	}
	
	
	
	addSonjaTsypinLabel () {
		this.addSubview(this.sonjaTsypinLabel)
	}
	
	addCinematographerLabel () {
		this.addSubview(this.cinematographerLabel)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureSonjaTsypinLabel()
		this.positionSonjaTsypinLabel()



		this.configureCinematographerLabel()
		this.positionCinematographerLabel()

	}



	// Sonja Tsypin Label

	configureSonjaTsypinLabel () {

		this.sonjaTsypinLabel.text = "SONJA TSYPIN"
		this.sonjaTsypinLabel.fontFamily = 'siteFont'
		this.sonjaTsypinLabel.textColor = 'white'
		
		var fontSizes = {'xxs': 24, 'xs': 24, 's': 32, 'm': 28, 'l': 28, 'xl': 28};
		this.sonjaTsypinLabel.fontSize = fontSizes[sizeClass]
		this.sonjaTsypinLabel.fontWeight = 'normal'
		this.sonjaTsypinLabel.letterSpacing = 3.5

	}

	positionSonjaTsypinLabel() {

		var leftBufferForSonjaTsypinLabel = 0
		var topBufferForSonjaTsypinLabel = 0

		var size = this.sonjaTsypinLabel.font.sizeOfString(this.sonjaTsypinLabel.text)
		this.sonjaTsypinLabel.frame = new CGRect(leftBufferForSonjaTsypinLabel, topBufferForSonjaTsypinLabel, size.width, size.height)
	}





	// Cinematographer Label
	configureCinematographerLabel () {

		this.cinematographerLabel.text = "CINEMATOGRAPHER"
		this.cinematographerLabel.textColor = 'white'
		
		var fontSizes = {'xxs':10, 'xs': 10, 's': 15, 'm': 12, 'l': 12, 'xl': 12}
		this.cinematographerLabel.fontSize = fontSizes[sizeClass]
		
		var letterSpacings = {'xxs': 7.7, 'xs': 7.7, 's': 8.4, 'm': 8.4, 'l': 8.4, 'xl': 8.4}
		this.cinematographerLabel.letterSpacing = letterSpacings[sizeClass]
		this.cinematographerLabel.fontWeight = 'normal'


		if (this.faded) {
			this.cinematographerLabel.opacity = 0.6
		} else {
			this.cinematographerLabel.opacity = 0.8
		}

	}

	positionCinematographerLabel () {

		var bufferBetweenSonjaTsypinLabelAndCinematographerLabel = -1
		var size = this.cinematographerLabel.font.sizeOfString(this.cinematographerLabel.text)

		var newFrame = new CGRect()

		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.sonjaTsypinLabel.x + (this.sonjaTsypinLabel.width - newFrame.size.width)/2 + 2
		newFrame.origin.y = this.sonjaTsypinLabel.bottom + bufferBetweenSonjaTsypinLabelAndCinematographerLabel

		this.cinematographerLabel.frame = newFrame



		this.requiredHeight = this.cinematographerLabel.bottom - this.sonjaTsypinLabel.top
		this.requiredWidth = this.sonjaTsypinLabel.width

	}



	//
	// Actions
	//

}
