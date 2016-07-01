'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Size classes
var sizeClass = 'xs';
function updateSizeClassForWidth(width) {
	if (typeof width == 'number') {
		if (width >= 0) {
			if (width < 768) {
				sizeClass = 'xs';
			} else if (width < 1030) {
				sizeClass = 's';
			} else if (width < 1200) {
				sizeClass = 'm';
			} else {
				sizeClass = 'l';
			}
		} else {
			updateSizeClassForWidth(-width);
		}
	}
}

// Animation
var defaultAnimationDuration = 400;

// Stopwatch

var Stopwatch = function () {
	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		this.timePointZero = this.currentAbsoluteTime;
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.timePointZero = this.currentAbsoluteTime;
		}
	}, {
		key: 'logTime',
		value: function logTime() {
			console.log(this.currentStopwatchTime);
		}
	}, {
		key: 'currentAbsoluteTime',
		get: function get() {
			return new Date().getTime();
		}
	}, {
		key: 'currentStopwatchTime',
		get: function get() {
			return this.currentAbsoluteTime - this.timePointZero;
		}
	}]);

	return Stopwatch;
}();

var globalStopwatch = new Stopwatch();

// Math
function greaterOfTwo(first, second) {
	if (second > first) {
		return second;
	}
	return first;
}

function lesserOfTwo(first, second) {
	if (second < first) {
		return second;
	}
	return first;
}