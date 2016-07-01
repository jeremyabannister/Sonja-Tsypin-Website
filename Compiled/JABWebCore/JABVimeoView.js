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

		// UI
		_this.player = null;
		_this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";

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
			$(this.selector).append(this.iframe);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABVimeoView.prototype), 'updateAllUI', this).call(this);

			this.configureIframe();
			this.positionIframe();
		}
	}, {
		key: 'configureIframe',
		value: function configureIframe() {
			$(this.selector + ' > iframe').css({
				border: 0
			});
		}
	}, {
		key: 'positionIframe',
		value: function positionIframe() {

			$(this.selector + ' > iframe').css({
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
				$(this.selector + ' > iframe').attr({ 'src': 'https://player.vimeo.com/video/' + newVimeoId + '?portrait=0&badge=0&byline=0&title=0&api=1' });

				this.player = new Vimeo.Player($(this.selector + ' > iframe'));
			}
		}
	}]);

	return JABVimeoView;
}(JABView);