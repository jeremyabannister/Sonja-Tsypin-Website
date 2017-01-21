class HomePage extends JABView {

	constructor (customId) {
		super(customId)


		// State
		this.numberOfImages = 10
		this.numberOfImagesLoaded = 0
		this.backgroundImageIndex = 0
		
		this.arrowFaded = true
		this.currentlyActive = true
		
		
		this.imageOffsets = [[0, 0], [-70, 0], [0, 0], [240, 0], [-10, 0], [0, 0], [10, 0], [-80, 0], [80, 0], [130, 0]]
		
		this.imageTimer = null
		this.arrowTimer = null
		
		// UI
		this.blackBackground = new JABView('BlackBackground')
		this.backgroundImageViews = []
		for (var i = 0; i < this.numberOfImages; i++) {
			this.backgroundImageViews.push(new JABImageView('BackgroundImageView' + i))
		}
		
		
		this.enterArrow = new EnterArrow('EnterArrow')

		

	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.checkLoadedImages()
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
		
		// First check if up to this point no images have been loaded. The idea is that prior to any images being loaded we do not want to start the timer. When we transition from having 0 images to having some number of images we want to start the image timer because it has not been previously started
		var previousLoaded = this.numberOfImagesLoaded
		this.checkLoadedImages()
		if (previousLoaded == 0 && this.numberOfImagesLoaded > 0) {
			this.startTimeoutForNextImage()
		}
		
		for (var i = 0; i < this.backgroundImageViews.length; i++) {
			var view = this.backgroundImageViews[i];
			var imagePath = '/Resources/Images/Home Page/Featured Stills/' + (i + 1) + '.jpg'
			
			if (imageBank.imageStatus[imagePath] == true) {
				view.src = imagePath
			}
			
			/*
			(function(i, view) {
				var imageRef = storageRef.child("Resources/Images/Home Page/Featured Stills/" + (i + 1) + ".jpg")
				
				imageRef.getDownloadURL().then(function(url) {
				  // Get the download URL for 'images/stars.jpg'
				  // This can be inserted into an <img> tag
				  // This can also be downloaded directly
				  view.src = url
				}).catch(function(error) {
				  // Handle any errors
				  console.log('error', error)
				});
			})(i, view)
			*/
			
			
			if (this.backgroundImageIndex != this.numberOfImagesLoaded - 1) {
				if (i > this.backgroundImageIndex) {
					view.opacity = 0
				} else {
					view.opacity = 1
				}
			} else {
				if (i == this.numberOfImagesLoaded - 1 || i == 0) {
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
		
		var view = this.enterArrow

		view.cursor = 'pointer'
		
		if (this.currentlyActive) {
			view.opacity = 1
		} else {
			view.opacity = 0
		}
		
		view.configureDuration = 300
		view.clickable = true
		
		view.updateAllUI()
	}

	positionEnterArrow () {
		
		var view = this.enterArrow
		
		var widthsOfEnterArrow = {'xxs': 45, 'xs': 60, 's': 60, 'm': 40, 'l': 40, 'xl': 40}
		var widthOfEnterArrow = widthsOfEnterArrow[sizeClass]
		var bottomBufferForEnterArrow = 10

		var newFrame = new CGRect()

		newFrame.size.width = widthOfEnterArrow
		newFrame.size.height = newFrame.size.width + 20

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.height - newFrame.size.height - bottomBufferForEnterArrow

		view.frame = newFrame

	}


	//
	// Event Listeners
	//



	//
	// Actions
	//
	
	
	// Images
	checkLoadedImages () {
		var numberLoaded = 0
		for (var i = 0; i < this.numberOfImages; i++) {
			var imagePath = '/Resources/Images/Home Page/Featured Stills/' + (i + 1) + '.jpg'
			if (imageBank.imageStatus[imagePath] == true) {
				numberLoaded++
			}
		}
		this.numberOfImagesLoaded = numberLoaded
	}
	

	// Timers
	startTimeoutForNextImage () {
		
		if (this.numberOfImagesLoaded > 0) {
			var homePage = this
			
			clearTimeout(this.imageTimer)
			this.imageTimer = setTimeout(function() {

				homePage.backgroundImageIndex += 1
				if (homePage.backgroundImageIndex > homePage.numberOfImagesLoaded - 1) {
					homePage.backgroundImageIndex = 0
				}

				homePage.animatedUpdate({
					configureDuration: 1500,
					positionDuration: 0
				})

				homePage.startTimeoutForNextImage()

			}, 5000)
		}

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
	
	
	// JABImageView
	imageViewDidFinishLoadingImage (imageView) {
		// console.log(imageView)
	}
	
	
	// JABView
	viewWasClicked (view) {
		if (view == this.enterArrow) {
			this.parent.homePageDownArrowWasClicked(this)
		}
	}
}
