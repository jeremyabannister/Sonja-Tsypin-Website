class HomePage extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.numberOfImages = 10
		this.backgroundImageIndex = 0
		
		this.arrowFaded = true
		this.currentlyActive = true
		
		
		this.imageOffsets = [[0, 0], [-70, 0], [0, 0], [300, 0], [-10, 0], [0, 0], [10, 0], [-80, 0], [80, 0], [130, 0]]
		
		
		// UI
		this.blackBackground = new JABView('BlackBackground')
		this.backgroundImageViews = []
		for (var i = 0; i < 10; i++) {
			this.backgroundImageViews.push(new JABImageView('BackgroundImageView' + i))
		}
		
		
		this.enterArrow = new EnterArrow('EnterArrow')

		

	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.startTimeoutForNextImage()
	}


	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addBlackBackground()
		this.addBackgroundImageViews()
		this.addEnterArrow()
		
	}
	
	
	
	addBlackBackground () {
		this.addSubview(this.blackBackground)
	}
	
	addBackgroundImageViews () {
		for (var i = 0; i < this.backgroundImageViews.length; i++) {
			this.addSubview(this.backgroundImageViews[i])
		}
	}
	
	addEnterArrow () {
		this.addSubview(this.enterArrow)
	}



	
	// Update
	updateAllUI () {
		super.updateAllUI()



		this.configureBlackBackground()
		this.positionBlackBackground()
		
		this.configureBackgroundImageViews()
		this.positionBackgroundImageViews()
		
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
	
	
	
	// Background Image Views
	configureBackgroundImageViews () {
		for (var i = 0; i < this.backgroundImageViews.length; i++) {
			var view = this.backgroundImageViews[i]
			
			view.src = './Resources/Images/Home Page/Featured Stills/' + (i + 1) + '.jpg'
			
			if (this.backgroundImageIndex != this.numberOfImages - 1) {
				if (i > this.backgroundImageIndex) {
					view.opacity = 0
				} else {
					view.opacity = 1
				}
			} else {
				if (i == this.numberOfImages - 1 || i == 0) {
					view.opacity = 1
				} else {
					view.opacity = 0
				}
			}
		}
	}
	
	positionBackgroundImageViews () {
		for (var i = 0; i < this.backgroundImageViews.length; i++) {
			var view = this.backgroundImageViews[i]
			
			var newFrame = new CGRect()
			
			var widthToHeightRatio = 1.777777777
			var contentDomainWidthToHeightRatio = 0
			if (this.height != 0) {
				contentDomainWidthToHeightRatio = this.width/this.height
			}
			
			if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
				newFrame.size.width = this.height * widthToHeightRatio
				newFrame.size.height = this.height
			} else {
				newFrame.size.width = this.width
				newFrame.size.height = this.width/widthToHeightRatio
			}
			
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = (this.height - newFrame.size.height)/2
			
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
					newFrame.origin.x += this.imageOffsets[i][0]
				} else {
					newFrame.origin.y += this.imageOffsets[i][1]
				}
			}
								
			view.frame = newFrame
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
		this.enterArrow.clickable = true
	}

	positionEnterArrow () {

		var widthsOfEnterArrow = {'xxs': 45, 'xs': 60, 's': 60, 'm': 40, 'l': 40, 'xl': 40}
		var widthOfEnterArrow = widthsOfEnterArrow[sizeClass]
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



	//
	// Actions
	//



	// Timers
	startTimeoutForNextImage () {
		
		var homePage = this

		setTimeout(function() {

			homePage.backgroundImageIndex += 1
			if (homePage.backgroundImageIndex > homePage.numberOfImages - 1) {
				homePage.backgroundImageIndex = 0
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
	
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.enterArrow) {
			this.parent.homePageDownArrowWasClicked(this)
		}
	}
}
