'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABGifWrapper = function (_JABView) {
	_inherits(JABGifWrapper, _JABView);

	function JABGifWrapper(customId) {
		_classCallCheck(this, JABGifWrapper);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JABGifWrapper).call(this, customId));

		_this.state = {
			currentIteration: 0,
			totalIterations: 0,
			playing: false,
			paused: false
		};

		// UI
		_this.gif = new JABGif('Gif');

		return _this;
	}

	//
	// Init
	//

	_createClass(JABGifWrapper, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(JABGifWrapper.prototype), 'init', this).call(this);
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
			this.addGif();
		}
	}, {
		key: 'addGif',
		value: function addGif() {
			this.addSubview(this.gif);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABGifWrapper.prototype), 'updateAllUI', this).call(this);

			this.configureGif();
			this.positionGif();
		}

		// Gif

	}, {
		key: 'configureGif',
		value: function configureGif() {}
	}, {
		key: 'positionGif',
		value: function positionGif() {
			this.gif.frame = this.bounds;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Public

	}, {
		key: 'play',
		value: function play() {
			this.loop();
		}
	}, {
		key: 'loop',
		value: function loop(iterations) {

			if (iterations == null) {
				// Loop infinitely
				this.state = { totalIterations: null };
			} else {
				if (typeof iterations == 'number') {
					// Loop that many iterations
					this.state = { totalIterations: iterations };
				}
			}

			this.gif.advance(this);
		}
	}, {
		key: 'stop',
		value: function stop() {

			this.gif.stop();
		}

		// Internal

	}, {
		key: 'cycleCompleted',
		value: function cycleCompleted() {

			this.state.currentIteration += 1;
			if (this.state.totalIterations == null) {
				this.gif.cycle(this);
			} else {
				if (this.state.currentIteration < this.state.totalIterations) {
					this.gif.cycle(this);
				} else {
					this.state = {
						currentIteration: 0,
						totalIterations: 0,
						playing: false,
						paused: false
					};
				}
			}
		}
	}, {
		key: 'advanceCompleted',
		value: function advanceCompleted(cycleCompleted) {

			if (cycleCompleted) {
				this.state.totalIterations += 1;
			}

			if (this.state.totalIterations == null) {
				this.gif.advance(this);
			} else {
				if (this.state.currentIteration < this.state.totalIterations) {
					this.gif.advance(this);
				} else {
					this.state = {
						currentIteration: 0,
						totalIterations: 0,
						playing: false,
						paused: false
					};
				}
			}
		}

		//
		// Delegate
		//

	}, {
		key: 'gif',
		get: function get() {
			return this._gif;
		},
		set: function set(newGif) {
			if (newGif != this.gif) {
				if (this.gif != null) {
					this.removeSubview(this.gif);
				}

				this._gif = newGif;
				this.addSubview(this.gif);
				this.updateAllUI();
			}
		}
	}]);

	return JABGifWrapper;
}(JABView);