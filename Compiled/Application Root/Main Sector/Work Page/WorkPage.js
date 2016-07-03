'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkPage = function (_JABView) {
	_inherits(WorkPage, _JABView);

	function WorkPage(customId) {
		_classCallCheck(this, WorkPage);

		// UI

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WorkPage).call(this, customId));

		_this.contentDomain = new ContentDomain('ContentDomain');
		_this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS', 'projects']]);

		// State
		_this.stateIndex = 0;
		_this.currentlyActive = null;
		_this.subdued = true;

		_this.reservedTopBuffer = 0;
		_this.heightOfMenuSection = 50;
		_this.scrollable = false;

		_this.comingSoon = null;

		// Initialize
		return _this;
	}

	//
	// Getters and Setters
	//

	_createClass(WorkPage, [{
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			if (this.stateIndex == 0) {
				return this.reservedTopBuffer + this.heightOfMenuSection + this.contentDomain.requiredHeightForWidth(width);
			}
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addContentDomain();
			this.addMenu();
		}
	}, {
		key: 'addContentDomain',
		value: function addContentDomain() {
			this.addSubview(this.contentDomain);
		}
	}, {
		key: 'addMenu',
		value: function addMenu() {
			this.addSubview(this.menu);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(WorkPage.prototype), 'updateAllUI', this).call(this);

			this.configureContentDomain();
			this.positionContentDomain();

			this.configureMenu();
			this.positionMenu();
		}

		// Content Domain

	}, {
		key: 'configureContentDomain',
		value: function configureContentDomain() {

			this.contentDomain.stateIndex = this.stateIndex;
			this.contentDomain.currentlyActive = this.currentlyActive;
			this.contentDomain.subdued = this.subdued;
			this.contentDomain.scrollable = this.scrollable;
			this.contentDomain.overflow = 'auto';

			this.contentDomain.reservedTopBuffer = this.reservedTopBuffer;
			this.contentDomain.heightOfMenuSection = this.heightOfMenuSection;

			this.contentDomain.updateAllUI();
		}
	}, {
		key: 'positionContentDomain',
		value: function positionContentDomain() {

			var view = this.contentDomain;
			var newFrame = this.bounds;

			view.frame = newFrame;
		}

		// Menu

	}, {
		key: 'configureMenu',
		value: function configureMenu() {

			this.menu.selectedIndex = this.stateIndex;
			this.menu.showUnderline = true;
			this.menu.fadeUnselectedButtons = true;

			this.menu.textColor = 'white';
			this.menu.fontSize = 10;
			this.menu.letterSpacing = 1.5;
			this.menu.configureDuration = 550;
			this.menu.configureDelay = 100;

			if (this.subdued) {
				this.menu.opacity = 0;
			} else {
				this.menu.opacity = 1;
				this.menu.configureEasingFunction = 'cubic-bezier(0.45, 0.03, 0.88, 0.79)';
			}

			this.menu.updateAllUI();
		}
	}, {
		key: 'positionMenu',
		value: function positionMenu() {

			var widthOfMenu = this.width / 2;
			var heightOfMenu = this.height;

			var topBufferForMenu = 120;
			var rightBufferForMenu = (this.width - applicationRoot.contentWidth) / 2;

			var newFrame = new CGRect();

			newFrame.size.width = this.menu.requiredWidth;
			newFrame.size.height = this.menu.requiredHeight;

			newFrame.origin.x = this.width - newFrame.size.width - rightBufferForMenu;
			newFrame.origin.y = topBufferForMenu;

			this.menu.frame = newFrame;
		}

		//
		// Actions
		//

		//
		// Delegate
		//

	}, {
		key: 'menuButtonWasPressed',
		value: function menuButtonWasPressed(buttonIndex) {

			this.stateIndex = buttonIndex;
			this.updateAllUI();
		}
	}, {
		key: 'state',
		get: function get() {
			return this._state;
		},
		set: function set(newState) {
			this._state = newState;

			if (this.state == this.possibleStates[0]) {
				this.reelView.configureDuration = null;
				this.projectsList.configureDuration = 0;
			} else if (this.state == this.possibleStates[1]) {
				this.reelView.configureDuration = 0;
				this.projectsList.configureDuration = null;
			}
		}
	}, {
		key: 'currentlyActive',
		get: function get() {
			return this._currentlyActive;
		},
		set: function set(newCurrentlyActive) {
			var changed = this.currentlyActive != newCurrentlyActive;

			if (changed) {
				this._currentlyActive = newCurrentlyActive;
			}
		}
	}]);

	return WorkPage;
}(JABView);