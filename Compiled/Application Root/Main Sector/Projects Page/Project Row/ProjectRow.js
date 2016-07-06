'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectRow = function (_JABView) {
	_inherits(ProjectRow, _JABView);

	function ProjectRow(customId, projectDataBundle) {
		_classCallCheck(this, ProjectRow);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectRow).call(this, customId));

		_this.projectDataBundle = projectDataBundle;

		_this.possibleStates = ['stills', 'video'];
		_this.state = _this.possibleStates[0];

		_this.widthToHeightRatio = 16.0 / 9.0 * (5.0 / 4.0);

		// UI
		_this.stillsView = new ProjectStillsView('ProjectStillsView', _this.projectDataBundle);
		_this.videoView = new ProjectVideoView('ProjectVideoView');

		// Initialize
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(ProjectRow, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addStillsView();
			this.addVideoView();
		}
	}, {
		key: 'addStillsView',
		value: function addStillsView() {
			this.addSubview(this.stillsView);
		}
	}, {
		key: 'addVideoView',
		value: function addVideoView() {
			this.addSubview(this.videoView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectRow.prototype), 'updateAllUI', this).call(this);

			this.configureStillsView();
			this.positionStillsView();

			this.configureVideoView();
			this.positionVideoView();
		}

		// Stills View

	}, {
		key: 'configureStillsView',
		value: function configureStillsView() {

			this.stillsView.overflow = 'hidden';
		}
	}, {
		key: 'positionStillsView',
		value: function positionStillsView() {

			var widthOfStillsView = this.height * (16.0 / 9.0) * (5.0 / 4.0);

			var newFrame = new CGRect();

			newFrame.size.height = this.height;
			newFrame.size.width = widthOfStillsView;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			this.stillsView.frame = newFrame;
		}

		// Video View

	}, {
		key: 'configureVideoView',
		value: function configureVideoView() {}
	}, {
		key: 'positionVideoView',
		value: function positionVideoView() {}

		//
		// Actions
		//

	}]);

	return ProjectRow;
}(JABView);