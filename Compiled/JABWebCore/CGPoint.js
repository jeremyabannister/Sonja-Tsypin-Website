"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGPoint = function () {
	function CGPoint(x, y) {
		_classCallCheck(this, CGPoint);

		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}

		this.x = x;
		this.y = y;
	}

	_createClass(CGPoint, [{
		key: "isEqualToPoint",
		value: function isEqualToPoint(point) {
			if (point instanceof CGPoint) {
				if (this.containsOnlyValidValues && point.containsOnlyValidValues) {
					if (this.x == point.x && this.y == point.y) {
						return true;
					}
				}
			}

			return false;
		}
	}, {
		key: "containsOnlyValidValues",
		get: function get() {

			if (this.x == null) {
				return false;
			}

			if (this.y == null) {
				return false;
			}

			return true;
		}
	}]);

	return CGPoint;
}();