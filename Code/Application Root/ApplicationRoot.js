class ApplicationRoot extends JABApplicationRoot {

	constructor (customId) {

		super(customId)

		// State
		this.laboratoryEnabled = false
		this.contentWidth = {'xs': 500, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450}
		this.state = {
			headerBackdropHidden: false,
		}
		
		this.projectDataBundles = this.assembleProjectDataBundles()
		
		this.websiteClosed = true
		this.websiteClosedLocked = false

		// Parameters
		this.parameters = {
			heightOfHeader: 110,
		}

		if (this.laboratoryEnabled) {
			this.laboratory = new Laboratory('Laboratory')
		} else {
			
			// UI
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
		
	}

	
	
	//
	// Getters and Setters
	//
	
	get contentWidth () {
		return this._contentWidth[sizeClass]
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
			
			this.addMainSector()
			this.addHeaderBackdrop()
			this.addHomeSector()
			this.addHeader()
		}
		
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




	// Main Sector
	configureMainSector () {
		var view = this.mainSector
		
		view.backgroundColor = 'black'
		view.parameters.heightOfHeader = this.header.logo.bottom
		view.projectDataBundles = this.projectDataBundles
		
		view.state.currentlyActive = !this.websiteClosed
		view.positionDuration = 0
		
		view.updateAllUI()
	}

	positionMainSector () {
		this.mainSector.frame = new CGRect(0, 0, this.width, this.height)
	}
	
	
	
	// Header Backdrop
	configureHeaderBackdrop () {
		
		var view = this.headerBackdrop
		view.backgroundColor = 'black'
		
		if (this.state.headerBackdropHidden) {
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
		this.homeSector.backgroundColor = 'black'
		
		if (websiteIsResizing) {
			this.homeSector.positionDuration = 0
		} else {
			this.homeSector.positionDuration = 800
		}
		
		this.homeSector.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		this.homeSector.currentlyActive = this.websiteClosed
		this.homeSector.updateAllUI()
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
		
		this.header.websiteClosed = this.websiteClosed
		this.header.selectedMenuIndex = this.mainSector.state.pageIndex
		this.header.configureDuration = 0
		this.header.clickable = true
		
		this.header.updateAllUI()
		
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
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/1/'
		for (var i = 0; i < 4; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 2
		

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
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/3/'
		for (var i = 0; i < 2; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

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
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/2/'
		for (var i = 0; i < 5; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 3
		

		dataBundles.push(dataBundle)
		
		
		
		// Theodore
		dataBundle = new ProjectDataBundle()
		dataBundle.id = 'theodore'
		dataBundle.title = 'THEODORE'
		dataBundle.director = 'ONDINE VI\u00d1AO'
		dataBundle.movieType = 'SHORT'
		dataBundle.year = '2015'
		dataBundle.description = "<span style='color:white'>Starring Camillia Hartman, Dexter Zimet</span><br/>A romantic rural retreat takes a terrifying turn after a local offers some chilling advice."
		
		dataBundle.vimeoId = '139578681'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/4/'
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
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/5/'
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
		dataBundle.director = 'ONDINE VI\u00d1AO'
		dataBundle.movieType = 'MUSIC VIDEO'
		dataBundle.year = '2016'
		dataBundle.description = "<span style='color:white'>Starring Annalisa Plumb</span><br/>An experimental video to the track 'As Long As I Have You' by Elvis Presley."
		
		dataBundle.vimeoId = '152982438'
		dataBundle.vimeoHeightToWidth = (9.0/16.0)
		
		var pathStem = './Resources/Images/Projects Page/Project Data Bundles/6/'
		for (var i = 0; i < 1; i++) {
			var index = i + 1
			dataBundle.stills.push(pathStem + 'still' + index + '.jpg')
		}
		dataBundle.mainStillIndex = 0
		

		dataBundles.push(dataBundle)
		
		
		

		return dataBundles
	}
	
	
	//
	// Delegate
	//
	
	
	// JABView
	viewWasClicked (view) {
		
		if (view == this.header) {
			this.mainSector.closeCurrentlyOpenProject()
			this.mainSector.projectsPage.deselectProjects()
		}
		
	}
	
	
	// Main Sector
	mainSectorWantsToDisplayProject (mainSector, projectIndex) {
		
		// For now the applicatio root does nothing with the projectIndex, because it behaves identically for all projects
		
		this.state = {
			headerBackdropHidden: true
		}
		
		this.animatedUpdate()
		
	}
	
	
	mainSectorWantsToCloseProject (mainSector) {
		this.state = {headerBackdropHidden: false}
		
		this.animatedUpdate()
	}
	
	
	// Home Sector
	homeSectorEnterButtonWasClicked () {
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
