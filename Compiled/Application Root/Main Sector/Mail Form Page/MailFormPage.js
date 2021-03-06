'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MailFormPage = function (_JABView) {
	_inherits(MailFormPage, _JABView);

	function MailFormPage(customId) {
		_classCallCheck(this, MailFormPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MailFormPage).call(this, customId));

		_this.state = {
			handlingClick: false,
			subdued: true
		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,

			widthOfMailForm: 400
		};

		// UI
		_this.mailForm = new MailForm('MailForm');

		return _this;
	}

	//
	// Init
	//

	_createClass(MailFormPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MailFormPage.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addMailForm();
		}
	}, {
		key: 'addMailForm',
		value: function addMailForm() {
			this.addSubview(this.mailForm);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MailFormPage.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureMailForm();
			this.positionMailForm();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				this.parameters = { widthOfMailForm: 300 };
			}
		}

		// Mail Form

	}, {
		key: 'configureMailForm',
		value: function configureMailForm() {

			var view = this.mailForm;

			view.clickable = true;
		}
	}, {
		key: 'positionMailForm',
		value: function positionMailForm() {

			var view = this.mailForm;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.widthOfMailForm;
			newFrame.size.height = view.requiredHeight;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height) / 2) * 0.85;

			if (this.state.subdued) {
				newFrame.origin.y += 80;
			}

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
		value: function viewWasClicked(view) {
			if (view == this.mailForm) {
				this.state = { handlingClick: true };
			}
		}
	}]);

	return MailFormPage;
}(JABView);