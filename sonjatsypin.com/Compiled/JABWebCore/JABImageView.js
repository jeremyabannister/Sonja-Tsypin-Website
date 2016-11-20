'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABImageView = function (_JABView) {
	_inherits(JABImageView, _JABView);

	function JABImageView(customId) {
		_classCallCheck(this, JABImageView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JABImageView).call(this, customId));

		_this.image = new UIImage('');

		// UI*
		_this.imageView = "<img>";

		return _this;
	}

	_createClass(JABImageView, [{
		key: 'addAllUI',
		value: function addAllUI() {
			$(this.selector).append(this.imageView);

			var imageView = this;
			$(this.selector + ' > img').on('load', function () {
				if (imageView.parent != null) {
					imageView.parent.imageViewDidFinishLoadingImage(this);
				}
			});
		}
	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABImageView.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'configureImageView',


		//
		// UI
		//

		value: function configureImageView() {

			var configureDuration = this.animationOptions.configureDuration || 0;
			var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out';
			var configureDelay = this.animationOptions.configureDelay || 0;

			var positionDuration = this.animationOptions.positionDuration || 0;
			var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out';
			var positionDelay = this.animationOptions.positionDelay || 0;

			$(this.selector + ' > img').css({
				transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms'
			});
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {

			$(this.selector + ' > img').css({
				'width': this.width + 'px',
				'height': this.height + 'px'
			});
		}
	}, {
		key: 'image',
		get: function get() {
			return this._image;
		},
		set: function set(newImage) {
			this._image = newImage;
			$(this.selector + ' > img').attr({ 'src': newImage.src });
		}
	}, {
		key: 'src',
		get: function get() {
			return this.image.src;
		},
		set: function set(newSrc) {
			if (this.src != newSrc) {
				this.image.src = newSrc;
				this.image = this.image;
			}
		}
	}]);

	return JABImageView;
}(JABView);