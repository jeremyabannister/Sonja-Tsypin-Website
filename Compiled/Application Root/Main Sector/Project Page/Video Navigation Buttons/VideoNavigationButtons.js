'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoNavigationButtons = function (_JABView) {
	_inherits(VideoNavigationButtons, _JABView);

	function VideoNavigationButtons(customId) {
		_classCallCheck(this, VideoNavigationButtons);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoNavigationButtons).call(this, customId));

		_this.state = {
			prevEnabled: true,
			nextEnabled: true
		};

		// Parameters
		_this.requiredWidth = 110;
		_this.requiredHeight = 13;

		_this.parameters = {
			fontSizeForButtons: 13,
			innerBufferForButtons: 5,
			fadedTextColor: '#888888',
			widthAddition: 0
		};

		// UI
		_this.divider = new JABView('Divider');
		_this.prevButton = new UILabel('PrevButton');
		_this.nextButton = new UILabel('NextButton');

		return _this;
	}

	//
	// Init
	//

	_createClass(VideoNavigationButtons, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(VideoNavigationButtons.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addDivider();
			this.addPrevButton();
			this.addNextButton();
		}
	}, {
		key: 'addDivider',
		value: function addDivider() {
			this.addSubview(this.divider);
		}
	}, {
		key: 'addPrevButton',
		value: function addPrevButton() {
			this.addSubview(this.prevButton);
		}
	}, {
		key: 'addNextButton',
		value: function addNextButton() {
			this.addSubview(this.nextButton);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(VideoNavigationButtons.prototype), 'updateAllUI', this).call(this);

			this.configureDivider();
			this.positionDivider();

			this.configurePrevButton();
			this.positionPrevButton();

			this.configureNextButton();
			this.positionNextButton();
		}

		// Divider

	}, {
		key: 'configureDivider',
		value: function configureDivider() {

			var view = this.divider;

			view.backgroundColor = 'white';
		}
	}, {
		key: 'positionDivider',
		value: function positionDivider() {

			var view = this.divider;
			var newFrame = new CGRect();

			newFrame.size.width = 1;
			newFrame.size.height = this.parameters.fontSizeForButtons + 8;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Prev Button

	}, {
		key: 'configurePrevButton',
		value: function configurePrevButton() {

			var view = this.prevButton;

			view.text = 'PREV';
			view.fontSize = this.parameters.fontSizeForButtons;

			if (this.state.prevEnabled) {
				view.textColor = 'white';
			} else {
				view.textColor = this.parameters.fadedTextColor;
			}

			view.textAlign = 'right';
			view.letterSpacing = 1.5;
			view.lineHeight = this.height;
			view.lineHeightUnit = 'px';

			view.clickable = true;
			view.cursor = 'pointer';
		}
	}, {
		key: 'positionPrevButton',
		value: function positionPrevButton() {

			var view = this.prevButton;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text);

			newFrame.size.width = size.width + this.parameters.widthAddition / 2;
			newFrame.size.height = this.height;

			newFrame.origin.x = this.divider.x - newFrame.size.width - this.parameters.innerBufferForButtons;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Next Button

	}, {
		key: 'configureNextButton',
		value: function configureNextButton() {

			var view = this.nextButton;

			view.text = 'NEXT';
			view.fontSize = this.parameters.fontSizeForButtons;

			if (this.state.nextEnabled) {
				view.textColor = 'white';
			} else {
				view.textColor = this.parameters.fadedTextColor;
			}

			view.textAlign = 'left';
			view.letterSpacing = 1.5;
			view.lineHeight = this.height;
			view.lineHeightUnit = 'px';

			view.clickable = true;
			view.cursor = 'pointer';
		}
	}, {
		key: 'positionNextButton',
		value: function positionNextButton() {

			var view = this.nextButton;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text);

			newFrame.size.width = size.width + this.parameters.widthAddition / 2;
			newFrame.size.height = this.height;

			newFrame.origin.x = this.divider.right + this.parameters.innerBufferForButtons;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;

			this.requiredWidth = this.nextButton.right - this.prevButton.left - this.parameters.widthAddition;
			this.requiredHeight = this.nextButton.height;
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

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			if (view == this.prevButton) {
				this.parent.videoNavigationButtonsPrevButtonWasClicked(this);
			} else if (view == this.nextButton) {
				this.parent.videoNavigationButtonsNextButtonWasClicked(this);
			}
		}
	}]);

	return VideoNavigationButtons;
}(JABView);