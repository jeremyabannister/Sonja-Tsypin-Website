'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABEmbeddedImageView = function (_JABView) {
	_inherits(JABEmbeddedImageView, _JABView);

	function JABEmbeddedImageView(customId) {
		_classCallCheck(this, JABEmbeddedImageView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JABEmbeddedImageView).call(this, customId));

		_this.src = '';
		_this.state = {

			horizontalInset: 0,
			verticalInset: 0

		};

		// Parameters
		_this.parameters = {};

		// UI
		_this.imageView = new JABImageView('ImageView');

		return _this;
	}

	//
	// Init
	//

	_createClass(JABEmbeddedImageView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(JABEmbeddedImageView.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addImageView();
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABEmbeddedImageView.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();
		}
	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var view = this.imageView;

			view.src = this.src;
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {
			var view = this.imageView;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - 2 * this.state.horizontalInset;
			newFrame.size.height = this.height - 2 * this.state.verticalInset;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

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

	return JABEmbeddedImageView;
}(JABView);