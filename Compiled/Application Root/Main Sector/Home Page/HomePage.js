'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_JABView) {
	_inherits(HomePage, _JABView);

	function HomePage(customId) {
		_classCallCheck(this, HomePage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HomePage).call(this, customId));

		_this.backgroundImageIndex = 1;
		_this.backgroundLayer1IsActive = true;
		_this.arrowFaded = true;

		// UI
		_this.blackBackground = new JABView('BlackBackground');
		_this.backgroundLayer1 = new JABImageView('BackgroundLayer1');
		_this.backgroundLayer2 = new JABImageView('BackgroundLayer2');
		_this.enterArrow = new JABImageView('EnterArrow');

		return _this;
	}

	//
	// Init
	//

	_createClass(HomePage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(HomePage.prototype), 'init', this).call(this);
			this.startTimeoutForNextImage();
			this.startEventListeners();
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addBlackBackground();
			this.addBackgroundLayer1();
			this.addBackgroundLayer2();
			this.addEnterArrow();
		}
	}, {
		key: 'addBlackBackground',
		value: function addBlackBackground() {
			this.addSubview(this.blackBackground);
		}
	}, {
		key: 'addBackgroundLayer1',
		value: function addBackgroundLayer1() {
			this.addSubview(this.backgroundLayer1);
		}
	}, {
		key: 'addBackgroundLayer2',
		value: function addBackgroundLayer2() {
			this.addSubview(this.backgroundLayer2);
		}
	}, {
		key: 'addEnterArrow',
		value: function addEnterArrow() {
			this.addSubview(this.enterArrow);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(HomePage.prototype), 'updateAllUI', this).call(this);

			this.configureBlackBackground();
			this.positionBlackBackground();

			this.configureBackgroundLayer1();
			this.positionBackgroundLayer1();

			this.configureBackgroundLayer2();
			this.positionBackgroundLayer2();

			this.configureEnterArrow();
			this.positionEnterArrow();
		}

		// Black Background

	}, {
		key: 'configureBlackBackground',
		value: function configureBlackBackground() {
			this.blackBackground.backgroundColor = 'black';
		}
	}, {
		key: 'positionBlackBackground',
		value: function positionBlackBackground() {
			this.blackBackground.frame = this.bounds;
		}

		// Background Layer 1

	}, {
		key: 'configureBackgroundLayer1',
		value: function configureBackgroundLayer1() {

			this.backgroundLayer1.animationsDisabled = ['frame'];

			if (this.backgroundLayer1IsActive) {
				this.backgroundLayer1.opacity = 1;
				this.backgroundLayer1.src = '/Resources/Images/Home Page/Featured Stills/' + this.backgroundImageIndex + '.jpg';
			} else {
				this.backgroundLayer1.opacity = 0;
			}
		}
	}, {
		key: 'positionBackgroundLayer1',
		value: function positionBackgroundLayer1() {

			var widthToHeightRatio = 1.777777777;
			var contentDomainWidthToHeightRatio = 0;
			if (this.height != 0) {
				contentDomainWidthToHeightRatio = this.width / this.height;
			}

			if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
				this.backgroundLayer1.frame = new CGRect((this.width - this.height * widthToHeightRatio) / 2, 0, this.height * widthToHeightRatio, this.height);
			} else {
				this.backgroundLayer1.frame = new CGRect(0, (this.height - this.width / widthToHeightRatio) / 2, this.width, this.width / widthToHeightRatio);
			}
		}

		// Background Layer 2

	}, {
		key: 'configureBackgroundLayer2',
		value: function configureBackgroundLayer2() {

			this.backgroundLayer2.animationsDisabled = ['frame'];

			if (this.backgroundLayer1IsActive) {
				this.backgroundLayer2.opacity = 0;
			} else {
				this.backgroundLayer2.src = '/Resources/Images/Home Page/Featured Stills/' + this.backgroundImageIndex + '.jpg';
				this.backgroundLayer2.opacity = 1;
			}
		}
	}, {
		key: 'positionBackgroundLayer2',
		value: function positionBackgroundLayer2() {

			var widthToHeightRatio = 1.777777777;
			var contentDomainWidthToHeightRatio = 0;
			if (this.height != 0) {
				contentDomainWidthToHeightRatio = this.width / this.height;
			}

			if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
				this.backgroundLayer2.frame = new CGRect((this.width - this.height * widthToHeightRatio) / 2, 0, this.height * widthToHeightRatio, this.height);
			} else {
				this.backgroundLayer2.frame = new CGRect(0, (this.height - this.width / widthToHeightRatio) / 2, this.width, this.width / widthToHeightRatio);
			}
		}

		// Enter Arrow

	}, {
		key: 'configureEnterArrow',
		value: function configureEnterArrow() {

			this.enterArrow.src = '/Resources/Images/Buttons/Down Arrow.png';
			this.enterArrow.cursor = 'pointer';

			if (this.arrowFaded) {
				this.enterArrow.opacity = 0.3;
			} else {
				this.enterArrow.opacity = 0.6;
			}
		}
	}, {
		key: 'positionEnterArrow',
		value: function positionEnterArrow() {

			var widthOfEnterArrow = 40;
			var bottomBufferForEnterArrow = 20;

			var newFrame = new CGRect();

			newFrame.size.width = widthOfEnterArrow;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.height - newFrame.size.height - bottomBufferForEnterArrow;

			this.enterArrow.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var homePage = this;
			$(this.enterArrow.selector).click(function () {
				homePage.parent.homePageDownArrowWasClicked();
			});
		}

		//
		// Actions
		//

		// Timers

	}, {
		key: 'startTimeoutForNextImage',
		value: function startTimeoutForNextImage() {

			var homePage = this;

			setTimeout(function () {

				homePage.backgroundImageIndex += 1;
				homePage.backgroundLayer1IsActive = !homePage.backgroundLayer1IsActive;
				if (homePage.backgroundImageIndex > 10) {
					homePage.backgroundImageIndex = 1;
				}

				homePage.animatedUpdate({
					configureDuration: 1500,
					positionDuration: 0
				});

				homePage.startTimeoutForNextImage();
			}, 5000);
		}
	}, {
		key: 'startTimeoutForArrowFade',
		value: function startTimeoutForArrowFade() {

			var homePage = this;

			setTimeout(function () {

				// homePage.enterArrow.animationDuration = 1000
				homePage.arrowFaded = !homePage.arrowFaded;
				homePage.animatedUpdate();

				homePage.startTimeoutForArrowFade();
			}, 1200);
		}
	}]);

	return HomePage;
}(JABView);