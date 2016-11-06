'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABVimeoView = function (_JABView) {
	_inherits(JABVimeoView, _JABView);

	function JABVimeoView(customId) {
		_classCallCheck(this, JABVimeoView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JABVimeoView).call(this, customId));

		_this.vimeoId = null;
		_this.loadingVideo = false;
		_this.loadingGif = null;
		_this.loadedOnce = false;

		_this.coverImage = null; // Should be a UIImage
		_this.playButtonImage = null; // Should be a UIImage
		_this.labelText = null;
		_this.unplayed = true;

		// UI
		_this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper');
		_this.iFrameWrapper = new JABView('IFrameWrapper');

		_this.player = null;
		_this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

		_this.coverImageView = new JABImageView('CoverImageView');
		_this.playButton = new JABImageView('PlayButton');
		_this.label = new UILabel('Label');

		// Parameters
		_this.parameters = {
			sizeOfPlayButton: 80,
			bufferBetweenPlayButtonAndLabel: 10
		};

		return _this;
	}

	//
	// Init
	//

	_createClass(JABVimeoView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(JABVimeoView.prototype), 'init', this).call(this);
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

			// These go behind the rest by default so that they are not blocking the vimeo player unless a cover image is specified
			this.addCoverImageView();
			this.addPlayButton();
			this.addLabel();

			this.addLoadingGifWrapper();
			this.addIFrameWrapper();

			this.addIFrame();
		}
	}, {
		key: 'addLoadingGifWrapper',
		value: function addLoadingGifWrapper() {
			this.addSubview(this.loadingGifWrapper);
		}
	}, {
		key: 'addIFrameWrapper',
		value: function addIFrameWrapper() {
			this.addSubview(this.iFrameWrapper);
		}
	}, {
		key: 'addIFrame',
		value: function addIFrame() {
			$(this.iFrameWrapper.selector).append(this.iframe);
			this.addTouchListener();
		}
	}, {
		key: 'addCoverImageView',
		value: function addCoverImageView() {
			this.addSubview(this.coverImageView);
		}
	}, {
		key: 'addPlayButton',
		value: function addPlayButton() {
			this.addSubview(this.playButton);
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABVimeoView.prototype), 'updateAllUI', this).call(this);

			this.configureLoadingGifWrapper();
			this.positionLoadingGifWrapper();

			this.configureIFrameWrapper();
			this.positionIFrameWrapper();

			this.configureIframe();
			this.positionIframe();

			this.configureCoverImageView();
			this.positionCoverImageView();

			this.configurePlayButton();
			this.positionPlayButton();

			this.configureLabel();
			this.positionLabel();
		}

		// Loading Gif

	}, {
		key: 'configureLoadingGifWrapper',
		value: function configureLoadingGifWrapper() {

			var view = this.loadingGifWrapper;

			if (this.loadingVideo) {
				view.opacity = 1;
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionLoadingGifWrapper',
		value: function positionLoadingGifWrapper() {

			var loadingGifWrapperSizes = { 'xs': 60, 's': 60, 'm': 60, 'l': 60, 'xl': 60 };

			var view = this.loadingGifWrapper;
			var newFrame = new CGRect();

			newFrame.size.width = loadingGifWrapperSizes[sizeClass];
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// IFrame Wrapper

	}, {
		key: 'configureIFrameWrapper',
		value: function configureIFrameWrapper() {
			var view = this.iFrameWrapper;

			if (this.loadingVideo) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionIFrameWrapper',
		value: function positionIFrameWrapper() {
			this.iFrameWrapper.frame = this.bounds;
		}

		// IFrame

	}, {
		key: 'configureIframe',
		value: function configureIframe() {
			$(this.iFrameWrapper.selector + ' > iframe').css({
				border: 0,
				zIndex: 0
			});
		}
	}, {
		key: 'positionIframe',
		value: function positionIframe() {

			$(this.iFrameWrapper.selector + ' > iframe').css({
				'width': this.width + 'px',
				'height': this.height + 'px'
			});
		}

		// Cover Image

	}, {
		key: 'configureCoverImageView',
		value: function configureCoverImageView() {
			var view = this.coverImageView;

			var insertBelow = !this.unplayed;
			if (this.coverImage != null) {

				var imagePath = this.coverImage.src;
				if (imageBank.imageStatus[imagePath] == true) {
					view.src = imagePath;
				}

				if (this.unplayed) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
				insertBelow = true;
			}

			view.clickable = true;
		}
	}, {
		key: 'positionCoverImageView',
		value: function positionCoverImageView() {
			var view = this.coverImageView;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Play Button

	}, {
		key: 'configurePlayButton',
		value: function configurePlayButton() {

			var view = this.playButton;

			if (this.playButtonImage != null) {
				var imagePath = this.playButtonImage.src;
				if (imageBank.imageStatus[imagePath] == true) {
					view.src = imagePath;
				}
				if (this.unplayed) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}
			} else {
				view.opacity = 0;
			}

			view.clickable = true;
			view.cursor = 'pointer';
		}
	}, {
		key: 'positionPlayButton',
		value: function positionPlayButton() {
			var view = this.playButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfPlayButton;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Label

	}, {
		key: 'configureLabel',
		value: function configureLabel() {

			var view = this.label;

			if (this.labelText != null) {
				if (this.unplayed) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}

				view.text = this.labelText;
				view.fontFamily = 'siteFont';
				view.fontSize = 12;
				view.textColor = 'white';
				view.letterSpacing = 1.5;
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionLabel',
		value: function positionLabel() {
			var view = this.label;
			var newFrame = new CGRect();

			if (view.text != null) {
				var size = view.font.sizeOfString(view.text);
				newFrame.size.width = size.width;
				newFrame.size.height = size.height;

				newFrame.origin.x = this.playButton.x + (this.playButton.width - newFrame.size.width) / 2;
				newFrame.origin.y = this.playButton.bottom + this.parameters.bufferBetweenPlayButtonAndLabel;
			}

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Vimeo Player

	}, {
		key: 'play',
		value: function play() {
			if (this.player != null) {

				if (this.coverImage != null) {
					this.unplayed = false;
					var vimeoView = this;
					this.animatedUpdate(null, function () {
						vimeoView.updateSubviewOrder();
						vimeoView.player.play();
					});
				} else {
					this.player.play();
				}
			}
		}
	}, {
		key: 'pause',
		value: function pause() {
			if (this.player != null) {
				this.player.pause();
			}
		}
	}, {
		key: 'addTouchListener',
		value: function addTouchListener() {
			document.getElementById(this.id).addEventListener('touchstart', handleTouchStart, false);
			document.getElementById(this.id).addEventListener('touchmove', handleTouchMove, false);

			var vimeoView = this;
			var xDown = null;
			var yDown = null;

			function handleTouchStart(evt) {
				console.log('touch started!');
				xDown = evt.touches[0].clientX;
				yDown = evt.touches[0].clientY;
			};

			function handleTouchMove(evt) {
				if (!xDown || !yDown) {
					return;
				}

				var xUp = evt.touches[0].clientX;
				var yUp = evt.touches[0].clientY;

				var xDiff = xDown - xUp;
				var yDiff = yDown - yUp;

				if (Math.abs(xDiff) > Math.abs(yDiff)) {
					/*most significant*/
					if (xDiff > 0) {
						/* left swipe */
						vimeoView.parent.leftSwipeDetected();
					} else {
						/* right swipe */
						vimeoView.parent.rightSwipeDetected();
					}
				} else {
					if (yDiff > 0) {
						/* up swipe */
						vimeoView.parent.upSwipeDetected();
					} else {
						/* down swipe */
						vimeoView.parent.downSwipeDetected();
					}
				}
				/* reset values */
				xDown = null;
				yDown = null;
			};
		}

		// Subviews

	}, {
		key: 'updateSubviewOrder',
		value: function updateSubviewOrder() {
			var bringToFront = this.unplayed;
			if (this.coverImage == null) {
				bringToFront = false;
			}

			if (bringToFront) {
				this.bringSubviewToFront(this.coverImageView);
				this.bringSubviewToFront(this.playButton);
				this.bringSubviewToFront(this.label);
			} else {
				this.pushSubviewToBack(this.coverImageView);
				this.pushSubviewToBack(this.playButton);
				this.pushSubviewToBack(this.label);
			}
		}

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.coverImageView || view == this.playButton) {
				this.play();
			}
		}
	}, {
		key: 'vimeoId',
		get: function get() {
			return this._vimeoId;
		},
		set: function set(newVimeoId) {
			var changed = this.vimeoId != newVimeoId;

			if (changed) {
				this._vimeoId = newVimeoId;

				if (!this.loadedOnce || this.player == null) {
					$(this.iFrameWrapper.selector + ' > iframe').attr({ 'src': 'https://player.vimeo.com/video/' + newVimeoId + '?portrait=0&badge=0&byline=0&title=0&api=1' });

					this.player = new Vimeo.Player($(this.iFrameWrapper.selector + ' > iframe'));
					this.loadedOnce = true;
				} else {
					this.player.loadVideo(newVimeoId);
				}

				this.loadingVideo = true;
				this.loadingGifWrapper.play();
				this.updateAllUI();

				var vimeoView = this;
				this.player.on('loaded', function () {
					vimeoView.loadingVideo = false;
					vimeoView.animatedUpdate();
					vimeoView.parent.vimeoViewDidFinishLoading(vimeoView);
					vimeoView.loadingGifWrapper.stop();
				});
			}
		}
	}, {
		key: 'loadingGif',
		get: function get() {
			return this._loadingGif;
		},
		set: function set(newLoadingGif) {
			var changed = this.loadingGif != newLoadingGif;
			if (changed) {
				if (this.loadingGifWrapper != null) {
					this._loadingGif = newLoadingGif;
					this.loadingGifWrapper.gif = this.loadingGif;
				}
			}
		}
	}, {
		key: 'coverImage',
		get: function get() {
			return this._coverImage;
		},
		set: function set(newCoverImage) {
			if (this.coverImage != newCoverImage) {
				this._coverImage = newCoverImage;

				this.updateSubviewOrder();
			}
		}
	}, {
		key: 'paused',
		get: function get() {
			return this.player.getPaused();
		}
	}]);

	return JABVimeoView;
}(JABView);