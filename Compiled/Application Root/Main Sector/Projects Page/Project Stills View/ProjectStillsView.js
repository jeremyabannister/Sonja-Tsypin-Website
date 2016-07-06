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
		_this.currentStillIndex = 0;

		// Parameters
		_this.incomingSlideDistance = 160;
		_this.stillAnimationDelay = 3000;

		// UI
		_this.stillViews = [];
		for (var i = 0; i < _this.projectDataBundle.stills.length; i++) {
			_this.stillViews.push(new JABImageView());
		}

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

			this.overflow = 'hidden';
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addStills();
		}
	}, {
		key: 'addStills',
		value: function addStills() {
			for (var i = 0; i < this.stillViews.length; i++) {
				this.addSubview(this.stillViews[this.stillViews.length - 1 - i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectStillsView.prototype), 'updateAllUI', this).call(this);

			this.configureStillsViews();
			this.positionStillsViews();
		}

		// Stills Views

	}, {
		key: 'configureStillsViews',
		value: function configureStillsViews() {

			for (var i = 0; i < this.stillViews.length; i++) {
				var view = this.stillViews[i];

				view.positionDuration = 800;
				view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';

				view.configureDelay = 400;
				view.configureDuration = view.positionDuration - view.configureDelay;

				view.src = this.projectDataBundle.stills[i];

				if (i == this.currentStillIndex - 1 || i == this.stillViews.length - 1 && this.currentStillIndex == 0) {
					view.opacity = 0;
				} else {
					view.opacity = 1;
				}
			}
		}
	}, {
		key: 'positionStillsViews',
		value: function positionStillsViews() {

			for (var i = 0; i < this.stillViews.length; i++) {

				if (i == this.currentStillIndex || i == this.currentStillIndex - 1 || i == this.stillViews.length - 1 && this.currentStillIndex == 0 || i == this.currentStillIndex + 1 || i == 0 && this.currentStillIndex == this.stillViews.length - 1) {
					var view = this.stillViews[i];
					var departedView;
					var upComingView;

					if (i == 0) {
						departedView = this.stillViews[this.stillViews.length - 1];
					} else {
						departedView = this.stillViews[i - 1];
					}

					if (i == this.stillViews.length - 1) {
						upComingView = this.stillViews[0];
					} else {
						upComingView = this.stillViews[i + 1];
					}

					var newFrame = new CGRect();

					newFrame.size.width = this.width;
					newFrame.size.height = this.height;

					if (i == this.currentStillIndex) {
						newFrame.origin.x = 0;
					} else if (i == this.currentStillIndex - 1 || i == this.stillViews.length - 1 && this.currentStillIndex == 0) {
						newFrame.origin.x = -newFrame.size.width;
					} else {
						newFrame.origin.x = this.incomingSlideDistance;
					}

					newFrame.origin.y = (this.height - newFrame.size.height) / 2;

					view.frame = newFrame;
				}
			}
		}

		//
		// Actions
		//

		// Stills

	}, {
		key: 'startTimerForNextStill',
		value: function startTimerForNextStill() {

			if (!this.animationsDisabled) {
				var projectStillsView = this;
				setTimeout(function () {
					projectStillsView.currentStillIndex += 1;
					if (projectStillsView.currentStillIndex == projectStillsView.stillViews.length) {
						projectStillsView.currentStillIndex = 0;
					}

					projectStillsView.animatedUpdate(0, function () {}, function () {
						projectStillsView.restackStills();
						projectStillsView.startTimerForNextStill();
					});
				}, this.stillAnimationDelay);
			}
		}
	}, {
		key: 'restackStills',
		value: function restackStills() {

			for (var i = 0; i < this.stillViews.length; i++) {
				var view = this.stillViews[i];

				if (i == this.currentStillIndex - 1 || i == this.stillViews.length - 1 && this.currentStillIndex == 0) {
					this.pushSubviewToBack(view);
				}
			}
		}
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
	}, {
		key: 'currentlyActive',
		get: function get() {
			return this._currentlyActive;
		},
		set: function set(newCurrentlyActive) {

			var changed = newCurrentlyActive != this.currentlyActive;

			if (changed) {
				this._currentlyActive = newCurrentlyActive;
				this.animationsDisabled = !newCurrentlyActive;

				if (this.currentlyActive) {
					// this.startTimerForNextStill()
				}
			}
		}
	}]);

	return ProjectStillsView;
}(JABView);