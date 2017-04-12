'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnterArrow = function (_JABView) {
	_inherits(EnterArrow, _JABView);

	function EnterArrow(customId) {
		_classCallCheck(this, EnterArrow);

		// State

		//
		// Animation Parameters
		//

		// General

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EnterArrow).call(this, customId));

		_this.updatingForBounce = false;
		_this.updatingForFade = true;

		// Fade Pulse
		_this.fadeInDuration = 825;
		_this.fadedInPause = 0;
		_this.fadeOutDuration = _this.fadeInDuration;
		_this.fadedOutPause = 2000;

		_this.fadedOut = true;
		_this.fadePaused = true;
		_this.giveInstructions = true;

		// Bounce
		_this.maximumBounceHeight = 40;
		_this.numberOfBounces = 3;
		_this.bounceInitialTimeBuffer = 100; // The bounce begins this number of miliseconds after the label begins fading in
		_this.bouncePostTimeBuffer = 250; // The bounce finishes this number of miliseconds before the label finishes fading out

		_this.bounceGoingUp = false;
		_this.currentBounceNumber = _this.numberOfBounces; // When the current bounce is equal to the number of bounces the animation is not running

		// UI
		_this.label = new UILabel('Label');
		_this.imageView = new JABImageView('ImageView');

		return _this;
	}

	//
	// Init
	//

	_createClass(EnterArrow, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(EnterArrow.prototype), 'init', this).call(this);
			this.willingToInheritAnimationOptions = false;

			this.label.opacity = 0;
			this.imageView.opacity = 0;

			var enterArrow = this;
			setTimeout(function () {
				enterArrow.advanceTextOpacityPulse();
			}, 200);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addLabel();
			this.addImageView();
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(EnterArrow.prototype), 'updateAllUI', this).call(this);

			this.configureLabel();
			this.positionLabel();

			this.configureImageView();
			this.positionImageView();
		}

		// Label

	}, {
		key: 'configureLabel',
		value: function configureLabel() {

			var view = this.label;

			view.text = 'SCROLL DOWN';
			view.textColor = 'white';
			view.textAlign = 'center';
			view.fontFamily = 'siteFont';
			view.fontSize = 10;
			view.fontWeight = 'bold';

			if (this.updatingForFade) {
				if (this.fadedOut) {
					this.label.opacity = 0;
				} else {
					if (this.giveInstructions) {
						this.label.opacity = 0.4;
					} else {
						this.label.opacity = 0.4;
					}
				}

				if (!this.fadePaused) {
					if (this.fadedOut) {
						this.label.configureDuration = this.fadeInDuration;
					} else {
						this.label.configureDuration = this.fadeOutDuration;
					}
				}
			}

			if (this.updatingForBounce) {
				if (this.currentBounceNumber < this.numberOfBounces) {

					var totalBounceTime = this.fadeInDuration + this.fadedInPause + this.fadeOutDuration - (this.bounceInitialTimeBuffer + this.bouncePostTimeBuffer);
					var timingFractionsByBounce = [0.4, 0.35, 0.25];

					this.label.positionDuration = totalBounceTime * timingFractionsByBounce[this.currentBounceNumber] / 2;

					if (this.bounceGoingUp) {
						this.label.positionEasingFunction = 'ease-out';
					} else {
						this.label.positionEasingFunction = 'ease-in';
					}
				} else {
					this.label.positionDuration = 0;
				}
			}
		}
	}, {
		key: 'positionLabel',
		value: function positionLabel() {

			var newFrame = new CGRect();
			var size = this.label.font.sizeOfString(this.label.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			if (this.updatingForBounce) {
				if (this.currentBounceNumber < this.numberOfBounces) {
					if (this.bounceGoingUp) {
						newFrame.origin.y -= this.maximumBounceHeight * Math.pow(0.5, this.currentBounceNumber);
					}
				}
			}

			this.label.frame = newFrame;
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var imagePath = resourcesDirectory + '/Images/Buttons/Enter Arrow.png';

			if (imageBank.imageStatus[imagePath] == true) {
				this.imageView.src = imagePath;
			}

			if (this.updatingForFade) {
				if (this.fadedOut) {
					this.imageView.opacity = 0.4;
				} else {
					this.imageView.opacity = 0.4;
				}

				if (!this.fadePaused) {
					if (this.fadedOut) {
						this.imageView.configureDuration = this.fadeInDuration;
					} else {
						this.imageView.configureDuration = this.fadeOutDuration;
					}
				}
			}

			if (this.updatingForBounce) {
				if (this.currentBounceNumber < this.numberOfBounces) {

					var totalBounceTime = this.fadeInDuration + this.fadedInPause + this.fadeOutDuration - (this.bounceInitialTimeBuffer + this.bouncePostTimeBuffer);
					var timingFractionsByBounce = [0.4, 0.35, 0.25];

					this.imageView.positionDuration = totalBounceTime * timingFractionsByBounce[this.currentBounceNumber] / 2;

					if (this.bounceGoingUp) {
						this.imageView.positionEasingFunction = 'ease-out';
					} else {
						this.imageView.positionEasingFunction = 'ease-in';
					}
				} else {
					this.imageView.positionDuration = 0;
				}
			}
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {

			var bufferBetweenLabelAndImageView = 3;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.label.bottom + bufferBetweenLabelAndImageView;

			this.imageView.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Animations

	}, {
		key: 'advanceTextOpacityPulse',
		value: function advanceTextOpacityPulse() {

			if (this.fadedOut) {
				if (this.fadePaused) {
					this.fadePaused = false;
					this.fadedOut = false;
				} else {
					this.fadePaused = true;
				}
			} else {
				if (this.fadePaused) {
					this.fadePaused = false;
					this.fadedOut = true;
					this.giveInstructions = !this.giveInstructions;
				} else {
					this.fadePaused = true;
				}
			}

			var enterArrow = this;

			if (!this.fadedOut && !this.fadePaused) {
				setTimeout(function () {
					enterArrow.runLabelBounceAnimation();
				}, this.bounceInitialTimeBuffer);
			}

			if (this.fadePaused) {
				var pauseTime = this.fadedInPause;
				if (this.fadedOut) {
					pauseTime = this.fadedOutPause;
				}

				setTimeout(function () {
					enterArrow.advanceTextOpacityPulse();
				}, pauseTime);
			} else {
				this.updatingForFade = true;

				this.animatedUpdate(0, function () {
					// The fade duration is assigned directly to the label in configureLabel, so we use 0 here so as not to unnecessarily cascade an arbitrary animationDuration down to inheriting subviews
					enterArrow.updatingForFade = false;
					enterArrow.advanceTextOpacityPulse();
				}, function () {});
			}
		}
	}, {
		key: 'runLabelBounceAnimation',
		value: function runLabelBounceAnimation() {

			this.currentBounceNumber = 0;
			this.advanceLabelBounceAnimation();
		}
	}, {
		key: 'advanceLabelBounceAnimation',
		value: function advanceLabelBounceAnimation() {

			var enterArrow = this;

			if (this.currentBounceNumber < this.numberOfBounces) {
				this.bounceGoingUp = !this.bounceGoingUp;
				this.updatingForBounce = true;

				this.animatedUpdate(0, null, function () {
					enterArrow.updatingForBounce = false;
					if (!enterArrow.bounceGoingUp) {
						enterArrow.currentBounceNumber += 1; // If the label has just come down then move on to the next bounce
					}
					enterArrow.advanceLabelBounceAnimation();
				});
			}
		}

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
	}]);

	return EnterArrow;
}(JABView);