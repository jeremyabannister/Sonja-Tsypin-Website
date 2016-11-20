'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectSecondaryStillsView = function (_JABView) {
	_inherits(ProjectSecondaryStillsView, _JABView);

	function ProjectSecondaryStillsView(customId, projectDataBundle) {
		_classCallCheck(this, ProjectSecondaryStillsView);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectSecondaryStillsView).call(this, customId));

		_this.projectDataBundle = projectDataBundle;
		_this.stillsIndicies = [];
		_this.allCovered = false;

		// UI
		_this.stills = [];
		if (_this.projectDataBundle.stillsBundle.mainStillIndex > -1 && _this.projectDataBundle.stillsBundle.mainStillIndex < _this.projectDataBundle.stillsBundle.stills.length) {
			for (var i = 0; i < _this.projectDataBundle.stillsBundle.stills.length - 1; i++) {
				_this.stills.push(new InteractiveImageView());
			}
		}

		// Initialize
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(ProjectSecondaryStillsView, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addStills();
		}
	}, {
		key: 'addStills',
		value: function addStills() {
			for (var i = 0; i < this.stills.length; i++) {
				this.addSubview(this.stills[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectSecondaryStillsView.prototype), 'updateAllUI', this).call(this);

			this.configureStills();
			this.positionStills();
		}

		// Stills

	}, {
		key: 'configureStills',
		value: function configureStills() {

			for (var i = 0; i < this.stills.length; i++) {
				var still = this.stills[i];
				still.src = this.projectDataBundle.stills[this.stillsIndicies[i]];
				still.coverColor = 'rgba(0, 0, 0, 0.7)';

				if (this.allCovered) {
					still.covered = true;
				} else {
					still.covered = false;
				}

				still.updateAllUI();
			}
		}
	}, {
		key: 'positionStills',
		value: function positionStills() {

			for (var i = 0; i < this.stills.length; i++) {
				var still = this.stills[i];

				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = newFrame.size.width / (16.0 / 9.0);

				newFrame.origin.x = 0;
				newFrame.origin.y = i * newFrame.size.height;

				still.frame = newFrame;
			}
		}

		//
		// Actions
		//

		//
		// Delegate
		//

		// Interactive ImageView

	}, {
		key: 'interactiveImageViewWasHovered',
		value: function interactiveImageViewWasHovered(interactiveImageView) {
			for (var i = 0; i < this.stills.length; i++) {
				if (this.stills[i] == interactiveImageView) {} else {
					this.stills[i].covered = true;
				}
				this.stills[i].animatedUpdate(300);
			}
		}
	}, {
		key: 'interactiveImageViewWasUnhovered',
		value: function interactiveImageViewWasUnhovered(interactiveImageView) {
			for (var i = 0; i < this.stills.length; i++) {
				if (this.stills[i] == interactiveImageView) {} else {
					this.stills[i].covered = false;
				}
				this.stills[i].animatedUpdate(300);
			}
		}
	}, {
		key: 'interactiveImageViewWasClicked',
		value: function interactiveImageViewWasClicked(interactiveImageView) {

			for (var i = 0; i < this.stills.length; i++) {
				if (this.stills[i] == interactiveImageView) {
					this.parent.secondaryStillWasClicked(i);
				}
			}
		}
	}]);

	return ProjectSecondaryStillsView;
}(JABView);