'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectsPage = function (_JABView) {
	_inherits(ProjectsPage, _JABView);

	function ProjectsPage(customId) {
		_classCallCheck(this, ProjectsPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectsPage).call(this, customId));

		_this.state = {
			projectDataBundles: _this.assembleProjectDataBundles(),
			comingSoon: false,

			scrollable: false,
			readyToClose: true,

			selectedProject: null,
			selectedProjectIndex: null,

			currentInfoTab: null,
			queuedInfoTab: null
		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,

			numberOfColumns: 2,
			topBufferForGrid: 58,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,
			heightOfProjectInfoTabsAsFractionOfProjectPaneHeight: 0.5, // Relative to height of project panes, set below

			gridAnimationDuration: 250,
			gridAnimationEasingFunction: 'ease-in-out',

			truePositionsOfProjectPanes: []
		};

		// Timers
		_this.scrollFinishTimer;

		// UI

		_this.projectInfoTab = new ProjectInfoTab('ProjectInfoTab');
		_this.projectInfoTabBackup = new ProjectInfoTab('ProjectInfoTabBackup');

		_this.projectPanes = [];
		for (var i = 0; i < _this.state.projectDataBundles.length; i++) {
			_this.projectPanes.push(new ProjectImageView());
			_this.parameters.truePositionsOfProjectPanes.push(new CGRect());
		}

		_this.projectInfoTabs = [];
		for (var i = 0; i < _this.state.projectDataBundles.length; i++) {
			_this.projectInfoTabs.push(new ProjectInfoTab());
		}

		_this.footer = new Footer('Footer');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectsPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectsPage.prototype), 'init', this).call(this);

			this.startEventListeners();

			this.state.queuedInfoTab = this.projectInfoTab;
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {

			return this.footer.bottom;
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			// this.addProjectInfoTab()
			// this.addProjectInfoTabBackup()

			this.addProjectPanes();
			this.addProjectInfoTabs();
			this.addFooter();
		}
	}, {
		key: 'addProjectInfoTab',
		value: function addProjectInfoTab() {
			this.addSubview(this.projectInfoTab);
		}
	}, {
		key: 'addProjectInfoTabBackup',
		value: function addProjectInfoTabBackup() {
			this.addSubview(this.projectInfoTabBackup);
		}
	}, {
		key: 'addProjectPanes',
		value: function addProjectPanes() {
			for (var i = 0; i < this.projectPanes.length; i++) {
				this.addSubview(this.projectPanes[i]);
			}
		}
	}, {
		key: 'addProjectInfoTabs',
		value: function addProjectInfoTabs() {
			for (var i = 0; i < this.projectInfoTabs.length; i++) {
				this.addSubview(this.projectInfoTabs[i]);
			}
		}
	}, {
		key: 'addFooter',
		value: function addFooter() {
			this.addSubview(this.footer);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectsPage.prototype), 'updateAllUI', this).call(this);

			// this.configureProjectInfoTab()
			// this.positionProjectInfoTab()

			// this.configureProjectInfoTabBackup()
			// this.positionProjectInfoTabBackup()

			this.configureProjectPanes();
			this.positionProjectPanes();

			this.configureProjectInfoTabs();
			this.positionProjectInfoTabs();

			this.configureFooter();
			this.positionFooter();
		}

		// Project Info Tab

	}, {
		key: 'configureProjectInfoTab',
		value: function configureProjectInfoTab() {

			var view = this.projectInfoTab;

			view.configureDuration = this.parameters.gridAnimationDuration;

			if (this.state.selectedProject == null || view != this.state.currentInfoTab) {
				// view.opacity = 0
			} else {
				view.state.usedAtLeastOnce = true;
				view.state.projectDataBundle = this.state.projectDataBundles[this.state.selectedProjectIndex];
				view.opacity = 1;

				if (this.state.selectedProjectIndex % this.parameters.numberOfColumns == this.parameters.numberOfColumns - 1) {
					// view.state.leftHanded = true
				} else {
					view.state.leftHanded = false;
				}
			}

			if (!view.state.usedAtLeastOnce) {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionProjectInfoTab',
		value: function positionProjectInfoTab() {
			var view = this.projectInfoTab;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
			newFrame.size.height = newFrame.size.width * (9.0 / 16.0) / 2 - this.parameters.betweenBufferForGridRows;

			if (this.state.selectedProject == null) {
				newFrame.origin.x = view.x;
				newFrame.origin.y = view.y;
			} else {
				if (view == this.state.currentInfoTab) {
					if (this.state.selectedProjectIndex % this.parameters.numberOfColumns != this.parameters.numberOfColumns - 1) {
						newFrame.origin.x = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].right + this.parameters.betweenBufferForGridColumns;
					} else {
						newFrame.origin.x = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].x - newFrame.size.width - this.parameters.betweenBufferForGridColumns;
					}

					newFrame.origin.y = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].y;
				} else {
					newFrame.origin.x = view.x;
					newFrame.origin.y = view.y;
				}
			}

			view.frame = newFrame;
		}

		// Project Info Tab Backup

	}, {
		key: 'configureProjectInfoTabBackup',
		value: function configureProjectInfoTabBackup() {

			var view = this.projectInfoTabBackup;

			view.configureDuration = this.parameters.gridAnimationDuration;

			if (this.state.selectedProject == null || view != this.state.currentInfoTab) {
				// view.opacity = 0
			} else {
				view.state.usedAtLeastOnce = true;
				view.state.projectDataBundle = this.state.projectDataBundles[this.state.selectedProjectIndex];
				view.opacity = 1;

				if (this.state.selectedProjectIndex % this.parameters.numberOfColumns == this.parameters.numberOfColumns - 1) {
					// view.state.leftHanded = true
				} else {
					view.state.leftHanded = false;
				}
			}

			if (!view.state.usedAtLeastOnce) {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionProjectInfoTabBackup',
		value: function positionProjectInfoTabBackup() {
			var view = this.projectInfoTabBackup;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
			newFrame.size.height = newFrame.size.width * (9.0 / 16.0) / 2 - this.parameters.betweenBufferForGridRows;

			if (this.state.selectedProject == null) {
				newFrame.origin.x = view.x;
				newFrame.origin.y = view.y;
			} else {
				if (view == this.state.currentInfoTab) {
					if (this.state.selectedProjectIndex % this.parameters.numberOfColumns != this.parameters.numberOfColumns - 1) {
						newFrame.origin.x = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].right + this.parameters.betweenBufferForGridColumns;
					} else {
						newFrame.origin.x = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].x - newFrame.size.width - this.parameters.betweenBufferForGridColumns;
					}

					newFrame.origin.y = this.parameters.truePositionsOfProjectPanes[this.state.selectedProjectIndex].y;
				} else {
					newFrame.origin.x = view.x;
					newFrame.origin.y = view.y;
				}
			}

			view.frame = newFrame;
		}

		// Project Panes

	}, {
		key: 'configureProjectPanes',
		value: function configureProjectPanes() {

			for (var i = 0; i < this.projectPanes.length; i++) {
				var view = this.projectPanes[i];

				view.state.src = this.state.projectDataBundles[i].stills[this.state.projectDataBundles[i].mainStillIndex];
				if (this.state.comingSoon) {
					view.opacity = 0;
				}

				view.backgroundColor = 'black';
				view.overflow = 'hidden';
				view.positionDuration = this.parameters.gridAnimationDuration;
				view.positionEasingFunction = this.parameters.gridAnimationEasingFunction;
				view.cursor = 'pointer';
				view.clickable = true;

				if (this.state.selectedProject != null) {
					if (view == this.state.selectedProject) {
						view.state.covered = false;
					} else {
						view.state.covered = true;
					}
				} else {
					view.state.covered = false;
				}

				view.updateAllUI();
			}
		}
	}, {
		key: 'positionProjectPanes',
		value: function positionProjectPanes() {

			if (!this.state.comingSoon) {
				for (var i = 0; i < this.projectPanes.length; i++) {
					var view = this.projectPanes[i];
					var newFrame = new CGRect();

					newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
					newFrame.size.height = newFrame.size.width * (9.0 / 16.0);

					var verticalAdjustment = 0;
					if (this.state.selectedProject != null) {
						if (i >= this.state.selectedProjectIndex - this.state.selectedProjectIndex % this.parameters.numberOfColumns) {
							if (this.state.selectedProjectIndex % this.parameters.numberOfColumns != this.parameters.numberOfColumns - 1) {
								if (i % this.parameters.numberOfColumns == this.state.selectedProjectIndex % this.parameters.numberOfColumns + 1) {
									verticalAdjustment = newFrame.size.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight + this.parameters.betweenBufferForGridRows;
								}
							} else {
								if (i % this.parameters.numberOfColumns == this.state.selectedProjectIndex % this.parameters.numberOfColumns - 1) {
									verticalAdjustment = newFrame.size.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight + this.parameters.betweenBufferForGridRows;
								}
							}
						}
					}

					newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2 + i % this.parameters.numberOfColumns * (newFrame.size.width + this.parameters.betweenBufferForGridColumns);
					newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + Math.floor(i / this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows) + verticalAdjustment;

					view.frame = newFrame;

					// Keep track of where the project panes are supposed to be when they are not shifted to make room for info tab. This is done so that incoming info tab can be placed relative to where the project pane will be, not where it is in its currently shifted position
					var truePosition = newFrame.copy();
					truePosition.y -= verticalAdjustment;
					this.parameters.truePositionsOfProjectPanes[i] = truePosition;
				}
			}
		}

		// Project Info Tabs

	}, {
		key: 'configureProjectInfoTabs',
		value: function configureProjectInfoTabs() {

			for (var i = 0; i < this.projectInfoTabs.length; i++) {

				var view = this.projectInfoTabs[i];
				var correspondingProjectPane = this.projectPanes[i];

				if (!this.subviewIsBelowSubviews(view, this.projectPanes)) {
					// This should only be true the first time
					this.pushSubviewToBack(view);
				}

				view.state.projectDataBundle = this.state.projectDataBundles[i];
				view.configureDuration = this.parameters.gridAnimationDuration;

				if (this.state.selectedProject == correspondingProjectPane) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}

				view.updateAllUI();
			}
		}
	}, {
		key: 'positionProjectInfoTabs',
		value: function positionProjectInfoTabs() {

			for (var i = 0; i < this.projectInfoTabs.length; i++) {

				var view = this.projectInfoTabs[i];
				var correspondingProjectPane = this.projectPanes[i];
				var correspondingTruePosition = this.parameters.truePositionsOfProjectPanes[i];

				var newFrame = new CGRect();

				newFrame.size.width = correspondingTruePosition.width;
				newFrame.size.height = correspondingTruePosition.height * this.parameters.heightOfProjectInfoTabsAsFractionOfProjectPaneHeight;

				if (i % this.parameters.numberOfColumns == this.parameters.numberOfColumns - 1) {
					newFrame.origin.x = correspondingTruePosition.x - newFrame.size.width - this.parameters.betweenBufferForGridColumns;
				} else {
					newFrame.origin.x = correspondingTruePosition.right + this.parameters.betweenBufferForGridColumns;
				}

				newFrame.origin.y = correspondingTruePosition.y;

				view.frame = newFrame;
			}
		}

		// Footer

	}, {
		key: 'configureFooter',
		value: function configureFooter() {}
	}, {
		key: 'positionFooter',
		value: function positionFooter() {

			var view = this.footer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.footer.requiredHeight;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;

			if (!this.state.comingSoon) {
				if (this.projectPanes.length > 0) {
					var lowestBottom = 0;
					for (var i = 0; i < this.parameters.numberOfColumns; i++) {
						var index = this.projectPanes.length - 1 - i;
						if (this.projectPanes.length > index) {
							if (this.projectPanes[index].bottom > lowestBottom) {
								lowestBottom = this.projectPanes[index].bottom;
							}
						}
					}
					newFrame.origin.y = lowestBottom + this.parameters.bottomBufferForGrid;
				}

				if (newFrame.origin.y + newFrame.size.height < this.height) {
					newFrame.origin.y = this.height - newFrame.size.height;
				}
			} else {
				newFrame.origin.y = this.height - newFrame.size.height;
			}

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var projectsPage = this;

			$(this.selector).bind('mousewheel', function (evt) {

				if (!projectsPage.state.scrollable) {
					evt.preventDefault();
				} else {
					projectsPage.configureProjectPanes();
				}

				clearTimeout(projectsPage.scrollFinishTimer);
				if (projectsPage.scrollTop <= 0) {
					projectsPage.scrollFinishTimer = setTimeout(function () {
						projectsPage.state.readyToClose = true;
					}, 50);
				} else {
					projectsPage.state.readyToClose = false;
				}

				if (projectsPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
					evt.preventDefault();
				}
			});
		}

		//
		// Actions
		//

		// Project Data

	}, {
		key: 'assembleProjectDataBundles',
		value: function assembleProjectDataBundles() {

			var dataBundles = [];

			// Powder Room
			var dataBundle = new ProjectDataBundle();
			dataBundle.id = 'powderRoom';
			dataBundle.title = 'POWDER ROOM';
			dataBundle.director = 'SONJA TSYPIN';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Jessica Kay Park, John Patrick Maddock</span><br/>A wildly popular online personality who hasn't left her apartment in four years has her tiny world turned upside down when a stranger forces himself into her peculiar space.";

			dataBundle.vimeoId = '167824606';
			dataBundle.vimeoHeightToWidth = 1.0 / 2.35;

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/1/';
			for (var i = 0; i < 4; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 2;

			dataBundles.push(dataBundle);

			// Birth Day
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'birthday';
			dataBundle.title = 'BIRTH DAY';
			dataBundle.director = 'EVA EVANS';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Tessa Gourin</span><br/>A young girl finds herself struggling to distinguish between reality and a haunting memory.";

			dataBundle.vimeoId = '172178428';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/3/';
			for (var i = 0; i < 2; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Angels
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'angels';
			dataBundle.title = 'ANGELS';
			dataBundle.director = 'AUDREY BANKS';
			dataBundle.movieType = 'FEATURE';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Moni Bell, Eva Evans, Gabriel Sommer, Joanna Janetakis</span><br/>A man who goes by 'Sir' is holding a mansion full of beautiful women prisoner when a new arrival threatens his power.";
			dataBundle.noVideoMessage = 'TRAILER COMING SOON';

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/2/';
			for (var i = 0; i < 5; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 3;

			dataBundles.push(dataBundle);

			// Theodore
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'theodore';
			dataBundle.title = 'THEODORE';
			dataBundle.director = 'ONDINE VI\u00d1AO';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2015';
			dataBundle.description = "<span style='color:white'>Starring Camillia Hartman, Dexter Zimet</span><br/>A romantic rural retreat takes a terrifying turn after a local offers some chilling advice.";

			dataBundle.vimeoId = '139578681';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/4/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Found Guilty
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'foundGuilty';
			dataBundle.title = 'FOUND GUILTY';
			dataBundle.director = 'SONJA TSYPIN';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2014';
			dataBundle.description = '<span style="color:white">Starring Tuva Hildebrand</span><br/>In a short film remake of the famous murder scene from Alfred Hitchcock\'s "Blackmail," a woman must come to terms with herself after commiting an unthinkable crime out of self-defense.';

			dataBundle.vimeoId = '99426346';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/5/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// As Long As I Have You
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'asLongAsIHaveYou';
			dataBundle.title = 'AS LONG AS I HAVE YOU';
			dataBundle.director = 'ONDINE VI\u00d1AO';
			dataBundle.movieType = 'MUSIC VIDEO';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Annalisa Plumb</span><br/>An experimental video to the track 'As Long As I Have You' by Elvis Presley.";

			dataBundle.vimeoId = '152982438';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/6/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			return dataBundles;
		}

		// Info Tabs

	}, {
		key: 'switchCurrentInfoTab',
		value: function switchCurrentInfoTab() {

			if (this.state.currentInfoTab == null) {
				this.state.currentInfoTab = this.projectInfoTab;
			} else {
				if (this.state.currentInfoTab == this.projectInfoTab) {
					this.state.currentInfoTab = this.projectInfoTabBackup;
				} else if (this.state.currentInfoTab == this.projectInfoTabBackup) {
					this.state.currentInfoTab = this.projectInfoTab;
				}
			}
		}
	}, {
		key: 'positionCurrentInfoTab',
		value: function positionCurrentInfoTab() {
			if (this.state.currentInfoTab == this.projectInfoTab) {
				this.positionProjectInfoTab();
			} else if (this.state.currentInfoTab == this.projectInfoTabBackup) {
				this.positionProjectInfoTabBackup();
			}
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {

			if (this.state.selectedProject != null) {
				if (view != this.state.selectedProject) {
					// If a project is currently open and now we need to open a different one
					this.state = {
						selectedProject: view,
						selectedProjectIndex: this.projectPanes.indexOf(view)
					};
					// this.switchCurrentInfoTab()
					// this.positionCurrentInfoTab()
					this.animatedUpdate();
				} else {
					// If the currently open project has just been clicked on (close it)
					this.state = {
						selectedProject: null,
						selectedProjectIndex: null
					};
					this.animatedUpdate();
				}
			} else {
				// If no project is currently open and a project has just been selected
				this.state = {
					selectedProject: view,
					selectedProjectIndex: this.projectPanes.indexOf(view)
				};
				// this.switchCurrentInfoTab()
				// this.positionCurrentInfoTab()
				this.animatedUpdate();
			}
		}

		// Project Info Tab

	}, {
		key: 'projectInfoTabPlayButtonWasClicked',
		value: function projectInfoTabPlayButtonWasClicked(projectInfoTab) {
			this.parent.projectsPageWantsToDisplayProject(this, this.state.projectDataBundles[this.state.selectedProjectIndex]);
		}
	}, {
		key: 'projectInfoTabInfoButtonWasClicked',
		value: function projectInfoTabInfoButtonWasClicked(projectInfoTab) {
			this.parent.projectsPageWantsToDisplayProject(this, this.state.projectDataBundles[this.state.selectedProjectIndex]);
		}
	}]);

	return ProjectsPage;
}(JABView);