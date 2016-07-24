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
		_this.loadingGif = new JABGif();
		_this.loadedOnce = false;

		// UI
		_this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper');
		_this.iFrameWrapper = new JABView('IFrameWrapper');

		_this.player = null;
		_this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

		// Parameters

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
		key: 'test',
		value: function test() {
			console.log('here');
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

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

		//
		// Event Listeners
		//

		//
		// Actions
		//

	}, {
		key: 'play',
		value: function play() {
			if (this.player != null) {
				this.player.play();
			}
		}
	}, {
		key: 'pause',
		value: function pause() {
			if (this.player != null) {
				this.player.pause();
			}
		}

		//
		// Delegate
		//

	}, {
		key: 'vimeoId',
		get: function get() {
			return this._vimeoId;
		},
		set: function set(newVimeoId) {
			var changed = this.vimeoId != newVimeoId;

			if (changed) {
				this._vimeoId = newVimeoId;

				if (!this.loadedOnce) {
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
		key: 'hello',
		get: function get() {
			this.animatedUpdate();
			return 'hello';
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
	}]);

	return JABVimeoView;
}(JABView);