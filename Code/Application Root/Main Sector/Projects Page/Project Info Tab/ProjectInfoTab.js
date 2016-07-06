class ProjectInfoTab extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: null
		}
		
		
		// Parameters
		this.parameters = {
			sizeOfPlayButton: 80,
			rightBufferForPlayButton: 20,
			topBufferForPlayButton: 10,
			
			leftBufferForTitleLabel: 20,
			topBufferForTitleLabel: 15,
			bufferBetweenTitleLabelAndSubtitleLabel: 3,
			bufferBetweenSubtitleLabelAndYearLabel: 3,
			
			sizeOfInfoButton: 20,
			bufferBetweenTitleLabelAndInfoButton: 4,
		}
		
		// UI
		this.playButton = new JABImageView('PlayButton')
		this.titleLabel = new UILabel('TitleLabel')
		this.infoButton = new JABImageView('InfoButton')
		this.subtitleLabel = new UILabel('SubtitleLabel')
		this.yearLabel = new UILabel('YearLabel')
		
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
		
		this.addPlayButton()
		
		this.addTitleLabel()
		this.addInfoButton()
		this.addSubtitleLabel()
		this.addYearLabel()
		
	}
	
	
	addPlayButton () {
		this.addSubview(this.playButton)
	}
	
	
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addInfoButton () {
		this.addSubview(this.infoButton)
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
		
		
		
		this.configurePlayButton()
		this.positionPlayButton()
		
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		
		this.configureInfoButton()
		this.positionInfoButton()
		
		
		this.configureSubtitleLabel()
		this.positionSubtitleLabel()
		
		
		this.configureYearLabel()
		this.positionYearLabel()
	}
	
	
	
	
	// Play Button
	configurePlayButton () {
		
		this.playButton.src = './Resources/Images/Buttons/Play Button.png'
		this.playButton.cursor = 'pointer'
		
	}
	
	positionPlayButton () {
		
		var view = this.playButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfPlayButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.width - newFrame.size.width - this.parameters.rightBufferForPlayButton
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	// Title Label
	configureTitleLabel () {
		
		var view = this.titleLabel
		var dataBundle = this.state.projectDataBundle
		
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.title
			view.fontFamily = 'siteFont'
			view.fontSize = 20
			view.textColor = 'white'
		}
		
	}
	
	positionTitleLabel () {
		
		
		var view = this.titleLabel
		var newFrame = new CGRect()
		var size = this.titleLabel.font.sizeOfString(this.titleLabel.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.parameters.leftBufferForTitleLabel
		newFrame.origin.y = this.parameters.topBufferForTitleLabel
							
		view.frame = newFrame
	}
	
	
	
	// Info Button
	configureInfoButton () {
		
		var view = this.infoButton
		view.src = './Resources/Images/Buttons/Info Button.png'
		view.cursor = 'pointer'
		
	}
	
	positionInfoButton () {
		
		var view = this.infoButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfInfoButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.titleLabel.x
		newFrame.origin.y = this.height - newFrame.size.height - 2
							
		view.frame = newFrame
	}
	
	
	
	// Subtitle Label
	configureSubtitleLabel () {
		
		var view = this.subtitleLabel
		var dataBundle = this.state.projectDataBundle
		
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.subtitle
			view.fontFamily = 'siteFont'
			view.fontSize = 12
			view.textColor = 'white'
		}
		
	}
	
	positionSubtitleLabel () {		
				
		var view = this.subtitleLabel
		var newFrame = new CGRect()
		var size = this.subtitleLabel.font.sizeOfString(this.subtitleLabel.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.titleLabel.x
		newFrame.origin.y = this.titleLabel.bottom + this.parameters.bufferBetweenTitleLabelAndSubtitleLabel
							
		view.frame = newFrame
	}
	
	
	
	// Year Label
	configureYearLabel () {
		
		var view = this.yearLabel
		var dataBundle = this.state.projectDataBundle
		
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.year
			view.fontFamily = 'siteFont'
			view.fontSize = 14
			view.textColor = 'white'
		}
		
	}
	
	positionYearLabel () {
		
		var view = this.yearLabel
		var newFrame = new CGRect()
		var size = this.yearLabel.font.sizeOfString(this.yearLabel.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.subtitleLabel.x
		newFrame.origin.y = this.subtitleLabel.bottom + this.parameters.bufferBetweenSubtitleLabelAndYearLabel
							
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
	
}