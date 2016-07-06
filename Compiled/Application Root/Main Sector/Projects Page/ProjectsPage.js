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
			currentlyActive: false,
			comingSoon: true,

			selectedProject: null,
			selectedProjectIndex: null,
			infoTabHidden: true,

			scrollable: false,
			readyToClose: true
		};

		_this.scrollFinishTimer;

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,

			numberOfColumns: 2,
			topBufferForGrid: 35,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,

			gridAnimationDuration: 250,
			gridAnimationEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
		};

		// UI
		_this.projectInfoTab = new ProjectInfoTab('InfoTab');
		_this.projectStillViews = [];
		for (var i = 0; i < _this.state.projectDataBundles.length; i++) {
			_this.projectStillViews.push(new JABImageView());
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

			this.addProjectInfoTab();
			this.addProjectStillViews();
			this.addFooter();
		}
	}, {
		key: 'addProjectInfoTab',
		value: function addProjectInfoTab() {
			this.addSubview(this.projectInfoTab);
		}
	}, {
		key: 'addProjectStillViews',
		value: function addProjectStillViews() {
			for (var i = 0; i < this.projectStillViews.length; i++) {
				this.addSubview(this.projectStillViews[i]);
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

			this.configureProjectInfoTab();
			this.positionProjectInfoTab();

			this.configureProjectStillViews();
			this.positionProjectStillViews();

			this.configureFooter();
			this.positionFooter();
		}

		// Project Info Tab

	}, {
		key: 'configureProjectInfoTab',
		value: function configureProjectInfoTab() {

			var view = this.projectInfoTab;

			if (this.state.infoTabHidden) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionProjectInfoTab',
		value: function positionProjectInfoTab() {
			var view = this.projectInfoTab;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
			newFrame.size.height = newFrame.size.width * (9.0 / 16.0) / 2 - this.parameters.betweenBufferForGridRows;

			if (this.state.selectedProject == null) {
				newFrame.origin.y = this.height;
			} else {

				if (this.state.selectedProjectIndex % this.parameters.numberOfColumns == 0) {
					newFrame.origin.x = this.state.selectedProject.right + this.parameters.betweenBufferForGridColumns;
				} else {
					newFrame.origin.x = this.state.selectedProject.x - newFrame.size.width - this.parameters.betweenBufferForGridColumns;
				}

				newFrame.origin.y = this.state.selectedProject.y;
			}

			view.frame = newFrame;
		}

		// Project Rows

	}, {
		key: 'configureProjectStillViews',
		value: function configureProjectStillViews() {

			for (var i = 0; i < this.projectStillViews.length; i++) {
				var view = this.projectStillViews[i];

				view.src = this.state.projectDataBundles[i].stills[0];
				if (this.state.comingSoon) {
					view.opacity = 0;
				}

				view.positionEasingFunction = this.parameters.gridAnimationEasingFunction;
				view.cursor = 'pointer';
				view.clickable = true;
			}
		}
	}, {
		key: 'positionProjectStillViews',
		value: function positionProjectStillViews() {

			if (!this.state.comingSoon) {
				for (var i = 0; i < this.projectStillViews.length; i++) {
					var view = this.projectStillViews[i];
					var newFrame = new CGRect();

					newFrame.size.width = (applicationRoot.contentWidth - (this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns) / this.parameters.numberOfColumns;
					newFrame.size.height = newFrame.size.width * (9.0 / 16.0);

					var verticalAdjustment = 0;
					if (this.state.selectedProject != null) {
						if (i >= this.state.selectedProjectIndex - this.state.selectedProjectIndex % this.parameters.numberOfColumns && i != this.state.selectedProjectIndex) {
							if (i % this.parameters.numberOfColumns != this.state.selectedProjectIndex % this.parameters.numberOfColumns) {
								verticalAdjustment = newFrame.size.height / 2;
							}
						}
					}

					newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2 + i % this.parameters.numberOfColumns * (newFrame.size.width + this.parameters.betweenBufferForGridColumns);
					newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForGrid + Math.floor(i / this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows) + verticalAdjustment;

					view.frame = newFrame;
				}
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
				if (this.projectStillViews.length > 0) {
					var lowestBottom = 0;
					for (var i = 0; i < this.parameters.numberOfColumns; i++) {
						var index = this.projectStillViews.length - 1 - i;
						if (this.projectStillViews.length > index) {
							if (this.projectStillViews[index].bottom > lowestBottom) {
								lowestBottom = this.projectStillViews[index].bottom;
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
					projectsPage.configureProjectStillViews();
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

	}, {
		key: 'assembleProjectDataBundles',
		value: function assembleProjectDataBundles() {

			var dataBundles = [];

			// Powder Room
			var dataBundle = new ProjectDataBundle();
			dataBundle.id = 'powderRoom';
			dataBundle.title = 'POWDER ROOM';
			dataBundle.subtitle = 'dir. SONJA TSYPIN';
			dataBundle.year = '2016';

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/1/';
			for (var i = 0; i < 4; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Angels
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'angels';
			dataBundle.title = 'ANGELS';
			dataBundle.subtitle = 'dir. AUDREY BANKS';
			dataBundle.year = '2015';

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/2/';
			for (var i = 0; i < 5; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Birth Day
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'birthday';
			dataBundle.title = 'BIRTH DAY';
			dataBundle.subtitle = 'dir. EVA EVANS';
			dataBundle.year = '2016';

			var pathStem = './Resources/Images/Projects Page/Project Data Bundles/3/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			return dataBundles;
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {

			var projectsPage = this;

			if (this.state.selectedProject != null) {
				projectsPage.state = { infoTabHidden: true }; // The first thing, no matter what, is to hide the infoTab
				if (view != this.state.selectedProject) {
					// If a project is currently open and now we need to open a different one
					projectsPage.animatedUpdate(projectsPage.parameters.gridAnimationDuration, function () {
						projectsPage.state = {
							selectedProject: view,
							selectedProjectIndex: projectsPage.projectStillViews.indexOf(view)
						};
						projectsPage.animatedUpdate(projectsPage.parameters.gridAnimationDuration, function () {
							projectsPage.updateAllUI();

							projectsPage.state = { infoTabHidden: false };
							projectsPage.animatedUpdate();
						});
					});
				} else {
					// If the currently open project has just been clicked on (close it)
					projectsPage.animatedUpdate(projectsPage.parameters.gridAnimationDuration, function () {
						projectsPage.state = {
							selectedProject: null,
							selectedProjectIndex: null
						};
						projectsPage.animatedUpdate();
					});
				}
			} else {
				// If no project is currently open and a project has just been selected
				projectsPage.state = {
					selectedProject: view,
					selectedProjectIndex: projectsPage.projectStillViews.indexOf(view)
				};
				projectsPage.animatedUpdate(projectsPage.parameters.gridAnimationDuration, function () {
					projectsPage.state = { infoTabHidden: false };
					projectsPage.animatedUpdate();
				});
			}
		}
	}]);

	return ProjectsPage;
}(JABView);