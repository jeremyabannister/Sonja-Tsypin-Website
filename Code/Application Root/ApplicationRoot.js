class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xxs': 0, 'xs': 0, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450}
		this.state = {
			headerBackdropHidden: false,
			initialLoadingGifInPlace: false,
			initiallyLoading: true,
		}
		
		this.projectDataBundles = this.assembleProjectDataBundles()
		this.images = {}
		
		this.websiteClosed = true
		this.websiteClosedLocked = false

		// Parameters
		this.parameters = {
			sizeOfInitialLoadingGifWrapper: 50,
			
			
			heightOfHeader: 110,
			
			numberOfHomePageImages: 10,
		}

		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			// UI
			this.initialLoadingGifWrapper = new JABGifWrapper('InitialLoadingGifWrapper')
			
			this.mainSector = new MainSector('MainSector', this.projectDataBundles)
			this.headerBackdrop = new JABView('HeaderBackdrop')
			this.homeSector = new HomeSector('HomeSector')
			this.header = new Header('Header')
		}
		
	}
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.downloadImages()
	}
	
	
	//
	// Getters and Setters
	//
	
	get contentWidth () {
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			return this.width
		} else {
			return this._contentWidth[sizeClass]
		}
	}
	
	set contentWidth (newContentWidth) {
		this._contentWidth = newContentWidth
	}
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		if (this.laboratoryEnabled) {
			this.addLaboratory()
		} else {
			
			this.addInitialLoadingGifWrapper()
			
			this.addMainSector()
			this.addHeaderBackdrop()
			this.addHomeSector()
			this.addHeader()
		}
		
	}
	
	
	addInitialLoadingGifWrapper () {
		this.addSubview(this.initialLoadingGifWrapper)
	}
	
	
	
	addMainSector () {
		this.addSubview(this.mainSector)
	}
	
	addHeaderBackdrop () {
		this.addSubview(this.headerBackdrop)
	}
	
	addHomeSector () {
		this.addSubview(this.homeSector)
	}
	
	addHeader () {
		this.addSubview(this.header)
	}
	
	
	
	
	
	addLaboratory () {
		this.addSubview(this.laboratory)
	}
	
	
	


	// Update

	updateAllUI () {
		super.updateAllUI()


		if (this.laboratoryEnabled) {
			this.configureLaboratory()
			this.positionLaboratory()
		} else {
			
			
			
			this.configureInitialLoadingGifWrapper()
			this.positionInitialLoadingGifWrapper()
			
			
			if (this.state.initialLoadingGifInPlace) {
				this.configureMainSector()
				this.positionMainSector()
				
				this.configureHeaderBackdrop()
				this.positionHeaderBackdrop()
				
				this.configureHomeSector()
				this.positionHomeSector()
				
				this.configureHeader()
				this.positionHeader()
			}
			
		}

	}
	
	
	
	// Initial Loading Gif Wrapper
	configureInitialLoadingGifWrapper () {
		
		var view = this.initialLoadingGifWrapper
		
		if (this.state.initiallyLoading) {
			if (!(view.gif instanceof LoadingGif)) {
				view.gif = new LoadingGif()
			}
			
			if (!view.state.playing) {
				view.play()
			}
		}
		
	}
	
	positionInitialLoadingGifWrapper () {
		var view = this.initialLoadingGifWrapper
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfInitialLoadingGifWrapper
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
		if (!this.state.initialLoadingGifInPlace) {
			this.state.initialLoadingGifInPlace = true
		}
	}
	
	
	
	
	



	// Main Sector
	configureMainSector () {
		var view = this.mainSector
		
		view.backgroundColor = 'black'
		view.parameters = {
			reservedTopBuffer: this.header.logo.bottom,
			heightOfHeader: this.parameters.heightOfHeader,
		}
		view.projectDataBundles = this.projectDataBundles
		
		view.state = {
			currentlyActive: !this.websiteClosed,
			shouldStartLoading: !this.state.initiallyLoading,
		}
		view.positionDuration = 0
		
		if (this.state.initiallyLoading) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
	}

	positionMainSector () {
		this.mainSector.frame = new CGRect(0, 0, this.width, this.height)
	}
	
	
	
	// Header Backdrop
	configureHeaderBackdrop () {
		
		var view = this.headerBackdrop
		view.backgroundColor = 'black'
		
		if (this.state.headerBackdropHidden || this.state.initiallyLoading) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
	}
	
	positionHeaderBackdrop () {
		
		var view = this.headerBackdrop
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.heightOfHeader

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
	}
	


	
	// Home Sector
	configureHomeSector () {
		
		var view = this.homeSector
		
		view.backgroundColor = 'black'
		
		if (websiteIsResizing) {
			view.positionDuration = 0
		} else {
			view.positionDuration = 800
		}
		
		view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		view.currentlyActive = this.websiteClosed
		
		
		if (this.state.initiallyLoading) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		
		view.updateAllUI()
	}
	
	positionHomeSector () {
		var newFrame = this.bounds
		
		if (!this.websiteClosed) {
			newFrame.origin.y = -this.height
		}
					
		this.homeSector.frame = newFrame
	}
	
	
	// Header
	configureHeader () {
		
		var view = this.header
		
		view.websiteClosed = this.websiteClosed
		view.selectedMenuIndex = this.mainSector.state.pageIndex
		view.configureDuration = 0
		view.clickable = true
		
		if (this.state.initiallyLoading) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
		
		view.updateAllUI()
		
	}

	positionHeader () {
		this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader)
		
		this.configureMainSector() // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
	}
	
	
	
	
	
	
	
	
	
	
	
	
	



	// Laboratory
	configureLaboratory () {

		this.laboratory.backgroundColor = 'white'
	}

	positionLaboratory () {
		if (this.laboratoryEnabled) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = this.height

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame

		} else {
			var newFrame = new CGRect()

			newFrame.size.width = 0
			newFrame.size.height = 0

			newFrame.origin.x = 0
			newFrame.origin.y = 0

			this.laboratory.frame = newFrame
		}
	}


	//
	// Actions
	//
	
	// Navigation
	openWebsite (duration) {
		if (this.websiteClosed) {
			if (!this.websiteClosedLocked) {
				this.websiteClosed = false
				websiteIsResizing = false
				
				this.setWebsiteClosedLockedForTimeout(duration)
				
				if (duration == null) {
					duration = 800
				}
				
				var applicationRoot = this
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
				}, function() {
					applicationRoot.homePageHidden = true
					applicationRoot.mainSector.state.scrollable = true
					applicationRoot.updateAllUI()
				})
			}
		}
	}
	
	
	closeWebsite (duration) {
		if (!this.websiteClosed) {
			if (!this.websiteClosedLocked) {
				this.websiteClosed = true
				websiteIsResizing = false
				
				this.setWebsiteClosedLockedForTimeout(duration)
				
				if (duration == null) {
					duration = 800
				}
				
				
				this.homePageHidden = false
				this.configureHomeSector()
				this.animatedUpdate({
					
					configureDuration: duration,
					configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
					
					positionDuration: duration,
					positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',
				}, function() {
					applicationRoot.mainSector.state.scrollable = false
					applicationRoot.updateAllUI()
				})
			}
		}
	}
	
	
	setWebsiteClosedLockedForTimeout (timeoutDuration) {
		this.websiteClosedLocked = true
		var applicationRoot = this
		setTimeout(function() {
			applicationRoot.websiteClosedLocked = false
		}, timeoutDuration)
	}

	// Scrolling
	userDidScrollByAmount (amount) {

		if (this.websiteClosed) {
			if (amount < 0) {
				this.openWebsite()
			}
		} else {
			if (amount > 0) {
				if (this.mainSector.readyToClose) {
					this.closeWebsite()
				}
			}
		}
		
	}
	
	
	
	
	// Swipe
	leftSwipeDetected () {
		this.mainSector.leftSwipeDetected()
	}
	
	rightSwipeDetected () {
		this.mainSector.rightSwipeDetected()
	}
	
	upSwipeDetected () {
		if (this.websiteClosed) {
			this.openWebsite()
		}
	}
	
	downSwipeDetected () {
		
	}
	
	
	// Keys
	spaceBarWasPressed () {
		if (!this.websiteClosed) {
			this.mainSector.spaceBarWasPressed()
		}
	}
	
	
	leftArrowWasPressed () {
		if (!this.websiteClosed) {
			this.mainSector.leftArrowWasPressed()
		}
	}
	
	upArrowWasPressed () {
		if (!this.websiteClosed) {
			if (this.mainSector.state.pageIndex == 0 || this.mainSector.state.pageIndex == 2) {
				this.closeWebsite()
			} else {
				this.mainSector.upArrowWasPressed()
			}
		}
	}
	
	rightArrowWasPressed () {
		if (!this.websiteClosed) {
			this.mainSector.rightArrowWasPressed()
		}
	}
	
	downArrowWasPressed () {
		if (!this.websiteClosed) {
			this.mainSector.downArrowWasPressed()
		} else {
			this.openWebsite()
		}
	}
	
	
	// Project Data
	assembleProjectDataBundles () {

		var dataBundles = []

		
		
		// Powder Room
		var dataBundle = new ProjectDataBundle()
		dataBundle.id = 'powderRoom'
		dataBundle.title = 'POWDER ROOM'
		dataBundle.director = 'SONJA TSYPIN'
		dataBundle.movieType = 'SHORT'
		dataBundle.year = '2016'
		dataBundle.description = "<span style='color:white'>Starring Jessica Kay Park, John Patrick Maddock</span><br/>A wildly popular online personality who hasn't left her apartment in four years has her tiny world turned upside down when a stranger forces himself into her peculiar space."
		
		dataBundle.vimeoId = '167824606'
		dataBundle.vimeoHeightToWidth = (1.0/2.35)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/1/'
		for (var i = 0; i < 4; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 2
		

		dataBundles.push(dataBundle)
		
		
		
		
		
		// Angels
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'angels'
		dataBundle.title = 'ANGELS'
		dataBundle.director = 'AUDREY BANKS'
		dataBundle.movieType = 'FEATURE'
		dataBundle.year = '2016'
		dataBundle.description = "<span style='color:white'>Starring Moni Bell, Eva Evans, Gabriel Sommer, Joanna Janetakis</span><br/>A man who goes by 'Sir' is holding a mansion full of beautiful women prisoner when a new arrival threatens his power."
		
		dataBundle.noVideoMessage = 'TRAILER COMING SOON'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/2/'
		for (var i = 0; i < 5; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 3
		

		dataBundles.push(dataBundle)
		
		
		
		
		// Birth Day
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'birthDay'
		dataBundle.title = 'BIRTH DAY'
		dataBundle.director = 'EVA EVANS'
		dataBundle.movieType = 'SHORT'
		dataBundle.year = '2016'
		dataBundle.description = "<span style='color:white'>Starring Tessa Gourin</span><br/>A young girl finds herself struggling to distinguish between reality and a haunting memory."
		
		dataBundle.vimeoId = '172178428'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/3/'
		for (var i = 0; i < 2; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		
		// Theodore
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'theodore'
		dataBundle.title = 'THEODORE'
		dataBundle.director = 'ONDINE VI' + upperCaseEnya + 'AO'
		dataBundle.movieType = 'SHORT'
		dataBundle.year = '2015'
		dataBundle.description = "<span style='color:white'>Starring Camillia Hartman, Dexter Zimet</span><br/>A romantic rural retreat takes a terrifying turn after a local offers some chilling advice."
		
		dataBundle.vimeoId = '139578681'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/4/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		
		// Found Guilty
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'foundGuilty'
		dataBundle.title = 'FOUND GUILTY'
		dataBundle.director = 'SONJA TSYPIN'
		dataBundle.movieType = 'SHORT'
		dataBundle.year = '2014'
		dataBundle.description = '<span style="color:white">Starring Tuva Hildebrand</span><br/>In a short film remake of the famous murder scene from Alfred Hitchcock\'s "Blackmail," a woman must come to terms with herself after commiting an unthinkable crime out of self-defense.'
		
		dataBundle.vimeoId = '99426346'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/5/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		
		
		
		// As Long As I Have You
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'asLongAsIHaveYou'
		dataBundle.title = 'AS LONG AS I HAVE YOU'
		dataBundle.director = 'ONDINE VI' + upperCaseEnya + 'AO'
		dataBundle.movieType = 'MUSIC VIDEO'
		dataBundle.year = '2016'
		dataBundle.description = "<span style='color:white'>Starring Annalisa Plumb</span><br/>An experimental video to the track 'As Long As I Have You' by Elvis Presley."
		
		dataBundle.vimeoId = '152982438'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/6/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		
		//
		// Hidden
		//
		
		
		
		// Contact Esterina
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'contactEsterina'
		dataBundle.title = 'CONTACT ESTERINA'
		dataBundle.director = 'SONJA TSYPIN'
		dataBundle.movieType = 'DOCUMENTARY'
		dataBundle.year = '2014'
		dataBundle.description = "<span style='color:white'>Starring Esterina Seto</span><br/>"
		dataBundle.hidden = true
		
		dataBundle.vimeoId = '126022343'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/6/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		
		

		return dataBundles
	}
	
	
	
	downloadImages () {
		
		var numberOfHomePageImagesLoadedAtFirst = 4
		
		var homePageImageStem = '/Resources/Images/Home Page/Featured Stills/'
		var buttonImageStem = '/Resources/Images/Buttons/'
		var projectsPageImageStem = '/Resources/Images/Projects Page/Project Data Bundles/'
		
		var projectsPageIndexCombinations = [[1, 3], [2, 4], [3, 1], [4, 1], [5, 1], [6, 1]]
		
		// Home Page (first batch)
		for (var i = 0; i < numberOfHomePageImagesLoadedAtFirst; i++) {
			imageBank.addToQueue(homePageImageStem + (i + 1) + '.jpg', this)
		}
		imageBank.addToQueue(buttonImageStem + 'Enter Arrow.png', this)
		
		// Reel Page
		imageBank.addToQueue('/Resources/Images/Reel Page/Reel Cover Photo.png', this)
		imageBank.addToQueue(buttonImageStem + 'Play Button.png', this)
		
		// Footer
		imageBank.addToQueue(buttonImageStem + 'Instagram Button.png', this)
		imageBank.addToQueue(buttonImageStem + 'Art Button.png', this)
		imageBank.addToQueue(buttonImageStem + 'Email Button.png', this)
		
		// Projects Page
		for (var i = 0; i < projectsPageIndexCombinations.length; i++) {
			imageBank.addToQueue(projectsPageImageStem + projectsPageIndexCombinations[i][0] + '/still' + projectsPageIndexCombinations[i][1] + '.jpg', this)
		}
		
		
		
		// Home Page (second batch)
		for (var i = 0; i < this.parameters.numberOfHomePageImages - numberOfHomePageImagesLoadedAtFirst; i++) {
			imageBank.addToQueue(homePageImageStem + (numberOfHomePageImagesLoadedAtFirst + i) + '.jpg', this)
		}
		
	}
	
	
	
	
	
	//
	// Delegate
	//
	
	
	// Image Bank
	imageDidFinishLoading (src) {
		if (src == '/Resources/Images/Buttons/Play Button.png') {
			this.state.initiallyLoading = false
			this.updateAllUI()
		} else if (src.lastIndexOf('/Resources/Images/Buttons/', 0) != -1) {
			this.updateAllUI()
		} else if (src.lastIndexOf('/Resources/Images/Home Page/Featured Stills/', 0) != -1) {
			this.homeSector.updateAllUI()
		}
	}
	
	
	// JABView
	viewWasClicked (view) {
		
		if (view == this.header) {
			this.mainSector.closeCurrentlyOpenProject()
			this.mainSector.closeMailFormPage()
			this.mainSector.projectsPage.deselectProjects()
		}
		
	}
	
	
	// Main Sector
	mainSectorWantsToUseFullScreen (mainSector) {
		this.state = {headerBackdropHidden: true}
		this.animatedUpdate()
	}
	
	
	mainSectorWantsToRelinquishFullScreen (mainSector) {
		this.state = {headerBackdropHidden: false}
		this.animatedUpdate()
	}
	
	
	mainSectorWantsToOpenAboutPage (mainSector) {
		this.mainSector.state = {
			pageIndex: 2,
			projectOpen: false,
		}
		this.animatedUpdate()
	}
	
	
	
	
	// Home Sector
	homeSectorEnterButtonWasClicked (homeSector) {
		this.openWebsite()
	}

	// Header
	headerLogoWasClicked () {
		this.closeWebsite()
	}

	headerDidSelectPage (pageIndex) {
		
		this.mainSector.state = {
			pageIndex: pageIndex,
			projectOpen: false
		}
		
		if (this.websiteClosed) {
			this.openWebsite()
		} else {
			this.updateAllUI() // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
		}
		
	}

}
