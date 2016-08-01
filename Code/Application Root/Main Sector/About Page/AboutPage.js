class AboutPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			readyToClose: true
		}
		this.subdued = false
		
		this.scrollable = false
		this.scrollFinishTimer
		this.readyToClose = true
		
		// Parameters
		this.reservedTopBuffer = 0
		this.topBufferForBioText = 103
		this.bottomBufferForEmailAddress = 60
		
		// UI
		this.bioText = new UILabel('Bio')
		this.line = new JABView("Line")
		this.emailAddressLabel = new UILabel('EmailAddressLabel')
		
		this.footer = new Footer('Footer')
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.startEventListeners()
	}
	
	
	//
	// Getters and Setters
	//
	
	requiredHeightForWidth (width) {
		
		return this.footer.bottom
	}
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addBioText()
		this.addLine()
		this.addEmailAddressLabel()
		
		this.addFooter()
	}
	
	
	addBioText () {
		this.addSubview(this.bioText)
	}
	
	addLine () {
		this.addSubview(this.line)
	}
	addEmailAddressLabel () {
		this.addSubview(this.emailAddressLabel)
	}
	
	
	addFooter () {
		this.addSubview(this.footer)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureBioText()
		this.positionBioText()
		
		this.configureEmailAddressLabel()
		this.positionEmailAddressLabel()
		
		this.configureLine()
		this.positionLine()
		
		
		this.configureFooter()
		this.positionFooter()
	}
	
	
	// Bio
	configureBioText () {
		
		if (this.bioText.text == '') {
			this.bioText.text = "Sonja Tsypin is a director and cinematographer based in New York and Los Angeles. Sonja's most recent short film, <span id='powderRoomSpan---" + this.id + "' style='color:white; cursor:pointer'>Powder Room</span> (2016), recieved the Bard College Seniors to Seniors Grant as well as the Adolfas Mekas Award, and won Best Student Short Drama in the Los Angeles Independant Film Festival. Sonja's other recent work as Director of Photography includes upcoming narrative feature-length film <span id='angelsSpan---" + this.id + "' style='color:white;'>Angels</span> (2016, dir. Audrey Banks), short psychological drama <span id='birthDaySpan---" + this.id + "' style='color:white; cursor:pointer'>Birth Day</span> (2016, dir. Eva Evans) and short horror film <span id='theodoreSpan---" + this.id + "' style='color:white; cursor:pointer'>Theodore</span> (2015, dir. Ondine Vi\u00f1ao). Sonja's directing work includes <span id='contactEsterinaSpan---" + this.id + "' style='color:white; cursor:pointer;'>Contact Esterina</span> (2014), a feature-length documentary about an Orthodox Jewish woman breaking away from tradition and <span id='foundGuiltySpan---" + this.id + "' style='color:white; cursor:pointer'>Found Guilty</span> (2014), a short film remake of Alfred Hitchcock\'s \"Blackmail.\" Sonja comes from a background in fine art (view work <a target='_blank' href='http://www.sonjatsypin.weebly.com'><span style='color:white'>here</span></a>); she is the recipient of two regional Gold Keys and a national Gold Medal and Best in Grade award in the Scholastic Art and Writing Awards. Sonja will attend the American Film Institute (AFI) Conservatory in Los Angeles starting in Fall 2016 for a Master's Degree in cinematography."
			
			var parent = this.parent
			$('#powderRoomSpan---' + this.id).click(function(){
				parent.aboutPageWantsToDisplayProject(this, 'powderRoom')
			})
			$('#angelsSpan---' + this.id).click(function(){
				parent.aboutPageWantsToDisplayProject(this, 'angels')
			})
			$('#birthDaySpan---' + this.id).click(function(){
				parent.aboutPageWantsToDisplayProject(this, 'birthDay')
			})
			$('#theodoreSpan---' + this.id).click(function(){
				parent.aboutPageWantsToDisplayProject(this, 'theodore')
			})
			$('#foundGuiltySpan---' + this.id).click(function(){
				parent.aboutPageWantsToDisplayProject(this, 'foundGuilty')
			})
			
			
			$('#contactEsterinaSpan---' + this.id).click(function() {
				parent.aboutPageWantsToDisplayProject(this, 'contactEsterina')
			})
		}
		
		
		this.bioText.textColor = '#999999'
		this.bioText.fontSize = 14
		this.bioText.fontFamily = 'siteFont'
		this.bioText.fontWeight = 'normal'
		this.bioText.lineHeight = 1.7
		
		if (this.subdued) {
			this.bioText.opacity = 0
		} else {
			this.bioText.opacity = 1
		}
		
		if ($(this.bioText.selector).css('textIndent') != '40px') {
			$(this.bioText.selector).css({
				textIndent: '40px'
			})
		}
		
		
		
	}
	
	positionBioText () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = 740
		
		var size = this.bioText.font.sizeOfString(this.bioText.text, newFrame.size.width)
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.topBufferForBioText
		
		
		this.bioText.frame = newFrame
	}
	
	
	//Line
	configureLine () {
		
		this.line.backgroundColor = 'white'
		
		if (this.subdued) {
			this.line.opacity = 0
		} else {
			this.line.opacity = 1
		}

	}

	positionLine () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = 60
		newFrame.size.height = 1

		newFrame.origin.x = this.emailAddressLabel.x
		newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25
					
		this.line.frame = newFrame
	}
	
	
	// Email Address
	configureEmailAddressLabel () {
		
		var view = this.emailAddressLabel
		if (view.text == '') {
			view.text = "e-mail &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:white; cursor: pointer'>sonjatsypin@gmail.com</span>"
			
			var parent = this.parent
			$('#emailAddress---' + this.id).click(function() {
				parent.aboutPageWantsToOpenMailForm(this)
			})
		}
		
		view.textColor = '#999999'
		view.fontSize = 13
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		
		
		if (this.subdued) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
	}
	
	positionEmailAddressLabel () {
		
		var view = this.emailAddressLabel
		var size = view.font.sizeOfString(view.text)
		var newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.bioText.x
		newFrame.origin.y = this.bioText.bottom + 56
		
					
		view.frame = newFrame
		
	}
	
	
	
	
	
	// Footer
	configureFooter () {
		
		
	}
	
	positionFooter () {
		
		var view = this.footer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.footer.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.emailAddressLabel.bottom + this.bottomBufferForEmailAddress
		
		if (newFrame.origin.y < this.height - this.footer.requiredHeight) {
			newFrame.origin.y = this.height - this.footer.requiredHeight
		}
		
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var aboutPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!aboutPage.scrollable) {
				evt.preventDefault()
			}
			
			clearTimeout(aboutPage.scrollFinishTimer)
			if (aboutPage.scrollTop <= 0) {
				aboutPage.scrollFinishTimer = setTimeout(function () {
					aboutPage.state.readyToClose = true
				}, 50)
			} else {
				aboutPage.state.readyToClose = false
			}
			
			if (aboutPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}
	
	
	//
	// Actions
	//
	
	
	//
	// Delegate
	//
	
	// Footer
	footerMailButtonWasClicked (footer) {
		this.parent.aboutPageWantsToOpenMailForm(this)
	}
	
}