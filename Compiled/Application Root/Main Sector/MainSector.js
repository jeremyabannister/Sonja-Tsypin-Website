'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSector = function (_JABView) {
	_inherits(MainSector, _JABView);

	function MainSector(customId) {
		_classCallCheck(this, MainSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSector).call(this, customId));

		_this.websiteClosed = true;
		_this.websiteClosedLocked = false;
		_this.homePageHidden = false;
		_this.scrollable = false;

		_this.stateIndex = 0;

		// Scrolling
		_this.scrollPosition = 0;
		_this.scrollSensitivity = 0.5;
		_this.bottomScrollBuffer = 0;
		_this.comingSoon = true;
		_this.scrollReboundTimer;

		// Parameters
		_this.heightOfHeader = 0;

		// UI
		_this.contactPage = new ContactPage('ContactPage');
		_this.aboutPage = new AboutPage('AboutPage');
		_this.morePage = new MorePage('MorePage');
		_this.workPage = new WorkPage('WorkPage');

		_this.comingSoonView = new UILabel('ComingSoonView');

		return _this;
	}

	//
	// Init
	//

	_createClass(MainSector, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'init', this).call(this);
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

			this.addContactPage();
			this.addAboutPage();
			this.addMorePage();
			this.addWorkPage();
			this.addComingSoonView();
		}
	}, {
		key: 'addContactPage',
		value: function addContactPage() {
			this.addSubview(this.contactPage);
		}
	}, {
		key: 'addAboutPage',
		value: function addAboutPage() {
			this.addSubview(this.aboutPage);
		}
	}, {
		key: 'addMorePage',
		value: function addMorePage() {
			this.addSubview(this.morePage);
		}
	}, {
		key: 'addWorkPage',
		value: function addWorkPage() {
			this.addSubview(this.workPage);
		}
	}, {
		key: 'addComingSoonView',
		value: function addComingSoonView() {
			this.addSubview(this.comingSoonView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MainSector.prototype), 'updateAllUI', this).call(this);

			this.configureContactPage();
			this.positionContactPage();

			this.configureAboutPage();
			this.positionAboutPage();

			this.configureMorePage();
			this.positionMorePage();

			this.configureWorkPage();
			this.positionWorkPage();

			this.configureComingSoonView();
			this.positionComingSoonView();
		}

		// Contact Page

	}, {
		key: 'configureContactPage',
		value: function configureContactPage() {
			var view = this.contactPage;

			view.backgroundColor = 'black';
			if (this.currentlyActivePage == view) {
				if (!this.subviewIsAboveSubviews(view, [this.workPage, this.morePage, this.aboutPage])) {
					this.insertSubviewAboveSubviews(view, [this.workPage, this.morePage, this.aboutPage]);
				}

				setComingSoon(view.comingSoon);
			}
		}
	}, {
		key: 'positionContactPage',
		value: function positionContactPage() {
			var view = this.contactPage;

			var newFrame = this.bounds;

			// newFrame.origin.y = this.scrollPosition

			view.frame = newFrame;
		}

		// About Page

	}, {
		key: 'configureAboutPage',
		value: function configureAboutPage() {

			var view = this.aboutPage;

			view.backgroundColor = 'black';
			if (this.currentlyActivePage == view) {
				if (!this.subviewIsAboveSubviews(view, [this.workPage, this.morePage, this.contactPage])) {
					this.insertSubviewAboveSubviews(view, [this.workPage, this.morePage, this.contactPage]);
				}

				setComingSoon(view.comingSoon);
			}

			view.reservedTopBuffer = this.heightOfHeader;

			if (this.websiteClosed) {
				view.subdued = true;
			} else {
				view.subdued = false;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionAboutPage',
		value: function positionAboutPage() {

			var newFrame = this.bounds;

			// newFrame.origin.y = this.scrollPosition

			this.aboutPage.frame = newFrame;
		}

		// More Page

	}, {
		key: 'configureMorePage',
		value: function configureMorePage() {

			var view = this.morePage;

			view.backgroundColor = 'black';
			if (this.currentlyActivePage == view) {
				if (!this.subviewIsAboveSubviews(view, [this.workPage, this.aboutPage, this.contactPage])) {
					this.insertSubviewAboveSubviews(view, [this.workPage, this.aboutPage, this.contactPage]);
				}

				setComingSoon(view.comingSoon);
			}
		}
	}, {
		key: 'positionMorePage',
		value: function positionMorePage() {

			var newFrame = this.bounds;

			// newFrame.origin.y = this.scrollPosition

			this.morePage.frame = newFrame;
		}

		// Work Page

	}, {
		key: 'configureWorkPage',
		value: function configureWorkPage() {

			var view = this.workPage;

			view.backgroundColor = 'black';
			view.reservedTopBuffer = this.heightOfHeader;
			view.scrollable = this.scrollable;

			if (this.currentlyActivePage == view) {
				if (!this.subviewIsAboveSubviews(view, [this.morePage, this.aboutPage, this.contactPage])) {
					this.insertSubviewAboveSubviews(view, [this.morePage, this.aboutPage, this.contactPage]);
				}

				setComingSoon(view.comingSoon);

				if (!this.websiteClosed) {
					view.currentlyActive = true;
				} else {
					view.currentlyActive = false;
				}
			} else {
				this.workPage.currentlyActive = false;
			}

			if (this.websiteClosed) {
				view.subdued = true;
			} else {
				view.subdued = false;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionWorkPage',
		value: function positionWorkPage() {

			var view = this.workPage;
			var newFrame = this.bounds;
			view.frame = newFrame;
		}

		// Coming Soon View

	}, {
		key: 'configureComingSoonView',
		value: function configureComingSoonView() {

			this.comingSoonView.text = 'COMING SOON...';

			this.comingSoonView.textColor = 'white';
			this.comingSoonView.fontSize = 30;
			this.comingSoonView.fontFamily = 'siteFont';
			this.comingSoonView.fontWeight = 'bold';
			this.comingSoonView.letterSpacing = 1.5;

			this.comingSoonView.configureDuration = 0;

			if (this.comingSoon) {
				this.comingSoonView.opacity = 1;
			} else {
				this.comingSoonView.opacity = 0;
			}
		}
	}, {
		key: 'positionComingSoonView',
		value: function positionComingSoonView() {

			var size = this.comingSoonView.font.sizeOfString(this.comingSoonView.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			this.comingSoonView.frame = newFrame;
		}

		//
		// Actions
		//

		//
		// Delegate
		//

	}, {
		key: 'websiteClosed',
		get: function get() {
			return this._websiteClosed;
		},
		set: function set(newWebsiteClosed) {
			if (!this.websiteClosedLocked) {
				this._websiteClosed = newWebsiteClosed;
			}
		}
	}, {
		key: 'currentlyActivePage',
		get: function get() {
			return this.pages[this.stateIndex];
		}
	}, {
		key: 'pages',
		get: function get() {
			return [this.workPage, this.morePage, this.aboutPage, this.contactPage];
		}
	}, {
		key: 'readyToClose',
		get: function get() {

			return this.workPage.contentDomain.readyToClose;
		}
	}]);

	return MainSector;
}(JABView);

function setComingSoon(newComingSoon) {

	if (newComingSoon != null) {
		var changed = applicationRoot.mainSector.comingSoon != newComingSoon;
		applicationRoot.mainSector.comingSoon = newComingSoon;

		if (changed) {
			applicationRoot.mainSector.updateAllUI();
		}
	}
}