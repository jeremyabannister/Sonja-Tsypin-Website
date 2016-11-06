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

		_this.numberOfImages = 10;
		_this.backgroundImageIndex = 0;

		_this.arrowFaded = true;
		_this.currentlyActive = true;

		_this.imageOffsets = [[0, 0], [-70, 0], [0, 0], [240, 0], [-10, 0], [0, 0], [10, 0], [-80, 0], [80, 0], [130, 0]];

		_this.imageTimer = null;
		_this.arrowTimer = null;

		// UI
		_this.blackBackground = new JABView('BlackBackground');
		_this.backgroundImageViews = [];
		for (var i = 0; i < 10; i++) {
			_this.backgroundImageViews.push(new JABImageView('BackgroundImageView' + i));
		}

		_this.enterArrow = new EnterArrow('EnterArrow');

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
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addBlackBackground();
			this.addBackgroundImageViews();
			this.addEnterArrow();
		}
	}, {
		key: 'addBlackBackground',
		value: function addBlackBackground() {
			this.addSubview(this.blackBackground);
		}
	}, {
		key: 'addBackgroundImageViews',
		value: function addBackgroundImageViews() {
			for (var i = 0; i < this.backgroundImageViews.length; i++) {
				this.addSubview(this.backgroundImageViews[i]);
			}
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

			this.configureBackgroundImageViews();
			this.positionBackgroundImageViews();

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

		// Background Image Views

	}, {
		key: 'configureBackgroundImageViews',
		value: function configureBackgroundImageViews() {
			for (var i = 0; i < this.backgroundImageViews.length; i++) {
				var view = this.backgroundImageViews[i];

				view.src = './Resources/Images/Home Page/Featured Stills/' + (i + 1) + '.jpg';

				/*
    (function(i, view) {
    	var imageRef = storageRef.child("Resources/Images/Home Page/Featured Stills/" + (i + 1) + ".jpg")
    	
    	imageRef.getDownloadURL().then(function(url) {
    	  // Get the download URL for 'images/stars.jpg'
    	  // This can be inserted into an <img> tag
    	  // This can also be downloaded directly
    	  view.src = url
    	}).catch(function(error) {
    	  // Handle any errors
    	  console.log('error', error)
    	});
    })(i, view)
    */

				if (this.backgroundImageIndex != this.numberOfImages - 1) {
					if (i > this.backgroundImageIndex) {
						view.opacity = 0;
					} else {
						view.opacity = 1;
					}
				} else {
					if (i == this.numberOfImages - 1 || i == 0) {
						view.opacity = 1;
					} else {
						view.opacity = 0;
					}
				}
			}
		}
	}, {
		key: 'positionBackgroundImageViews',
		value: function positionBackgroundImageViews() {
			for (var i = 0; i < this.backgroundImageViews.length; i++) {
				var view = this.backgroundImageViews[i];

				var newFrame = new CGRect();

				var widthToHeightRatio = 1.777777777;
				var contentDomainWidthToHeightRatio = 0;
				if (this.height != 0) {
					contentDomainWidthToHeightRatio = this.width / this.height;
				}

				if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
					newFrame.size.width = this.height * widthToHeightRatio;
					newFrame.size.height = this.height;
				} else {
					newFrame.size.width = this.width;
					newFrame.size.height = this.width / widthToHeightRatio;
				}

				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = (this.height - newFrame.size.height) / 2;

				if (sizeClass == 'xxs' || sizeClass == 'xs') {
					if (contentDomainWidthToHeightRatio < widthToHeightRatio) {
						newFrame.origin.x += this.imageOffsets[i][0];
					} else {
						newFrame.origin.y += this.imageOffsets[i][1];
					}
				}

				view.frame = newFrame;
			}
		}

		// Enter Arrow

	}, {
		key: 'configureEnterArrow',
		value: function configureEnterArrow() {

			this.enterArrow.cursor = 'pointer';

			if (this.currentlyActive) {
				this.enterArrow.opacity = 1;
			} else {
				this.enterArrow.opacity = 0;
			}

			this.enterArrow.configureDuration = 300;
			this.enterArrow.clickable = true;
		}
	}, {
		key: 'positionEnterArrow',
		value: function positionEnterArrow() {

			var widthsOfEnterArrow = { 'xxs': 45, 'xs': 60, 's': 60, 'm': 40, 'l': 40, 'xl': 40 };
			var widthOfEnterArrow = widthsOfEnterArrow[sizeClass];
			var bottomBufferForEnterArrow = 10;

			var newFrame = new CGRect();

			newFrame.size.width = widthOfEnterArrow;
			newFrame.size.height = newFrame.size.width + 20;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.height - newFrame.size.height - bottomBufferForEnterArrow;

			this.enterArrow.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Timers

	}, {
		key: 'startTimeoutForNextImage',
		value: function startTimeoutForNextImage() {

			var homePage = this;

			clearTimeout(this.imageTimer);
			this.imageTimer = setTimeout(function () {

				homePage.backgroundImageIndex += 1;
				if (homePage.backgroundImageIndex > homePage.numberOfImages - 1) {
					homePage.backgroundImageIndex = 0;
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

		//
		// Delegate
		//

		// JABImageView

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
		// console.log(imageView)


		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.enterArrow) {
				this.parent.homePageDownArrowWasClicked(this);
			}
		}
	}]);

	return HomePage;
}(JABView);