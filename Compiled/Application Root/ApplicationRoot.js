'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationRoot = function (_JABApplicationRoot) {
	_inherits(ApplicationRoot, _JABApplicationRoot);

	function ApplicationRoot(customId) {
		_classCallCheck(this, ApplicationRoot);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationRoot).call(this, customId));

		_this.laboratoryEnabled = false;
		_this.contentWidth = { 'xs': 500, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450 };
		_this.state = {
			headerBackdropHidden: false
		};

		_this.websiteClosed = true;
		_this.websiteClosedLocked = false;

		// Parameters
		_this.parameters = {
			heightOfHeader: 110
		};

		if (_this.laboratoryEnabled) {
			_this.laboratory = new Laboratory('Laboratory');
		} else {

			// UI
			_this.mainSector = new MainSector('MainSector');
			_this.headerBackdrop = new JABView('HeaderBackdrop');
			_this.homeSector = new HomeSector('HomeSector');
			_this.header = new Header('Header');
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(ApplicationRoot, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'init', this).call(this);
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

			if (this.laboratoryEnabled) {
				this.addLaboratory();
			} else {

				this.addMainSector();
				this.addHeaderBackdrop();
				this.addHomeSector();
				this.addHeader();
			}
		}
	}, {
		key: 'addMainSector',
		value: function addMainSector() {
			this.addSubview(this.mainSector);
		}
	}, {
		key: 'addHeaderBackdrop',
		value: function addHeaderBackdrop() {
			this.addSubview(this.headerBackdrop);
		}
	}, {
		key: 'addHomeSector',
		value: function addHomeSector() {
			this.addSubview(this.homeSector);
		}
	}, {
		key: 'addHeader',
		value: function addHeader() {
			this.addSubview(this.header);
		}
	}, {
		key: 'addLaboratory',
		value: function addLaboratory() {
			this.addSubview(this.laboratory);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'updateAllUI', this).call(this);

			if (this.laboratoryEnabled) {
				this.configureLaboratory();
				this.positionLaboratory();
			} else {

				this.configureMainSector();
				this.positionMainSector();

				this.configureHeaderBackdrop();
				this.positionHeaderBackdrop();

				this.configureHomeSector();
				this.positionHomeSector();

				this.configureHeader();
				this.positionHeader();
			}
		}

		// Main Sector

	}, {
		key: 'configureMainSector',
		value: function configureMainSector() {
			this.mainSector.backgroundColor = 'black';
			this.mainSector.parameters.heightOfHeader = this.header.logo.bottom;
			this.mainSector.state.currentlyActive = !this.websiteClosed;

			this.mainSector.updateAllUI();
		}
	}, {
		key: 'positionMainSector',
		value: function positionMainSector() {
			this.mainSector.frame = new CGRect(0, 0, this.width, this.height);
		}

		// Header Backdrop

	}, {
		key: 'configureHeaderBackdrop',
		value: function configureHeaderBackdrop() {

			var view = this.headerBackdrop;
			view.backgroundColor = 'black';

			if (this.state.headerBackdropHidden) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionHeaderBackdrop',
		value: function positionHeaderBackdrop() {

			var view = this.headerBackdrop;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.parameters.heightOfHeader;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Home Sector

	}, {
		key: 'configureHomeSector',
		value: function configureHomeSector() {
			this.homeSector.backgroundColor = 'black';

			this.homeSector.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';
			this.homeSector.currentlyActive = this.websiteClosed;
			this.homeSector.updateAllUI();
		}
	}, {
		key: 'positionHomeSector',
		value: function positionHomeSector() {
			var newFrame = this.bounds;

			if (!this.websiteClosed) {
				newFrame.origin.y = -this.height;
			}

			this.homeSector.frame = newFrame;
		}

		// Header

	}, {
		key: 'configureHeader',
		value: function configureHeader() {

			this.header.websiteClosed = this.websiteClosed;
			this.header.selectedMenuIndex = this.mainSector.state.pageIndex;
			this.header.configureDuration = 0;
			this.header.clickable = true;

			this.header.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader);

			this.configureMainSector(); // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
		}

		// Laboratory

	}, {
		key: 'configureLaboratory',
		value: function configureLaboratory() {

			this.laboratory.backgroundColor = 'white';
		}
	}, {
		key: 'positionLaboratory',
		value: function positionLaboratory() {
			if (this.laboratoryEnabled) {
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = this.height;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			} else {
				var newFrame = new CGRect();

				newFrame.size.width = 0;
				newFrame.size.height = 0;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			}
		}

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'openWebsite',
		value: function openWebsite(duration) {
			if (this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = false;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}

					var applicationRoot = this;
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					}, function () {
						applicationRoot.homePageHidden = true;
						applicationRoot.mainSector.state.scrollable = true;
						applicationRoot.updateAllUI();
					});
				}
			}
		}
	}, {
		key: 'closeWebsite',
		value: function closeWebsite(duration) {
			if (!this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = true;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}

					this.homePageHidden = false;
					this.configureHomeSector();
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					}, function () {
						applicationRoot.mainSector.state.scrollable = false;
						applicationRoot.updateAllUI();
					});
				}
			}
		}
	}, {
		key: 'setWebsiteClosedLockedForTimeout',
		value: function setWebsiteClosedLockedForTimeout(timeoutDuration) {
			this.websiteClosedLocked = true;
			var applicationRoot = this;
			setTimeout(function () {
				applicationRoot.websiteClosedLocked = false;
			}, timeoutDuration);
		}

		// Scrolling

	}, {
		key: 'userDidScrollByAmount',
		value: function userDidScrollByAmount(amount) {

			if (this.websiteClosed) {
				if (amount < 0) {
					this.openWebsite();
				}
			} else {
				if (amount > 0) {
					if (this.mainSector.readyToClose) {
						this.closeWebsite();
					}
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

			if (view == this.header) {
				this.mainSector.closeCurrentlyOpenProject();
			}
		}

		// Main Sector

	}, {
		key: 'mainSectorWantsToDisplayProject',
		value: function mainSectorWantsToDisplayProject(mainSector) {

			this.state = {
				headerBackdropHidden: true
			};

			this.animatedUpdate();
		}
	}, {
		key: 'mainSectorWantsToCloseProject',
		value: function mainSectorWantsToCloseProject(mainSector) {
			this.state = { headerBackdropHidden: false };

			this.animatedUpdate();
		}

		// Home Sector

	}, {
		key: 'homeSectorEnterButtonWasClicked',
		value: function homeSectorEnterButtonWasClicked() {
			this.openWebsite();
		}

		// Header

	}, {
		key: 'headerLogoWasClicked',
		value: function headerLogoWasClicked() {
			this.closeWebsite();
		}
	}, {
		key: 'headerDidSelectPage',
		value: function headerDidSelectPage(pageIndex) {

			this.mainSector.state = {
				pageIndex: pageIndex,
				projectOpen: false
			};

			if (this.websiteClosed) {
				this.openWebsite();
			} else {
				this.updateAllUI(); // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
			}
		}
	}, {
		key: 'contentWidth',
		get: function get() {
			return this._contentWidth[sizeClass];
		},
		set: function set(newContentWidth) {
			this._contentWidth = newContentWidth;
		}
	}]);

	return ApplicationRoot;
}(JABApplicationRoot);