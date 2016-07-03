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
		_this.contentWidth = { 'xs': 700, 's': 780, 'm': 1000, 'l': 1000 };

		_this.websiteClosed = true;
		_this.websiteClosedLocked = false;

		// Parameters
		_this.heightOfHeader = 100;

		if (_this.laboratoryEnabled) {
			_this.laboratory = new Laboratory('Laboratory');
		} else {

			// UI
			_this.mainSector = new MainSector('MainSector');
			_this.homeSector = new HomeSector('HomeSector');
			_this.header = new Header('Header');
		}

		// Initialize
		return _this;
	}

	//
	// Getters and Setters
	//

	_createClass(ApplicationRoot, [{
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
			this.mainSector.heightOfHeader = this.heightOfHeader;
			this.mainSector.websiteClosed = this.websiteClosed;

			this.mainSector.updateAllUI();
		}
	}, {
		key: 'positionMainSector',
		value: function positionMainSector() {
			this.mainSector.frame = new CGRect(0, 0, this.width, this.height);
		}

		// Home Sector

	}, {
		key: 'configureHomeSector',
		value: function configureHomeSector() {
			this.homeSector.backgroundColor = 'black';

			if (this.websiteClosed) {
				this.homeSector.currenlyActive = true;
			} else {
				this.homeSector.currenlyActive = false;
			}
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
			this.header.selectedMenuIndex = this.mainSector.stateIndex;
			this.header.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.heightOfHeader);
		}
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
						applicationRoot.header.backgroundColor = 'black';
						applicationRoot.homePageHidden = true;
						applicationRoot.mainSector.scrollable = true;
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

					this.header.backgroundColor = 'rgba(0, 0, 0, 0)';
					this.homePageHidden = false;
					this.configureHomeSector();
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					}, function () {
						applicationRoot.mainSector.scrollable = false;
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
					this.openWebsite(800);
				}
			} else {
				if (amount > 0) {
					if (this.mainSector.readyToClose) {
						this.closeWebsite(800);
					}
				}
			}
		}

		//
		// Delegate
		//

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

			this.mainSector.stateIndex = pageIndex;

			if (this.websiteClosed) {
				this.openWebsite();
			} else {
				this.animatedUpdate();
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