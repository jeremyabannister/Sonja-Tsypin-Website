class ProjectInfoTab extends JABView {
	
	constructor (customId, projectDataBundle) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: projectDataBundle,
			leftHanded: false,
			usedAtleastOnce: false,
		}
		
		
		// Parameters
		this.parameters = {
			sizeOfPlayButton: 80,
			sideBufferForPlayButton: 23,
			
			fontSizeForTitleLabel: 20,
			leftBufferForTitleLabel: 10,
			topBufferForTitleLabel: 0,
			
			bufferBetweenTitleLabelAndSubtitleLabel: 3,
			bufferBetweenSubtitleLabelAndDescriptionLabel: 7,
			
		}
		
		// UI
		this.bottomLine = new JABView('BottomLine')
		this.sideLine = new JABView('SideLine')
		
		this.noVideoMessageLabel = new UILabel('NoVideoMessageLabel')
		this.playButton = new JABImageView('PlayButton')
		
		this.titleLabel = new UILabel('TitleLabel')
		this.subtitleLabel = new UILabel('SubtitleLabel')
		this.descriptionLabel = new UILabel('DescriptionLabel')
		
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
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addBottomLine()
		this.addSideLine()
		
		this.addNoVideoMessageLabel()
		this.addPlayButton()
		
		this.addTitleLabel()
		this.addSubtitleLabel()
		this.addDescriptionLabel()
		
	}
	
	
	addBottomLine () {
		this.addSubview(this.bottomLine)
	}
	
	addSideLine () {
		this.addSubview(this.sideLine)
	}
	
	
	
	
	addNoVideoMessageLabel () {
		this.addSubview(this.noVideoMessageLabel)
	}
	
	addPlayButton () {
		this.addSubview(this.playButton)
	}
	
	
	
	
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addSubtitleLabel () {
		this.addSubview(this.subtitleLabel)
	}
	
	addDescriptionLabel () {
		this.addSubview(this.descriptionLabel)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.updateParameters()
		
		
		this.configureBottomLine()
		this.positionBottomLine()
		
		
		this.configureSideLine()
		this.positionSideLine()
		
		
		
		this.configureNoVideoMessageLabel()
		this.positionNoVideoMessageLabel()
		
		this.configurePlayButton()
		this.positionPlayButton()
		
		
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		
		this.configureSubtitleLabel()
		this.positionSubtitleLabel()
		
		
		this.configureDescriptionLabel()
		this.positionDescriptionLabel()
	}
	
	
	
	// Parameters
	updateParameters () {
		
		var titleFontSizes = {'xxs': this.height/8, 'xs': this.height/8, 's': 16, 'm': 20, 'l': 20, 'xl': 20}
		this.parameters = {
			sizeOfPlayButton: this.height * 0.5,
			fontSizeForTitleLabel: titleFontSizes[sizeClass],
		}
		
	}
	
	
	// Bottom Line
	configureBottomLine () {
		
		var view = this.bottomLine
		
		view.backgroundColor = 'white'
		
	}
	
	positionBottomLine () {
		
		var view = this.bottomLine
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = 1

		newFrame.origin.x = 0
		newFrame.origin.y = this.height - newFrame.size.height
							
		view.frame = newFrame
	}
	
	
	
	// Side Line
	
	configureSideLine () {
		
		var view = this.sideLine
		
		view.backgroundColor = 'white'
		view.positionDuration = 0
	}
	
	positionSideLine () {
		
		var view = this.sideLine
		var newFrame = new CGRect()
							
		newFrame.size.width = 1
		newFrame.size.height = this.height
		
		if (this.state.leftHanded) {
			newFrame.origin.x = 0
		} else {
			newFrame.origin.x = this.width - newFrame.size.width
		}
		
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
  	
	
	
	
	
	
	
	
	// No Video Message
	configureNoVideoMessageLabel () {
		
		var view = this.noVideoMessageLabel
		var dataBundle = this.state.projectDataBundle
		view.configureDuration = 0
		
		if (dataBundle != null) {
			if (dataBundle.noVideoMessage != null) {
				
				view.opacity = 1
				
				view.text = this.state.projectDataBundle.noVideoMessage
				view.fontFamily = 'siteFont'
				view.fontSize = this.titleLabel.fontSize * (12.0/20.0)
				view.textColor = 'white'
				view.textAlign = 'center'
				
			} else {
				view.opacity = 0
			}
		}
		
	}
	
	positionNoVideoMessageLabel () {
		var view = this.noVideoMessageLabel
		var newFrame = new CGRect()
		var size
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			size = view.font.sizeOfString(view.text, 60)
		} else {
			size = view.font.sizeOfString(view.text, 80)
		}
		
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.width - newFrame.size.width - 12
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	// Play Button
	configurePlayButton () {
		
		var view = this.playButton
		view.src = '/Resources/Images/Buttons/Play Button.png'
		view.cursor = 'pointer'
		view.positionDuration = 0
		view.configureDuration = 0
		
		if (this.state.projectDataBundle != null) {
			if (this.state.projectDataBundle.noVideoMessage == null) {
				view.opacity = 1
				view.clickable = true
			} else {
				view.opacity = 0
				view.clickable = false
			}
		}
		
	}
	
	positionPlayButton () {
		
		var view = this.playButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfPlayButton
		newFrame.size.height = newFrame.size.width

		if (this.state.leftHanded) {
			newFrame.origin.x = this.parameters.sideBufferForPlayButton
		} else {
			newFrame.origin.x = this.width - newFrame.size.width - this.parameters.sideBufferForPlayButton
		}
		newFrame.origin.y = (this.height - this.bottomLine.height - newFrame.size.height)/2
							
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
			view.fontSize = this.parameters.fontSizeForTitleLabel
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
		
		if (this.state.leftHanded) {
			newFrame.origin.x = this.width - newFrame.size.width - this.parameters.leftBufferForTitleLabel
		} else {
			newFrame.origin.x = this.parameters.leftBufferForTitleLabel
		}
		
		newFrame.origin.y = this.parameters.topBufferForTitleLabel
							
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
			view.fontSize = this.titleLabel.fontSize * (13.0/20.0)
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

		if (this.state.leftHanded) {
			newFrame.origin.x = this.titleLabel.right - newFrame.size.width
		} else {
			newFrame.origin.x = this.titleLabel.x
		}
		newFrame.origin.y = this.titleLabel.bottom + this.parameters.bufferBetweenTitleLabelAndSubtitleLabel
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	// Description Label
	configureDescriptionLabel () {
		
		var view = this.descriptionLabel
		
		var dataBundle = this.state.projectDataBundle
		if (dataBundle != null) {
			view.text = this.state.projectDataBundle.description
		}
		view.fontFamily = 'siteFont'
		view.fontSize = this.titleLabel.fontSize * (10.0/20.0)
		view.hyphenate = true
		view.positionDuration = 0
		
		if (this.state.leftHanded) {
			view.textAlign = 'right'
		} else {
			view.textAlign = 'left'
		}
		
		view.textColor = '#aaaaaa'
	}
	
	positionDescriptionLabel () {
		
		var view = this.descriptionLabel
		var newFrame = new CGRect()
		
		newFrame.size.width = 300
		if (this.playButton.x - this.titleLabel.x - 20 < newFrame.size.width) {
			newFrame.size.width = this.playButton.x - this.titleLabel.x - 20
		} else if (this.playButton.x - this.titleLabel.x - newFrame.size.width > this.width/4) {
			newFrame.size.width = this.playButton.x - this.titleLabel.x - this.width/4
		}
		var size = view.font.sizeOfString(view.font.text, newFrame.size.width)
							
		
		newFrame.size.height = size.height
		
		if (this.state.leftHanded) {
			newFrame.origin.x = this.titleLabel.right - newFrame.size.width
		} else {
			newFrame.origin.x = this.titleLabel.x
		}
		newFrame.origin.y = this.subtitleLabel.bottom + this.parameters.bufferBetweenSubtitleLabelAndDescriptionLabel
							
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
		}
	}
	
}