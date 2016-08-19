'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileMenuItemView = function (_JABView) {
	_inherits(MobileMenuItemView, _JABView);

	function MobileMenuItemView(customId, menuItem) {
		_classCallCheck(this, MobileMenuItemView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MobileMenuItemView).call(this, customId));

		_this.menuItem = menuItem;

		// Parameters
		_this.parameters = {
			sideBufferForContent: 27
		};

		// UI
		_this.label = new UILabel('Label');
		_this.underline = new JABView('Underline');

		return _this;
	}

	//
	// Init
	//

	_createClass(MobileMenuItemView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MobileMenuItemView.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addLabel();
			this.addUnderline();
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
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
			_get(Object.getPrototypeOf(MobileMenuItemView.prototype), 'updateAllUI', this).call(this);

			this.configureLabel();
			this.positionLabel();

			this.configureUnderline();
			this.positionUnderline();
		}

		// Label

	}, {
		key: 'configureLabel',
		value: function configureLabel() {
			var view = this.label;

			view.text = this.menuItem.displayTitle;
			view.fontFamily = 'siteFont';
			view.fontSize = 16;
			view.textColor = 'white';
			view.letterSpacing = 3;
			view.lineHeight = this.height;
			view.lineHeightUnit = 'px';

			view.updateAllUI();
		}
	}, {
		key: 'positionLabel',
		value: function positionLabel() {
			var view = this.label;
			var newFrame = new CGRect();

			if (view.text != null) {
				var size = view.font.sizeOfString(view.text);

				newFrame.size.width = size.width;
				newFrame.size.height = this.height;

				newFrame.origin.x = this.width - newFrame.size.width - this.parameters.sideBufferForContent;
				newFrame.origin.y = 0;
			}

			view.frame = newFrame;
		}

		// Underline

	}, {
		key: 'configureUnderline',
		value: function configureUnderline() {
			var view = this.underline;

			view.backgroundColor = '#888888';
			view.opacity = 0;
		}
	}, {
		key: 'positionUnderline',
		value: function positionUnderline() {
			var view = this.underline;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - 2 * this.parameters.sideBufferForContent;
			newFrame.size.height = 1;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.height - newFrame.size.height;

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

	}]);

	return MobileMenuItemView;
}(JABView);