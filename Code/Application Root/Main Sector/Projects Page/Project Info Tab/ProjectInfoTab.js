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
			leftBufferForPlayButton: 12,
			bottomBufferForPlayButton: 5,
			
			leftBufferForTitleLabel: 10,
			topBufferForTitleLabel: 0,
			bufferBetweenTitleLabelAndSubtitleLabel: 3,
			bufferBetweenSubtitleLabelAndYearLabel: 3,
			
			sizeOfInfoButton: 15,
			bufferBetweenTitleLabelAndInfoButton: 4,
		}
		
		// UI
		this.leftDivider = new JABView('LeftDivider')
		this.rightDivider = new JABView('RightDivider')
		
		this.playButton = new JABImageView('PlayButton')
		this.titleLabel = new UILabel('TitleLabel')
		this.infoButton = new JABImageView('InfoButton')
		this.subtitleLabel = new UILabel('SubtitleLabel')
		this.yearLabel = new UILabel('YearLabel')
		
		this.descriptionLabel = new UILabel('DescriptionLabel')
		
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
		
		this.addLeftDivider()
		this.addRightDivider()
		
		this.addPlayButton()
		
		this.addTitleLabel()
		this.addInfoButton()
		this.addSubtitleLabel()
		this.addYearLabel()
		
		this.addDescriptionLabel()
		
	}
	
	
	addLeftDivider () {
		this.addSubview(this.leftDivider)
	}
	
	addRightDivider () {
		this.addSubview(this.rightDivider)
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
	
	
	
	addDescriptionLabel () {
		this.addSubview(this.descriptionLabel)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.parameters.sizeOfPlayButton = this.height * 0.5
		
		
		
		this.configureLeftDivider()
		this.positionLeftDivider()
		
		
		this.configureRightDivider()
		this.positionRightDivider()
		
		
		
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
		
		
		
		
		
		this.configureDescriptionLabel()
		this.positionDescriptionLabel()
	}
	
	
	
	// Left Divider
	configureLeftDivider () {
		
		var view = this.leftDivider
		
		view.backgroundColor = 'white'
		
	}
	
	positionLeftDivider () {
		
		var view = this.leftDivider
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = 1

		newFrame.origin.x = 0
		newFrame.origin.y = this.height - newFrame.size.height
							
		view.frame = newFrame
	}
	
	
	
	// Right Divider
	
	configureRightDivider () {
		
		var view = this.rightDivider
		
		view.backgroundColor = 'white'
	}
	
	positionRightDivider () {
		
		var view = this.rightDivider
		var newFrame = new CGRect()
							
		newFrame.size.width = 1
		newFrame.size.height = this.height

		newFrame.origin.x = this.width - newFrame.size.width
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
  	
	
	
	
	
	
	
	// Play Button
	configurePlayButton () {
		
		this.playButton.src = './Resources/Images/Buttons/Play Button.png'
		this.playButton.cursor = 'pointer'
		this.playButton.clickable = true
		
	}
	
	positionPlayButton () {
		
		var view = this.playButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfPlayButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.width - newFrame.size.width - 23
		newFrame.origin.y = (this.height - this.leftDivider.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	// Title Label
	configureTitleLabel () {
		
		var view = this.titleLabel
		var dataBundle = this.state.projectDataBundle
		view.positionDuration = 0
		
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.title
			view.fontFamily = 'siteFont'
			view.fontSize = 20
			view.letterSpacing = 1.5
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
		view.clickable = true
		view.opacity = 0
	}
	
	positionInfoButton () {
		
		var view = this.infoButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfInfoButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.titleLabel.right + 10
		newFrame.origin.y = this.titleLabel.y + (this.titleLabel.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	// Subtitle Label
	configureSubtitleLabel () {
		
		var view = this.subtitleLabel
		var dataBundle = this.state.projectDataBundle
		
		view.positionDuration = 0
		
		if (dataBundle != null) {
			view.text = 'dir. ' + this.state.projectDataBundle.director + ' | ' + this.state.projectDataBundle.movieType + ' | ' + this.state.projectDataBundle.year
			view.fontFamily = 'siteFont'
			view.fontSize = 13
			view.letterSpacing = 1.5
			view.textColor = '#ffffff'
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
		
		view.opacity = 0
		view.positionDuration = 0
		
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.year
			view.fontFamily = 'siteFont'
			view.fontSize = 14
			view.letterSpacing = 1.5
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
		newFrame.origin.y = this.height - newFrame.size.height
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	// Description Label
	configureDescriptionLabel () {
		
		var view = this.descriptionLabel
		
		view.text = "A wildly popular online personality who hasn't left her apartment in four years has her tiny world turned upside down when a stranger forces himself into her peculiar space."
		view.fontFamily = 'siteFont'
		view.fontSize = 11
		view.hyphenate = true
		view.positionDuration = 0
		
		view.textColor = '#aaaaaa'
	}
	
	positionDescriptionLabel () {
		
		var view = this.descriptionLabel
		var newFrame = new CGRect()
		
		newFrame.size.width = 300
		var size = view.font.sizeOfString(view.font.text, newFrame.size.width)
							
		
		newFrame.size.height = size.height

		newFrame.origin.x = this.titleLabel.x
		newFrame.origin.y = this.subtitleLabel.bottom + this.parameters.bufferBetweenTitleLabelAndSubtitleLabel + 4
							
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
		if (view == this.playButton) {
			this.parent.projectInfoTabPlayButtonWasClicked(this)
		} else if (view == this.infoButton) {
			this.parent.projectInfoTabInfoButtonWasClicked(this)
		}
	}
	
}