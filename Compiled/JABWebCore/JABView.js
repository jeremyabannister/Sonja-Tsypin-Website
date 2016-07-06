'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JABView = function () {
	function JABView(customId, parent, idNumber) {
		_classCallCheck(this, JABView);

		this.customId = customId;

		if (parent != null) {

			this.parent = parent;
			this.idNumber = idNumber;

			this.id = '';
			this.updateId();

			this.view = '';
			this.updateViewString();
		}

		// Subviews
		this.subviews = [];

		// Animation
		this.disableAnimationsTimer = setTimeout(function () {}, 0);

		this.masterAnimationOptions = { // Master animation options retains the information about which slots should inherit (indicated by null) and which are fixed to a value, while animationOptions holds the actual current values to be used for animation
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,

			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null
		};
		this.animationOptions = {
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,

			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null
		};
		this.willingToInheritAnimationOptions = true;

		// Position
		this.frame = new CGRect();

		// Configuration
		this.opacity = 1;
		this.backgroundColor = 'transparent';
		this.borderRadius = 0;
		this.blur = 0;

		this.zIndex = 0;
		this.position = 'absolute';
		this.overflow = 'visible';
		this.cursor = 'auto';

		// Other
		this.clickable = false;
	}

	//
	// Id
	//


	_createClass(JABView, [{
		key: 'updateId',
		value: function updateId() {

			var connectorString = '---';
			var id = '';

			if (this.parent != null) {
				if (this.parent.id != null) {
					id = this.parent.id;
				}
			}

			if (this.customId != null) {
				if (this.customId.indexOf(connectorString) == -1) {
					if (id != '') {
						id = this.customId + connectorString + id;
					} else {
						id = this.customId;
					}
				}
			} else {
				if (id != '') {
					id = this.idNumber + connectorString + id;
				} else {
					id = this.idNumber;
				}
			}

			this.id = id;
		}
	}, {
		key: 'updateViewString',


		//
		// View
		//

		value: function updateViewString() {

			this.updateId();
			this.view = "<div id='" + this.id + "'></div>";
		}

		//
		// Subviews
		//

	}, {
		key: 'updateZIndiciesOfSubviews',
		value: function updateZIndiciesOfSubviews() {

			for (var i = 0; i < this.subviews.length; i++) {
				this.subviews[i].zIndex = i;
			}
		}
	}, {
		key: 'addSubview',
		value: function addSubview(subview) {
			if (subview instanceof JABView) {

				this.removeSubview(subview);
				this.subviews.push(subview);

				subview.parent = this;
				subview.idNumber = this.nextAvailableIdNumber;

				subview.updateViewString();
				$(this.selector).append(subview.view);
				subview.position = 'absolute';

				subview.init();
			}

			this.updateZIndiciesOfSubviews();
		}
	}, {
		key: 'removeSubview',
		value: function removeSubview(subview) {
			if (subview instanceof JABView) {
				var removed = false;
				for (var i = 0; i < this.subviews.length; i++) {
					if (!removed) {
						if (this.subviews[i] == subview) {
							this.subviews.splice(i, 1);
							$(subview.selector).remove();
							subview.parent = null;
							removed = true;
						}
					}
				}
			}

			this.updateZIndiciesOfSubviews();
		}
	}, {
		key: 'bringSubviewToFront',
		value: function bringSubviewToFront(subview) {
			this.insertSubviewAboveSubviews(subview, this.subviews);
		}
	}, {
		key: 'pushSubviewToBack',
		value: function pushSubviewToBack(subview) {

			if (subview instanceof JABView) {

				var indexOfSubview = this.indexOfSubview(subview);
				if (indexOfSubview != -1) {
					this.subviews.splice(indexOfSubview, 1);
				}

				this.subviews.splice(0, 0, subview);
				this.updateZIndiciesOfSubviews();
			}
		}
	}, {
		key: 'insertSubviewAboveSubview',
		value: function insertSubviewAboveSubview(insertedSubview, anchorSubview) {

			if (anchorSubview != insertedSubview) {
				if (anchorSubview instanceof JABView && insertedSubview instanceof JABView) {

					var indexOfInsertedSubview = this.indexOfSubview(insertedSubview);
					if (indexOfInsertedSubview != -1) {
						this.subviews.splice(indexOfInsertedSubview, 1);
					}

					var indexOfAnchorSubview = this.indexOfSubview(anchorSubview);
					if (indexOfAnchorSubview != -1) {

						this.subviews.splice(indexOfAnchorSubview + 1, 0, insertedSubview);
						this.updateZIndiciesOfSubviews();
					}
				}
			}
		}
	}, {
		key: 'insertSubviewAboveSubviews',
		value: function insertSubviewAboveSubviews(subview, subviews) {

			var highestSubview = null;
			var highestSubviewIndex = -1;
			if (subviews instanceof Array) {
				for (var i = 0; i < subviews.length; i++) {
					var currentSubview = subviews[i];
					var currentSubviewIndex = this.indexOfSubview(currentSubview);
					if (currentSubviewIndex > highestSubviewIndex) {
						highestSubview = currentSubview;
						highestSubviewIndex = currentSubviewIndex;
					}
				}

				if (highestSubview != null) {
					this.insertSubviewAboveSubview(subview, highestSubview);
				}
			}
		}
	}, {
		key: 'indexOfSubview',
		value: function indexOfSubview(subview) {

			var index = -1;

			if (subview instanceof JABView) {
				for (var i = 0; i < this.subviews.length; i++) {
					if (this.subviews[i] == subview) {
						index = i;
					}
				}
			}

			return index;
		}
	}, {
		key: 'subviewIsAboveSubview',
		value: function subviewIsAboveSubview(subview1, subview2) {
			return this.indexOfSubview(subview1) > this.indexOfSubview(subview2);
		}
	}, {
		key: 'subviewIsAboveSubviews',
		value: function subviewIsAboveSubviews(subview, subviews) {
			if (subviews instanceof Array) {
				for (var i = 0; i < subviews.length; i++) {
					if (!this.subviewIsAboveSubview(subview, subviews[i])) {
						return false;
					}
				}
			}

			return true;
		}

		//
		// Animation
		//

		// Options

	}, {
		key: 'inheritAnimationOptions',
		value: function inheritAnimationOptions(newAnimationOptions) {

			if (this.willingToInheritAnimationOptions) {
				for (var key in newAnimationOptions) {
					if (this.masterAnimationOptions[key] == null) {
						this.animationOptions[key] = newAnimationOptions[key];
					}
				}

				this.updateTransition();
				this.setSubviewsAnimationOptions(newAnimationOptions);
			}
		}
	}, {
		key: 'updateTransition',


		// Transition
		value: function updateTransition() {

			if (this.id == '1---Menu---Header---MainSector---ApplicationRoot') {
				// console.log(this.selector + ' is updating transition with ' + this.animationOptions.configureDuration)
			}

			var configureDuration = this.animationOptions.configureDuration || 0;
			var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out';
			var configureDelay = this.animationOptions.configureDelay || 0;

			var positionDuration = this.animationOptions.positionDuration || 0;
			var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out';
			var positionDelay = this.animationOptions.positionDelay || 0;

			$(this.selector).css({
				transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms'
			});
		}

		// Computed Properties

	}, {
		key: 'stopOpacity',


		// Stopping Animations
		value: function stopOpacity() {
			$(this.selector).css({
				opacity: this.computedOpacity
			});
		}
	}, {
		key: 'stopBackgroundColor',
		value: function stopBackgroundColor() {
			$(this.selector).css({
				backgroundColor: this.computerBackgroundColor
			});
		}
	}, {
		key: 'stopBorderRadius',
		value: function stopBorderRadius() {
			$(this.selector).css({
				borderRadius: this.computedBorderRadius
			});
		}
	}, {
		key: 'stopBlur',
		value: function stopBlur() {
			$(this.selector).css({
				'-webkit-filter': this.computedFilterWebkit,
				'-moz-filter': this.computedFilterMoz,
				'-o-filter': this.computedFilterO,
				'-ms-filter': this.computedFilterMS,
				'filter': this.computedFilter
			});
		}
	}, {
		key: 'stopBackdropBlur',
		value: function stopBackdropBlur() {
			$(this.selector).css({
				'-webkit-backdrop-blur': this.computerBackdropBlur
			});
		}
	}, {
		key: 'stopConfiguration',
		value: function stopConfiguration() {
			this.stopOpacity();
			this.stopBackgroundColor();
			this.stopBorderRadius();
		}
	}, {
		key: 'stopX',
		value: function stopX() {
			$(this.selector).css({
				transform: 'translate3d(' + this.computedX + 'px, ' + this.y + 'px, 0px)'
			});
		}
	}, {
		key: 'stopY',
		value: function stopY() {
			$(this.selector).css({
				transform: 'translate3d(' + this.x + 'px, ' + this.computedY + 'px, 0px)'
			});
		}
	}, {
		key: 'stopTranslation',
		value: function stopTranslation() {
			this.stopX();
			this.stopY();
		}
	}, {
		key: 'stopWidth',
		value: function stopWidth() {
			$(this.selector).css({
				width: this.computedWidth
			});
		}
	}, {
		key: 'stopHeight',
		value: function stopHeight() {
			$(this.selector).css({
				height: this.computedHeight
			});
		}
	}, {
		key: 'stopResizing',
		value: function stopResizing() {
			this.stopWidth();
			this.stopHeight();
		}
	}, {
		key: 'stopPositioning',
		value: function stopPositioning() {
			this.stopTranslation();
			this.stopResizing();
		}
	}, {
		key: 'stopAllAnimation',
		value: function stopAllAnimation() {
			this.stopConfiguration();
			this.stopPositioning();
		}

		// Frame

	}, {
		key: 'red',


		// Color Shortcuts

		value: function red() {
			this.backgroundColor = 'red';
		}
	}, {
		key: 'orange',
		value: function orange() {
			this.backgroundColor = 'orange';
		}
	}, {
		key: 'yellow',
		value: function yellow() {
			this.backgroundColor = 'yellow';
		}
	}, {
		key: 'green',
		value: function green() {
			this.backgroundColor = 'green';
		}
	}, {
		key: 'cyan',
		value: function cyan() {
			this.backgroundColor = 'cyan';
		}
	}, {
		key: 'blue',
		value: function blue() {
			this.backgroundColor = 'blue';
		}
	}, {
		key: 'purple',
		value: function purple() {
			this.backgroundColor = 'purple';
		}
	}, {
		key: 'white',
		value: function white() {
			this.backgroundColor = 'white';
		}
	}, {
		key: 'black',
		value: function black() {
			this.backgroundColor = 'black';
		}

		//
		// Other
		//

	}, {
		key: 'init',


		//
		// Init
		//

		value: function init() {

			this.addAllUI();
		}

		//
		// UI
		//

	}, {
		key: 'addAllUI',
		value: function addAllUI() {}
	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {}

		//
		// Animated Update
		//

	}, {
		key: 'animatedUpdate',
		value: function animatedUpdate(options, configureCompletion, positionCompletion) {

			if (typeof options == 'number') {
				options = {
					configureDuration: options,
					positionDuration: options
				};
			} else if (options == null) {
				options = {
					configureDuration: defaultAnimationDuration,
					positionDuration: defaultAnimationDuration
				};
			}

			clearTimeout(this.disableAnimationsTimer);

			this.setSubviewsAnimationOptions(options);
			this.updateAllUI();

			var longestConfigureTime = this.longestConfigureAnimationTimeOfSelfAndSubviews();
			var longestPositionTime = this.longestPositionAnimationTimeOfSelfAndSubviews();
			var disableDuration = greaterOfTwo(longestConfigureTime, longestPositionTime);

			var thisView = this;
			this.disableAnimationsTimer = setTimeout(function () {
				thisView.setSubviewsAnimationOptions({
					configureDuration: 0,
					configureEasingFunction: 'ease-in-out',
					configureDelay: 0,

					positionDuration: 0,
					positionEasingFunction: 'ease-in-out',
					positionDelay: 0
				});
			}, disableDuration);

			if (configureCompletion == null) {
				configureCompletion = function configureCompletion() {};
			}

			if (positionCompletion == null) {
				positionCompletion = function positionCompletion() {};
				longestConfigureTime = disableDuration; // If there is only one completion passed then ensure that it occurs at the end of all animations
			}

			setTimeout(function () {
				configureCompletion();
			}, longestConfigureTime);

			setTimeout(function () {
				positionCompletion();
			}, longestPositionTime);
		}
	}, {
		key: 'longestConfigureAnimationTimeOfSelfAndSubviews',
		value: function longestConfigureAnimationTimeOfSelfAndSubviews() {

			var longestTime = (this.animationOptions.configureDelay || 0) + (this.animationOptions.configureDuration || 0);
			for (var i = 0; i < this.subviews.length; i++) {
				longestTime = greaterOfTwo(longestTime, this.subviews[i].longestConfigureAnimationTimeOfSelfAndSubviews());
			}

			return longestTime;
		}
	}, {
		key: 'longestPositionAnimationTimeOfSelfAndSubviews',
		value: function longestPositionAnimationTimeOfSelfAndSubviews() {

			var longestTime = (this.animationOptions.positionDelay || 0) + (this.animationOptions.positionDuration || 0);
			for (var i = 0; i < this.subviews.length; i++) {
				longestTime = greaterOfTwo(longestTime, this.subviews[i].longestPositionAnimationTimeOfSelfAndSubviews());
			}

			return longestTime;
		}
	}, {
		key: 'setSubviewsAnimationOptions',
		value: function setSubviewsAnimationOptions(options) {
			for (var i = 0; i < this.subviews.length; i++) {
				this.subviews[i].inheritAnimationOptions(options);
			}
		}
	}, {
		key: 'selector',
		get: function get() {
			return '#' + this.id;
		}
	}, {
		key: 'subviewIdNumbersInUse',
		get: function get() {

			var idNumbers = [];
			for (var i = 0; i < this.subviews.length; i++) {
				idNumbers.push(this.subviews[i].idNumber);
			}
			return idNumbers;
		}
	}, {
		key: 'nextAvailableIdNumber',
		get: function get() {

			var currentIdNumbers = this.subviewIdNumbersInUse;
			var currentHighestId = 0;

			for (var i = 0; i < currentIdNumbers.length; i++) {
				if (currentIdNumbers[i] > currentHighestId) {
					currentHighestId = currentIdNumbers[i];
				}
			}
			return currentHighestId + 1;
		}
	}, {
		key: 'scrollTop',
		get: function get() {
			return $(this.selector).scrollTop();
		}
	}, {
		key: 'animationOptions',
		get: function get() {
			return this._animationOptions;
		},
		set: function set(newAnimationOptions) {
			this._animationOptions = newAnimationOptions;
			this.updateTransition();
		}
	}, {
		key: 'configureDuration',
		get: function get() {
			return this.animationOptions.configureDuration;
		},
		set: function set(newConfigureDuration) {
			this.masterAnimationOptions.configureDuration = newConfigureDuration;
			this.animationOptions.configureDuration = newConfigureDuration;
		}
	}, {
		key: 'configureEasingFunction',
		get: function get() {
			return this.animationOptions.configureEasingFunction;
		},
		set: function set(newConfigureEasingFunction) {
			this.masterAnimationOptions.configureEasingFunction = newConfigureEasingFunction;
			this.animationOptions.configureEasingFunction = newConfigureEasingFunction;
		}
	}, {
		key: 'configureDelay',
		get: function get() {
			return this.animationOptions.configureDelay;
		},
		set: function set(newConfigureDelay) {
			this.masterAnimationOptions.configureDelay = newConfigureDelay;
			this.animationOptions.configureDelay = newConfigureDelay;
		}
	}, {
		key: 'positionDuration',
		get: function get() {
			return this.animationOptions.positionDuration;
		},
		set: function set(newPositionDuration) {
			this.masterAnimationOptions.positionDuration = newPositionDuration;
			this.animationOptions.positionDuration = newPositionDuration;
		}
	}, {
		key: 'positionEasingFunction',
		get: function get() {
			return this.animationOptions.positionEasingFunction;
		},
		set: function set(newPositionEasingFunction) {
			this.masterAnimationOptions.positionEasingFunction = newPositionEasingFunction;
			this.animationOptions.positionEasingFunction = newPositionEasingFunction;
		}
	}, {
		key: 'positionDelay',
		get: function get() {
			return this.animationOptions.positionDelay;
		},
		set: function set(newPositionDelay) {
			this.masterAnimationOptions.positionDelay = newPositionDelay;
			this.animationOptions.positionDelay = newPositionDelay;
		}
	}, {
		key: 'computedOpacity',
		get: function get() {
			return $(this.selector).css('opacity');
		}
	}, {
		key: 'computerBackgroundColor',
		get: function get() {
			return $(this.selector).css('background-color');
		}
	}, {
		key: 'computedBorderRadius',
		get: function get() {
			return $(this.selector).css('border-radius');
		}
	}, {
		key: 'computedFilter',
		get: function get() {
			return $(this.selector).css('filter');
		}
	}, {
		key: 'computedFilterWebkit',
		get: function get() {
			return $(this.selector).css('-webkit-filter');
		}
	}, {
		key: 'computedFilterMoz',
		get: function get() {
			return $(this.selector).css('-moz-filter');
		}
	}, {
		key: 'computedFilterO',
		get: function get() {
			return $(this.selector).css('-o-filter');
		}
	}, {
		key: 'computedFilterMS',
		get: function get() {
			return $(this.selector).css('-ms-filter');
		}
	}, {
		key: 'computedBackdropBlur',
		get: function get() {
			return $(this.selector).css('-webkit-backdrop-blur');
		}
	}, {
		key: 'computedX',
		get: function get() {
			var transformString = $(this.selector).css('transform');
			if (transformString != 'none') {
				return $(this.selector).css('transform').split('(')[1].split(')')[0].split(',')[4];
			}
			return 0;
		}
	}, {
		key: 'computedY',
		get: function get() {
			var transformString = $(this.selector).css('transform');
			if (transformString != 'none') {
				return $(this.selector).css('transform').split('(')[1].split(')')[0].split(',')[5];
			}
			return 0;
		}
	}, {
		key: 'computedWidth',
		get: function get() {
			return $(this.selector).css('width');
		}
	}, {
		key: 'computedHeight',
		get: function get() {
			return $(this.selector).css('height');
		}
	}, {
		key: 'frame',
		get: function get() {
			if (this._frame != null) {
				return new CGRect(this._frame.origin.x, this._frame.origin.y, this._frame.size.width, this._frame.size.height);
			}
			return new CGRect();
		},
		set: function set(newFrame) {

			this.updateTransition();

			var scaled = newFrame.size.width != this.width || newFrame.size.height != this.height;
			var moved = newFrame.origin.x != this.x || newFrame.origin.y != this.y;
			var changed = moved || scaled;

			this._frame = newFrame;

			if (changed) {

				this.stopPositioning();
				$(this.selector).css({

					transform: 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)',

					width: this.width,
					height: this.height
				});

				if (scaled) {
					this.updateAllUI();
				}
			}
		}

		// X

	}, {
		key: 'x',
		get: function get() {
			return this.frame.origin.x;
		},
		set: function set(newX) {
			this.frame = new CGRect(newX, this.frame.origin.y, this.frame.size.width, this.frame.size.height);
		}

		// Y

	}, {
		key: 'y',
		get: function get() {
			return this.frame.origin.y;
		},
		set: function set(newY) {
			this.frame = new CGRect(this.frame.origin.x, newY, this.frame.size.width, this.frame.size.height);
		}

		// Width

	}, {
		key: 'width',
		get: function get() {
			return this.frame.size.width;
		},
		set: function set(newWidth) {
			this.frame = new CGRect(this.frame.origin.x, this.frame.origin.y, newWidth, this.frame.size.height);
		}

		// Height

	}, {
		key: 'height',
		get: function get() {
			return this.frame.size.height;
		},
		set: function set(newHeight) {
			this.frame = new CGRect(this.frame.origin.x, this.frame.origin.y, this.frame.size.width, newHeight);
		}

		// Left

	}, {
		key: 'left',
		get: function get() {
			return this.x;
		}

		// Top

	}, {
		key: 'top',
		get: function get() {
			return this.y;
		}

		// Right

	}, {
		key: 'right',
		get: function get() {
			return this.x + this.width;
		}

		// Bottom

	}, {
		key: 'bottom',
		get: function get() {
			return this.y + this.height;
		}

		// Bounds

	}, {
		key: 'bounds',
		get: function get() {
			return new CGRect(0, 0, this.width, this.height);
		}

		// Opacity

	}, {
		key: 'opacity',
		get: function get() {
			return this._opacity;
		},
		set: function set(newOpacity) {

			this._opacity = newOpacity;

			this.updateTransition();
			this.stopOpacity();
			$(this.selector).css({
				opacity: newOpacity
			});
		}

		// Background Color

	}, {
		key: 'backgroundColor',
		get: function get() {
			return this._backgroundColor;
		},
		set: function set(newBackgroundColor) {
			this._backgroundColor = newBackgroundColor;

			this.updateTransition();
			this.stopBackgroundColor();
			$(this.selector).css({
				'background-color': newBackgroundColor
			});
		}

		// Border Radius

	}, {
		key: 'borderRadius',
		get: function get() {
			return this._borderRadius;
		},
		set: function set(newBorderRadius) {
			this._borderRadius = newBorderRadius;

			this.updateTransition();
			this.stopBorderRadius();
			$(this.selector).css({
				'border-radius': newBorderRadius
			});
		}

		// Blur

	}, {
		key: 'blur',
		get: function get() {
			return this._blur;
		},
		set: function set(newBlur) {
			this._blur = newBlur;

			this.updateTransition();
			this.stopBlur();
			$(this.selector).css({
				'-webkit-filter': 'blur(' + newBlur + 'px)',
				'-moz-filter': 'blur(' + newBlur + 'px)',
				'-o-filter': 'blur(' + newBlur + 'px)',
				'-ms-filter': 'blur(' + newBlur + 'px)',
				'filter': 'blur(' + newBlur + 'px)'
			});
		}
	}, {
		key: 'backdropBlur',
		get: function get() {
			return this._backdropBlur;
		},
		set: function set(newBackdropBlur) {
			this._backdropBlur = newBackdropBlur;

			this.updateTransition();
			this.stopBackdropBlur();
			$(this.selector).css({
				'-webkit-backdrop-filter': 'blur(' + newBackdropBlur + 'px)'
			});
		}

		// ZIndex

	}, {
		key: 'zIndex',
		get: function get() {
			return this._zIndex;
		},
		set: function set(newZIndex) {

			this._zIndex = newZIndex;
			$(this.selector).css({
				'z-index': newZIndex
			});
		}

		// Position

	}, {
		key: 'position',
		get: function get() {
			return this._position;
		},
		set: function set(newPosition) {
			this._position = newPosition;
			$(this.selector).css({
				'position': newPosition
			});
		}

		// Overflow

	}, {
		key: 'overflow',
		get: function get() {
			return this._overflow;
		},
		set: function set(newOverflow) {
			this._overflow = newOverflow;

			$(this.selector).css({
				'overflow': newOverflow
			});
		}

		// Cursor

	}, {
		key: 'cursor',
		get: function get() {
			return this._cursor;
		},
		set: function set(newCursor) {
			this._cursor = newCursor;

			$(this.selector).css({
				'cursor': newCursor
			});

			$(this.selector).find('*').css({
				'cursor': newCursor
			});
		}
	}, {
		key: 'clickable',
		get: function get() {
			return this._clickable;
		},
		set: function set(newClickable) {
			this._clickable = newClickable;

			var thisView = this;
			$(this.selector).off();
			if (this.clickable) {
				$(this.selector).click(function () {
					thisView.parent.viewWasClicked(thisView);
				});
			} else {
				$(this.selector).click(function () {});
			}
		}
	}]);

	return JABView;
}();