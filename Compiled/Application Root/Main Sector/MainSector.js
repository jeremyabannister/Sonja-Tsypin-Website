'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSector = function (_JABView) {
	_inherits(MainSector, _JABView);

	function MainSector(customId) {
		_classCallCheck(this, MainSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSector).call(this, customId));

		_this.state = {
			currentlyActive: false,
			pageIndex: 0,
			projectOpen: false,
			closingProject: false,
			projectDataBundle: null,
			scrollable: false,

			comingSoon: true
		};

		// Parameters
		_this.parameters = {
			heightOfHeader: 0
		};

		// UI
		_this.aboutPage = new AboutPage('AboutPage');
		_this.projectsPage = new ProjectsPage('ProjectsPage');
		_this.reelPage = new ReelPage('ReelPage');
		_this.projectPage = new ProjectPage('ProjectPage');

		_this.comingSoonView = new UILabel('ComingSoonView');

		return _this;
	}

	//
	// Init
	//

	_createClass(MainSector, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'init', this).call(this);
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addAboutPage();
			this.addProjectsPage();
			this.addReelPage();
			this.addProjectPage();

			// this.addComingSoonView()
		}
	}, {
		key: 'addAboutPage',
		value: function addAboutPage() {
			this.addSubview(this.aboutPage);
		}
	}, {
		key: 'addProjectsPage',
		value: function addProjectsPage() {
			this.addSubview(this.projectsPage);
		}
	}, {
		key: 'addReelPage',
		value: function addReelPage() {
			this.addSubview(this.reelPage);
		}
	}, {
		key: 'addProjectPage',
		value: function addProjectPage() {
			this.addSubview(this.projectPage);
		}
	}, {
		key: 'addComingSoonView',
		value: function addComingSoonView() {
			this.addSubview(this.comingSoonView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'updateAllUI', this).call(this);

			this.configureAboutPage();
			this.positionAboutPage();

			this.configureProjectsPage();
			this.positionProjectsPage();

			this.configureReelPage();
			this.positionReelPage();

			this.configureProjectPage();
			this.positionProjectPage();

			// this.configureComingSoonView()
			// this.positionComingSoonView()
		}

		// About Page

	}, {
		key: 'configureAboutPage',
		value: function configureAboutPage() {

			var view = this.aboutPage;

			view.backgroundColor = 'black';
			view.overflow = 'auto';
			view.reservedTopBuffer = this.parameters.heightOfHeader;

			if (this.currentlyActivePage == view) {

				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}
				view.scrollable = this.state.scrollable;
				setComingSoon(view.comingSoon);

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionAboutPage',
		value: function positionAboutPage() {

			var view = this.aboutPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Projects Page

	}, {
		key: 'configureProjectsPage',
		value: function configureProjectsPage() {

			var view = this.projectsPage;

			view.backgroundColor = 'black';
			view.overflow = 'auto';
			view.parameters = { reservedTopBuffer: this.parameters.heightOfHeader };

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				view.state.scrollable = this.state.scrollable;
				if (view.state.comingSoon) {
					view.state.scrollable = false;
				}

				if (this.state.projectOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

				setComingSoon(view.state.comingSoon);

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionProjectsPage',
		value: function positionProjectsPage() {

			var view = this.projectsPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Reel Page

	}, {
		key: 'configureReelPage',
		value: function configureReelPage() {

			var view = this.reelPage;

			view.backgroundColor = 'black';
			view.overflow = 'auto';
			view.reservedTopBuffer = this.parameters.heightOfHeader;

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				if (!this.state.projectOpen) {
					view.currentlyActive = this.state.currentlyActive;
					view.scrollable = this.state.scrollable;
				} else {
					view.currentlyActive = false;
				}

				if (this.state.currentlyActive) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
				view.currentlyActive = false;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionReelPage',
		value: function positionReelPage() {

			var view = this.reelPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Project Page

	}, {
		key: 'configureProjectPage',
		value: function configureProjectPage() {

			var view = this.projectPage;

			view.clickable = true;
			view.parameters.reservedTopBuffer = this.parameters.heightOfHeader;
			view.overflow = 'auto';
			view.configureDuration = 200;
			view.backgroundColor = 'rgba(0,0,0, 0.6)';

			if (this.state.projectOpen) {
				this.bringPageToFront(view);
				view.opacity = 1;
				view.configureDelay = 0;

				view.state.projectDataBundle = this.state.projectDataBundle;
			} else {
				view.opacity = 0;
				view.configureDelay = 200;
			}

			this.projectPage.updateAllUI();
		}
	}, {
		key: 'positionProjectPage',
		value: function positionProjectPage() {

			var view = this.projectPage;
			var newFrame = this.bounds;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			view.frame = newFrame;
		}

		// Coming Soon View

	}, {
		key: 'configureComingSoonView',
		value: function configureComingSoonView() {

			this.comingSoonView.text = 'COMING SOON...';

			this.comingSoonView.textColor = 'white';
			this.comingSoonView.fontSize = 30;
			this.comingSoonView.fontFamily = 'siteFont';
			this.comingSoonView.fontWeight = 'bold';
			this.comingSoonView.letterSpacing = 1.5;

			if (this.comingSoon && this.state.currentlyActive) {
				this.comingSoonView.opacity = 1;
			} else {
				this.comingSoonView.opacity = 0;
			}
		}
	}, {
		key: 'positionComingSoonView',
		value: function positionComingSoonView() {

			var size = this.comingSoonView.font.sizeOfString(this.comingSoonView.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			if (!this.state.currentlyActive) {
				newFrame.origin.y += 100;
			}

			if (!this.state.comingSoon) {
				newFrame.origin.x = this.width;
			}

			this.comingSoonView.frame = newFrame;
		}

		//
		// Actions
		//

	}, {
		key: 'bringPageToFront',
		value: function bringPageToFront(page) {

			var otherPages = [];
			for (var i = 0; i < this.pages.length; i++) {
				if (this.pages[i] != page) {
					otherPages.push(this.pages[i]);
				}
			}

			if (!this.subviewIsAboveSubviews(page, otherPages)) {
				this.insertSubviewAboveSubviews(page, otherPages);
			}
		}
	}, {
		key: 'closeCurrentlyOpenProject',
		value: function closeCurrentlyOpenProject() {
			this.parent.mainSectorWantsToCloseProject(this);
			this.state = {
				projectOpen: false,
				closingProject: true
			};
			this.projectPage.vimeoView.pause();
			var mainSector = this;
			this.animatedUpdate(null, function () {
				mainSector.state = { closingProject: false };
				mainSector.animatedUpdate();
			});
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.projectPage) {
				this.closeCurrentlyOpenProject();
			}
		}

		// Projects Page

	}, {
		key: 'projectsPageWantsToDisplayProject',
		value: function projectsPageWantsToDisplayProject(projectsPage, project) {
			this.state = {
				projectOpen: true,
				projectDataBundle: project
			};
			this.parent.mainSectorWantsToDisplayProject(this);
		}
	}, {
		key: 'websiteClosed',
		get: function get() {
			return this._websiteClosed;
		},
		set: function set(newWebsiteClosed) {
			if (!this.websiteClosedLocked) {
				this._websiteClosed = newWebsiteClosed;
			}
		}
	}, {
		key: 'currentlyActivePage',
		get: function get() {
			return this.pages[this.state.pageIndex];
		}
	}, {
		key: 'pages',
		get: function get() {
			return [this.reelPage, this.projectsPage, this.aboutPage, this.projectPage];
		}
	}, {
		key: 'readyToClose',
		get: function get() {
			return this.currentlyActivePage.state.readyToClose && !this.state.projectOpen;
		}
	}]);

	return MainSector;
}(JABView);

function setComingSoon(newComingSoon) {

	if (newComingSoon != null) {
		var changed = applicationRoot.mainSector.comingSoon != newComingSoon;
		applicationRoot.mainSector.comingSoon = newComingSoon;

		if (changed) {
			applicationRoot.mainSector.updateAllUI();
		}
	}
}