'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingGif = function (_JABView) {
	_inherits(LoadingGif, _JABView);

	function LoadingGif(customId) {
		_classCallCheck(this, LoadingGif);

		// UI

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoadingGif).call(this, customId));

		_this.spokes = [];
		for (var i = 0; i < _this.numberOfSpokes; i++) {
			_this.spokes.push(new JABView());
		}

		// State
		_this.numberOfSpokes = 10;
		_this.highlightedSpokeIndex = 0;

		_this.gifDuration = 1000;
		_this.advanceHighlightTimers = [];
		_this.cycleCompletedTimer = setTimeout(function () {}, 0);

		// Parameters
		_this.parameters = {
			innerRadius: 0,
			lengthOfSpokes: 10,
			widthOfSpokes: 4
		};

		return _this;
	}

	//
	// Init
	//

	_createClass(LoadingGif, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(LoadingGif.prototype), 'init', this).call(this);
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
			this.addSpokes();
		}
	}, {
		key: 'addSpokes',
		value: function addSpokes() {
			for (var i = 0; i < this.spokes.length; i++) {
				this.addSubview(this.spokes[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(LoadingGif.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureSpokes();
			this.positionSpokes();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {

			this.parameters.innerRadius = (this.width - this.parameters.lengthOfSpokes) / 2;
		}

		// Spokes

	}, {
		key: 'configureSpokes',
		value: function configureSpokes() {

			for (var i = 0; i < this.spokes.length; i++) {
				var view = this.spokes[i];

				view.borderRadius = view.width / 2;
				view.angle = 360.0 / this.numberOfSpokes * i;
				view.configureDuration = this.gifDuration / this.numberOfSpokes;

				var lowestOpacity = 0.2;
				var highlightSpan = 1;
				var distanceToHighlightedSpoke = Math.abs(this.highlightedSpokeIndex - i);
				if (distanceToHighlightedSpoke > this.numberOfSpokes / 2) {
					distanceToHighlightedSpoke = Math.abs(distanceToHighlightedSpoke - this.numberOfSpokes);
				}

				var spokeOpacity = lowestOpacity;
				if (distanceToHighlightedSpoke <= highlightSpan) {

					spokeOpacity = 1 - (1 - lowestOpacity) / (highlightSpan + 1) * distanceToHighlightedSpoke;
				}

				view.backgroundColor = 'rgba(255, 255, 255, ' + spokeOpacity + ')';
			}
		}
	}, {
		key: 'positionSpokes',
		value: function positionSpokes() {

			for (var i = 0; i < this.spokes.length; i++) {

				var angle = 360.0 / this.numberOfSpokes * i;

				var view = this.spokes[i];
				var newFrame = new CGRect();

				newFrame.size.width = this.parameters.widthOfSpokes;
				newFrame.size.height = this.parameters.lengthOfSpokes;

				newFrame.origin.x = Math.sin(angle * (2 * Math.PI / 360.0)) * this.parameters.innerRadius + this.width / 2 - newFrame.size.width / 2;
				newFrame.origin.y = -Math.cos(angle * (2 * Math.PI / 360.0)) * this.parameters.innerRadius + this.height / 2 - newFrame.size.height / 2;

				view.frame = newFrame;
			}

			this.configureSpokes(); // Do this to update the borderRadius of the spokes based on new frame
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

	}, {
		key: 'cycle',
		value: function cycle(delegate) {

			for (var i = 0; i < this.numberOfSpokes; i++) {

				var loadingGif = this;
				this.advanceHighlightTimers.push(setTimeout(function () {

					loadingGif.advanceHighlight();
				}, (i + 1) * (this.gifDuration / this.numberOfSpokes)));
			}

			this.cycleCompletedTimer = setTimeout(function () {
				delegate.cycleCompleted();
			}, this.gifDuration - this.gifDuration / this.numberOfSpokes);
		}
	}, {
		key: 'stop',
		value: function stop() {

			for (var i = 0; i < this.advanceHighlightTimers.length; i++) {
				clearTimeout(this.advanceHighlightTimers[i]);
			}

			clearTimeout(this.cycleCompletedTimer);
		}
	}, {
		key: 'advanceHighlight',
		value: function advanceHighlight() {

			this.highlightedSpokeIndex += 1;
			if (this.highlightedSpokeIndex > this.spokes.length) {
				this.highlightedSpokeIndex = 0;
			}

			this.updateAllUI();
		}

		//
		// Delegate
		//

	}, {
		key: 'numberOfSpokes',
		get: function get() {
			return this._numberOfSpokes;
		},
		set: function set(newNumberOfSpokes) {
			var changed = this.numberOfSpokes != newNumberOfSpokes;

			if (changed) {
				this._numberOfSpokes = newNumberOfSpokes;

				for (var i = 0; i < this.spokes.length; i++) {
					this.removeSubview(this.spokes[i]);
				}
				this.spokes = [];

				for (var i = 0; i < this.numberOfSpokes; i++) {
					this.spokes.push(new JABView());
				}
				this.addSpokes();
				this.updateAllUI();
			}
		}
	}]);

	return LoadingGif;
}(JABView);