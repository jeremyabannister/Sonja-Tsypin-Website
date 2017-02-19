'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_JABView) {
	_inherits(Footer, _JABView);

	function Footer(customId) {
		_classCallCheck(this, Footer);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this, customId));

		_this.requiredHeight = 50;

		// Parameters
		_this.leftBufferForCopyrightLabel = 5;

		_this.sizeOfButtons = 14;

		_this.buttonWidthToHeights = [1, 1, 1.32941176];
		_this.buttonHeightAdjustments = [0, 1, -2];
		_this.buttonSeparationAdjustments = [3, 2];
		_this.buttonYAdjustments = [0, 1, -2];

		_this.rightBufferForRightButton = _this.leftBufferForCopyrightLabel;
		_this.betweenBufferForButtons = 10;

		_this.buttonImages = [resourcesDirectory + '/Images/Buttons/Instagram Button.png', resourcesDirectory + '/Images/Buttons/Art Button.png', resourcesDirectory + '/Images/Buttons/Email Button.png'];

		// UI
		_this.copyrightLabel = new UILabel('CopyrightLabel');

		_this.buttons = [];
		for (var i = 0; i < _this.buttonImages.length; i++) {
			_this.buttons.push(new JABImageView());
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(Footer, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(Footer.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addCopyrightLabel();

			this.addButtons();
		}
	}, {
		key: 'addCopyrightLabel',
		value: function addCopyrightLabel() {
			this.addSubview(this.copyrightLabel);
		}
	}, {
		key: 'addButtons',
		value: function addButtons() {
			for (var i = 0; i < this.buttons.length; i++) {
				this.addSubview(this.buttons[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Footer.prototype), 'updateAllUI', this).call(this);

			this.configureCopyrightLabel();
			this.positionCopyrightLabel();

			this.configureButtons();
			this.positionButtons();
		}

		// Copyright Label

	}, {
		key: 'configureCopyrightLabel',
		value: function configureCopyrightLabel() {

			var view = this.copyrightLabel;

			view.text = 'SONJA TSYPIN ' + trademarkC + ' 2016';
			view.textColor = 'white';
			view.fontFamily = 'siteFont';
			view.fontWeight = 'bold';
			view.fontSize = 10;
			view.fontWeight = 300;
			view.letterSpacing = 1.5;
		}
	}, {
		key: 'positionCopyrightLabel',
		value: function positionCopyrightLabel() {

			var view = this.copyrightLabel;
			var newFrame = new CGRect();
			var size = this.copyrightLabel.font.sizeOfString(this.copyrightLabel.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2 + this.leftBufferForCopyrightLabel;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Buttons

	}, {
		key: 'configureButtons',
		value: function configureButtons() {

			for (var i = 0; i < this.buttons.length; i++) {
				var view = this.buttons[i];

				view.clickable = true;
				var imagePath = this.buttonImages[i];
				if (imageBank.imageStatus[imagePath] == true) {
					view.src = imagePath;
				}
				view.cursor = 'pointer';
			}
		}
	}, {
		key: 'positionButtons',
		value: function positionButtons() {

			for (var i = 0; i < this.buttons.length; i++) {

				var buttonIndex = this.buttons.length - 1 - i;
				var view = this.buttons[buttonIndex];
				var newFrame = new CGRect();

				newFrame.size.height = this.sizeOfButtons + this.buttonHeightAdjustments[buttonIndex];
				newFrame.size.width = newFrame.size.height * this.buttonWidthToHeights[buttonIndex];

				var separationAdjustment = 0;
				if (buttonIndex != 2) {
					separationAdjustment = this.buttonSeparationAdjustments[buttonIndex];
				}

				newFrame.origin.x = this.width - (this.width - applicationRoot.contentWidth) / 2 - newFrame.size.width - this.rightBufferForRightButton - i * (this.sizeOfButtons + this.betweenBufferForButtons) - separationAdjustment;
				newFrame.origin.y = (this.height - newFrame.size.height) / 2 + this.buttonYAdjustments[buttonIndex];

				view.frame = newFrame;
			}
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.buttons[0]) {
				window.open('http://www.instagram.com/sonjatsypin');
			} else if (view == this.buttons[1]) {
				window.open('http://www.sonjatsypin.weebly.com');
			} else if (view == this.buttons[2]) {
				this.parent.footerMailButtonWasClicked(this);
			}
		}
	}]);

	return Footer;
}(JABView);