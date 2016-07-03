class InteractiveCover extends JABView {

	constructor (customId) {
		super(customId)

		// State
	    this.imageData = new ImageData()
	    this.visible = false

		// UI
	    this.titleLabel = new UILabel('TitleLabel')
		this.subtitleLabel = new UILabel('SubtitleLabel')
		this.yearLabel = new UILabel('YearLabel')
	}



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addTitleLabel()
		this.addSubtitleLabel()
		this.addYearLabel()
		
	}
	
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addSubtitleLabel () {
		this.addSubview(this.subtitleLabel)
	}
	
	addYearLabel () {
		this.addSubview(this.yearLabel)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()


	    this.configureTitleLabel()
	    this.positionTitleLabel()


		this.configureSubtitleLabel()
		this.positionSubtitleLabel()


		this.configureYearLabel()
		this.positionYearLabel()
	}
	
	// Title Label
	configureTitleLabel () {

	    this.titleLabel.text = this.imageData.title
	    this.titleLabel.textColor = 'white'
		this.titleLabel.fontFamily = 'siteFont'
	    this.titleLabel.fontSize = 20
	    this.titleLabel.fontWeight = 300
	    this.titleLabel.letterSpacing = 3
	    
	    if (this.visible) {
	    	this.titleLabel.opacity = 1
	    } else {
	    	this.titleLabel.opacity = 0
	    }
	    
	}
	
	positionTitleLabel () {

		var leftBufferForTitleLabel = 40
		var topBufferForTitleLabel = 34

	    var size = this.titleLabel.font.sizeOfString(this.titleLabel.text)
	    var newFrame = new CGRect()

	    newFrame.size.width = size.width
	    newFrame.size.height = size.height

	    newFrame.origin.x = leftBufferForTitleLabel
	    newFrame.origin.y = topBufferForTitleLabel

	    this.titleLabel.frame = newFrame
	}



	// Subtitle LAbel
	configureSubtitleLabel () {

		this.subtitleLabel.text = this.imageData.subtitle
    	this.subtitleLabel.textColor = 'white'
		// this.subtitleLabel.fontFamily = 'Montserrat'
		// this.subtitleLabel.opacity = 0.4
    	this.subtitleLabel.fontSize = 12
		this.subtitleLabel.fontWeight = 300
		this.subtitleLabel.letterSpacing = 3
		
		
		if (this.visible) {
			this.subtitleLabel.opacity = 1
		} else {
			this.subtitleLabel.opacity = 0
		}
	}

	positionSubtitleLabel () {

		var bufferBetweenTitleLabelAndSubtitleLabel = 0

	    var size = this.subtitleLabel.font.sizeOfString(this.subtitleLabel.text)
	    var newFrame = new CGRect()

	    newFrame.size.width = size.width
	    newFrame.size.height = size.height

	    newFrame.origin.x = this.titleLabel.x
	    newFrame.origin.y = this.titleLabel.bottom + bufferBetweenTitleLabelAndSubtitleLabel

	    this.subtitleLabel.frame = newFrame
	}


	// Year Label
	configureYearLabel () {
		this.yearLabel.text = this.imageData.year
    	this.yearLabel.textColor = 'white'
		// this.yearLabel.fontFamily = 'Montserrat'
		// this.yearLabel.opacity = 0.4
    	this.yearLabel.fontSize = 14
		this.yearLabel.fontWeight = 300
		this.yearLabel.letterSpacing = 1
		// this.yearLabel.opacity = 0.6
		
		
		if (this.visible) {
			this.yearLabel.opacity = 1
		} else {
			this.yearLabel.opacity = 0
		}
	}

	positionYearLabel () {

		var bufferBetweenSubtitleLabelAndYearLabel = 12

	    var size = this.yearLabel.font.sizeOfString(this.yearLabel.text)
	    var newFrame = new CGRect()

	    newFrame.size.width = size.width
	    newFrame.size.height = size.height

	    newFrame.origin.x = this.titleLabel.x
	    newFrame.origin.y = this.subtitleLabel.bottom + bufferBetweenSubtitleLabelAndYearLabel

	    this.yearLabel.frame = newFrame
	}



	//
	// Actions
	//

}
