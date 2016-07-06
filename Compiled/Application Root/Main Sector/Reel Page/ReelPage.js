'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReelPage = function (_JABView) {
	_inherits(ReelPage, _JABView);

	function ReelPage(customId) {
		_classCallCheck(this, ReelPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReelPage).call(this, customId));

		_this.currentlyActive = null;
		_this.comingSoon = false;

		_this.scrollable = false;
		_this.scrollFinishTimer;
		_this.readyToClose = true;

		// Parameters
		_this.reservedTopBuffer = 0;
		_this.topBufferForVimeoView = 20;
		_this.bottomBufferForVimeoView = 60;

		// UI
		_this.vimeoView = new JABVimeoView('VimeoView');
		_this.footer = new Footer('Footer');
		return _this;
	}

	//
	// Init
	//

	_createClass(ReelPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ReelPage.prototype), 'init', this).call(this);

			this.startEventListeners();
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			return this.footer.bottom;
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addVimeoView();
			this.addFooter();
		}
	}, {
		key: 'addVimeoView',
		value: function addVimeoView() {
			this.addSubview(this.vimeoView);
		}
	}, {
		key: 'addFooter',
		value: function addFooter() {
			this.addSubview(this.footer);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ReelPage.prototype), 'updateAllUI', this).call(this);

			this.configureVimeoView();
			this.positionVimeoView();

			this.configureFooter();
			this.positionFooter();
		}

		// Vimeo View

	}, {
		key: 'configureVimeoView',
		value: function configureVimeoView() {

			var vimeoId = '153864846';

			if (this.vimeoView.vimeoId != vimeoId) {
				this.vimeoView.vimeoId = vimeoId;
			}

			this.vimeoView.blur = 0;
		}
	}, {
		key: 'positionVimeoView',
		value: function positionVimeoView() {

			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth;
			newFrame.size.height = newFrame.size.width * (9.0 / 16.0);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.topBufferForVimeoView;

			this.vimeoView.frame = newFrame;
		}

		// Footer

	}, {
		key: 'configureFooter',
		value: function configureFooter() {}
	}, {
		key: 'positionFooter',
		value: function positionFooter() {

			var view = this.footer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.footer.requiredHeight;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.vimeoView.bottom + this.bottomBufferForVimeoView;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var reelPage = this;

			$(this.selector).bind('mousewheel', function (evt) {

				if (!reelPage.scrollable) {
					evt.preventDefault();
				}

				clearTimeout(reelPage.scrollFinishTimer);
				if (reelPage.scrollTop <= 0) {
					reelPage.scrollFinishTimer = setTimeout(function () {
						reelPage.readyToClose = true;
					}, 50);
				} else {
					reelPage.readyToClose = false;
				}

				if (reelPage.readyToClose && evt.originalEvent.wheelDelta > 0) {
					evt.preventDefault();
				}
			});
		}

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

	return ReelPage;
}(JABView);