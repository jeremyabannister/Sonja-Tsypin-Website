'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectPage = function (_JABView) {
	_inherits(ProjectPage, _JABView);

	function ProjectPage(customId) {
		_classCallCheck(this, ProjectPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectPage).call(this, customId));

		_this.state = {
			projectDataBundle: null
		};

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			vimeoViewMinimumDistanceFromHeader: 40,
			vimeoViewVerticalAdjustment: -4,

			bufferBetweenVimeoViewAndTitleLabel: 10
		};

		// UI
		_this.vimeoView = new JABVimeoView('VimeoView');
		_this.titleLabel = new UILabel('TitleLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addVimeoView();
			this.addTitleLabel();
		}
	}, {
		key: 'addVimeoView',
		value: function addVimeoView() {
			this.addSubview(this.vimeoView);
		}
	}, {
		key: 'addTitleLabel',
		value: function addTitleLabel() {
			this.addSubview(this.titleLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectPage.prototype), 'updateAllUI', this).call(this);

			this.configureVimeoView();
			this.positionVimeoView();

			this.configureTitleLabel();
			this.positionTitleLabel();
		}

		// Vimeo View

	}, {
		key: 'configureVimeoView',
		value: function configureVimeoView() {

			var view = this.vimeoView;

			if (this.state.projectDataBundle != null) {
				view.vimeoId = this.state.projectDataBundle.vimeoId;
			} else {
				view.vimeoId = null;
			}

			view.loadingGif = new LoadingGif();
		}
	}, {
		key: 'positionVimeoView',
		value: function positionVimeoView() {

			var aspectRatio = 9.0 / 16.0;
			if (this.state.projectDataBundle != null) {
				aspectRatio = this.state.projectDataBundle.vimeoHeightToWidth;
			}

			var view = this.vimeoView;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth * 0.9;
			newFrame.size.height = newFrame.size.width * aspectRatio;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height) / 2 + this.parameters.vimeoViewVerticalAdjustment;

			if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader) {
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.vimeoViewMinimumDistanceFromHeader;
			}

			view.frame = newFrame;
		}

		// Title Label

	}, {
		key: 'configureTitleLabel',
		value: function configureTitleLabel() {

			var view = this.titleLabel;
			var dataBundle = this.state.projectDataBundle;

			view.positionDuration = 0;

			if (dataBundle != null) {

				view.text = dataBundle.title;
				view.fontFamily = 'siteFont';
				view.fontSize = 20;
				view.textColor = 'white';
				view.letterSpacing = 2;
			}
		}
	}, {
		key: 'positionTitleLabel',
		value: function positionTitleLabel() {

			var view = this.titleLabel;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.vimeoView.x;
			newFrame.origin.y = this.vimeoView.bottom + this.parameters.bufferBetweenVimeoViewAndTitleLabel;

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

		// JABVimeoView

	}, {
		key: 'vimeoViewDidFinishLoading',
		value: function vimeoViewDidFinishLoading(vimeoView) {
			console.log('project finished loading!');
		}
	}]);

	return ProjectPage;
}(JABView);