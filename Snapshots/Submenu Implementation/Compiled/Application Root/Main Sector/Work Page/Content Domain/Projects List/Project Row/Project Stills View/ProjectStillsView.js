'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectStillsView = function (_JABView) {
	_inherits(ProjectStillsView, _JABView);

	function ProjectStillsView(customId, projectDataBundle) {
		_classCallCheck(this, ProjectStillsView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectStillsView).call(this, customId));

		_this.projectDataBundle = projectDataBundle;
		_this.largeStillIndex = 0;
		_this.secondaryStillsIndicies = [];

		// UI
		_this.largeStillView = new InteractiveImageView('LargeStillView');
		_this.secondaryStillsView = new ProjectSecondaryStillsView('SecondaryStillsView', _this.projectDataBundle);

		// Initialize
		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectStillsView, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectStillsView.prototype), 'init', this).call(this);
			this.installNewDataBundle();
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addLargeStillView();
			this.addSecondaryStillsView();
		}
	}, {
		key: 'addLargeStillView',
		value: function addLargeStillView() {
			this.addSubview(this.largeStillView);
		}
	}, {
		key: 'addSecondaryStillsView',
		value: function addSecondaryStillsView() {
			this.addSubview(this.secondaryStillsView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectStillsView.prototype), 'updateAllUI', this).call(this);

			this.configureLargeStillView();
			this.positionLargeStillView();

			this.configureSecondaryStillsView();
			this.positionSecondaryStillsView();
		}

		// Large Still View

	}, {
		key: 'configureLargeStillView',
		value: function configureLargeStillView() {

			this.largeStillView.src = this.projectDataBundle.stills[this.largeStillIndex];

			var imageData = new ImageData();
			imageData.title = this.projectDataBundle.metaDataBundle.title;
			imageData.subtitle = this.projectDataBundle.metaDataBundle.subtitle;
			imageData.year = this.projectDataBundle.metaDataBundle.year;

			this.largeStillView.imageData = imageData;
		}
	}, {
		key: 'positionLargeStillView',
		value: function positionLargeStillView() {

			var widthToHeightRatio = 16.0 / 9.0;

			var newFrame = new CGRect();

			newFrame.size.height = this.height;
			newFrame.size.width = newFrame.size.height * widthToHeightRatio;

			newFrame.origin.x = 0;
			newFrame.origin.y = 0;

			this.largeStillView.frame = newFrame;
		}

		// Secondary Stills View

	}, {
		key: 'configureSecondaryStillsView',
		value: function configureSecondaryStillsView() {

			this.secondaryStillsView.stillsIndicies = this.secondaryStillsIndicies;
			this.secondaryStillsView.updateAllUI();
		}
	}, {
		key: 'positionSecondaryStillsView',
		value: function positionSecondaryStillsView() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width - this.largeStillView.width;
			newFrame.size.height = this.height;

			newFrame.origin.x = this.largeStillView.right;
			newFrame.origin.y = 0;

			this.secondaryStillsView.frame = newFrame;
		}

		//
		// Actions
		//

		// Stills

	}, {
		key: 'installNewDataBundle',
		value: function installNewDataBundle() {
			if (this.projectDataBundle != null) {

				this.largeStillIndex = this.projectDataBundle.mainStillIndex;
				this.secondaryStillsIndicies = [];

				for (var i = 0; i < this.projectDataBundle.stills.length; i++) {
					if (i != this.largeStillIndex) {
						this.secondaryStillsIndicies.push(i);
					}
				}

				this.updateAllUI();
			}
		}
	}, {
		key: 'swapLargeStillWithSecondaryStill',
		value: function swapLargeStillWithSecondaryStill(indexOfSecondaryStill) {
			var operationShouldProcede = true;
			if (operationShouldProcede) {

				var holder = this.largeStillIndex;
				this.largeStillIndex = this.secondaryStillsIndicies[indexOfSecondaryStill];
				this.secondaryStillsIndicies[indexOfSecondaryStill] = holder;

				this.updateAllUI();
			}
		}

		//
		// Delegate
		//

		// Interactive ImageView

	}, {
		key: 'interactiveImageViewWasHovered',
		value: function interactiveImageViewWasHovered(interactiveImageView) {
			var darkenDuration = 300;

			interactiveImageView.covered = true;
			interactiveImageView.animatedUpdate(darkenDuration);

			this.secondaryStillsView.allCovered = true;
			this.secondaryStillsView.animatedUpdate(darkenDuration);
		}
	}, {
		key: 'interactiveImageViewWasUnhovered',
		value: function interactiveImageViewWasUnhovered(interactiveImageView) {
			var undarkenDuration = 300;

			interactiveImageView.covered = false;
			interactiveImageView.animatedUpdate(undarkenDuration);

			this.secondaryStillsView.allCovered = false;
			this.secondaryStillsView.animatedUpdate(undarkenDuration);
		}
	}, {
		key: 'interactiveImageViewWasClicked',
		value: function interactiveImageViewWasClicked(interactiveImageView) {
			this.parent.projectStillsViewLargeStillWasClicked(this);
		}

		// Secondary Stills View

	}, {
		key: 'secondaryStillWasClicked',
		value: function secondaryStillWasClicked(stillIndex) {
			this.swapLargeStillWithSecondaryStill(stillIndex);
		}
	}]);

	return ProjectStillsView;
}(JABView);