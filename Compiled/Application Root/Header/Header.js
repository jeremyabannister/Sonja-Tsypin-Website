'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_JABView) {
	_inherits(Header, _JABView);

	function Header(customId) {
		_classCallCheck(this, Header);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, customId));

		_this.selectedMenuIndex = -1;
		_this.websiteClosed = true;

		// UI
		_this.logo = new Logo('Logo');
		_this.menu = new Menu('Menu', [['REEL', 'reel'], ['PROJECTS	', 'projects'], ['ABOUT', 'about']]);

		return _this;
	}

	//
	// Init
	//

	_createClass(Header, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(Header.prototype), 'init', this).call(this);

			this.startEventListeners();

			if (this.notReal == '1234') {
				console.log('what????');
			}
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addLogo();
			this.addMenu();
		}
	}, {
		key: 'addLogo',
		value: function addLogo() {
			this.addSubview(this.logo);
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
			_get(Object.getPrototypeOf(Header.prototype), 'updateAllUI', this).call(this);

			this.configureLogo();
			this.positionLogo();

			this.configureMenu();
			this.positionMenu();
		}

		// Logo

	}, {
		key: 'configureLogo',
		value: function configureLogo() {

			this.logo.positionDuration = 0;
			if (this.websiteClosed) {
				this.logo.faded = true;
			} else {
				this.logo.faded = false;
			}
			this.logo.cursor = 'pointer';

			this.logo.updateAllUI();
		}
	}, {
		key: 'positionLogo',
		value: function positionLogo() {

			var view = this.logo;
			var newFrame = new CGRect();

			newFrame.size.width = this.logo.requiredWidth;
			newFrame.size.height = this.logo.requiredHeight;

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = 39;

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = 14;
			}

			view.frame = newFrame;
		}

		// Menu

	}, {
		key: 'configureMenu',
		value: function configureMenu() {

			this.menu.showUnderline = !this.websiteClosed;
			this.menu.selectedIndex = this.selectedMenuIndex;

			this.menu.textColor = 'white';

			var fontSizes = { 'xxs': 12, 'xs': 12, 's': 16, 'm': 12, 'l': 12, 'xl': 12 };
			this.menu.fontSize = fontSizes[sizeClass];
			this.menu.letterSpacing = 1.5;
			this.menu.fontWeight = 'bold';
			this.menu.textAlign = 'right';

			this.menu.updateAllUI();
		}
	}, {
		key: 'positionMenu',
		value: function positionMenu() {

			var widthOfMenu = this.width / 2;
			var heightOfMenu = this.height;

			var topBufferForMenu = 42;
			var rightBufferForMenu = (this.width - applicationRoot.contentWidth) / 2;

			var newFrame = new CGRect();

			newFrame.size.width = this.menu.requiredWidth;
			newFrame.size.height = this.menu.requiredHeight;

			newFrame.origin.x = this.width - newFrame.size.width - rightBufferForMenu;
			newFrame.origin.y = 42;
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = this.logo.bottom + 10;
			}

			this.menu.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {

			var header = this;
			$(this.logo.selector).click(function () {
				header.parent.headerLogoWasClicked();
			});
		}

		//
		// Delegate
		//

	}, {
		key: 'menuButtonWasPressed',
		value: function menuButtonWasPressed(buttonIndex) {
			this.parent.headerDidSelectPage(buttonIndex);
		}
	}]);

	return Header;
}(JABView);