"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGPoint = function CGPoint(x, y) {
	_classCallCheck(this, CGPoint);

	if (x == null) {
		x = 0;
	}
	if (y == null) {
		y = 0;
	}

	this.x = x;
	this.y = y;
};