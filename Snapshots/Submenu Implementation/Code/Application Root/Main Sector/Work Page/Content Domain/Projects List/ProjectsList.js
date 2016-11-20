class ProjectsList extends JABView {

	constructor (customId) {
		super(customId)
		
		
		// State
		this.projectDataBundles = this.assembleProjectDataBundles()
		this.comingSoon = false

		
		// Parameters
		this.topBufferForTopProjectRow = 0
		this.betweenBufferForProjectRows = 50
		
		// UI
		this.projectRows = []
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			this.projectRows.push(new ProjectRow(null, this.projectDataBundles[i]))
		}
		
	}
	
	
	
	//
	// Getters and Setters
	//
	
	requiredHeightForWidth (width) {
		
		return this.topBufferForTopProjectRow + ((applicationRoot.contentWidth * (9.0/16.0) + this.betweenBufferForProjectRows) * this.projectRows.length)
		
	}
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addProjectRows()
		
	}
	
	
	
	addProjectRows () {
		for (var i = 0; i < this.projectRows.length; i++) {
			this.addSubview(this.projectRows[i])
		}
	}


	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureProjectRows()
		this.positionProjectRows()
		
	}



	// Project Rows
	configureProjectRows () {

		for (var i = 0; i < this.projectRows.length; i++) {
			this.projectRows[i].projectDataBundle = this.projectDataBundles[i]
			
			if (this.comingSoon) {
				this.projectRows[i].opacity = 0
			}
		}

	}

	positionProjectRows () {


		for (var i = 0; i < this.projectRows.length; i++) {
			var newFrame = new CGRect()

			newFrame.size.width = this.width
			newFrame.size.height = applicationRoot.contentWidth / this.projectRows[i].widthToHeightRatio

			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.topBufferForTopProjectRow + (i * (newFrame.size.height + this.betweenBufferForProjectRows))


			this.projectRows[i].frame = newFrame
		}

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

		return dataBundles
	}


}
