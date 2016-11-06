'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Size classes
var sizeClass = 'xs';
function updateSizeClassForWidth(width) {
	if (typeof width == 'number') {
		if (width >= 0) {
			if (width < 420) {
				sizeClass = 'xxs';
			} else if (width < 780) {
				sizeClass = 'xs';
			} else if (width < 1035) {
				sizeClass = 's';
			} else if (width < 1200) {
				sizeClass = 'm';
			} else if (width < 1500) {
				sizeClass = 'l';
			} else {
				sizeClass = 'xl';
			}
		} else {
			updateSizeClassForWidth(-width);
		}
	}
}

var websiteIsResizing = false;

// Object Census
var viewHierarchy = [];
function enumerateViewHierarchy() {
	console.log('Enumerating View Hierarchy...');
	for (var i = 0; i < viewHierarchy.length; i++) {
		if (typeof viewHierarchy[i].id == 'string') {
			var indent = '    ';
			var whiteSpace = '';
			for (var j = 0; j < viewHierarchy[i].id.split('---').length - 1; j++) {
				whiteSpace += indent;
			}
			console.log(whiteSpace + viewHierarchy[i].id);
		} else {
			console.log(viewHierarchy[i].id);
		}
	}
}

// Property Support
function isPropertySupported(property) {
	return property in document.body.style;
}

// Image Bank
var imageBank = new JABImageBank();

// Animation
var defaultAnimationDuration = 400;

var CSSAnimationEngine = function () {
	function CSSAnimationEngine() {
		_classCallCheck(this, CSSAnimationEngine);

		this.animations = {};
	}

	_createClass(CSSAnimationEngine, [{
		key: 'updateStyleSheet',
		value: function updateStyleSheet() {
			var animationListString = '';
			for (var key in this.animations) {
				animationListString += this.animations[key] + ' ';
			}

			$('#css-animations').text(animationListString);
		}
	}, {
		key: 'addAnimation',
		value: function addAnimation(name, animationString) {

			this.animations[name] = animationString;
			this.updateStyleSheet();
		}
	}, {
		key: 'polygonMorphAnimationStringWithName',
		value: function polygonMorphAnimationStringWithName(name, initialPolygon, finalPolygon) {

			if (initialPolygon instanceof Polygon && finalPolygon instanceof Polygon) {
				if (initialPolygon.points.length == finalPolygon.points.length) {

					var verifiedName = name;
					if (verifiedName == null) {
						verifiedName = 'default';
					}

					if (initialPolygon.containsOnlyValidPoints && finalPolygon.containsOnlyValidPoints) {

						return '@keyframes ' + verifiedName + ' { 0% { -webkit-clip-path: ' + initialPolygon.polygonString + ';} 100% { -webkit-clip-path: ' + finalPolygon.polygonString + ';} }';
					}
				}
			}

			// return '@keyframes ' + verifiedName+ ' { 0% { clip-path: ' + initialPolygon.polygonString + '; -webkit-clip-path: ' + initialPolygon.polygonString + ';} 100% { clip-path: ' + finalPolygon.polygonString + '; -webkit-clip-path: ' + finalPolygon.polygonString + ';} }'
		}
	}]);

	return CSSAnimationEngine;
}();

var globalCSSAnimationEngine = new CSSAnimationEngine();

// Stopwatch

var Stopwatch = function () {
	function Stopwatch() {
		_classCallCheck(this, Stopwatch);

		this.timePointZero = this.currentAbsoluteTime;
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset(message) {
			if (message != null) {
				console.log(message);
			}
			this.timePointZero = this.currentAbsoluteTime;
		}
	}, {
		key: 'logTime',
		value: function logTime(message) {
			if (message == null) {
				message = '';
			} else {
				message = ' ' + message;
			}
			console.log(this.currentStopwatchTime + message);
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