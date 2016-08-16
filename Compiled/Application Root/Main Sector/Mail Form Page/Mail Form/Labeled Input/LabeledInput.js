'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabeledInput = function (_JABView) {
	_inherits(LabeledInput, _JABView);

	function LabeledInput(customId) {
		_classCallCheck(this, LabeledInput);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LabeledInput).call(this, customId));

		_this.requiredHeight = 50;

		// Parameters
		_this.parameters = {
			heightOfInput: 30,
			bufferBetweenLabelAndInput: 5
		};

		// UI
		_this.label = new UILabel('Label');
		_this.input = new JABInput('Input');

		return _this;
	}

	//
	// Init
	//

	_createClass(LabeledInput, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(LabeledInput.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addLabel();
			this.addInput();
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
		}
	}, {
		key: 'addInput',
		value: function addInput() {
			this.addSubview(this.input);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(LabeledInput.prototype), 'updateAllUI', this).call(this);

			this.configureLabel();
			this.positionLabel();

			this.configureInput();
			this.positionInput();
		}

		// Label

	}, {
		key: 'configureLabel',
		value: function configureLabel() {
			var view = this.label;
		}
	}, {
		key: 'positionLabel',
		value: function positionLabel() {
			var view = this.label;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = 0;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Input

	}, {
		key: 'configureInput',
		value: function configureInput() {
			var view = this.input;

			view.borderColor = 'white';
			view.borderStyle = 'solid';
			view.borderWidth = 1;
			view.borderRadius = 6;

			view.textColor = 'white';
			view.fontFamily = 'siteFont';
			view.fontSize = 14;

			view.paddingLeft = 7;
		}
	}, {
		key: 'positionInput',
		value: function positionInput() {
			var view = this.input;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.parameters.heightOfInput;

			newFrame.origin.x = 0;
			newFrame.origin.y = this.label.bottom + this.parameters.bufferBetweenLabelAndInput;

			view.frame = newFrame;

			this.requiredHeight = this.input.bottom - this.label.top;
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

	return LabeledInput;
}(JABView);