'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_JABView) {
	_inherits(Logo, _JABView);

	function Logo(customId) {
		_classCallCheck(this, Logo);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).call(this, customId));

		_this.faded = true;
		_this.requiredHeight = 400;
		_this.requiredWidth = 400;

		// UI
		_this.sonjaTsypinLabel = new UILabel('SonjaTsypinLabel');
		_this.cinematographerLabel = new UILabel('CinematographerLabel');

		// Initialize
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(Logo, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addSonjaTsypinLabel();
			this.addCinematographerLabel();
		}
	}, {
		key: 'addSonjaTsypinLabel',
		value: function addSonjaTsypinLabel() {
			this.addSubview(this.sonjaTsypinLabel);
		}
	}, {
		key: 'addCinematographerLabel',
		value: function addCinematographerLabel() {
			this.addSubview(this.cinematographerLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Logo.prototype), 'updateAllUI', this).call(this);

			this.configureSonjaTsypinLabel();
			this.positionSonjaTsypinLabel();

			this.configureCinematographerLabel();
			this.positionCinematographerLabel();
		}

		// Sonja Tsypin Label

	}, {
		key: 'configureSonjaTsypinLabel',
		value: function configureSonjaTsypinLabel() {

			this.sonjaTsypinLabel.text = "SONJA TSYPIN";
			this.sonjaTsypinLabel.fontFamily = 'siteFont';
			this.sonjaTsypinLabel.textColor = 'white';

			var fontSizes = { 'xs': 21, 's': 38, 'm': 28, 'l': 28, 'xl': 28 };
			this.sonjaTsypinLabel.fontSize = fontSizes[sizeClass];
			this.sonjaTsypinLabel.fontWeight = 'normal';
			this.sonjaTsypinLabel.letterSpacing = 3.5;
		}
	}, {
		key: 'positionSonjaTsypinLabel',
		value: function positionSonjaTsypinLabel() {

			var leftBufferForSonjaTsypinLabel = 0;
			var topBufferForSonjaTsypinLabel = 0;

			var size = this.sonjaTsypinLabel.font.sizeOfString(this.sonjaTsypinLabel.text);
			this.sonjaTsypinLabel.frame = new CGRect(leftBufferForSonjaTsypinLabel, topBufferForSonjaTsypinLabel, size.width, size.height);
		}

		// Cinematographer Label

	}, {
		key: 'configureCinematographerLabel',
		value: function configureCinematographerLabel() {

			this.cinematographerLabel.text = "CINEMATOGRAPHER";
			this.cinematographerLabel.textColor = 'white';

			var fontSizes = { 'xs': 9, 's': 19, 'm': 12, 'l': 12, 'xl': 12 };
			this.cinematographerLabel.fontSize = fontSizes[sizeClass];

			var letterSpacings = { 'xs': 7, 's': 8.4, 'm': 8.4, 'l': 8.4, 'xl': 8.4 };
			this.cinematographerLabel.letterSpacing = letterSpacings[sizeClass];
			this.cinematographerLabel.fontWeight = 'normal';

			if (this.faded) {
				this.cinematographerLabel.opacity = 0.6;
			} else {
				this.cinematographerLabel.opacity = 0.8;
			}
		}
	}, {
		key: 'positionCinematographerLabel',
		value: function positionCinematographerLabel() {

			var bufferBetweenSonjaTsypinLabelAndCinematographerLabel = -1;
			var size = this.cinematographerLabel.font.sizeOfString(this.cinematographerLabel.text);

			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.sonjaTsypinLabel.x + (this.sonjaTsypinLabel.width - newFrame.size.width) / 2 + 2;
			newFrame.origin.y = this.sonjaTsypinLabel.bottom + bufferBetweenSonjaTsypinLabelAndCinematographerLabel;

			this.cinematographerLabel.frame = newFrame;

			this.requiredHeight = this.cinematographerLabel.bottom - this.sonjaTsypinLabel.top;
			this.requiredWidth = this.sonjaTsypinLabel.width;
		}

		//
		// Actions
		//

	}]);

	return Logo;
}(JABView);