'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_JABView) {
	_inherits(Menu, _JABView);

	function Menu(customId, buttonInfo) {
		_classCallCheck(this, Menu);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, customId));

		_this.buttonInfo = buttonInfo;
		_this.showUnderline = true;
		_this.underlinePositionDuration = 0;
		_this.selectedIndex = -1;
		_this.fadeUnselectedButtons = false;

		_this.requiredWidth = 400;
		_this.requiredHeight = 400;

		_this.textColor = null;
		_this.fontSize = null;
		_this.fontFamily = null;
		_this.fontWeight = null;
		_this.fontStyle = null;
		_this.fontVariant = null;
		_this.letterSpacing = null;
		_this.textAlign = null;

		// UI
		_this.buttons = [];
		for (var i = 0; i < _this.buttonInfo.length; i++) {
			_this.buttons.push(new UILabel());
		}
		_this.underline = new JABView('Underline');

		return _this;
	}

	//
	// Init
	//

	_createClass(Menu, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(Menu.prototype), 'init', this).call(this);
		}

		//
		// Getters and Setters
		//

		// Selected Index

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addButtons();
			this.addUnderline();
		}
	}, {
		key: 'addButtons',
		value: function addButtons() {
			for (var i = 0; i < this.buttons.length; i++) {
				this.addSubview(this.buttons[i]);
			}
		}
	}, {
		key: 'addUnderline',
		value: function addUnderline() {
			this.addSubview(this.underline);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Menu.prototype), 'updateAllUI', this).call(this);

			this.configureButtons();
			this.positionButtons();

			this.configureUnderline();
			this.positionUnderline();
		}
	}, {
		key: 'configureButtons',
		value: function configureButtons() {

			for (var i = 0; i < this.buttonInfo.length; i++) {

				this.buttons[i].clickable = true;

				this.buttons[i].text = this.buttonInfo[i][0];

				this.buttons[i].textColor = this.textColor;
				this.buttons[i].fontSize = this.fontSize;
				this.buttons[i].fontFamily = this.fontFamily;
				this.buttons[i].fontWeight = this.fontWeight;
				this.buttons[i].fontStyle = this.fontStyle;
				this.buttons[i].fontVariant = this.fontVariant;
				this.buttons[i].letterSpacing = this.letterSpacing;

				this.buttons[i].textAlign = this.textAlign;

				if (this.fadeUnselectedButtons) {
					if (i != this.selectedIndex) {
						this.buttons[i].opacity = 0.6;
					} else {
						this.buttons[i].opacity = 1;
					}
				}

				this.buttons[i].cursor = 'pointer';
			}
		}
	}, {
		key: 'positionButtons',
		value: function positionButtons() {

			var tallestHeight = 0;
			var betweenBufferForButtons = 40;

			for (var i = 0; i < this.buttons.length; i++) {

				var newFrame = new CGRect();
				var size = this.buttons[i].font.sizeOfString(this.buttons[i].text);

				newFrame.size.width = size.width;
				newFrame.size.height = size.height;

				if (newFrame.size.height > tallestHeight) {
					tallestHeight = newFrame.size.height;
				}

				if (i == 0) {
					newFrame.origin.x = 0;
				} else {
					newFrame.origin.x = this.buttons[i - 1].right + betweenBufferForButtons;
				}

				newFrame.origin.y = (this.height - newFrame.size.height) / 2;

				this.buttons[i].frame = newFrame;
			}

			this.requiredWidth = this.buttons[i - 1].right;
			this.requiredHeight = tallestHeight;
		}
	}, {
		key: 'configureUnderline',
		value: function configureUnderline() {

			this.underline.backgroundColor = 'white';
			this.underline.positionDuration = this.underlinePositionDuration;

			if (this.showUnderline) {
				this.underline.opacity = 1;
			} else {
				this.underline.opacity = 0;
			}
		}
	}, {
		key: 'positionUnderline',
		value: function positionUnderline() {

			var bufferBetweenUnderlinedButtonAndUnderline = 5;
			var positionIndex = this.selectedIndex;
			if (positionIndex == -1) {
				positionIndex = 0;
			}
			var underlinedButton = this.buttons[positionIndex];

			var newFrame = new CGRect();

			newFrame.size.width = underlinedButton.width - 2;
			newFrame.size.height = 0.5;

			newFrame.origin.x = underlinedButton.x + (underlinedButton.width - newFrame.size.width) / 2 - 1;
			newFrame.origin.y = underlinedButton.bottom + bufferBetweenUnderlinedButtonAndUnderline;

			this.underline.frame = newFrame;
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

			for (var i = 0; i < this.buttons.length; i++) {
				if (this.buttons[i] == view) {
					if (this.buttonInfo.length > i) {
						this.parent.menuButtonWasPressed(i);
					}
				}
			}
		}
	}, {
		key: 'selectedIndex',
		get: function get() {
			return this._selectedIndex;
		},
		set: function set(newSelectedIndex) {

			var difference = Math.abs(this.selectedIndex - newSelectedIndex);
			this.underlinePositionDuration = lesserOfTwo(200 * difference, 400);

			this._selectedIndex = newSelectedIndex;
		}
	}]);

	return Menu;
}(JABView);