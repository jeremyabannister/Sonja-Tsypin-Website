class ProjectsPage extends JABView {

	constructor (customId) {
		super(customId)
		
		
		// State
		this.projectDataBundles = this.assembleProjectDataBundles()
		this.comingSoon = false
		
		this.scrollable = false
		this.scrollFinishTimer
		this.readyToClose = true

		
		// Parameters
		this.reservedTopBuffer = 0
		this.topBufferForTopProjectRow = 70
		this.betweenBufferForProjectRows = 50
		this.bottomBufferForBottomRow = 50
		
		this.maximumBlur = 0
		this.fullBlurDistance = 400
		
		// UI
		this.projectRows = []
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			this.projectRows.push(new ProjectRow(null, this.projectDataBundles[i]))
		}
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
		
		this.addProjectRows()
		this.addFooter()
		
	}
	
	
	
	addProjectRows () {
		for (var i = 0; i < this.projectRows.length; i++) {
			this.addSubview(this.projectRows[i])
		}
	}
	
	
	addFooter () {
		this.addSubview(this.footer)
	}


	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureProjectRows()
		this.positionProjectRows()
		
		this.configureFooter()
		this.positionFooter()
		
	}



	// Project Rows
	configureProjectRows () {

		for (var i = 0; i < this.projectRows.length; i++) {
			var view = this.projectRows[i]
			view.projectDataBundle = this.projectDataBundles[i]
			
			if (this.comingSoon) {
				view.opacity = 0
			}
			
			
			var headerEncroachmentDistance = this.scrollTop + this.reservedTopBuffer - view.top
			if (headerEncroachmentDistance > 0) {
				if (headerEncroachmentDistance < this.fullBlurDistance) {
					view.blur = this.maximumBlur * (headerEncroachmentDistance/this.fullBlurDistance)
				} else {
					view.blur = this.maximumBlur
				}
			} else {
				view.blur = 0
			}
		}

	}

	positionProjectRows () {


		for (var i = 0; i < this.projectRows.length; i++) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = applicationRoot.contentWidth / this.projectRows[i].widthToHeightRatio

			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.reservedTopBuffer + this.topBufferForTopProjectRow + (i * (newFrame.size.height + this.betweenBufferForProjectRows))


			this.projectRows[i].frame = newFrame
		}

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
		if (this.projectRows.length > 0) {
			newFrame.origin.y = this.projectRows[this.projectRows.length - 1].bottom + this.bottomBufferForBottomRow
		}
		
							
		view.frame = newFrame
		
	}
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var projectsPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!projectsPage.scrollable) {
				evt.preventDefault()
			} else {
				projectsPage.configureProjectRows()
			}
			
			clearTimeout(projectsPage.scrollFinishTimer)
			if (projectsPage.scrollTop <= 0) {
				projectsPage.scrollFinishTimer = setTimeout(function () {
					projectsPage.readyToClose = true
				}, 50)
			} else {
				projectsPage.readyToClose = false
			}
			
			if (projectsPage.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}




	//
	// Actions
	//


	assembleProjectDataBundles () {

		var dataBundles = []

		var powderRoom = new ProjectDataBundle()
		powderRoom.id = 'powderRoom'
		powderRoom.title = 'POWDER ROOM'
		powderRoom.subtitle = 'dir. SONJA TSYPIN'
		powderRoom.year = '2016'
		
		
		powderRoom.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg']
		powderRoom.mainStillIndex = 2
		

		dataBundles.push(powderRoom)
		
		
		
		var powderRoom2 = new ProjectDataBundle()
		powderRoom2.id = 'powderRoom'
		powderRoom2.title = 'POWDER ROOM'
		powderRoom2.subtitle = 'dir. SONJA TSYPIN'
		powderRoom2.year = '2016'
		
		
		powderRoom2.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg']
		powderRoom2.mainStillIndex = 0
		

		dataBundles.push(powderRoom2)
		
		
		var powderRoom3 = new ProjectDataBundle()
		powderRoom3.id = 'powderRoom'
		powderRoom3.title = 'POWDER ROOM'
		powderRoom3.subtitle = 'dir. SONJA TSYPIN'
		powderRoom3.year = '2016'
		
		
		powderRoom3.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg']
		powderRoom3.mainStillIndex = 0
		

		dataBundles.push(powderRoom3)
		
		
		
		var powderRoom4 = new ProjectDataBundle()
		powderRoom4.id = 'powderRoom'
		powderRoom4.title = 'POWDER ROOM'
		powderRoom4.subtitle = 'dir. SONJA TSYPIN'
		powderRoom4.year = '2016'
		
		
		powderRoom4.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg']
		powderRoom4.mainStillIndex = 0
		

		dataBundles.push(powderRoom4)
		
		
		
		var powderRoom5 = new ProjectDataBundle()
		powderRoom5.id = 'powderRoom'
		powderRoom5.title = 'POWDER ROOM'
		powderRoom5.subtitle = 'dir. SONJA TSYPIN'
		powderRoom5.year = '2016'
		
		
		powderRoom5.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg']
		powderRoom5.mainStillIndex = 0
		

		dataBundles.push(powderRoom5)

		return dataBundles
	}


}
