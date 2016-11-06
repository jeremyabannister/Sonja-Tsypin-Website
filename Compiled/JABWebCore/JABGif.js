"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABGif = function (_JABView) {
	_inherits(JABGif, _JABView);

	function JABGif(customId) {
		_classCallCheck(this, JABGif);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(JABGif).call(this, customId));

		// State

		// UI
	}

	//
	// Init
	//

	_createClass(JABGif, [{
		key: "init",
		value: function init() {
			_get(Object.getPrototypeOf(JABGif.prototype), "init", this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: "addAllUI",
		value: function addAllUI() {}

		// Update

	}, {
		key: "updateAllUI",
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABGif.prototype), "updateAllUI", this).call(this);
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		// Internal

	}, {
		key: "cycle",
		value: function cycle(delegate) {

			// This is defined by each gif. The gif is responsible for caling cycleCompleted on the passed delegate at the end of its cycle
		}
	}, {
		key: "advance",
		value: function advance(delegate) {}

		// This is distinct from the cycle method in that advance does not necessarily return the gif to its original state. For example, a gif which consists of three images will need to advance three times before it is back to where it started. cycle, by contrast, is defined as one full loop returning to where it started. The gif is responsible for calling advancedCompleted at the end of the advancement

		//
		// Delegate
		//

	}]);

	return JABGif;
}(JABView);