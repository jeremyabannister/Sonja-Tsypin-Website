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

		_this.state = {
			mobileMenuOpen: false
		};
		_this.selectedMenuIndex = -1;
		_this.websiteClosed = true;
		_this.menuItems = [new MenuItem('reel', 'REEL', 0), new MenuItem('projects', 'PROJECTS', 1), new MenuItem('about', 'ABOUT', 2)];

		// UI
		_this.logo = new Logo('Logo');
		_this.menu = new Menu('Menu', _this.menuItems);
		_this.mobileMenu = new MobileMenu('MobileMenu', _this.menuItems);
		_this.mobileMenuButton = new MobileMenuButton('MobileMenuButton');

		// Parameters
		_this.parameters = {
			sideBufferForMobileContent: 20,
			widthOfMobileMenuButtonLines: 30,

			mobileMenuAnimationSpeed: 300,

			topBufferForMobileMenu: 0,
			widthFractionOfMobileMenu: 1,

			sizeOfMobileMenuButton: 50,
			topBufferForMobileMenuButton: 10
		};

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
			this.addMobileMenu();
			this.addMobileMenuButton();
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
	}, {
		key: 'addMobileMenu',
		value: function addMobileMenu() {
			this.addSubview(this.mobileMenu);
		}
	}, {
		key: 'addMobileMenuButton',
		value: function addMobileMenuButton() {
			this.addSubview(this.mobileMenuButton);
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

			this.configureMobileMenu();
			this.positionMobileMenu();

			this.configureMobileMenuButton();
			this.positionMobileMenuButton();
		}

		// Logo

	}, {
		key: 'configureLogo',
		value: function configureLogo() {

			var view = this.logo;

			view.positionDuration = 0;
			if (this.websiteClosed) {
				view.faded = true;
			} else {
				view.faded = false;
			}
			view.cursor = 'pointer';

			view.updateAllUI();
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
				newFrame.origin.x = this.parameters.sideBufferForMobileContent;
				newFrame.origin.y = 14;
			}

			view.frame = newFrame;
		}

		// Menu

	}, {
		key: 'configureMenu',
		value: function configureMenu() {

			var view = this.menu;

			view.showUnderline = !this.websiteClosed;
			view.selectedIndex = this.selectedMenuIndex;

			view.textColor = 'white';

			var fontSizes = { 'xxs': 12, 'xs': 12, 's': 16, 'm': 12, 'l': 12, 'xl': 12 };
			view.fontSize = fontSizes[sizeClass];
			view.letterSpacing = 1.5;
			view.fontWeight = 'bold';
			view.textAlign = 'right';

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
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

		// Mobile Menu

	}, {
		key: 'configureMobileMenu',
		value: function configureMobileMenu() {
			var view = this.mobileMenu;

			view.backgroundColor = 'black';
			view.positionDuration = this.parameters.mobileMenuAnimationSpeed;

			view.state = {
				open: this.state.mobileMenuOpen
			};

			view.overflow = 'hidden';

			view.updateAllUI();
		}
	}, {
		key: 'positionMobileMenu',
		value: function positionMobileMenu() {
			var view = this.mobileMenu;
			var newFrame = new CGRect();

			newFrame.size.width = this.width * this.parameters.widthFractionOfMobileMenu;

			if (this.state.mobileMenuOpen) {
				newFrame.size.height = view.requiredHeight;
			} else {
				newFrame.size.height = 0;
			}

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.parameters.topBufferForMobileMenu;

			view.frame = newFrame;
		}

		// Mobile Menu Button

	}, {
		key: 'configureMobileMenuButton',
		value: function configureMobileMenuButton() {

			var view = this.mobileMenuButton;

			view.clickable = true;
			view.cursor = 'pointer';
			view.parameters = { animationSpeed: this.parameters.mobileMenuAnimationSpeed, minimumSideBuffer: this.parameters.sideBufferForMobileContent, maximumWidthOfLines: this.parameters.widthOfMobileMenuButtonLines };
			view.state = { crossed: this.state.mobileMenuOpen };

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				view.opacity = 1;
			} else {
				view.opacity = 0;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionMobileMenuButton',
		value: function positionMobileMenuButton() {
			var view = this.mobileMenuButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.widthOfMobileMenuButtonLines + 2 * this.parameters.sideBufferForMobileContent;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = this.width - newFrame.size.width;
			newFrame.origin.y = this.logo.y + (this.logo.height - newFrame.size.height) / 2;

			view.frame = newFrame;
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

		// Menus

	}, {
		key: 'menuItemWasSelected',
		value: function menuItemWasSelected(menuItem) {
			this.state = { mobileMenuOpen: false };
			var header = this;
			this.animatedUpdate(null, function () {
				header.parent.headerDidSelectPage(menuItem.index);
			});
		}

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.mobileMenuButton) {
				this.state = { mobileMenuOpen: !this.state.mobileMenuOpen };
				this.animatedUpdate();
			}
		}
	}]);

	return Header;
}(JABView);