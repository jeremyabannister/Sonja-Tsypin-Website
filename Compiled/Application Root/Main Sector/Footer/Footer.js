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
		_this.leftBufferForCopyrightLabel = 10;

		_this.sizeOfButtons = 20;
		_this.rightBufferForRightButton = _this.leftBufferForCopyrightLabel;
		_this.betweenBufferForButtons = 20;

		_this.buttonImages = ['./Resources/Images/Buttons/Instagram Button.png', './Resources/Images/Buttons/Email Button.png'];

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

			view.text = 'SONJA TSYPIN © 2016';
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

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2;
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
				view.src = this.buttonImages[i];
				view.cursor = 'pointer';
			}
		}
	}, {
		key: 'positionButtons',
		value: function positionButtons() {

			for (var i = 0; i < this.buttons.length; i++) {

				var view = this.buttons[i];
				var newFrame = new CGRect();

				newFrame.size.width = this.sizeOfButtons;
				newFrame.size.height = newFrame.size.width;

				newFrame.origin.x = this.width - (this.width - applicationRoot.contentWidth) / 2 - newFrame.size.width - this.rightBufferForRightButton - i * (this.sizeOfButtons + this.betweenBufferForButtons);
				newFrame.origin.y = 0;

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

	}]);

	return Footer;
}(JABView);