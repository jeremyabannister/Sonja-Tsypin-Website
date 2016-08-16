'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabeledTextArea = function (_JABView) {
	_inherits(LabeledTextArea, _JABView);

	function LabeledTextArea(customId) {
		_classCallCheck(this, LabeledTextArea);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LabeledTextArea).call(this, customId));

		_this.requiredHeight = 50;

		// Parameters
		_this.parameters = {
			bufferBetweenLabelAndTextArea: 5,

			heightOfTextArea: 200
		};

		// UI
		_this.label = new UILabel('Label');
		_this.textArea = new JABTextArea('TextArea');

		return _this;
	}

	//
	// Init
	//

	_createClass(LabeledTextArea, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(LabeledTextArea.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addLabel();
			this.addTextArea();
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
		}
	}, {
		key: 'addTextArea',
		value: function addTextArea() {
			this.addSubview(this.textArea);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(LabeledTextArea.prototype), 'updateAllUI', this).call(this);

			this.configureLabel();
			this.positionLabel();

			this.configureTextArea();
			this.positionTextArea();
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
		key: 'configureTextArea',
		value: function configureTextArea() {
			var view = this.textArea;

			view.borderColor = 'white';
			view.borderStyle = 'solid';
			view.borderWidth = 1;
			view.borderRadius = 6;

			view.textColor = 'white';
			view.fontFamily = 'siteFont';
			view.fontSize = 12;

			view.paddingLeft = 7;
			view.paddingTop = 7;
		}
	}, {
		key: 'positionTextArea',
		value: function positionTextArea() {
			var view = this.textArea;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - view.paddingLeft;
			newFrame.size.height = this.parameters.heightOfTextArea - view.paddingTop;

			newFrame.origin.x = 0;
			newFrame.origin.y = this.label.bottom + this.parameters.bufferBetweenLabelAndTextArea;

			view.frame = newFrame;

			this.requiredHeight = this.textArea.bottom - this.label.top;
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

	return LabeledTextArea;
}(JABView);