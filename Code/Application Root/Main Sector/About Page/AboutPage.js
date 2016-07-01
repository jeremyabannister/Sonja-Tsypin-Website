class AboutPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.reservedTopBuffer = 0
		this.subdued = false
		this.comingSoon = false
		
		// UI
		this.bioText = new UILabel('Bio')
		this.line = new JABView("Line")
		this.emailAddress = new UILabel('EmailAddress')
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
		
		this.addBioText()
		this.addLine()
		this.addEmailAddress()
	}
	
	
	addBioText () {
		this.addSubview(this.bioText)
	}
	
	addLine () {
		this.addSubview(this.line)
	}
	addEmailAddress () {
		this.addSubview(this.emailAddress)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureBioText()
		this.positionBioText()
		
		this.configureEmailAddress()
		this.positionEmailAddress()
		
		this.configureLine()
		this.positionLine()
	}
	
	
	// Bio
	configureBioText () {
		
		
		this.bioText.text = "<i>Sonja Tsypin is a recent graduate of the Bard College Film and Electronic Arts undergraduate program in New York where she completed her thesis film POWDER ROOM (2016) which was advised by acclaimed director Kelly Reichardt and experimental filmmaker and video artist Peggy Ahwesh and recieved the Lifetime Learning Institute Seniors to Seniors Grant as well as the Adolfas Mekas Award. Sonja's focus is in cinematography; she recently worked as the Director of Photography on upcoming narrative feature-length film, ANGELS [2016, dir. Audrey Banks], short psychological drama titled BIRTH DAY [2016, dir. Eva Evans] and short horror film, THEODORE [2015, dir. Ondine Vi\u00f1ao]. Her directing work includes CONTACT ESTERINA [2014], a feature-length documentary about an Orthodox Jewish woman breaking away from tradition and THE MURDER [2014], a short film remake of Alfred Hitchcock\'s \"Blackmail.\" Sonja comes from a background in fine art; she is the recipient of two regional Gold Keys and a national Gold Medal and Best in Grade award in the Scholastic Art and Writing Awards. Sonja will attend the American Film Institute Conservatory in Los Angeles starting in Fall 2016 as a cinematography fellow.</i>"
		this.bioText.textColor = 'white'
		this.bioText.fontSize = 13
		this.bioText.fontFamily = 'siteFont'
		this.bioText.fontWeight = 'normal'
		this.bioText.lineHeight = 1.5
		
		if (this.subdued) {
			this.bioText.opacity = 0
		} else {
			this.bioText.opacity = 1
		}
		
		$(this.bioText.selector).css({
			textIndent: '40px'
		})
		
	}
	
	positionBioText () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = 740
		
		var size = this.bioText.font.sizeOfString(this.bioText.text, newFrame.size.width)
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + 80
		
		if (this.subdued) {
			newFrame.origin.y += 100
		}
		
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

		newFrame.origin.x = this.emailAddress.x
		newFrame.origin.y = this.emailAddress.y - newFrame.size.height - 25
					
		this.line.frame = newFrame
	}
	
	
	// Email Address
	configureEmailAddress () {
		
		this.emailAddress.text = "e-mail &nbsp;:: &nbsp;sotsyp@gmail.com"
		this.emailAddress.textColor = 'white'
		this.emailAddress.fontSize = 13
		this.emailAddress.fontFamily = 'siteFont'
		this.emailAddress.fontWeight = 'normal'
		
		
		if (this.subdued) {
			this.emailAddress.opacity = 0
		} else {
			this.emailAddress.opacity = 1
		}
		
	}
	
	positionEmailAddress () {
		
		var size = this.emailAddress.font.sizeOfString(this.emailAddress.text)
		var newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.bioText.x
		newFrame.origin.y = this.bioText.bottom + 56
		
					
		this.emailAddress.frame = newFrame
		
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