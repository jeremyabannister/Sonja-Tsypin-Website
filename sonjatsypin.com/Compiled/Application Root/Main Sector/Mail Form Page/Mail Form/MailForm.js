'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MailForm = function (_JABView) {
	_inherits(MailForm, _JABView);

	function MailForm(customId) {
		_classCallCheck(this, MailForm);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MailForm).call(this, customId));

		_this.requiredHeight = 300;

		// Parameters
		_this.parameters = {
			betweenBufferForInputs: 10,

			widthFractionOfSingleLineInputs: 0.66,
			heightOfSingleLineInputs: 30,
			heightOfMultilineInputs: 200,
			fontSizeOfInputLabels: 12,

			leftBufferForSendButton: 20,
			topBufferForSendButton: 20
		};

		// UI
		_this.fromInput = new LabeledInput('FromInput');
		_this.subjectInput = new LabeledInput('SubjectInput');
		_this.bodyInput = new LabeledTextArea('BodyInput');

		_this.sendButton = new UILabel('SendButton');

		return _this;
	}

	//
	// Init
	//

	_createClass(MailForm, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MailForm.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addFromInput();
			this.addSubjectInput();
			this.addBodyInput();

			this.addSendButton();
		}
	}, {
		key: 'addFromInput',
		value: function addFromInput() {
			this.addSubview(this.fromInput);
		}
	}, {
		key: 'addSubjectInput',
		value: function addSubjectInput() {
			this.addSubview(this.subjectInput);
		}
	}, {
		key: 'addBodyInput',
		value: function addBodyInput() {
			this.addSubview(this.bodyInput);
		}
	}, {
		key: 'addSendButton',
		value: function addSendButton() {
			this.addSubview(this.sendButton);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MailForm.prototype), 'updateAllUI', this).call(this);

			this.configureFromInput();
			this.positionFromInput();

			this.configureSubjectInput();
			this.positionSubjectInput();

			this.configureBodyInput();
			this.positionBodyInput();

			this.configureSendButton();
			this.positionSendButton();
		}

		// From Input

	}, {
		key: 'configureFromInput',
		value: function configureFromInput() {

			var view = this.fromInput;

			view.parameters = { heightOfInput: this.parameters.heightOfSingleLineInputs };

			view.label.text = 'FROM:';
			view.label.textColor = 'white';
			view.label.fontFamily = 'siteFont';
			view.label.fontSize = this.parameters.fontSizeOfInputLabels;
		}
	}, {
		key: 'positionFromInput',
		value: function positionFromInput() {

			var view = this.fromInput;
			var newFrame = new CGRect();

			newFrame.size.width = this.width * this.parameters.widthFractionOfSingleLineInputs;
			newFrame.size.height = view.requiredHeight;

			newFrame.origin.x = 0;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Subject Input

	}, {
		key: 'configureSubjectInput',
		value: function configureSubjectInput() {

			var view = this.subjectInput;

			view.parameters = { heightOfInput: this.parameters.heightOfSingleLineInputs };

			view.label.text = 'SUBJECT:';
			view.label.textColor = 'white';
			view.label.fontFamily = 'siteFont';
			view.label.fontSize = this.parameters.fontSizeOfInputLabels;
		}
	}, {
		key: 'positionSubjectInput',
		value: function positionSubjectInput() {

			var view = this.subjectInput;
			var newFrame = new CGRect();

			newFrame.size.width = this.width * this.parameters.widthFractionOfSingleLineInputs;
			newFrame.size.height = view.requiredHeight;

			newFrame.origin.x = this.fromInput.x;
			newFrame.origin.y = this.fromInput.bottom + this.parameters.betweenBufferForInputs;

			view.frame = newFrame;
		}

		// Body Input

	}, {
		key: 'configureBodyInput',
		value: function configureBodyInput() {

			var view = this.bodyInput;

			view.parameters = { heightOfTextArea: this.parameters.heightOfMultilineInputs };

			view.label.text = 'MESSAGE:';
			view.label.textColor = 'white';
			view.label.fontFamily = 'siteFont';
			view.label.fontSize = this.parameters.fontSizeOfInputLabels;
		}
	}, {
		key: 'positionBodyInput',
		value: function positionBodyInput() {

			var view = this.bodyInput;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = view.requiredHeight;

			newFrame.origin.x = this.fromInput.x;
			newFrame.origin.y = this.subjectInput.bottom + this.parameters.betweenBufferForInputs;

			view.frame = newFrame;

			this.requiredHeight = this.bodyInput.bottom - this.fromInput.top;
		}

		// Send Button

	}, {
		key: 'configureSendButton',
		value: function configureSendButton() {
			var view = this.sendButton;

			view.text = 'SEND';
			view.textColor = 'white';
			view.fontFamily = 'siteFont';
			view.fontSize = 16;
			view.textAlign = 'center';
			view.lineHeightUnit = 'px';
			view.lineHeight = this.parameters.heightOfSingleLineInputs;

			view.borderColor = 'white';
			view.borderStyle = 'solid';
			view.borderWidth = 1;
			view.borderRadius = 6;

			view.clickable = true;
			view.hoverable = true;
			view.cursor = 'pointer';

			view.configureDuration = 250;
		}
	}, {
		key: 'positionSendButton',
		value: function positionSendButton() {
			var view = this.sendButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - this.subjectInput.right - this.parameters.leftBufferForSendButton;
			newFrame.size.height = this.parameters.heightOfSingleLineInputs;

			newFrame.origin.x = this.width - newFrame.size.width;
			newFrame.origin.y = this.bodyInput.bottom + this.parameters.topBufferForSendButton;

			view.frame = newFrame;
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
		value: function viewWasClicked(view) {}
	}, {
		key: 'viewWasHovered',
		value: function viewWasHovered(view) {
			this.sendButton.backgroundColor = 'rgba(150, 150, 150, 0.5)';
		}
	}, {
		key: 'viewWasUnhovered',
		value: function viewWasUnhovered(view) {
			this.sendButton.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
	}]);

	return MailForm;
}(JABView);