class Header extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.state = {
			mobileMenuOpen: false,
		}
		this.selectedMenuIndex = -1
		this.websiteClosed = true
		this.menuItems = [new MenuItem('reel', 'REEL', 0), new MenuItem('projects', 'PROJECTS', 1), new MenuItem('about', 'ABOUT', 2)]

		// UI
		this.logo = new Logo('Logo')
		this.menu = new Menu('Menu', this.menuItems)
		this.mobileMenu = new MobileMenu('MobileMenu', this.menuItems)
		this.mobileMenuButton = new MobileMenuButton('MobileMenuButton')
		
		// Parameters
		this.parameters = {
			sideBufferForMobileContent: 18,
			
			mobileMenuAnimationSpeed: 300,
			
			topBufferForMobileMenu: 0,
			widthFractionOfMobileMenu: 1,
			
			sizeOfMobileMenuButton: 60,
			topBufferForMobileMenuButton: 14,
		}
		
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
		this.addMobileMenu()
		this.addMobileMenuButton()
		
	}
	
	
	
	addLogo () {
		this.addSubview(this.logo)
	}
	
	addMenu () {
		this.addSubview(this.menu)
	}
	
	addMobileMenu () {
		this.addSubview(this.mobileMenu)
	}
	
	addMobileMenuButton () {
		this.addSubview(this.mobileMenuButton)
	}
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureLogo()
		this.positionLogo()


		this.configureMenu()
		this.positionMenu()
		
		
		this.configureMobileMenu()
		this.positionMobileMenu()
		
		this.configureMobileMenuButton()
		this.positionMobileMenuButton()

	}




	// Logo
	configureLogo () {
		
		var view = this.logo
		
		view.positionDuration = 0
		if (this.websiteClosed) {
			view.faded = true
		} else {
			view.faded = false
		}
		view.cursor = 'pointer'

		view.updateAllUI()

	}

	positionLogo () {
		
		var view = this.logo
		var newFrame = new CGRect()
							
		newFrame.size.width = this.logo.requiredWidth
		newFrame.size.height = this.logo.requiredHeight

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = 39
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = 14
		}
		
							
		view.frame = newFrame


	}




	// Menu
	configureMenu () {
		
		var view = this.menu

		view.showUnderline = !this.websiteClosed
		view.selectedIndex = this.selectedMenuIndex
		
		view.textColor = 'white'
		
		var fontSizes = {'xxs': 12, 'xs': 12, 's': 16, 'm': 12, 'l': 12, 'xl': 12}
		view.fontSize = fontSizes[sizeClass]
		view.letterSpacing = 1.5
		view.fontWeight = 'bold'
		view.textAlign = 'right'
		
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		
		view.updateAllUI()

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
		newFrame.origin.y = 42
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.logo.bottom + 10
		}

		this.menu.frame = newFrame


	}
	
	
	
	
	// Mobile Menu
	configureMobileMenu () {
		var view = this.mobileMenu
		
		view.backgroundColor = 'black'
		view.positionDuration = this.parameters.mobileMenuAnimationSpeed
		
		view.state = {
			open: this.state.mobileMenuOpen
		}
		
		view.overflow = 'hidden'
		
		view.updateAllUI()
	}
	
	positionMobileMenu () {
		var view = this.mobileMenu
		var newFrame = new CGRect()
		
		newFrame.size.width = this.width * this.parameters.widthFractionOfMobileMenu
		
		if (this.state.mobileMenuOpen) {
			newFrame.size.height = view.requiredHeight
		} else {
			newFrame.size.height = 0
		}
		
		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.topBufferForMobileMenu
		
							
		view.frame = newFrame
	}
	
	
	
	
	// Mobile Menu Button
	configureMobileMenuButton () {
		
		var view = this.mobileMenuButton
		
		view.clickable = true
		view.cursor = 'pointer'
		view.parameters = {animationSpeed: this.parameters.mobileMenuAnimationSpeed}
		view.state = {crossed: this.state.mobileMenuOpen}
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			view.opacity = 1
		} else {
			view.opacity = 0
		}
		
		view.updateAllUI()
		
	}
	
	positionMobileMenuButton () {
		var view = this.mobileMenuButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfMobileMenuButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.parameters.sideBufferForMobileContent
		newFrame.origin.y = this.logo.y + (this.logo.height - newFrame.size.height)/2
							
		view.frame = newFrame
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

	// Menus
	menuItemWasSelected (menuItem) {
		this.state = {mobileMenuOpen: false}
		var header = this
		this.animatedUpdate(null, function() {
			header.parent.headerDidSelectPage(menuItem.index)
		})
	}
	
	
	
	// JABView
	viewWasClicked (view) {
		if (view == this.mobileMenuButton) {
			this.state = {mobileMenuOpen: !this.state.mobileMenuOpen}
			this.animatedUpdate()
		}
	}
		

}
