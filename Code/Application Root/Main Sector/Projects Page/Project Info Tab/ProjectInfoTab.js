class ProjectInfoTab extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			projectDataBundle: null,
			leftHanded: false,
		}
		
		
		// Parameters
		this.parameters = {
			sizeOfPlayButton: 80,
			sideBufferForPlayButton: 23,
			
			leftBufferForTitleLabel: 10,
			topBufferForTitleLabel: 0,
			bufferBetweenTitleLabelAndSubtitleLabel: 3,
			bufferBetweenSubtitleLabelAndDescriptionLabel: 7,
			
		}
		
		// UI
		this.bottomLine = new JABView('BottomLine')
		this.sideLine = new JABView('SideLine')
		
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
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addBottomLine()
		this.addSideLine()
		
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
		
		
		this.parameters.sizeOfPlayButton = this.height * 0.5
		
		
		
		this.configureBottomLine()
		this.positionBottomLine()
		
		
		this.configureSideLine()
		this.positionSideLine()
		
		
		
		
		this.configurePlayButton()
		this.positionPlayButton()
		
		
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		
		this.configureSubtitleLabel()
		this.positionSubtitleLabel()
		
		
		this.configureDescriptionLabel()
		this.positionDescriptionLabel()
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