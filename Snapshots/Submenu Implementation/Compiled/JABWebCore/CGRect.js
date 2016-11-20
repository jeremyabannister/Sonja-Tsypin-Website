"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGRect = function CGRect(x, y, width, height) {
	_classCallCheck(this, CGRect);

	if (x == null) {
		x = 0;
	}
	if (y == null) {
		y = 0;
	}
	if (width == null) {
		width = 0;
	}
	if (height == null) {
		height = 0;
	}

	this.origin = new CGPoint(x, y);
	this.size = new CGSize(width, height);
};