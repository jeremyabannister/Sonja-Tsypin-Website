'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileMenuButton = function (_JABView) {
	_inherits(MobileMenuButton, _JABView);

	function MobileMenuButton(customId) {
		_classCallCheck(this, MobileMenuButton);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MobileMenuButton).call(this, customId));

		_this.state = {
			crossed: false
		};

		// Parameters
		_this.parameters = {
			animationSpeed: 0,

			minimumSideBuffer: 10,
			maxWidthOfLines: 30,
			heightOfLines: 2,
			betweenBufferForLines: 7
		};

		// UI
		_this.topLine = new JABView('TopLine');
		_this.middleLine = new JABView('MiddleLine');
		_this.bottomLine = new JABView('BottomLine');

		return _this;
	}

	//
	// Init
	//

	_createClass(MobileMenuButton, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MobileMenuButton.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addTopLine();
			this.addMiddleLine();
			this.addBottomLine();
		}
	}, {
		key: 'addTopLine',
		value: function addTopLine() {
			this.addSubview(this.topLine);
		}
	}, {
		key: 'addMiddleLine',
		value: function addMiddleLine() {
			this.addSubview(this.middleLine);
		}
	}, {
		key: 'addBottomLine',
		value: function addBottomLine() {
			this.addSubview(this.bottomLine);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MobileMenuButton.prototype), 'updateAllUI', this).call(this);

			this.configureTopLine();
			this.positionTopLine();

			this.configureMiddleLine();
			this.positionMiddleLine();

			this.configureBottomLine();
			this.positionBottomLine();
		}

		// Top Line

	}, {
		key: 'configureTopLine',
		value: function configureTopLine() {
			var view = this.topLine;

			view.backgroundColor = 'white';
			view.borderRadius = view.height / 2;
			view.positionDuration = this.parameters.animationSpeed;

			if (this.state.crossed) {
				view.angle = 45;
			} else {
				view.angle = 0;
			}
		}
	}, {
		key: 'positionTopLine',
		value: function positionTopLine() {
			var view = this.topLine;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - 2 * this.parameters.minimumSideBuffer;
			if (newFrame.size.width > this.parameters.maxWidthOfLines) {
				newFrame.size.width = this.parameters.maxWidthOfLines;
			}

			newFrame.size.height = this.parameters.heightOfLines;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;

			if (this.state.crossed) {
				newFrame.origin.y = (this.height - newFrame.size.height) / 2;
			} else {
				newFrame.origin.y = (this.height - (3 * this.parameters.heightOfLines + 2 * this.parameters.betweenBufferForLines)) / 2;
			}

			view.frame = newFrame;

			this.configureTopLine(); // This is because the corner radius of the lines is dependent on the positioning
		}

		// Middle Line

	}, {
		key: 'configureMiddleLine',
		value: function configureMiddleLine() {
			var view = this.middleLine;

			view.backgroundColor = 'white';
			view.borderRadius = view.height / 2;
			view.positionDuration = this.parameters.animationSpeed;

			if (this.state.crossed) {
				view.opacity = 0;
				view.angle = 45;
			} else {
				view.opacity = 1;
				view.angle = 0;
			}
		}
	}, {
		key: 'positionMiddleLine',
		value: function positionMiddleLine() {
			var view = this.middleLine;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - 2 * this.parameters.minimumSideBuffer;
			if (newFrame.size.width > this.parameters.maxWidthOfLines) {
				newFrame.size.width = this.parameters.maxWidthOfLines;
			}

			newFrame.size.height = this.parameters.heightOfLines;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;

			if (this.state.crossed) {
				newFrame.origin.y = (this.height - newFrame.size.height) / 2;
			} else {
				newFrame.origin.y = this.topLine.bottom + this.parameters.betweenBufferForLines;
			}

			view.frame = newFrame;

			this.configureTopLine(); // This is because the corner radius of the lines is dependent on the positioning
		}

		// Bottom Line

	}, {
		key: 'configureBottomLine',
		value: function configureBottomLine() {
			var view = this.bottomLine;

			view.backgroundColor = 'white';
			view.borderRadius = view.height / 2;
			view.positionDuration = this.parameters.animationSpeed;

			if (this.state.crossed) {
				view.angle = -45;
			} else {
				view.angle = 0;
			}
		}
	}, {
		key: 'positionBottomLine',
		value: function positionBottomLine() {
			var view = this.bottomLine;
			var newFrame = new CGRect();

			newFrame.size.width = this.width - 2 * this.parameters.minimumSideBuffer;
			if (newFrame.size.width > this.parameters.maxWidthOfLines) {
				newFrame.size.width = this.parameters.maxWidthOfLines;
			}

			newFrame.size.height = this.parameters.heightOfLines;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;

			if (this.state.crossed) {
				newFrame.origin.y = (this.height - newFrame.size.height) / 2;
			} else {
				newFrame.origin.y = this.middleLine.bottom + this.parameters.betweenBufferForLines;
			}

			view.frame = newFrame;

			this.configureBottomLine(); // This is because the corner radius of the lines is dependent on the positioning
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

	return MobileMenuButton;
}(JABView);