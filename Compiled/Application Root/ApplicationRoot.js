'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationRoot = function (_JABApplicationRoot) {
	_inherits(ApplicationRoot, _JABApplicationRoot);

	function ApplicationRoot(customId) {
		_classCallCheck(this, ApplicationRoot);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationRoot).call(this, customId));

		_this.laboratoryEnabled = false;
		_this.contentWidth = { 'xs': 700, 's': 780, 'm': 1000, 'l': 1000 };

		if (_this.laboratoryEnabled) {
			_this.laboratory = new Laboratory('Laboratory');
		} else {

			// UI
			_this.mainSector = new MainSector('MainSector');
		}

		// Initialize
		return _this;
	}

	//
	// Getters and Setters
	//

	_createClass(ApplicationRoot, [{
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			if (this.laboratoryEnabled) {
				this.addLaboratory();
			} else {

				this.addMainSector();
			}
		}
	}, {
		key: 'addMainSector',
		value: function addMainSector() {
			this.addSubview(this.mainSector);
		}
	}, {
		key: 'addLaboratory',
		value: function addLaboratory() {
			this.addSubview(this.laboratory);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'updateAllUI', this).call(this);

			if (this.laboratoryEnabled) {
				this.configureLaboratory();
				this.positionLaboratory();
			} else {

				this.configureMainSector();
				this.positionMainSector();
			}
		}

		// Main Sector

	}, {
		key: 'configureMainSector',
		value: function configureMainSector() {
			this.mainSector.backgroundColor = '#000000';
		}
	}, {
		key: 'positionMainSector',
		value: function positionMainSector() {
			this.mainSector.frame = new CGRect(0, 0, this.width, this.height);
		}
	}, {
		key: 'configureLaboratory',
		value: function configureLaboratory() {

			this.laboratory.backgroundColor = 'white';
		}
	}, {
		key: 'positionLaboratory',
		value: function positionLaboratory() {
			if (this.laboratoryEnabled) {
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = this.height;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			} else {
				var newFrame = new CGRect();

				newFrame.size.width = 0;
				newFrame.size.height = 0;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			}
		}

		//
		// Actions
		//

	}, {
		key: 'userDidScrollByAmount',
		value: function userDidScrollByAmount(amount) {
			this.mainSector.userDidScrollByAmount(amount);
		}
	}, {
		key: 'userDidStopScrolling',
		value: function userDidStopScrolling() {
			this.mainSector.userDidStopScrolling();
		}
	}, {
		key: 'contentWidth',
		get: function get() {
			return this._contentWidth[sizeClass];
		},
		set: function set(newContentWidth) {
			this._contentWidth = newContentWidth;
		}
	}]);

	return ApplicationRoot;
}(JABApplicationRoot);