class ProjectsPage extends JABView {

	constructor (customId, projectDataBundles) {
		super(customId)
		
		
		// State
		this.state = {
			scrollable: false,
			readyToClose: true,
			
			selectedProject: null,
			selectedProjectIndex: null,
			
			arrowKeysDroppedBelowBottom: false,
			columnInWhichArrowKeysDroppedBelowBottom: 0,
		}
		
		this.projectDataBundles = projectDataBundles

		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
			
			numberOfColumns: 2,
			topBufferForGrid: 58,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,
			heightOfProjectInfoTabsAsFractionOfProjectPaneHeight: 0.5, // Relative to height of project panes, set below
			
			gridAnimationDuration: 300,
			gridAnimationEasingFunction: 'ease-in-out',
			
			truePositionsOfProjectPanes: [],
		}
		
		
		// Timers
		this.scrollFinishTimer
		
		
		
		// UI
		this.projectPanes = []
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			if (!this.projectDataBundles[i].hidden) {
				this.projectPanes.push(new ProjectImageView(null, this.projectDataBundles[i]))
				this.parameters.truePositionsOfProjectPanes.push(new CGRect())
			}
		}
		
		
		this.projectInfoTabs = []
		for (var i = 0; i < this.projectDataBundles.length; i++) {
			if (!this.projectDataBundles[i].hidden) {
				this.projectInfoTabs.push(new ProjectInfoTab(null, this.projectDataBundles[i]))
			}
		}
		
		this.footer = new Footer('Footer')
		
		
		this.marginClickDetectors = [new JABView('MarginClickDetectorLeft'), new JABView('MarginClickDetectorRight'), new JABView('MarginClickDetectorTop')]
		
		
		
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
		
		this.addProjectPanes()
		this.addProjectInfoTabs()
		this.addFooter()
		this.addMarginClickDetectors()
		
	}
	
	
	
	
	addProjectPanes () {
		for (var i = 0; i < this.projectPanes.length; i++) {
			this.addSubview(this.projectPanes[i])
		}
	}
	
	addProjectInfoTabs () {
		for (var i = 0; i < this.projectInfoTabs.length; i++) {
			this.addSubview(this.projectInfoTabs[i])
		}
	}
	
	
	addFooter () {
		this.addSubview(this.footer)
	}
	
	
	addMarginClickDetectors () {
		this.addSubview(this.marginClickDetectors[0])
		this.addSubview(this.marginClickDetectors[1])
		this.addSubview(this.marginClickDetectors[2])
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.updateParameters()
		
		
		this.configureProjectPanes()
		this.positionProjectPanes()
		
		this.configureProjectInfoTabs()
		this.positionProjectInfoTabs()
		
		this.configureFooter()
		this.positionFooter()
		
		
		
		this.configureMarginClickDetectors()
		this.positionMarginClickDetectors()
		
	}
	
	
	
	// Parameters
	updateParameters () {
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			this.parameters.numberOfColumns = 1
		} else if (sizeClass == 'xl') {
			this.parameters.numberOfColumns = 3
		} else {
			this.parameters.numberOfColumns = 2
		}
	}
	
	
	
	

	


	// Project Panes
	configureProjectPanes () {

		for (var i = 0; i < this.projectPanes.length; i++) {
			var view = this.projectPanes[i]
			
			if (this.state.comingSoon) {
				view.opacity = 0
			}
			
			view.backgroundColor = 'black'
			view.overflow = 'hidden'
			view.positionDuration = this.parameters.gridAnimationDuration
			
			if (websiteIsResizing) {
				view.positionDuration = 0
			}
			
			view.positionEasingFunction = this.parameters.gridAnimationEasingFunction
			view.cursor = 'pointer'
			view.clickable = true
			
			if (this.state.selectedProject != null) {
				if (view == this.state.selectedProject) {
					view.state.covered = false
				} else {
					view.state.covered = true
				}
			} else {
				view.state.covered = false
			}
			
			
			view.updateAllUI()
		}

	}

	positionProjectPanes () {

		if (!this.state.comingSoon) {
			for (var i = 0; i < this.projectPanes.length; i++) {
				var view = this.projectPanes[i]
				var newFrame = new CGRect()
				
				newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
				newFrame.size.height = newFrame.size.width * (9.0/16.0)
				
				var verticalAdjustment = 0
				if (this.state.selectedProject != null) {
					if (i >= this.state.selectedProjectIndex - (this.state.selectedProjectIndex % this.parameters.numberOfColumns)) {
						if (sizeClass == 'xxs' || sizeClass == 'xs') {
							if (i != this.state.selectedProjectIndex) {
								verticalAdjustment = newFrame.size.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight + this.parameters.betweenBufferForGridRows
							}
						} else {
							if (this.state.selectedProjectIndex % this.parameters.numberOfColumns != this.parameters.numberOfColumns - 1) {
								if (i % this.parameters.numberOfColumns == (this.state.selectedProjectIndex % this.parameters.numberOfColumns) + 1) {
									verticalAdjustment = newFrame.size.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight + this.parameters.betweenBufferForGridRows
								}
							} else {
								if (i % this.parameters.numberOfColumns == (this.state.selectedProjectIndex % this.parameters.numberOfColumns) - 1) {
									verticalAdjustment = newFrame.size.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight + this.parameters.betweenBufferForGridRows
								}
							}
						}
						
					}
				}
				
				
				newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2 + ((i % this.parameters.numberOfColumns) * (newFrame.size.width + this.parameters.betweenBufferForGridColumns))
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + (Math.floor(i/this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows)) + verticalAdjustment
				
				view.frame = newFrame
				
				
				// Keep track of where the project panes are supposed to be when they are not shifted to make room for info tab. This is done so that incoming info tab can be placed relative to where the project pane will be, not where it is in its currently shifted position
				var truePosition = newFrame.copy()
				truePosition.y -= verticalAdjustment
				this.parameters.truePositionsOfProjectPanes[i] = truePosition
				
			}
		}
		
	}
	
	
	
	
	
	
	// Project Info Tabs
	configureProjectInfoTabs () {
		
		for (var i = 0; i < this.projectInfoTabs.length; i++) {
			
			var view = this.projectInfoTabs[i]
			var correspondingProjectPane = this.projectPanes[i]
			
			if (!this.subviewIsBelowSubviews(view, this.projectPanes)) { // This should only be true the first time
				this.pushSubviewToBack(view)
			}
			
			view.configureDuration = this.parameters.gridAnimationDuration
			
			if (this.state.selectedProject == correspondingProjectPane) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
			
			view.updateAllUI()
		}
		
	}
	
	positionProjectInfoTabs () {
		
		for (var i = 0; i < this.projectInfoTabs.length; i++) {
			
			var view = this.projectInfoTabs[i]
			var correspondingProjectPane = this.projectPanes[i]
			var correspondingTruePosition = this.parameters.truePositionsOfProjectPanes[i]
			
			var newFrame = new CGRect()
								
			newFrame.size.width = correspondingTruePosition.width
			newFrame.size.height = correspondingTruePosition.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight
			
			
			if (i % this.parameters.numberOfColumns == this.parameters.numberOfColumns - 1) {
				newFrame.origin.x = correspondingTruePosition.x - newFrame.size.width - this.parameters.betweenBufferForGridColumns
			} else {
				newFrame.origin.x = correspondingTruePosition.right + this.parameters.betweenBufferForGridColumns
			}
			
			newFrame.origin.y = correspondingTruePosition.y
			
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newFrame.origin.x = (this.width - newFrame.size.width)/2
				newFrame.origin.y = correspondingTruePosition.bottom + this.parameters.betweenBufferForGridRows
			}
								
			view.frame = newFrame
			
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
		
		if (!this.state.comingSoon) {
			if (this.projectPanes.length > 0) {
				var lowestBottom = 0
				for (var i = 0; i < this.parameters.numberOfColumns; i++) {
					var index = this.projectPanes.length - 1 - i
					if (this.projectPanes.length > index) {
						if (this.projectPanes[index].bottom > lowestBottom) {
							lowestBottom = this.projectPanes[index].bottom
						}
					}
				}
				newFrame.origin.y = lowestBottom + this.parameters.bottomBufferForGrid
			}
			
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				if (this.state.selectedProjectIndex == this.projectPanes.length - 1) {
					newFrame.origin.y = this.projectInfoTabs[this.state.selectedProjectIndex].bottom + this.parameters.bottomBufferForGrid
				}
			}
			
			if (newFrame.origin.y + newFrame.size.height < this.height) {
				newFrame.origin.y = this.height - newFrame.size.height
			}
			
		} else {
			newFrame.origin.y = this.height - newFrame.size.height
		}
		
							
		view.frame = newFrame
		
	}
	
	
	
	
	
	// Margin Click Detectors
	configureMarginClickDetectors () {
		
		this.marginClickDetectors[0].clickable = true
		this.marginClickDetectors[1].clickable = true
		this.marginClickDetectors[2].clickable = true
		
	}
	
	positionMarginClickDetectors () {
		
		var view = this.marginClickDetectors[0]
		var newFrame = new CGRect()
							
		newFrame.size.width = (this.width - applicationRoot.contentWidth)/2
		newFrame.size.height = this.height

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
		
		
		view = this.marginClickDetectors[1]
		newFrame = new CGRect()
							
		newFrame.size.width = (this.width - applicationRoot.contentWidth)/2
		newFrame.size.height = this.height

		newFrame.origin.x = this.width - newFrame.size.width
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
		
		
		view = this.marginClickDetectors[2]
		newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid

		newFrame.origin.x = 0
		newFrame.origin.y = 0
							
		view.frame = newFrame
		
		
	}
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var projectsPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!projectsPage.state.scrollable) {
				evt.preventDefault()
			} else {
				projectsPage.configureProjectPanes()
			}
			
			clearTimeout(projectsPage.scrollFinishTimer)
			if (projectsPage.scrollTop <= 0) {
				projectsPage.scrollFinishTimer = setTimeout(function () {
					// projectsPage.state.readyToClose = true // Uncomment this line make website closable from projects page
				}, 50)
			} else {
				projectsPage.state.readyToClose = false
			}
			
			if (projectsPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
			
		})
	}




	//
	// Actions
	//
	
	
	
	// Selection
	selectProject (view, animated) {
		
		var index = null
		if (view != null) {
			index = this.projectPanes.indexOf(view)
		}
		if (animated == null) {
			animated = false
		}
		this.state = {
			selectedProject: view,
			selectedProjectIndex: index,
		}
		
		if (view != null) {
			this.state = {arrowKeysDroppedBelowBottom: false}
		}
		
		var selectedInfoTab
		var newScrollTop
		if (view != null) {
			var trueViewFrame = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex]
			selectedInfoTab = this.projectInfoTabs[this.state.selectedProjectIndex]
			newScrollTop = view.top - (this.parameters.heightOfHeader + (this.height - this.parameters.heightOfHeader - view.height)/2)
			
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newScrollTop = trueViewFrame.top - (this.parameters.heightOfHeader + (this.height - this.parameters.heightOfHeader - (trueViewFrame.height + selectedInfoTab.height + this.parameters.betweenBufferForGridRows))/2)
			}
			
		}
		
		if (animated) {
			this.animatedUpdate()
			this.scrollTo(newScrollTop, this.projectPanes[0].positionDuration, 'swing')
			
		} else {
			this.scrollTo(view.top, 0, 'swing')
			this.updateAllUI()
		}
	}
	
	
	deselectProjects () {
		this.state = {
			selectedProject: null,
			selectedProjectIndex: null,
		}
		
		this.animatedUpdate()
	}
	
	
	
	// Keys
	spaceBarWasPressed () {
		if (this.state.selectedProject != null) {
			this.parent.projectsPageWantsToDisplayProject(this, this.state.selectedProject.state.projectDataBundle.id, true)
		}
	}
	
	
	leftArrowWasPressed () {
		if (this.state.selectedProject == null) {
			if (this.projectPanes.length > 0) {
				if (this.state.arrowKeysDroppedBelowBottom) {
					this.selectProject(this.projectPanes[this.projectPanes.length - 1], true)
				} else {
					this.selectProject(this.projectPanes[0], true)
				}
			}
		} else {
			var destinationIndex = this.state.selectedProjectIndex - 1
			if (destinationIndex >= 0) {
				if (destinationIndex < this.projectPanes.length) {
					this.selectProject(this.projectPanes[destinationIndex], true)
				}
			} else {
				this.selectProject(null, true)
			}
		}
	}
	
	upArrowWasPressed () {
		if (this.state.selectedProject == null) {
			if (this.projectPanes.length > 0) {
				if (this.state.arrowKeysDroppedBelowBottom) {
					this.selectProject(this.projectPanes[this.projectPanes.length - this.parameters.numberOfColumns + this.state.columnInWhichArrowKeysDroppedBelowBottom], true)
				} else {
					this.selectProject(this.projectPanes[0], true)
				}
			}
		} else {
			var destinationIndex = this.state.selectedProjectIndex - this.parameters.numberOfColumns
			if (destinationIndex >= 0) {
				if (destinationIndex < this.projectPanes.length) {
					this.selectProject(this.projectPanes[destinationIndex], true)
				}
			} else {
				this.selectProject(null, true)
			}
		}
	}
	
	rightArrowWasPressed () {
		if (this.state.selectedProject == null) {
			if (this.projectPanes.length > 0) {
				this.selectProject(this.projectPanes[0], true)
			}
		} else {
			var destinationIndex = this.state.selectedProjectIndex + 1
			if (destinationIndex < this.projectPanes.length) {
				if (destinationIndex >= 0) {
					this.selectProject(this.projectPanes[destinationIndex], true)
				}
			} else {
				this.selectProject(null, true)
				this.state = {arrowKeysDroppedBelowBottom: true, columnInWhichArrowKeysDroppedBelowBottom: this.parameters.numberOfColumns - 1}
			}
		}
	}
	
	downArrowWasPressed () {
		if (this.state.selectedProject == null) {
			if (this.projectPanes.length > 0) {
				if (!this.state.arrowKeysDroppedBelowBottom) {
					this.selectProject(this.projectPanes[0], true)
				}
			}
		} else {
			var destinationIndex = this.state.selectedProjectIndex + this.parameters.numberOfColumns
			if (destinationIndex < this.projectPanes.length) {
				if (destinationIndex >= 0) {
					this.selectProject(this.projectPanes[destinationIndex], true)
				}
			} else {
				this.selectProject(null, true)
				this.state = {arrowKeysDroppedBelowBottom: true, columnInWhichArrowKeysDroppedBelowBottom: destinationIndex % this.parameters.numberOfColumns}
			}
		}
	}
	
	
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		
		if (view == this.marginClickDetectors[0] || view == this.marginClickDetectors[1] || view == this.marginClickDetectors[2]) {
			this.deselectProjects()
		} else {
			if (this.state.selectedProject != null) {
				if (view != this.state.selectedProject) {
					// If a project is currently open and now we need to open a different one
					this.selectProject(view, true)
				} else {
					// If the currently open project has just been clicked on (close it)
					this.selectProject(null, true)
				}
			} else {
				// If no project is currently open and a project has just been selected
				this.selectProject(view, true)
			}
		}
	}
	
	
	
	// Project Info Tab
	projectInfoTabPlayButtonWasClicked (projectInfoTab) {
		this.parent.projectsPageWantsToDisplayProject(this, projectInfoTab.state.projectDataBundle.id, true)
	}
	
	projectInfoTabInfoButtonWasClicked (projectInfoTab) {
		this.parent.projectsPageWantsToDisplayProject(this, projectInfoTab.state.projectDataBundle.id, false)
	}
	
	
	
	// Footer
	footerMailButtonWasClicked (footer) {
		this.parent.projectsPageWantsToOpenMailForm(this)
	}
}
