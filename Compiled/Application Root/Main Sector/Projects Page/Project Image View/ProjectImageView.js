'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectImageView = function (_JABView) {
	_inherits(ProjectImageView, _JABView);

	function ProjectImageView(customId, projectDataBundle) {
		_classCallCheck(this, ProjectImageView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectImageView).call(this, customId));

		_this.state = {
			projectDataBundle: projectDataBundle,
			covered: false
		};

		// UI
		_this.imageView = new JABImageView('ImageView');
		_this.cover = new JABView('Cover');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectImageView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectImageView.prototype), 'init', this).call(this);
		}

		//
		// Getters and Setters
		//

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
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
			_get(Object.getPrototypeOf(ProjectImageView.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();

			this.configureCover();
			this.positionCover();
		}

		// Center Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {

			var view = this.imageView;

			view.src = this.state.projectDataBundle.stills[this.state.projectDataBundle.mainStillIndex];
			view.configureDuration = 150;
			view.positionDuration = 150;

			if (this.state.covered) {
				view.blur = 5;
			} else {
				view.blur = 0;
			}
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {

			var view = this.imageView;
			var newFrame = new CGRect();

			if (this.state.covered) {
				newFrame.size.width = this.width * 1.01;
				newFrame.size.height = this.height * 1.01;
			} else {
				newFrame.size.width = this.width;
				newFrame.size.height = this.height;
			}

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Cover

	}, {
		key: 'configureCover',
		value: function configureCover() {

			var view = this.cover;

			view.configureDuration = 300;
			view.backgroundColor = 'black';

			if (this.state.covered) {
				// view.opacity = 0.8
			} else {
				view.opacity = 0;
			}
		}
	}, {
		key: 'positionCover',
		value: function positionCover() {

			var view = this.cover;
			var newFrame = this.bounds;

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

	return ProjectImageView;
}(JABView);