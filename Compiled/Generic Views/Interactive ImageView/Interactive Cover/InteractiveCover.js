'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveCover = function (_JABView) {
	_inherits(InteractiveCover, _JABView);

	function InteractiveCover(customId) {
		_classCallCheck(this, InteractiveCover);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InteractiveCover).call(this, customId));

		_this.imageData = new ImageData();
		_this.visible = false;

		// UI
		_this.titleLabel = new UILabel('TitleLabel');
		_this.subtitleLabel = new UILabel('SubtitleLabel');
		_this.yearLabel = new UILabel('YearLabel');
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(InteractiveCover, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addTitleLabel();
			this.addSubtitleLabel();
			this.addYearLabel();
		}
	}, {
		key: 'addTitleLabel',
		value: function addTitleLabel() {
			this.addSubview(this.titleLabel);
		}
	}, {
		key: 'addSubtitleLabel',
		value: function addSubtitleLabel() {
			this.addSubview(this.subtitleLabel);
		}
	}, {
		key: 'addYearLabel',
		value: function addYearLabel() {
			this.addSubview(this.yearLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(InteractiveCover.prototype), 'updateAllUI', this).call(this);

			this.configureTitleLabel();
			this.positionTitleLabel();

			this.configureSubtitleLabel();
			this.positionSubtitleLabel();

			this.configureYearLabel();
			this.positionYearLabel();
		}

		// Title Label

	}, {
		key: 'configureTitleLabel',
		value: function configureTitleLabel() {

			this.titleLabel.text = this.imageData.title;
			this.titleLabel.textColor = 'white';
			// this.titleLabel.fontFamily = 'Montserrat'
			// this.titleLabel.opacity = 0.4
			this.titleLabel.fontSize = 20;
			this.titleLabel.fontWeight = 300;
			this.titleLabel.letterSpacing = 3;

			if (this.visible) {
				this.titleLabel.opacity = 1;
			} else {
				this.titleLabel.opacity = 0;
			}
		}
	}, {
		key: 'positionTitleLabel',
		value: function positionTitleLabel() {

			var leftBufferForTitleLabel = 40;
			var topBufferForTitleLabel = 34;

			var size = this.titleLabel.font.sizeOfString(this.titleLabel.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = leftBufferForTitleLabel;
			newFrame.origin.y = topBufferForTitleLabel;

			this.titleLabel.frame = newFrame;
		}

		// Subtitle LAbel

	}, {
		key: 'configureSubtitleLabel',
		value: function configureSubtitleLabel() {

			this.subtitleLabel.text = this.imageData.subtitle;
			this.subtitleLabel.textColor = 'white';
			// this.subtitleLabel.fontFamily = 'Montserrat'
			// this.subtitleLabel.opacity = 0.4
			this.subtitleLabel.fontSize = 12;
			this.subtitleLabel.fontWeight = 300;
			this.subtitleLabel.letterSpacing = 3;

			if (this.visible) {
				this.subtitleLabel.opacity = 1;
			} else {
				this.subtitleLabel.opacity = 0;
			}
		}
	}, {
		key: 'positionSubtitleLabel',
		value: function positionSubtitleLabel() {

			var bufferBetweenTitleLabelAndSubtitleLabel = 0;

			var size = this.subtitleLabel.font.sizeOfString(this.subtitleLabel.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.titleLabel.x;
			newFrame.origin.y = this.titleLabel.bottom + bufferBetweenTitleLabelAndSubtitleLabel;

			this.subtitleLabel.frame = newFrame;
		}

		// Year Label

	}, {
		key: 'configureYearLabel',
		value: function configureYearLabel() {
			this.yearLabel.text = this.imageData.year;
			this.yearLabel.textColor = 'white';
			// this.yearLabel.fontFamily = 'Montserrat'
			// this.yearLabel.opacity = 0.4
			this.yearLabel.fontSize = 14;
			this.yearLabel.fontWeight = 300;
			this.yearLabel.letterSpacing = 1;
			// this.yearLabel.opacity = 0.6

			if (this.visible) {
				this.yearLabel.opacity = 1;
			} else {
				this.yearLabel.opacity = 0;
			}
		}
	}, {
		key: 'positionYearLabel',
		value: function positionYearLabel() {

			var bufferBetweenSubtitleLabelAndYearLabel = 12;

			var size = this.yearLabel.font.sizeOfString(this.yearLabel.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.titleLabel.x;
			newFrame.origin.y = this.subtitleLabel.bottom + bufferBetweenSubtitleLabelAndYearLabel;

			this.yearLabel.frame = newFrame;
		}

		//
		// Actions
		//

	}]);

	return InteractiveCover;
}(JABView);