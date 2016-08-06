'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectPage = function (_JABView) {
	_inherits(ProjectPage, _JABView);

	function ProjectPage(customId, projectGroups) {
		_classCallCheck(this, ProjectPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectPage).call(this, customId));

		_this.state = {
			projectGroupIndex: 0,
			projectIndex: 0,

			switchingProject: false, // This indicates whether or not the switching-project-animation is in progress
			advancingToNextProject: false, // This indicates which direction the switching-project-animation is going which is necessary to tune the animation parameters
			handlingClick: false
		};

		_this.projectGroups = projectGroups;
		_this.instantUpdate = false;

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			vimeoViewMinimumDistanceFromHeader: 40,
			vimeoViewVerticalAdjustment: -4,

			projectVideoUIGroupMinimumDistanceFromHeader: 40,
			projectVideoUIGroupVerticalAdjustment: -4,

			leftBufferForTitleLabel: 5,
			topBufferForTitleLabel: 10,

			heightOfNavigationButtons: 50,
			positioningHeightOfNavigationButtons: 20,
			widthAdditionForNavigationButtons: 20,
			topBufferForNavigationButtons: 10,
			rightBufferForNavigationButtons: 0,

			standardVimeoViewFrame: null,
			wideVimeoViewFrame: null
		};

		// UI

		_this.vimeoViews = [];
		var counter = 0;
		for (var i = 0; i < _this.projectGroups.length; i++) {
			_this.vimeoViews.push([]);
			for (var j = 0; j < _this.projectGroups[i].length; j++) {
				_this.vimeoViews[i].push(new JABVimeoView('VimeoView' + counter));
				counter++;
			}
		}

		_this.titleLabels = [];
		counter = 0;
		for (var i = 0; i < _this.projectGroups.length; i++) {
			_this.titleLabels.push([]);
			for (var j = 0; j < _this.projectGroups[i].length; j++) {
				_this.titleLabels[i].push(new UILabel('TitleLabel' + counter));
				counter++;
			}
		}

		_this.navigationButtons = new VideoNavigationButtons('NavigationButtons');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'init', this).call(this);
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

			this.addNavigationButtons(); // Navigation buttons are taller than the buffer but should not block the clickability of the vimeo view, and so must be underneath it

			this.addVimeoViews();
			this.addTitleLabels();
		}
	}, {
		key: 'addVimeoViews',
		value: function addVimeoViews() {
			for (var i = 0; i < this.vimeoViews.length; i++) {
				for (var j = 0; j < this.vimeoViews[i].length; j++) {
					this.addSubview(this.vimeoViews[i][j]);
				}
			}
		}
	}, {
		key: 'addTitleLabels',
		value: function addTitleLabels() {
			for (var i = 0; i < this.titleLabels.length; i++) {
				for (var j = 0; j < this.titleLabels[i].length; j++) {
					this.addSubview(this.titleLabels[i][j]);
				}
			}
		}
	}, {
		key: 'addNavigationButtons',
		value: function addNavigationButtons() {
			this.addSubview(this.navigationButtons);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'updateAllUI', this).call(this);

			this.configureVimeoViews();
			this.positionVimeoViews();

			this.configureTitleLabels();
			this.positionTitleLabels();

			this.configureNavigationButtons();
			this.positionNavigationButtons();
		}

		// Vimeo Views

	}, {
		key: 'configureVimeoViews',
		value: function configureVimeoViews() {

			for (var i = 0; i < this.vimeoViews.length; i++) {
				for (var j = 0; j < this.vimeoViews[i].length; j++) {

					var view = this.vimeoViews[i][j];
					var projectDataBundle = this.projectGroups[i][j];

					view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';
					if (this.instantUpdate) {
						view.positionDuration = 0;
					} else {
						view.positionDuration = 800;
					}

					view.vimeoId = projectDataBundle.vimeoId;

					if (view.loadingGif == null) {
						view.loadingGif = new LoadingGif();
					}

					if (projectDataBundle.noVideoMessage != null) {
						view.opacity = 0;
					} else {
						view.opacity = 1;
					}

					view.updateAllUI();

				}
			}
		}
	}, {
		key: 'positionVimeoViews',
		value: function positionVimeoViews() {
			for (var i = 0; i < this.vimeoViews.length; i++) {
				for (var j = 0; j < this.vimeoViews[i].length; j++) {

					var view = this.vimeoViews[i][j];
					var projectDataBundle = this.projectGroups[i][j];

					var aspectRatio = 9.0 / 16.0;
					if (projectDataBundle != null) {
						if (typeof projectDataBundle.vimeoHeightToWidth == 'number') {
							aspectRatio = projectDataBundle.vimeoHeightToWidth;
						}
					}

					var newFrame = new CGRect();

					newFrame.size.width = applicationRoot.contentWidth * 0.9;
					if (sizeClass == 'xxs' || sizeClass == 'xs') {
						newFrame.size.width = applicationRoot.contentWidth;
					}

					newFrame.size.height = newFrame.size.width * aspectRatio;

					newFrame.origin.x = (this.width - newFrame.size.width) / 2;

					if (this.state.projectGroupIndex == i) {
						if (j < this.state.projectIndex) {
							newFrame.origin.x -= this.width;
						} else if (j > this.state.projectIndex) {
							newFrame.origin.x += this.width;
						}
					} else {
						newFrame.origin.x += this.width;
					}

					newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height) / 2 + this.parameters.vimeoViewVerticalAdjustment;

					if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader) {
						newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader;
					}

					view.frame = newFrame;

					if (aspectRatio == 9.0 / 16.0) {
						var standardFrame = newFrame.copy();
						this.parameters = { standardVimeoViewFrame: standardFrame };
					} else if (aspectRatio == 1.0 / 2.35) {
						var wideFrame = newFrame.copy();
						this.parameters = { wideVimeoViewFrame: wideFrame };
					}
				}
			}
		}

		// Title Labels

	}, {
		key: 'configureTitleLabels',
		value: function configureTitleLabels() {
			for (var i = 0; i < this.titleLabels.length; i++) {
				for (var j = 0; j < this.titleLabels[i].length; j++) {

					var view = this.titleLabels[i][j];
					var dataBundle = this.projectGroups[i][j];
					var fontSizes = { 'xxs': 18, 'xs': 18, 's': 18, 'm': 18, 'l': 18, 'xl': 18 };

					if (dataBundle != null) {
						view.text = dataBundle.title;
						view.fontFamily = 'siteFont';
						view.fontSize = fontSizes[sizeClass];
						view.textColor = 'white';
						view.letterSpacing = 2;
					}

					view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';
					if (this.instantUpdate) {
						view.configureDuration = 0;
						view.positionDuration = 0;
					} else {
						view.configureDuration = 225;
						view.configureEasingFunction = 'ease-in';
						view.positionDuration = 800;
						if (i == this.state.projectGroupIndex) {
							if (j == this.state.projectIndex) {
								if (this.state.advancingToNextProject) {
									view.configureDuration = 600;
									view.configureEasingFunction = 'ease-in-out';
									view.configureDelay = view.positionDuration - view.configureDuration;
								} else {
									view.configureDuration = 0;
									view.configureEasingFunction = 'ease-out';
									view.configureDelay = 0;

									if (sizeClass == 'xxs' || sizeClass == 'xs') {
										view.configureDuration = 600;
										view.configureEasingFunction = 'ease-in-out';
										view.configureDelay = view.positionDuration - view.configureDuration;
									}
								}
							} else {
								view.configureDelay = 0;
							}
						} else {
							view.configureDelay = 0;
						}
					}

					if (!(i == this.state.projectGroupIndex && j == this.state.projectIndex)) {
						view.opacity = 0;
					} else {
						view.opacity = 1;
					}
				}
			}
		}
	}, {
		key: 'positionTitleLabels',
		value: function positionTitleLabels() {
			for (var i = 0; i < this.titleLabels.length; i++) {
				for (var j = 0; j < this.titleLabels[i].length; j++) {

					var view = this.titleLabels[i][j];
					var newFrame = new CGRect();
					var size = view.font.sizeOfString(view.text);

					newFrame.size.width = size.width;
					newFrame.size.height = size.height;

					var offset = this.width;
					newFrame.origin.x = this.currentVimeoView.x + this.parameters.leftBufferForTitleLabel;
					newFrame.origin.y = this.parameters.standardVimeoViewFrame.bottom + this.parameters.topBufferForTitleLabel;

					if (sizeClass == 'xxs' || sizeClass == 'xs') {
						newFrame.origin.y = this.parameters.standardVimeoViewFrame.top - newFrame.size.height - this.parameters.topBufferForTitleLabel;
						newFrame.origin.x = (this.width - newFrame.size.width) / 2;
					}

					if (i == this.state.projectGroupIndex) {
						if (j < this.state.projectIndex) {
							newFrame.origin.x -= offset;
						} else if (j > this.state.projectIndex) {
							newFrame.origin.x += offset;
						}
					} else {
						newFrame.origin.x += offset;
					}

					view.frame = newFrame;
				}
			}
		}

		// Navigation Buttons

	}, {
		key: 'configureNavigationButtons',
		value: function configureNavigationButtons() {
			var view = this.navigationButtons;

			view.state = {
				prevEnabled: this.state.projectIndex != 0,
				nextEnabled: this.state.projectIndex != this.vimeoViews[this.state.projectGroupIndex].length - 1
			};

			view.positionDuration = 0;
			view.parameters.widthAddition = this.parameters.widthAdditionForNavigationButtons;

			view.updateAllUI();
		}
	}, {
		key: 'positionNavigationButtons',
		value: function positionNavigationButtons() {
			var view = this.navigationButtons;
			var newFrame = new CGRect();

			newFrame.size.width = view.requiredWidth + this.parameters.widthAdditionForNavigationButtons;
			newFrame.size.height = this.parameters.heightOfNavigationButtons;

			newFrame.origin.x = this.currentVimeoView.right - newFrame.size.width - this.parameters.rightBufferForNavigationButtons + this.parameters.widthAdditionForNavigationButtons / 2;
			newFrame.origin.y = this.currentTitleLabel.top + (this.currentTitleLabel.height - this.parameters.positioningHeightOfNavigationButtons) / 4 - (this.parameters.heightOfNavigationButtons - this.parameters.positioningHeightOfNavigationButtons) / 2;

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newFrame.origin.y = this.parameters.wideVimeoViewFrame.bottom + (this.height - this.parameters.standardVimeoViewFrame.bottom - newFrame.size.height) / 2;
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			}

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'goToPreviousProject',
		value: function goToPreviousProject() {
			if (this.state.projectIndex != 0) {
				this.state.projectIndex -= 1;
				if (this.state.projectIndex == 2) {
					this.state.projectIndex = 1;
				}
				this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex);

				var projectPage = this;
				projectPage.state = { advancingToNextProject: false };
				this.animatedUpdate();
			}
		}
	}, {
		key: 'goToNextProject',
		value: function goToNextProject() {
			if (this.state.projectIndex != this.projectGroups[this.state.projectGroupIndex].length - 1) {
				this.state.projectIndex += 1;
				if (this.state.projectIndex == 2) {
					this.state.projectIndex = 3;
				}
				this.parent.projectPageDidChangeProjectIndexTo(this, this.state.projectIndex);

				var projectPage = this;
				projectPage.state = { advancingToNextProject: true };
				this.animatedUpdate();
			}
		}

		// Load

	}, {
		key: 'loadProjectIdentifier',
		value: function loadProjectIdentifier(projectIdentifier) {
			for (var i = 0; i < this.projectGroups.length; i++) {
				for (var j = 0; j < this.projectGroups[i].length; j++) {
					if (this.projectGroups[i][j].id == projectIdentifier) {
						this.state = {
							projectGroupIndex: i,
							projectIndex: j
						};
						this.instantUpdate = true;
						this.updateAllUI();
						this.instantUpdate = false;
					}
				}
			}
		}

		// Playback

	}, {
		key: 'pause',
		value: function pause() {
			this.vimeoViews[this.state.projectGroupIndex][this.state.projectIndex].pause();
		}

		// Keys

	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			this.goToPreviousProject();
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			this.goToNextProject();
		}

		//
		// Delegate
		//

		// JABVimeoView

	}, {
		key: 'vimeoViewDidFinishLoading',
		value: function vimeoViewDidFinishLoading(vimeoView) {}

		// Video Navigation Buttons

	}, {
		key: 'videoNavigationButtonsPrevButtonWasClicked',
		value: function videoNavigationButtonsPrevButtonWasClicked(videoNavigationButtons) {
			this.state.handlingClick = true;
			this.goToPreviousProject();
		}
	}, {
		key: 'videoNavigationButtonsNextButtonWasClicked',
		value: function videoNavigationButtonsNextButtonWasClicked(videoNavigationButtons) {
			this.state.handlingClick = true;
			this.goToNextProject();
		}
	}, {
		key: 'projectDataBundle',
		get: function get() {
			return this.projectGroups[this.state.projectGroupIndex][this.state.projectIndex];
		}
	}, {
		key: 'currentVimeoView',
		get: function get() {
			return this.vimeoViews[this.state.projectGroupIndex][this.state.projectIndex];
		}
	}, {
		key: 'currentTitleLabel',
		get: function get() {
			return this.titleLabels[this.state.projectGroupIndex][this.state.projectIndex];
		}
	}]);

	return ProjectPage;
}(JABView);