'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
	function Polygon(points) {
		_classCallCheck(this, Polygon);

		this.points = [];
		this.valueSuffix = 'px';

		// These are all acceptable ways to define a Polygon:
		//
		// new Polygon([new CGPoint(0, 0), new CGPoint(1, 1)])
		// new Polygon([[0, 0], [1, 1]])
		// new Polygon([0, 0, 1, 1])
		// new Polygon('polygon(0 0, 1 1)')
		if (points instanceof Array) {
			if (points.length > 0) {
				if (points[0] instanceof CGPoint) {
					var allArePoints = true;
					for (var i = 0; i < points.length; i++) {
						if (!(points[i] instanceof CGPoint)) {
							allArePoints = false;
						}
					}

					if (allArePoints) {
						this.points = points;
					} else {
						console.log('Polygon constructor was passed array with inconsistent types [code: 100]');
					}
				} else if (typeof points[0] == 'number') {
					var allAreNumbers = true;
					for (var i = 0; i < points.length; i++) {
						if (!(typeof points[i] == 'number')) {
							allAreNumbers = false;
						}
					}

					if (allAreNumbers) {
						if (points.length % 2 == 0) {

							for (var i = 0; i < points.length; i += 2) {
								this.points.push(new CGPoint(points[i], points[i + 1]));
							}
						} else {
							console.log('Polygon constructor was passed array odd quantity of numbers [code: 101]');
						}
					} else {
						console.log('Polygon constructor was passed array with inconsistent types [code: 102]');
					}
				} else if (points[0] instanceof Array) {
					var allAreArraysOfTwoNumbers = true;
					for (var i = 0; i < points.length; i++) {
						if (!(points[i] instanceof Array)) {
							allAreArraysOfTwoNumbers = false;
						} else {
							if (points[i].length != 2) {
								allAreArraysOfTwoNumbers = false;
							} else {
								if (!(typeof points[i][0] == 'number' && typeof points[i][1] == 'number')) {
									allAreArraysOfTwoNumbers = false;
								}
							}
						}
					}

					if (allAreArraysOfTwoNumbers) {

						for (var i = 0; i < points.length; i++) {
							this.points.push(new CGPoint(points[i][0], points[i][1]));
						}
					} else {
						console.log('Polygon constructor was passed array with inconsistent types [code: 103]');
					}
				}
			}
		} else if (typeof points == 'string') {
			if (points != 'none') {
				var first = points.split('polygon(')[1].split(')')[0].split(',');
				for (var i = 0; i < first.length; i++) {
					var x = first[i].split('px ')[0];
					var y = first[i].split('px ')[1].split('px')[0];
					this.points.push(new CGPoint(x, y));
				}
			}
		}
	}

	//
	// Getters and Setters
	//

	_createClass(Polygon, [{
		key: 'addPoint',
		value: function addPoint(point) {
			this.points.push(point);
		}
	}, {
		key: 'isEqualToPolygon',
		value: function isEqualToPolygon(polygon) {
			if (polygon instanceof Polygon) {
				if (polygon.points.length == this.points.length) {
					if (this.containsOnlyValidPoints && polygon.containsOnlyValidPoints) {
						for (var i = 0; i < this.points.length; i++) {
							if (!this.points[i].isEqualToPoint(polygon.points[i])) {
								return false;
							}
						}

						return true;
					}
				}
			}

			return false;
		}
	}, {
		key: 'containsOnlyValidPoints',
		get: function get() {
			for (var i = 0; i < this.points.length; i++) {
				if (!(this.points[i] instanceof CGPoint)) {
					return false;
				}
			}

			return true;
		}
	}, {
		key: 'polygonString',
		get: function get() {

			var string = 'polygon(';

			if (this.containsOnlyValidPoints) {

				for (var i = 0; i < this.points.length; i++) {
					string += this.points[i].x + this.valueSuffix + ' ' + this.points[i].y + this.valueSuffix;

					if (i != this.points.length - 1) {
						string += ', ';
					}
				}
			}

			string += ')';
			return string;
		}
	}]);

	return Polygon;
}();