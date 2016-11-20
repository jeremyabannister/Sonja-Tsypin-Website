'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveImageView = function (_JABView) {
	_inherits(InteractiveImageView, _JABView);

	function InteractiveImageView(customId) {
		_classCallCheck(this, InteractiveImageView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InteractiveImageView).call(this, customId));

		_this.covered = false;
		_this.coverColor = 'rgba(0, 0, 0, 0.6)';
		_this.imageData = new ImageData();

		// UI
		_this.imageView = new JABImageView('ImageView');
		_this.cover = new InteractiveCover('Cover');

		_this.cursor = 'pointer';

		return _this;
	}

	//
	// Init
	//

	_createClass(InteractiveImageView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(InteractiveImageView.prototype), 'init', this).call(this);
			this.startEventListeners();
		}

		// Custom Getters and Setters

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addImageView();
			this.addCover();
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}
	}, {
		key: 'addCover',
		value: function addCover() {
			this.addSubview(this.cover);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(InteractiveImageView.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();

			this.configureCover();
			this.positionCover();
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {
			this.imageView.frame = this.bounds;
		}

		// Cover

	}, {
		key: 'configureCover',
		value: function configureCover() {

			this.cover.imageData = this.imageData;

			this.cover.backgroundColor = this.coverColor;
			if (this.covered) {
				this.cover.visible = true;
				this.cover.opacity = 1;
			} else {
				this.cover.visible = false;
				this.cover.opacity = 0;
			}

			this.cover.updateAllUI();
		}
	}, {
		key: 'positionCover',
		value: function positionCover() {
			this.cover.frame = this.bounds;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {

			var thisImageView = this;
			$(this.selector).hover(function () {
				thisImageView.parent.interactiveImageViewWasHovered(thisImageView);
			}, function () {
				thisImageView.parent.interactiveImageViewWasUnhovered(thisImageView);
			});

			$(this.selector).click(function () {
				thisImageView.parent.interactiveImageViewWasClicked(thisImageView);
			});
		}

		//
		// Actions
		//

	}, {
		key: 'src',
		get: function get() {
			return this.imageView.src;
		},
		set: function set(newSrc) {
			this.imageView.src = newSrc;
		}
	}]);

	return InteractiveImageView;
}(JABView);