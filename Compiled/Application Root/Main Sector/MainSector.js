'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSector = function (_JABView) {
	_inherits(MainSector, _JABView);

	function MainSector(customId, projectDataBundles) {
		_classCallCheck(this, MainSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSector).call(this, customId));

		_this.state = {
			currentlyActive: false,
			shouldStartLoading: false,
			pageIndex: 0,
			projectOpen: false,
			closingProject: false,

			selectedProjectGroup: 0,
			selectedProjectIndex: 0,

			mailFormOpen: false,
			closingMailForm: false,
			mailFormOpacity: 0.5,

			scrollable: false
		};

		_this.projectDataBundles = projectDataBundles;
		_this.projectGroups = [[]];

		for (var i = 0; i < _this.projectDataBundles.length; i++) {
			if (!_this.projectDataBundles[i].hidden) {
				_this.projectGroups[0].push(_this.projectDataBundles[i]);
			} else {
				_this.projectGroups.push([_this.projectDataBundles[i]]);
			}
		}

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0
		};

		// UI
		_this.aboutPage = new AboutPage('AboutPage');
		_this.projectsPage = new ProjectsPage('ProjectsPage', _this.projectGroups[0]);
		_this.reelPage = new ReelPage('ReelPage');
		_this.mailFormPage = new MailFormPage('MailFormPage');
		_this.projectPage = new ProjectPage('ProjectPage', _this.projectGroups);

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
			this.addMailFormPage();
			this.addProjectPage();
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
		key: 'addMailFormPage',
		value: function addMailFormPage() {
			this.addSubview(this.mailFormPage);
		}
	}, {
		key: 'addProjectPage',
		value: function addProjectPage() {
			this.addSubview(this.projectPage);
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

			this.configureMailFormPage();
			this.positionMailFormPage();

			this.configureProjectPage();
			this.positionProjectPage();
		}

		// About Page

	}, {
		key: 'configureAboutPage',
		value: function configureAboutPage() {

			var view = this.aboutPage;

			view.backgroundColor = 'black';
			if (!this.state.currentlyActive) {
				view.overflow = 'hidden';
			} else {
				view.overflow = 'scroll';
			}

			view.reservedTopBuffer = this.parameters.reservedTopBuffer;

			if (this.currentlyActivePage == view) {

				if (!this.state.closingProject && !this.state.closingMailForm) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}
				view.scrollable = this.state.scrollable;

				if (this.state.projectOpen || this.state.mailFormOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
				}

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
			view.overflowX = 'hidden';
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			if (this.state.projectOpen || !this.state.currentlyActive) {
				view.overflowY = 'hidden';
			} else {
				view.overflowY = 'scroll';
			}

			view.parameters = {
				reservedTopBuffer: this.parameters.reservedTopBuffer,
				heightOfHeader: this.parameters.heightOfHeader
			};
			view.projectDataBundles = this.projectDataBundles;

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject && !this.state.closingMailForm) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				view.state.scrollable = this.state.scrollable;

				if (this.state.projectOpen || this.state.mailFormOpen) {
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

			$(view.selector).css({
				'scroll-behavior': 'smooth'
			});
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
			view.overflow = 'scroll';
			view.reservedTopBuffer = this.parameters.reservedTopBuffer;
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			if (this.currentlyActivePage == view) {
				if (!this.state.closingProject && !this.state.closingMailForm) {
					// closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
					this.bringPageToFront(view);
				}

				if (!this.state.projectOpen) {
					view.currentlyActive = this.state.currentlyActive;
					view.scrollable = this.state.scrollable;
				} else {
					view.currentlyActive = false;
				}

				if (this.state.projectOpen || this.state.mailFormOpen) {
					view.blur = 20;
				} else {
					view.blur = 0;
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

		// Mail Form Page

	}, {
		key: 'configureMailFormPage',
		value: function configureMailFormPage() {

			var view = this.mailFormPage;

			view.backgroundColor = 'rgba(0, 0, 0, ' + this.state.mailFormOpacity + ')';

			view.parameters = { reservedTopBuffer: this.parameters.reservedTopBuffer };
			view.clickable = true;

			if (this.state.mailFormOpen) {
				view.opacity = 1;
				view.state = { subdued: false };
				this.bringPageToFront(view);
			} else {
				view.opacity = 0;
				view.state = { subdued: true };
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionMailFormPage',
		value: function positionMailFormPage() {

			var view = this.mailFormPage;
			var newFrame = this.bounds;

			view.frame = newFrame;
		}

		// Project Page

	}, {
		key: 'configureProjectPage',
		value: function configureProjectPage() {

			var view = this.projectPage;

			view.clickable = true;
			view.parameters.reservedTopBuffer = this.parameters.reservedTopBuffer;
			view.overflowX = 'hidden';
			view.overflowY = 'scroll';
			view.state = {
				shouldStartLoading: this.state.shouldStartLoading
			};

			view.configureDuration = 200;
			view.backgroundColor = 'rgba(0,0,0, 0.6)';

			if (this.state.projectOpen) {
				this.bringPageToFront(view);
				view.opacity = 1;
				view.configureDelay = 0;

				view.instantUpdate = true;
				view.updateAllUI();
				view.instantUpdate = false;
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

		//
		// Actions
		//

		// Navigation

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
			this.parent.mainSectorWantsToRelinquishFullScreen(this);
			this.state = {
				projectOpen: false,
				closingProject: true
			};
			this.projectPage.pause();
			var mainSector = this;
			this.animatedUpdate(null, function () {
				mainSector.state = { closingProject: false };
				mainSector.animatedUpdate();
			});
		}
	}, {
		key: 'openMailFormPage',
		value: function openMailFormPage(opacity) {

			/*
   if (opacity == null) {
   	opacity = 0.6
   }
   
   this.parent.mainSectorWantsToUseFullScreen(this)
   this.state = {mailFormOpen: true, mailFormOpacity: opacity}
   this.animatedUpdate(250)
   */
		}
	}, {
		key: 'closeMailFormPage',
		value: function closeMailFormPage() {
			this.parent.mainSectorWantsToRelinquishFullScreen(this);
			this.state = {
				mailFormOpen: false,
				closingMailForm: true
			};
			var mainSector = this;
			this.animatedUpdate(250, function () {
				mainSector.state = { closingMailForm: false };
				mainSector.animatedUpdate();
			});
		}

		// Swipe

	}, {
		key: 'leftSwipeDetected',
		value: function leftSwipeDetected() {
			if (this.state.projectOpen) {
				this.projectPage.leftSwipeDetected();
			}
		}
	}, {
		key: 'rightSwipeDetected',
		value: function rightSwipeDetected() {
			if (this.state.projectOpen) {
				this.projectPage.rightSwipeDetected();
			}
		}

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {
			if (this.state.projectOpen) {
				var mainSector = this;
				this.projectPage.paused.then(function (paused) {
					if (paused) {
						mainSector.projectPage.play();
					} else {
						mainSector.projectPage.pause();
					}
				});
			} else {
				if (this.state.pageIndex == 0) {
					this.reelPage.spaceBarWasPressed();
				} else if (this.state.pageIndex == 1) {
					this.projectsPage.spaceBarWasPressed();
				}
			}
		}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			if (!this.state.projectOpen) {
				if (this.state.pageIndex == 1) {
					this.projectsPage.leftArrowWasPressed();
				}
			} else {
				this.projectPage.leftArrowWasPressed();
			}
		}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {
			if (!this.state.projectOpen) {
				if (this.state.pageIndex == 1) {
					this.projectsPage.upArrowWasPressed();
				}
			}
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			if (!this.state.projectOpen) {
				if (this.state.pageIndex == 1) {
					this.projectsPage.rightArrowWasPressed();
				}
			} else {
				this.projectPage.rightArrowWasPressed();
			}
		}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {
			if (!this.state.projectOpen) {
				if (this.state.pageIndex == 1) {
					this.projectsPage.downArrowWasPressed();
				}
			}
		}

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.projectPage) {
				if (this.projectPage.state.handlingClick) {
					this.projectPage.state = { handlingClick: false };
				} else {
					this.closeCurrentlyOpenProject();
				}
			} else if (view == this.mailFormPage) {
				if (this.mailFormPage.state.handlingClick) {
					this.mailFormPage.state = { handlingClick: false };
				} else {
					this.closeMailFormPage();
				}
			}
		}

		// About Page

	}, {
		key: 'aboutPageWantsToDisplayProject',
		value: function aboutPageWantsToDisplayProject(aboutPage, projectIdentifier, startPlaying) {
			for (var i = 0; i < this.projectGroups.length; i++) {
				for (var j = 0; j < this.projectGroups[i].length; j++) {
					if (this.projectGroups[i][j].id == projectIdentifier) {
						if (projectIdentifier != 'angels') {
							// Angels has no trailer right now so ignore it if clicked
							this.state = {
								projectOpen: true
							};

							this.projectPage.loadProjectIdentifier(projectIdentifier);
							if (startPlaying) {
								this.projectPage.play();
							}
							this.parent.mainSectorWantsToUseFullScreen(this);
						}
					}
				}
			}
		}
	}, {
		key: 'aboutPageWantsToOpenMailForm',
		value: function aboutPageWantsToOpenMailForm(aboutPage) {
			this.openMailFormPage(0);
		}

		// Projects Page

	}, {
		key: 'projectsPageWantsToDisplayProject',
		value: function projectsPageWantsToDisplayProject(projectsPage, projectIdentifier, startPlaying) {
			for (var i = 0; i < this.projectGroups.length; i++) {
				for (var j = 0; j < this.projectGroups[i].length; j++) {
					if (this.projectGroups[i][j].id == projectIdentifier) {
						this.state = {
							projectOpen: true
						};
					}
				}
			}

			this.projectPage.loadProjectIdentifier(projectIdentifier);
			if (startPlaying) {
				this.projectPage.play();
			}
			this.parent.mainSectorWantsToUseFullScreen(this);
			this.animatedUpdate();
		}
	}, {
		key: 'projectsPageWantsToOpenMailForm',
		value: function projectsPageWantsToOpenMailForm(projectsPage) {
			// this.openMailFormPage(0.8)
			this.parent.mainSectorWantsToOpenAboutPage(this);
		}

		// Reel Page

	}, {
		key: 'reelPageWantsToOpenMailForm',
		value: function reelPageWantsToOpenMailForm(reelPage) {
			// this.openMailFormPage(0.5)
			this.parent.mainSectorWantsToOpenAboutPage(this);
		}

		// Project Page

	}, {
		key: 'projectPageDidChangeProjectIndexTo',
		value: function projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
			this.state = { selectedProjectIndex: projectIndex };
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
			return [this.reelPage, this.projectsPage, this.aboutPage, this.mailFormPage, this.projectPage];
		}
	}, {
		key: 'readyToClose',
		get: function get() {
			return this.currentlyActivePage.state.readyToClose && !this.state.projectOpen && !this.state.mailFormOpen;
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