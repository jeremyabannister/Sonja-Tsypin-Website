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

		_this.state = {
			readyToClose: true
		};
		_this.subdued = false;

		_this.scrollable = false;
		_this.scrollFinishTimer;
		_this.readyToClose = true;

		// Parameters
		_this.reservedTopBuffer = 0;
		_this.topBufferForBioText = 103;
		_this.bottomBufferForEmailAddress = 60;

		// UI
		_this.bioText = new UILabel('Bio');
		_this.line = new JABView("Line");
		_this.emailAddressLabel = new UILabel('EmailAddressLabel');

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
			this.addEmailAddressLabel();

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
		key: 'addEmailAddressLabel',
		value: function addEmailAddressLabel() {
			this.addSubview(this.emailAddressLabel);
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

			this.updateParameters();

			this.configureBioText();
			this.positionBioText();

			this.configureEmailAddressLabel();
			this.positionEmailAddressLabel();

			this.configureLine();
			this.positionLine();

			this.configureFooter();
			this.positionFooter();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				this.topBufferForBioText = 70;
			}
		}

		// Bio

	}, {
		key: 'configureBioText',
		value: function configureBioText() {

			if (this.bioText.text == '') {
				this.bioText.text = "Sonja Tsypin is a cinematographer based in New York and Los Angeles. Her most recent short film, <span id='powderRoomSpan---" + this.id + "' style='color:white; cursor:pointer'>Powder Room</span> (2016), recieved the Bard College Seniors to Seniors Grant, the Adolfas Mekas Award, and won Best Student Short Drama in the Los Angeles Independant Film Festival. Sonja was also recently awarded First Place in the international 2016 KODAK Student Cinematography Scholarship Awards. Sonja comes from a background in fine art (view work <a target='_blank' href='http://www.sonjatsypin.weebly.com'><span style='color:white'>here</span></a>); she is the recipient of two regional Gold Keys and a national Gold Medal and Best in Grade award in the Scholastic Art and Writing Awards. Sonja is currently studying towards a master's degree in cinematography at the American Film Institute (AFI) Conservatory in Los Angeles.";

				var parent = this.parent;
				$('#powderRoomSpan---' + this.id).click(function () {
					parent.aboutPageWantsToDisplayProject(this, 'powderRoom');
				});
			}

			this.bioText.textColor = '#999999';
			this.bioText.fontSize = 14;
			this.bioText.fontFamily = 'siteFont';
			this.bioText.fontWeight = 'normal';
			this.bioText.lineHeight = 1.7;

			if (sizeClass == 'xxs') {
				this.bioText.textAlign = 'justify';
				$(this.bioText.selector).css({
					'text-justify': 'inter-word'
				});

				this.bioText.fontSize = 13;
				this.bioText.lineHeight = 1.5;
			} else if (sizeClass == 'xs') {
				this.bioText.textAlign = 'justify';
				$(this.bioText.selector).css({
					'text-justify': 'inter-word'
				});

				this.bioText.fontSize = 20;
				this.bioText.lineHeight = 1.8;
			}

			if (this.subdued) {
				this.bioText.opacity = 0;
			} else {
				this.bioText.opacity = 1;
			}

			if ($(this.bioText.selector).css('textIndent') != '40px') {
				$(this.bioText.selector).css({
					textIndent: '40px'
				});
			}
		}
	}, {
		key: 'positionBioText',
		value: function positionBioText() {

			var newFrame = new CGRect();

			newFrame.size.width = 660;
			if (newFrame.size.width > applicationRoot.contentWidth - 10) {
				newFrame.size.width = applicationRoot.contentWidth - 10;
			}

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

			newFrame.origin.x = this.emailAddressLabel.x;
			newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25;

			this.line.frame = newFrame;
		}

		// Email Address

	}, {
		key: 'configureEmailAddressLabel',
		value: function configureEmailAddressLabel() {

			var view = this.emailAddressLabel;
			if (view.text == '') {
				view.text = "e-mail &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:white; cursor: pointer'>sonjatsypin@gmail.com</span>";

				var parent = this.parent;
				$('#emailAddress---' + this.id).click(function () {
					parent.aboutPageWantsToOpenMailForm(this);
				});
			}

			view.textColor = '#999999';
			view.fontSize = 13;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';

			if (sizeClass == 'xxs') {
				view.fontSize = 16;
			} else if (sizeClass == 'xs') {
				view.fontSize = 20;
			}

			if (this.subdued) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionEmailAddressLabel',
		value: function positionEmailAddressLabel() {

			var view = this.emailAddressLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.bioText.x;
			newFrame.origin.y = this.bioText.bottom + 56;

			view.frame = newFrame;
		}

		// Footer

	}, {
		key: 'configureFooter',
		value: function configureFooter() {
			var view = this.footer;

			view.updateAllUI();
		}
	}, {
		key: 'positionFooter',
		value: function positionFooter() {

			var view = this.footer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.footer.requiredHeight;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.emailAddressLabel.bottom + this.bottomBufferForEmailAddress;

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
						aboutPage.state.readyToClose = true;
					}, 50);
				} else {
					aboutPage.state.readyToClose = false;
				}

				if (aboutPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
					evt.preventDefault();
				}
			});
		}

		//
		// Actions
		//

		//
		// Delegate
		//

		// Footer

	}, {
		key: 'footerMailButtonWasClicked',
		value: function footerMailButtonWasClicked(footer) {
			this.parent.aboutPageWantsToOpenMailForm(this);
		}
	}]);

	return AboutPage;
}(JABView);