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

		_this.possibleStates = ['WorkPage', 'MorePage', 'AboutPage', 'ContactPage'];
		_this.state = _this.possibleStates[0];
		_this.comingSoon = true;

		_this.totalScrollDistanceSinceLastTrigger = 0;
		_this.heightOfHeader = 100;

		// UI
		_this.contactPage = new ContactPage('ContactPage');
		_this.aboutPage = new AboutPage('AboutPage');
		_this.morePage = new MorePage('MorePage');
		_this.workPage = new WorkPage('WorkPage');

		_this.comingSoonView = new UILabel('ComingSoonView');

		_this.homePage = new HomePage('HomePage');
		_this.header = new Header('Header');

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
			this.addHomePage();
			this.addHeader();
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
	}, {
		key: 'addHomePage',
		value: function addHomePage() {
			this.addSubview(this.homePage);
		}
	}, {
		key: 'addHeader',
		value: function addHeader() {
			this.addSubview(this.header);
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

			this.configureHomePage();
			this.positionHomePage();

			this.configureHeader();
			this.positionHeader();
		}

		// Contact Page

	}, {
		key: 'configureContactPage',
		value: function configureContactPage() {

			this.contactPage.backgroundColor = 'black';

			if (this.state == this.possibleStates[3]) {
				if (!this.subviewIsAboveSubviews(this.contactPage, [this.workPage, this.morePage, this.aboutPage])) {
					this.insertSubviewAboveSubviews(this.contactPage, [this.workPage, this.morePage, this.aboutPage]);
				}

				setComingSoon(this.contactPage.comingSoon);
			}
		}
	}, {
		key: 'positionContactPage',
		value: function positionContactPage() {

			this.contactPage.frame = this.bounds;
		}

		// About Page

	}, {
		key: 'configureAboutPage',
		value: function configureAboutPage() {

			this.aboutPage.backgroundColor = 'black';
			this.aboutPage.reservedTopBuffer = this.heightOfHeader;

			if (this.websiteClosed) {
				this.aboutPage.subdued = true;
			} else {
				this.aboutPage.subdued = false;
			}

			if (this.state == this.possibleStates[2]) {
				if (!this.subviewIsAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage])) {
					this.insertSubviewAboveSubviews(this.aboutPage, [this.workPage, this.morePage, this.contactPage]);
				}

				setComingSoon(this.aboutPage.comingSoon);
			}

			this.aboutPage.updateAllUI();
		}
	}, {
		key: 'positionAboutPage',
		value: function positionAboutPage() {

			var newFrame = this.bounds;

			this.aboutPage.frame = newFrame;
		}

		// More Page

	}, {
		key: 'configureMorePage',
		value: function configureMorePage() {

			this.morePage.backgroundColor = 'black';

			if (this.state == this.possibleStates[1]) {
				if (!this.subviewIsAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage])) {
					this.insertSubviewAboveSubviews(this.morePage, [this.workPage, this.aboutPage, this.contactPage]);
				}

				setComingSoon(this.morePage.comingSoon);
			}
		}
	}, {
		key: 'positionMorePage',
		value: function positionMorePage() {

			this.morePage.frame = this.bounds;
		}

		// Work Page

	}, {
		key: 'configureWorkPage',
		value: function configureWorkPage() {

			this.workPage.backgroundColor = 'black';
			this.workPage.reservedTopBuffer = this.heightOfHeader;

			if (this.websiteClosed) {
				this.workPage.subdued = true;
			} else {
				this.workPage.subdued = false;
			}

			if (this.state == this.possibleStates[0]) {
				if (!this.subviewIsAboveSubviews(this.workPage, [this.morePage, this.aboutPage, this.contactPage])) {
					this.insertSubviewAboveSubviews(this.workPage, [this.morePage, this.aboutPage, this.contactPage]);
				}

				setComingSoon(this.workPage.comingSoon);

				this.workPage.updateAllUI();

				if (!this.websiteClosed) {
					this.workPage.currentlyActive = true;
				} else {
					this.workPage.currentlyActive = false;
				}
			} else {
				this.workPage.currentlyActive = false;
			}
		}
	}, {
		key: 'positionWorkPage',
		value: function positionWorkPage() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;

			if (this.state == this.possibleStates[0]) {
				newFrame.origin.y = 0;
			} else {
				newFrame.origin.y = 0;
			}

			this.workPage.frame = newFrame;
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

		// Home Page

	}, {
		key: 'configureHomePage',
		value: function configureHomePage() {

			this.homePage.overflow = 'hidden';
			this.homePage.positioningEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';
		}
	}, {
		key: 'positionHomePage',
		value: function positionHomePage() {

			if (this.websiteClosed) {
				this.homePage.frame = new CGRect(0, 0, this.width, this.height);
			} else {
				this.homePage.frame = new CGRect(0, -this.height, this.width, this.height);
			}
		}

		// Header

	}, {
		key: 'configureHeader',
		value: function configureHeader() {

			this.header.websiteClosed = this.websiteClosed;
			this.header.selectedMenuIndex = $.inArray(this.state, this.possibleStates);
			this.header.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.heightOfHeader);
		}

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'openWebsite',
		value: function openWebsite(duration) {
			if (this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = false;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					});
				}
			}
		}
	}, {
		key: 'closeWebsite',
		value: function closeWebsite(duration) {
			if (!this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = true;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					});
				}
			}
		}
	}, {
		key: 'setWebsiteClosedLockedForTimeout',
		value: function setWebsiteClosedLockedForTimeout(timeoutDuration) {
			this.websiteClosedLocked = true;
			var mainSector = this;
			setTimeout(function () {
				mainSector.websiteClosedLocked = false;
			}, timeoutDuration);
		}

		// Scrolling

	}, {
		key: 'userDidScrollByAmount',
		value: function userDidScrollByAmount(amount) {

			if (this.websiteClosed) {
				if (amount < 0) {
					this.openWebsite(800);
				}
			} else {
				if (amount > 0) {
					this.closeWebsite(800);
				}
			}
		}
	}, {
		key: 'userDidStopScrolling',
		value: function userDidStopScrolling() {}

		//
		// Delegate
		//

		// Home Page

	}, {
		key: 'homePageDownArrowWasClicked',
		value: function homePageDownArrowWasClicked() {
			this.openWebsite();
		}

		// Header

	}, {
		key: 'headerLogoWasClicked',
		value: function headerLogoWasClicked() {
			this.closeWebsite();
		}
	}, {
		key: 'headerDidSelectPage',
		value: function headerDidSelectPage(pageIdentifier) {

			if (pageIdentifier == 'work') {
				this.state = this.possibleStates[0];
				this.workPage.state = this.workPage.possibleStates[0];
			} else if (pageIdentifier == 'more') {
				this.state = this.possibleStates[1];
			} else if (pageIdentifier == 'about') {
				this.state = this.possibleStates[2];
			} else if (pageIdentifier == 'contact') {
				this.state = this.possibleStates[3];
			}

			if (this.websiteClosed) {
				this.openWebsite();
			} else {
				this.animatedUpdate();
			}
		}
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