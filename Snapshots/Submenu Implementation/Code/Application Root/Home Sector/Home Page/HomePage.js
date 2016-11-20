class HomePage extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.backgroundImageIndex = 1
		this.backgroundLayer1IsActive = true
		this.arrowFaded = true
		this.currentlyActive = true
		
		
		// UI
		this.blackBackground = new JABView('BlackBackground')
		this.backgroundLayer1 = new JABImageView('BackgroundLayer1')
		this.backgroundLayer2 = new JABImageView('BackgroundLayer2')
		this.enterArrow = new EnterArrow('EnterArrow')

		

	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.startTimeoutForNextImage()
		this.startEventListeners()
	}


	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addBlackBackground()
		this.addBackgroundLayer1()
		this.addBackgroundLayer2()
		this.addEnterArrow()
		
	}
	
	
	
	addBlackBackground () {
		this.addSubview(this.blackBackground)
	}
	
	addBackgroundLayer1 () {
		this.addSubview(this.backgroundLayer1)
	}
	
	addBackgroundLayer2 () {
		this.addSubview(this.backgroundLayer2)
	}
	
	addEnterArrow () {
		this.addSubview(this.enterArrow)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()



		this.configureBlackBackground()
		this.positionBlackBackground()


		this.configureBackgroundLayer1()
		this.positionBackgroundLayer1()


		this.configureBackgroundLayer2()
		this.positionBackgroundLayer2()




		this.configureEnterArrow()
		this.positionEnterArrow()


	}



	// Black Background
	configureBlackBackground () {
		this.blackBackground.backgroundColor = 'black'
	}

	positionBlackBackground () {
		this.blackBackground.frame = this.bounds
	}




	// Background Layer 1
	configureBackgroundLayer1 () {

		this.backgroundLayer1.animationsDisabled = ['frame']

		if (this.backgroundLayer1IsActive) {
			this.backgroundLayer1.opacity = 1
			this.backgroundLayer1.src = './Resources/Images/Home Page/Featured Stills/' + this.backgroundImageIndex + '.jpg'
		} else {
			this.backgroundLayer1.opacity = 0
		}
		
	}

	positionBackgroundLayer1 () {

		var widthToHeightRatio = 1.777777777
		var contentDomainWidthToHeightRatio = 0
		if (this.height != 0) {
			contentDomainWidthToHeightRatio = this.width/this.height
		}


		if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
			this.backgroundLayer1.frame = new CGRect((this.width - (this.height * widthToHeightRatio))/2, 0, this.height * widthToHeightRatio, this.height)
		} else {
			this.backgroundLayer1.frame = new CGRect(0, (this.height - (this.width/widthToHeightRatio))/2, this.width, this.width/widthToHeightRatio)
		}

	}



	// Background Layer 2
	configureBackgroundLayer2 () {

		this.backgroundLayer2.animationsDisabled = ['frame']

		if (this.backgroundLayer1IsActive) {
			this.backgroundLayer2.opacity = 0
		} else {
			this.backgroundLayer2.src = './Resources/Images/Home Page/Featured Stills/' + this.backgroundImageIndex + '.jpg'
			this.backgroundLayer2.opacity = 1
		}

	}

	positionBackgroundLayer2 () {

		var widthToHeightRatio = 1.777777777
		var contentDomainWidthToHeightRatio = 0
		if (this.height != 0) {
			contentDomainWidthToHeightRatio = this.width/this.height
		}


		if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
			this.backgroundLayer2.frame = new CGRect((this.width - (this.height * widthToHeightRatio))/2, 0, this.height * widthToHeightRatio, this.height)
		} else {
			this.backgroundLayer2.frame = new CGRect(0, (this.height - (this.width/widthToHeightRatio))/2, this.width, this.width/widthToHeightRatio)
		}

	}




	// Enter Arrow
	configureEnterArrow () {

		this.enterArrow.cursor = 'pointer'
		
		if (this.currentlyActive) {
			this.enterArrow.opacity = 1
		} else {
			this.enterArrow.opacity = 0
		}
		
		this.enterArrow.configureDuration = 300

	}

	positionEnterArrow () {


		var widthOfEnterArrow = 40
		var bottomBufferForEnterArrow = 10

		var newFrame = new CGRect()

		newFrame.size.width = widthOfEnterArrow
		newFrame.size.height = newFrame.size.width + 20

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.height - newFrame.size.height - bottomBufferForEnterArrow

		this.enterArrow.frame = newFrame

	}


	//
	// Event Listeners
	//
	startEventListeners () {
		var homePage = this
		$(this.enterArrow.selector).click(function() {
			homePage.parent.homePageDownArrowWasClicked()
		})
	}



	//
	// Actions
	//



	// Timers
	startTimeoutForNextImage () {

		var homePage = this

		setTimeout(function() {

			homePage.backgroundImageIndex += 1
			homePage.backgroundLayer1IsActive = !homePage.backgroundLayer1IsActive
			if (homePage.backgroundImageIndex > 10) {
				homePage.backgroundImageIndex = 1
			}

			homePage.animatedUpdate({
				configureDuration: 1500,
				positionDuration: 0
			})

			homePage.startTimeoutForNextImage()

		}, 5000)

	}



	startTimeoutForArrowFade () {

		var homePage = this

		setTimeout(function () {

			// homePage.enterArrow.animationDuration = 1000
			homePage.arrowFaded = !homePage.arrowFaded
			homePage.animatedUpdate()

			homePage.startTimeoutForArrowFade()
		}, 1200)

	}

}
