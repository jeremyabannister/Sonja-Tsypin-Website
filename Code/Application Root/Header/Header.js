class Header extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.selectedMenuIndex = -1
		this.websiteClosed = true


		// UI
		this.logo = new Logo('Logo')
		this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS	', 'projects'], ['ABOUT', 'about']])


	}

	
	//
	// Init
	//

	init () {
		super.init()
		
		this.startEventListeners()
	}

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addLogo()
		this.addMenu()
		
	}
	
	
	
	addLogo () {
		this.addSubview(this.logo)
	}
	
	addMenu () {
		this.addSubview(this.menu)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureLogo()
		this.positionLogo()


		this.configureMenu()
		this.positionMenu()

	}




	// Logo
	configureLogo () {
		
		this.logo.positionDuration = 0
		if (this.websiteClosed) {
			this.logo.faded = true
		} else {
			this.logo.faded = false
		}
		this.logo.cursor = 'pointer'

		this.logo.updateAllUI()

	}

	positionLogo () {

		var leftBufferForLogo = (this.width - applicationRoot.contentWidth)/2
		var topBufferForLogo = 39

		this.logo.frame = new CGRect(leftBufferForLogo, 39, this.logo.requiredWidth, this.logo.requiredHeight)

	}




	// Menu
	configureMenu () {

		this.menu.showUnderline = !this.websiteClosed
		this.menu.selectedIndex = this.selectedMenuIndex
		
		this.menu.textColor = 'white'
		
		var fontSizes = {'xs': 11, 's': 16, 'm': 12, 'l': 12, 'xl': 12}
		this.menu.fontSize = fontSizes[sizeClass]
		this.menu.letterSpacing = 1.5
		this.menu.fontWeight = 'bold'
		this.menu.textAlign = 'right'
		
		this.menu.updateAllUI()

	}

	positionMenu () {

		var widthOfMenu = this.width/2
		var heightOfMenu = this.height

		var topBufferForMenu = 42
		var rightBufferForMenu = (this.width - applicationRoot.contentWidth)/2


		var newFrame = new CGRect()

		newFrame.size.width = this.menu.requiredWidth
		newFrame.size.height = this.menu.requiredHeight

		newFrame.origin.x = this.width - newFrame.size.width - rightBufferForMenu
		newFrame.origin.y = topBufferForMenu

		this.menu.frame = newFrame


	}


	//
	// Event Listeners
	//

	startEventListeners () {

		var header = this
		$(this.logo.selector).click(function() {
			header.parent.headerLogoWasClicked()
		})

	}


	//
	// Delegate
	//


	menuButtonWasPressed (buttonIndex) {
		this.parent.headerDidSelectPage(buttonIndex)
	}

}
