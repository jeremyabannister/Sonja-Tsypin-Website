'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentDomain = function (_JABView) {
	_inherits(ContentDomain, _JABView);

	function ContentDomain(customId) {
		_classCallCheck(this, ContentDomain);

		// UI

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContentDomain).call(this, customId));

		_this.projectsList = new ProjectsList('ProjectsList');
		_this.reelView = new ReelView('ReelView');
		_this.footer = new Footer('Footer');

		// State
		_this.stateIndex = 0;
		_this.currentlyActive = null;
		_this.subdued = true;
		_this.readyToClose = true;
		_this.scrollable = false;

		_this.scrollFinishTimer;
		return _this;
	}

	//
	// Init
	//

	_createClass(ContentDomain, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ContentDomain.prototype), 'init', this).call(this);

			this.startEventListeners();
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			if (this.stateIndex == 0) {
				return this.reelView.requiredHeightForWidth(width);
			}
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addProjectsList();
			this.addReelView();
			this.addFooter();
		}
	}, {
		key: 'addProjectsList',
		value: function addProjectsList() {
			this.addSubview(this.projectsList);
		}
	}, {
		key: 'addReelView',
		value: function addReelView() {
			this.addSubview(this.reelView);
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
			_get(Object.getPrototypeOf(ContentDomain.prototype), 'updateAllUI', this).call(this);

			this.configureProjectsList();
			this.positionProjectsList();

			this.configureReelView();
			this.positionReelView();

			this.configureFooter();
			this.positionFooter();
		}

		// Projects List

	}, {
		key: 'configureProjectsList',
		value: function configureProjectsList() {

			this.projectsList.backgroundColor = 'black';

			if (this.stateIndex == 1) {
				if (!this.subviewIsAboveSubviews(this.projectsList, [this.reelView])) {
					this.insertSubviewAboveSubviews(this.projectsList, [this.reelView]);
				}

				setComingSoon(this.projectsList.comingSoon);
			}

			if (this.stateIndex == 1 && !this.subdued) {
				this.projectsList.opacity = 1;
			} else {
				this.projectsList.opacity = 0;
			}
		}
	}, {
		key: 'positionProjectsList',
		value: function positionProjectsList() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.projectsList.requiredHeightForWidth(newFrame.size.width);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection;

			if (this.subdued) {
				newFrame.origin.y += 100;
			}

			this.projectsList.frame = newFrame;
		}

		// Reel Page

	}, {
		key: 'configureReelView',
		value: function configureReelView() {

			this.reelView.backgroundColor = 'black';
			this.reelView.overflow = 'auto';

			if (this.stateIndex == 0) {
				if (!this.subviewIsAboveSubviews(this.reelView, [this.projectsList])) {
					this.insertSubviewAboveSubviews(this.reelView, [this.projectsList]);
				}

				setComingSoon(this.reelView.comingSoon);

				if (this.currentlyActive) {
					this.reelView.currentlyActive = true;
				} else {
					this.reelView.currentlyActive = false;
				}
			} else {
				this.reelView.currentlyActive = false;
			}

			if (this.stateIndex == 0 && !this.subdued) {
				this.reelView.opacity = 1;
			} else {
				this.reelView.opacity = 0;
			}
		}
	}, {
		key: 'positionReelView',
		value: function positionReelView() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.reelView.requiredHeightForWidth(newFrame.size.width);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.heightOfMenuSection;

			if (this.subdued) {
				newFrame.origin.y += 100;
			}

			this.reelView.frame = newFrame;
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
			newFrame.origin.y = this.currentlyActivePage.bottom;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var contentDomain = this;

			$(this.selector).bind('mousewheel', function (evt) {

				if (!contentDomain.scrollable) {
					evt.preventDefault();
				}

				clearTimeout(contentDomain.scrollFinishTimer);
				if (contentDomain.scrollTop <= 0) {
					contentDomain.scrollFinishTimer = setTimeout(function () {
						contentDomain.readyToClose = true;
					}, 50);
				} else {
					contentDomain.readyToClose = false;
				}
			});
		}

		//
		// Actions
		//

		//
		// Delegate
		//

	}, {
		key: 'pages',
		get: function get() {
			return [this.reelView, this.projectsList];
		}
	}, {
		key: 'currentlyActivePage',
		get: function get() {
			return this.pages[this.stateIndex];
		}

		//
		// Getters and Setters
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

				this.configureReelView();
			}
		}
	}]);

	return ContentDomain;
}(JABView);