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

		_this.projectDataBundles = _this.assembleProjectDataBundles();
		_this.currentlyActive = false;
		_this.comingSoon = true;

		_this.scrollable = false;
		_this.scrollFinishTimer;
		_this.readyToClose = true;

		// Parameters
		_this.reservedTopBuffer = 0;
		_this.topBufferForTopProjectStillViews = 35;
		_this.betweenBufferForProjectStillViewRows = 25;
		_this.betweenBufferForProjectStillViewColumns = 15;
		_this.bottomBufferForBottomRow = 50;

		// UI
		_this.projectStillViews = [];
		for (var i = 0; i < _this.projectDataBundles.length; i++) {
			_this.projectStillViews.push(new ProjectStillView(null, _this.projectDataBundles[i]));
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

			this.addProjectStillViews();
			this.addFooter();
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

			this.configureProjectStillViews();
			this.positionProjectStillViews();

			this.configureFooter();
			this.positionFooter();
		}

		// Project Rows

	}, {
		key: 'configureProjectStillViews',
		value: function configureProjectStillViews() {

			for (var i = 0; i < this.projectStillViews.length; i++) {
				var view = this.projectStillViews[i];

				if (this.comingSoon) {
					view.opacity = 0;
				}

				view.currentlyActive = this.currentlyActive;
			}
		}
	}, {
		key: 'positionProjectStillViews',
		value: function positionProjectStillViews() {

			if (!this.comingSoon) {
				for (var i = 0; i < this.projectStillViews.length; i++) {
					var view = this.projectStillViews[i];
					var newFrame = new CGRect();

					newFrame.size.width = applicationRoot.contentWidth / 2 - this.betweenBufferForProjectStillViewColumns;
					newFrame.size.height = newFrame.size.width * (9.0 / 16.0);

					newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2 + i % 2 * (applicationRoot.contentWidth / 2 + this.betweenBufferForProjectStillViewColumns);
					if (i % 2 == 0) {
						newFrame.origin.y = this.reservedTopBuffer + this.topBufferForTopProjectStillViews + i / 2 * (newFrame.size.height + this.betweenBufferForProjectStillViewRows);
					} else {
						newFrame.origin.y = this.reservedTopBuffer + this.topBufferForTopProjectStillViews + (i - 1) / 2 * (newFrame.size.height + this.betweenBufferForProjectStillViewRows) + 100;
					}

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

			if (!this.comingSoon) {
				if (this.projectStillViews.length > 0) {
					newFrame.origin.y = this.projectStillViews[this.projectStillViews.length - 1].bottom + this.bottomBufferForBottomRow;
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

				if (!projectsPage.scrollable) {
					evt.preventDefault();
				} else {
					projectsPage.configureProjectStillViews();
				}

				clearTimeout(projectsPage.scrollFinishTimer);
				if (projectsPage.scrollTop <= 0) {
					projectsPage.scrollFinishTimer = setTimeout(function () {
						projectsPage.readyToClose = true;
					}, 50);
				} else {
					projectsPage.readyToClose = false;
				}

				if (projectsPage.readyToClose && evt.originalEvent.wheelDelta > 0) {
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

			var powderRoom = new ProjectDataBundle();
			powderRoom.id = 'powderRoom';
			powderRoom.title = 'POWDER ROOM';
			powderRoom.subtitle = 'dir. SONJA TSYPIN';
			powderRoom.year = '2016';

			powderRoom.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg'];
			powderRoom.mainStillIndex = 2;

			dataBundles.push(powderRoom);

			var powderRoom2 = new ProjectDataBundle();
			powderRoom2.id = 'powderRoom';
			powderRoom2.title = 'POWDER ROOM';
			powderRoom2.subtitle = 'dir. SONJA TSYPIN';
			powderRoom2.year = '2016';

			powderRoom2.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg'];
			powderRoom2.mainStillIndex = 0;

			dataBundles.push(powderRoom2);

			var powderRoom3 = new ProjectDataBundle();
			powderRoom3.id = 'powderRoom';
			powderRoom3.title = 'POWDER ROOM';
			powderRoom3.subtitle = 'dir. SONJA TSYPIN';
			powderRoom3.year = '2016';

			powderRoom3.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg'];
			powderRoom3.mainStillIndex = 0;

			dataBundles.push(powderRoom3);

			var powderRoom4 = new ProjectDataBundle();
			powderRoom4.id = 'powderRoom';
			powderRoom4.title = 'POWDER ROOM';
			powderRoom4.subtitle = 'dir. SONJA TSYPIN';
			powderRoom4.year = '2016';

			powderRoom4.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg'];
			powderRoom4.mainStillIndex = 0;

			dataBundles.push(powderRoom4);

			var powderRoom5 = new ProjectDataBundle();
			powderRoom5.id = 'powderRoom';
			powderRoom5.title = 'POWDER ROOM';
			powderRoom5.subtitle = 'dir. SONJA TSYPIN';
			powderRoom5.year = '2016';

			powderRoom5.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg'];
			powderRoom5.mainStillIndex = 0;

			// dataBundles.push(powderRoom5)

			return dataBundles;
		}
	}]);

	return ProjectsPage;
}(JABView);