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

		_this.projectsList = new ProjectsList('ProjectsList');
		_this.reelView = new ReelView('ReelView');
		_this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS', 'projects']]);

		// State
		_this.possibleStates = ['Reel', 'Projects'];
		_this.state = _this.possibleStates[0];
		_this.subdued = true;

		_this.reservedTopBuffer = 0;
		_this.heightOfMenuSection = 50;

		_this.comingSoon = null;

		// Initialize
		return _this;
	}

	//
	// Getters and Setters
	//

	_createClass(WorkPage, [{
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addProjectsList();
			this.addReelView();
			this.addMenu();
		}
	}, {
		key: 'addProjectsList',
		value: function addProjectsList() {
			this.addSubview(this.projectsList);
		}
	}, {
		key: 'addReelView',
		value: function addReelView() {
			this.addSubview(this.reelView);
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

			this.configureProjectsList();
			this.positionProjectsList();

			this.configureReelView();
			this.positionReelView();

			this.configureMenu();
			this.positionMenu();
		}

		// Projects List

	}, {
		key: 'configureProjectsList',
		value: function configureProjectsList() {

			this.projectsList.backgroundColor = 'black';

			if (this.state == this.possibleStates[1]) {
				if (!this.subviewIsAboveSubviews(this.projectsList, [this.reelView])) {
					this.insertSubviewAboveSubviews(this.projectsList, [this.reelView]);
				}

				setComingSoon(this.projectsList.comingSoon);
			}

			if (this.state == this.possibleStates[1] && !this.subdued) {
				this.projectsList.opacity = 1;
			} else {
				this.projectsList.opacity = 0;
			}
		}
	}, {
		key: 'positionProjectsList',
		value: function positionProjectsList() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height - (this.reservedTopBuffer + this.heightOfMenuSection);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection;

			if (this.subdued) {
				newFrame.origin.y += 100;
			}

			this.projectsList.frame = newFrame;
		}

		// Reel Page

	}, {
		key: 'configureReelView',
		value: function configureReelView() {

			this.reelView.backgroundColor = 'black';

			if (this.state == this.possibleStates[0]) {
				if (!this.subviewIsAboveSubviews(this.reelView, [this.projectsList])) {
					this.insertSubviewAboveSubviews(this.reelView, [this.projectsList]);
				}

				setComingSoon(this.reelView.comingSoon);
			}

			if (this.state == this.possibleStates[0] && !this.subdued) {
				this.reelView.opacity = 1;
			} else {
				this.reelView.opacity = 0;
			}
		}
	}, {
		key: 'positionReelView',
		value: function positionReelView() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height - (this.reservedTopBuffer + this.heightOfMenuSection);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection;

			if (this.subdued) {
				newFrame.origin.y += 100;
			}

			this.reelView.frame = newFrame;
		}

		// Menu

	}, {
		key: 'configureMenu',
		value: function configureMenu() {

			this.menu.showUnderline = true;

			for (var i = 0; i < this.possibleStates.length; i++) {
				if (this.possibleStates[i] == this.state) {
					this.menu.selectedIndex = i;
				}
			}

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
		value: function menuButtonWasPressed(buttonIdentifier) {

			if (buttonIdentifier == 'reel') {
				this.state = this.possibleStates[0];
			} else {
				this.state = this.possibleStates[1];
			}

			this.animatedUpdate();
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
	}]);

	return WorkPage;
}(JABView);