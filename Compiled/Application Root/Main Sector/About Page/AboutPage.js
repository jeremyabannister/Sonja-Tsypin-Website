'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutPage = function (_JABView) {
	_inherits(AboutPage, _JABView);

	function AboutPage(customId) {
		_classCallCheck(this, AboutPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AboutPage).call(this, customId));

		_this.subdued = false;
		_this.comingSoon = false;

		_this.scrollable = false;
		_this.scrollFinishTimer;
		_this.readyToClose = true;

		// Parameters
		_this.reservedTopBuffer = 0;
		_this.topBufferForBioText = 80;
		_this.bottomBufferForEmailAddress = 60;

		// UI
		_this.bioText = new UILabel('Bio');
		_this.line = new JABView("Line");
		_this.emailAddress = new UILabel('EmailAddress');

		_this.footer = new Footer('Footer');
		return _this;
	}

	//
	// Init
	//

	_createClass(AboutPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(AboutPage.prototype), 'init', this).call(this);

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

			this.addBioText();
			this.addLine();
			this.addEmailAddress();

			this.addFooter();
		}
	}, {
		key: 'addBioText',
		value: function addBioText() {
			this.addSubview(this.bioText);
		}
	}, {
		key: 'addLine',
		value: function addLine() {
			this.addSubview(this.line);
		}
	}, {
		key: 'addEmailAddress',
		value: function addEmailAddress() {
			this.addSubview(this.emailAddress);
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
			_get(Object.getPrototypeOf(AboutPage.prototype), 'updateAllUI', this).call(this);

			this.configureBioText();
			this.positionBioText();

			this.configureEmailAddress();
			this.positionEmailAddress();

			this.configureLine();
			this.positionLine();

			this.configureFooter();
			this.positionFooter();
		}

		// Bio

	}, {
		key: 'configureBioText',
		value: function configureBioText() {

			this.bioText.text = '<i>Sonja Tsypin is a director and cinematographer based in New York and Los Angeles. Sonja\'s most recent short film, POWDER ROOM (2016), recieved the Bard College Seniors to Seniors Grant as well as the Adolfas Mekas Award, and won Best Student Short Drama in the Los Angeles Independant Film Festival. Sonja\'s other recent work as Director of Photography includes upcoming narrative feature-length film ANGELS [2016, dir. Audrey Banks], short psychological drama BIRTH DAY [2016, dir. Eva Evans] and short horror film THEODORE [2015, dir. Ondine Vi\u00f1ao]. Sonja\'s directing work includes CONTACT ESTERINA [2014], a feature-length documentary about an Orthodox Jewish woman breaking away from tradition and THE MURDER [2014], a short film remake of Alfred Hitchcock\'s "Blackmail." Sonja comes from a background in fine art; she is the recipient of two regional Gold Keys and a national Gold Medal and Best in Grade award in the Scholastic Art and Writing Awards. Sonja will attend the American Film Institute (AFI) Conservatory in Los Angeles starting in Fall 2016 for a Master\'s Degree in cinematography.</i>';
			this.bioText.textColor = 'white';
			this.bioText.fontSize = 13;
			this.bioText.fontFamily = 'siteFont';
			this.bioText.fontWeight = 'normal';
			this.bioText.lineHeight = 1.5;

			if (this.subdued) {
				this.bioText.opacity = 0;
			} else {
				this.bioText.opacity = 1;
			}

			$(this.bioText.selector).css({
				textIndent: '40px'
			});
		}
	}, {
		key: 'positionBioText',
		value: function positionBioText() {

			var newFrame = new CGRect();

			newFrame.size.width = 740;

			var size = this.bioText.font.sizeOfString(this.bioText.text, newFrame.size.width);
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.reservedTopBuffer + this.topBufferForBioText;

			this.bioText.frame = newFrame;
		}

		//Line

	}, {
		key: 'configureLine',
		value: function configureLine() {

			this.line.backgroundColor = 'white';

			if (this.subdued) {
				this.line.opacity = 0;
			} else {
				this.line.opacity = 1;
			}
		}
	}, {
		key: 'positionLine',
		value: function positionLine() {

			var newFrame = new CGRect();

			newFrame.size.width = 60;
			newFrame.size.height = 1;

			newFrame.origin.x = this.emailAddress.x;
			newFrame.origin.y = this.emailAddress.y - newFrame.size.height - 25;

			this.line.frame = newFrame;
		}

		// Email Address

	}, {
		key: 'configureEmailAddress',
		value: function configureEmailAddress() {

			this.emailAddress.text = "e-mail &nbsp;:: &nbsp;sonjatsypin@gmail.com";
			this.emailAddress.textColor = 'white';
			this.emailAddress.fontSize = 13;
			this.emailAddress.fontFamily = 'siteFont';
			this.emailAddress.fontWeight = 'normal';

			if (this.subdued) {
				this.emailAddress.opacity = 0;
			} else {
				this.emailAddress.opacity = 1;
			}
		}
	}, {
		key: 'positionEmailAddress',
		value: function positionEmailAddress() {

			var size = this.emailAddress.font.sizeOfString(this.emailAddress.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.bioText.x;
			newFrame.origin.y = this.bioText.bottom + 56;

			this.emailAddress.frame = newFrame;
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
			newFrame.origin.y = this.emailAddress.bottom + this.bottomBufferForEmailAddress;

			if (newFrame.origin.y < this.height - this.footer.requiredHeight) {
				newFrame.origin.y = this.height - this.footer.requiredHeight;
			}

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var aboutPage = this;

			$(this.selector).bind('mousewheel', function (evt) {

				if (!aboutPage.scrollable) {
					evt.preventDefault();
				}

				clearTimeout(aboutPage.scrollFinishTimer);
				if (aboutPage.scrollTop <= 0) {
					aboutPage.scrollFinishTimer = setTimeout(function () {
						aboutPage.readyToClose = true;
					}, 50);
				} else {
					aboutPage.readyToClose = false;
				}
			});
		}

		//
		// Actions
		//

		//
		// Delegate
		//

	}]);

	return AboutPage;
}(JABView);