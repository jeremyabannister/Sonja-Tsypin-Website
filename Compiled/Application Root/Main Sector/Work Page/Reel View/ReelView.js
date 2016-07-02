'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReelView = function (_JABView) {
	_inherits(ReelView, _JABView);

	function ReelView(customId) {
		_classCallCheck(this, ReelView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReelView).call(this, customId));

		_this.currentlyActive = null;
		_this.comingSoon = false;

		// UI
		_this.vimeoView = new JABVimeoView('VimeoView');

		return _this;
	}

	//
	// Init
	//

	_createClass(ReelView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ReelView.prototype), 'init', this).call(this);
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
			this.addVimeoView();
		}
	}, {
		key: 'addVimeoView',
		value: function addVimeoView() {
			this.addSubview(this.vimeoView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ReelView.prototype), 'updateAllUI', this).call(this);

			this.configureVimeoView();
			this.positionVimeoView();
		}

		// Vimeo View

	}, {
		key: 'configureVimeoView',
		value: function configureVimeoView() {

			var vimeoId = '153864846';

			if (this.vimeoView.vimeoId != vimeoId) {
				this.vimeoView.vimeoId = vimeoId;
			}
		}
	}, {
		key: 'positionVimeoView',
		value: function positionVimeoView() {

			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth;
			newFrame.size.height = newFrame.size.width * (9.0 / 16.0);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			this.vimeoView.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Video

	}, {
		key: 'playReel',
		value: function playReel() {
			if (this.vimeoView != null) {
				this.vimeoView.play();
			}
		}
	}, {
		key: 'pauseReel',
		value: function pauseReel() {
			if (this.vimeoView != null) {
				this.vimeoView.pause();
			}
		}

		//
		// Delegate
		//

	}, {
		key: 'currentlyActive',
		get: function get() {
			return this._currentlyActive;
		},
		set: function set(newCurrentlyActive) {
			var changed = this.currentlyActive != newCurrentlyActive;

			if (changed) {
				this._currentlyActive = newCurrentlyActive;

				if (!this.currentlyActive) {
					this.pauseReel();
				}
			}
		}
	}]);

	return ReelView;
}(JABView);